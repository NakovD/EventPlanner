namespace EventPlanner.Services.Implementations
{
    using Contracts;
    using Results;
    using Models.Auth;
    using Data.Models;

    using Microsoft.AspNetCore.Identity;
    using System.Threading.Tasks;

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

        public async Task<AuthenticationResult<AuthResponse>> GenerateTokenForUserAsync(User user)
        {
            var roles = await userManager.GetRolesAsync(user);

            var authResponse = jwtService.CreateToken(user, roles);

            return GenerateAuthResult(true, authResponse, null);
        }

        public async Task<AuthenticationResult<AuthResponse>> LoginAsync(LoginDto dto)
        {
            var user = await userManager.FindByNameAsync(dto.UserName);

            if (user == null) return GenerateAuthResult(false, null, new List<IdentityError> { GenerateError("404", "Bad Credentials!") });

            var isPasswordValid = await userManager.CheckPasswordAsync(user, dto.Password);

            if (!isPasswordValid) return GenerateAuthResult(false, null, new List<IdentityError> { GenerateError("404", "Bad Credentials!") });

            var userRoles = await userManager.GetRolesAsync(user);

            var response = jwtService.CreateToken(user, userRoles);

            return GenerateAuthResult(true, response, null);
        }

        public async Task<AuthenticationResult<AuthResponse>> LoginWithFacebookAsync(string accessToken)
        {
            var validatedTokenResult = await facebookAuthService.ValidateAccessTokenAsync(accessToken);

            if (!validatedTokenResult.Data.IsValid) return GenerateAuthResult(false, null, new[] { GenerateError("400", "Invalid Credentials!") });

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

            return await GenerateTokenForUserAsync(user);
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

            if (!result.Succeeded) return GenerateAuthResult(false, null, result.Errors);

            var newUser = await userManager.FindByNameAsync(user.UserName);

            await userManager.AddToRoleAsync(newUser, "User");

            var response = jwtService.CreateToken(newUser, new List<string> { "User" });

            return GenerateAuthResult(true, response, null);
        }

        private AuthenticationResult<AuthResponse> GenerateAuthResult(bool success, AuthResponse? authResponse, IEnumerable<IdentityError>? errors)
        {
            var requestCode = success ? 200 : 400;

            return new AuthenticationResult<AuthResponse> { Succeeded = success, Result = authResponse, Errors = errors, RequestCode = requestCode };
        }

        private IdentityError GenerateError(string statusCode, string description) => new IdentityError { Code = statusCode, Description = description };
    }
}
