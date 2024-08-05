namespace EventPlanner.Services.Contracts
{
    using Results;
    using Models.Auth;
    using Microsoft.AspNetCore.Http;

    public interface IIdentityService
    {
        Task<AuthenticationResult<AuthResponse>> RegisterAsync(RegisterDto dto);

        Task<AuthenticationResult<AuthResponse>> LoginAsync(LoginDto dto);

        Task<AuthenticationResult<AuthResponse>> LoginWithFacebookAsync(string accessToken);

        Task<AuthenticationResult<AuthResponse>> RefreshTokenAsync(TokenDto tokens);

        Task<AuthenticationResult<AuthResponse>> LogOut(string userName);

        Task<AuthenticationResult<AuthResponse>> ValidateUserAsync(string token);

        void SetTokensInsideCookie(TokenDto tokenDto, HttpContext context);
    }
}
