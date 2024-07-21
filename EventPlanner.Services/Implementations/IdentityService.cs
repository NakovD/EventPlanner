namespace EventPlanner.Services.Implementations
{
    using Contracts;
    using Results;
    using Models.Auth;
    using Data.Models;

    using Microsoft.AspNetCore.Identity;
    using System.Threading.Tasks;
    using System.Net;

    public class IdentityService : IIdentityService
    {
        private readonly IJwtService jwtService;

        private readonly IFacebookAuthService facebookAuthService;

        private readonly UserManager<User> userManager;

        public IdentityService(IJwtService jwtService, UserManager<User> userManager, IFacebookAuthService facebookAuthService)
        {
            this.jwtService = jwtService;
            this.facebookAuthService = facebookAuthService;
            this.userManager = userManager;
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

            var response = jwtService.CreateToken(newUser, new List<string> { "User" });

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

            var userRoles = await userManager.GetRolesAsync(user);

            var response = jwtService.CreateToken(user, userRoles);

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
                    UserName = $"${userInfo.FirstName}-{userInfo.LastName}",
                    Email = userInfo.Email,
                };

                return await RegisterAsync(registerDto);
            }

            var response = await GenerateTokenForUserAsync(user);

            return this.GenerateSuccessAuthResult(response);
        }

        public async Task<AuthenticationResult<AuthResponse>> ValidateUserAsync(string token)
        {
            var isTokenValid = await jwtService.ValidateTokenAsync(token);

            if (!isTokenValid)
            {
                return this.GenerateAuthError(HttpStatusCode.BadRequest, "Bad Credentials!");
            }

            var userId = jwtService.GetUserIdFromToken(token);

            var user = await userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return this.GenerateAuthError(HttpStatusCode.BadRequest, "Bad Credentials!");
            }

            var userRoles = await this.userManager.GetRolesAsync(user);

            var response = new AuthResponse
            {
                UserId = user.Id,
                UserEmail = user.Email,
                UserName = user.UserName,
                Roles = userRoles,
                Token = token
            };

            return this.GenerateSuccessAuthResult(response);
        }

        private async Task<AuthResponse> GenerateTokenForUserAsync(User user)
        {
            var roles = await userManager.GetRolesAsync(user);

            var authResponse = jwtService.CreateToken(user, roles);

            return authResponse;
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
    }
}
