namespace EventPlanner.Services.Contracts
{
    using Models;
    using Data.Models;
    using EventPlanner.Services.Models.Auth;

    public interface IAuthService
    {
        AuthResponse CreateToken(User user);

        Task<bool> ValidateTokenAsync(string token);

        string GetUserIdFromToken(string token);
    }
}
