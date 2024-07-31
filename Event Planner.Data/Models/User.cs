namespace EventPlanner.Data.Models
{
    using Microsoft.AspNetCore.Identity;
    using System.ComponentModel.DataAnnotations;

    public class User : IdentityUser
    {
        [Required]
        public DateTime RegistrationDate { get; set; }

        public string? RefreshToken { get; set; }

        public DateTime RefreshTokenExpirationTime { get; set; }

        public ICollection<Event> Events { get; set; } = new List<Event>();

        public ICollection<Comment> Comments { get; set; } = new List<Comment>();

        public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    }
}
