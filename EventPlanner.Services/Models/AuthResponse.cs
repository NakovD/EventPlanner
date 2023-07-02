namespace EventPlanner.Services.Models
{
    using System;

    public class AuthResponse
    {
        public string Token { get; set; } = null!;

        public DateTime Expiration { get; set; }
    }
}
