namespace EventPlanner.Services.Contracts
{
    using Models;

    using Microsoft.AspNetCore.Identity;

    public interface IAuthService
    {
        AuthResponse CreateToken(IdentityUser user);
    }
}
