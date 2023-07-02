namespace EventPlanner.Services.Models.Auth
{
    using System;

    public class AuthResponse
    {
        public string Token { get; set; } = null!;

        public DateTime Expiration { get; set; }
    }
}
