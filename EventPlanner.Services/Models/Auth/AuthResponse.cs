namespace EventPlanner.Services.Models.Auth
{
    public class AuthResponse
    {
        public string UserEmail { get; set; } = null!;

        public string UserName { get; set; } = null!;

        public string UserId { get; set; } = null!;

        public TokenDto Tokens { get; set; } = null!;

        public IEnumerable<string> Roles { get; set; } = new List<string>();
    }
}
