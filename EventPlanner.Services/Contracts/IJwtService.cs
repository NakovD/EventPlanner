namespace EventPlanner.Services.Contracts
{
    using Models.Auth;
    using Data.Models;

    public interface IJwtService
    {
        AuthResponse CreateToken(User user, IEnumerable<string> roles);

        Task<bool> ValidateTokenAsync(string token);

        string GetUserIdFromToken(string token);
    }
}
