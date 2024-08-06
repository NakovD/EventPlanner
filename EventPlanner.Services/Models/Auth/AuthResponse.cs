namespace EventPlanner.Services.Models.Auth
{
    using EventPlanner.Services.Models.User;

    public class AuthResponse
    {
        public CurrentAuthenticatedUserDto User { get; set; } = null!;

        public TokenDto TokenDto { get; set; } = null!;
    }
}
