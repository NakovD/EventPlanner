namespace EventPlanner.Services.Models.Auth
{
    using System;

    public class AuthResponse
    {
        public string UserEmail { get; set; } = null!;

        public string UserName { get; set; } = null!;

        public string UserId { get; set; } = null!;

        public string Token { get; set; } = null!;

        public DateTime Expiration { get; set; }
    }
}
