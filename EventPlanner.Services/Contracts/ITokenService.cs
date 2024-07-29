namespace EventPlanner.Services.Contracts
{
    using System.Security.Claims;

    public interface ITokenService
    {
        string CreateAccessToken(IEnumerable<Claim> claims);

        string GenerateRefreshToken();

        Task<(bool isTokenValid, ClaimsPrincipal?)> ValidateTokenAsync(string token);

        ClaimsPrincipal ValidateExpiredToken(string token);
    }
}
