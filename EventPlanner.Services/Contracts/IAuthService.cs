namespace EventPlanner.Services.Contracts
{
    using Models;
    using Data.Models;

    public interface IAuthService
    {
        AuthResponse CreateToken(User user);
    }
}
