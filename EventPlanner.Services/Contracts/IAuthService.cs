namespace EventPlanner.Services.Contracts
{
    using Models;

    using Microsoft.AspNetCore.Identity;
    using EventPlanner.Data.Models;

    public interface IAuthService
    {
        AuthResponse CreateToken(User user);
    }
}
