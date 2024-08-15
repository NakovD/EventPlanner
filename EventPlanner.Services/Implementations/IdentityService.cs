namespace EventPlanner.Services.Implementations
{
    using Contracts;
    using Results;
    using Models.Auth;
    using Data.Models;

    using Microsoft.AspNetCore.Identity;
    using System.Threading.Tasks;
    using System.Net;
    using System.Security.Claims;
    using EventPlanner.Common;
    using Microsoft.AspNetCore.Http;
    using EventPlanner.Services.Models.User;

    public class IdentityService : IIdentityService
    {
        private readonly ITokenService tokenService;

        private readonly IFacebookAuthService facebookAuthService;

        private readonly UserManager<User> userManager;

        public IdentityService(UserManager<User> userManager, IFacebookAuthService facebookAuthService, ITokenService tokenService)
        {
            this.facebookAuthService = facebookAuthService;
            this.userManager = userManager;
            this.tokenService = tokenService;
        }

        public async Task<AuthenticationResult<AuthResponse>> RegisterAsync(RegisterDto dto)
        {
            var user = new User
            {
                UserName = dto.UserName,
                Email = dto.Email,
            };

            IdentityResult result;

            if (string.IsNullOrEmpty(dto.Password))
            {
                result = await userManager.CreateAsync(user);
            }
            else
            {
                result = await userManager.CreateAsync(user, dto.Password);
            }

            if (!result.Succeeded)
            {
                return new AuthenticationResult<AuthResponse>
                {
                    Errors = result.Errors,
                    RequestStatusCode = HttpStatusCode.BadRequest,
                    Result = null,
                    Succeeded = false,
                };
            }

            var newUser = await userManager.FindByNameAsync(user.UserName);

            await userManager.AddToRoleAsync(newUser, "User");

            var response = await GenerateTokenForUserAsync(newUser, true);

            return this.GenerateSuccessAuthResult(response);
        }

        public async Task<AuthenticationResult<AuthResponse>> LoginAsync(LoginDto dto)
        {
            var user = await userManager.FindByNameAsync(dto.UserName);

            if (user == null)
            {
                return this.GenerateAuthError(HttpStatusCode.BadRequest, "Bad Credentials!");
            }

            var isPasswordValid = await userManager.CheckPasswordAsync(user, dto.Password);

            if (!isPasswordValid)
            {
                return this.GenerateAuthError(HttpStatusCode.BadRequest, "Bad Credentials!");
            }

            var response = await GenerateTokenForUserAsync(user, true);

            return this.GenerateSuccessAuthResult(response);
        }

        public async Task<AuthenticationResult<AuthResponse>> LoginWithFacebookAsync(string accessToken)
        {
            var validatedTokenResult = await facebookAuthService.ValidateAccessTokenAsync(accessToken);

            if (!validatedTokenResult.Data.IsValid)
            {
                return this.GenerateAuthError(HttpStatusCode.BadRequest, "Bad Credentials!");
            }

            var userInfo = await facebookAuthService.GetUserInfoAsync(accessToken);

            var user = await userManager.FindByEmailAsync(userInfo.Email);

            if (user == null)
            {
                var registerDto = new RegisterDto
                {
                    UserName = $"{userInfo.FirstName}-{userInfo.LastName}",
                    Email = userInfo.Email,
                };

                return await RegisterAsync(registerDto);
            }

            var response = await GenerateTokenForUserAsync(user, true);

            return this.GenerateSuccessAuthResult(response);
        }

        public async Task<AuthenticationResult<CurrentAuthenticatedUserDto>> GetCurrentUserData(string userName)
        {

            var user = await userManager.FindByNameAsync(userName);

            if (user == null)
            {
                return new AuthenticationResult<CurrentAuthenticatedUserDto>
                {
                    RequestStatusCode = HttpStatusCode.BadRequest,
                    Errors = new List<IdentityError>
                    {
                        this.GenerateError(HttpStatusCode.BadRequest.ToString(), "Bad credentials")
                    },
                    Succeeded = false,
                    Result = null
                };
            }

            var userRoles = await this.userManager.GetRolesAsync(user);

            var userDto = new CurrentAuthenticatedUserDto
            {

                UserId = user.Id,
                UserEmail = user.Email!,
                UserName = user.UserName!,
                Roles = userRoles,
            };

            return new AuthenticationResult<CurrentAuthenticatedUserDto>
            {
                RequestStatusCode = HttpStatusCode.OK,
                Succeeded = true,
                Result = userDto
            };
        }

        public async Task<AuthenticationResult<AuthResponse>> RefreshTokenAsync(TokenDto tokens)
        {
            var principal = tokenService.ValidateExpiredToken(tokens.AccessToken);

            var user = await userManager.FindByNameAsync(principal.Identity.Name);

            if (user == null || user.RefreshToken != tokens.RefreshToken || user.RefreshTokenExpirationTime <= DateTime.Now)
            {
                this.GenerateAuthError(HttpStatusCode.BadRequest, "Invalid token.");
            }

            return this.GenerateSuccessAuthResult(await this.GenerateTokenForUserAsync(user, false));
        }

        public async Task<AuthenticationResult<AuthResponse>> LogOut(string userName)
        {
            var user = await userManager.FindByNameAsync(userName);

            if (user == null)
            {
                return this.GenerateAuthError(HttpStatusCode.BadRequest, "Invalid user");
            }

            user.RefreshToken = null;

            await this.userManager.UpdateAsync(user);

            return new AuthenticationResult<AuthResponse>
            {
                Succeeded = true,
                RequestStatusCode = HttpStatusCode.NoContent,
            };
        }

        private async Task<AuthResponse> GenerateTokenForUserAsync(User user, bool shouldUpdateRefreshTokenExpirationTime)
        {
            var roles = await userManager.GetRolesAsync(user);

            var userClaims = this.GetUserClaims(user, roles);

            var accessToken = this.tokenService.CreateAccessToken(userClaims);

            var refreshToken = this.tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;

            if (shouldUpdateRefreshTokenExpirationTime)
            {
                user.RefreshTokenExpirationTime = DateTime.Now.AddDays(Constants.RefreshTokenExpirationTimeInDays);
            }

            await userManager.UpdateAsync(user);

            return new AuthResponse
            {
                User = new CurrentAuthenticatedUserDto
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    UserEmail = user.Email,
                    Roles = roles,
                },
                TokenDto = new TokenDto
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                }
            };
        }

        private IEnumerable<Claim> GetUserClaims(User user, IEnumerable<string> roles)
        {
            var rolesClams = new List<Claim>();

            foreach (var role in roles)
            {
                rolesClams.Add(new Claim(ClaimTypes.Role, role));
            }

            var generalClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
            };

            return generalClaims.Concat(rolesClams);
        }

        private AuthenticationResult<AuthResponse> GenerateSuccessAuthResult(AuthResponse authResponse)
        {
            return new AuthenticationResult<AuthResponse>
            {
                RequestStatusCode = HttpStatusCode.OK,
                Succeeded = true,
                Result = authResponse
            };
        }

        private AuthenticationResult<AuthResponse> GenerateAuthError(HttpStatusCode statusCode, string description)
        {
            return new AuthenticationResult<AuthResponse>
            {
                Succeeded = false,
                Result = null,
                Errors = new List<IdentityError> { this.GenerateError(statusCode.ToString(), description) },
                RequestStatusCode = statusCode
            };
        }

        private IdentityError GenerateError(string statusCode, string description) => new IdentityError { Code = statusCode, Description = description };

        public void SetTokensInsideCookie(TokenDto tokenDto, HttpContext context)
        {
            context.Response.Cookies.Append(Constants.AccessTokenCookieName, tokenDto.AccessToken, new CookieOptions
            {
                Secure = true,
                HttpOnly = true,
                IsEssential = true,
                Expires = DateTime.Now.AddDays(3),
                SameSite = SameSiteMode.None,
            });

            context.Response.Cookies.Append(Constants.RefreshTokenCookieName, tokenDto.RefreshToken, new CookieOptions
            {
                Secure = true,
                HttpOnly = true,
                IsEssential = true,
                Expires = DateTime.Now.AddDays(Constants.RefreshTokenExpirationTimeInDays),
                SameSite = SameSiteMode.None,
            });
        }

        public void ExpireAuthCookie(HttpContext context)
        {
            context.Response.Cookies.Append(Constants.AccessTokenCookieName, "", new CookieOptions
            {
                Secure = true,
                HttpOnly = true,
                IsEssential = true,
                Expires = DateTime.Now.AddDays(-1),
                SameSite = SameSiteMode.None,
            });

            context.Response.Cookies.Append(Constants.RefreshTokenCookieName, "", new CookieOptions
            {
                Secure = true,
                HttpOnly = true,
                IsEssential = true,
                Expires = DateTime.Now.AddDays(-1),
                SameSite = SameSiteMode.None,
            });
        }
    }
}
