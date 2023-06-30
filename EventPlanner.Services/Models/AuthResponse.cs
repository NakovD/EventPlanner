namespace EventPlanner.Services.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class AuthResponse
    {
        public string Token { get; set; } = null!;

        public DateTime Expiration { get; set; }
    }
}
