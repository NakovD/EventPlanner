namespace EventPlanner.Data.Models
{
    using Microsoft.AspNetCore.Identity;
    using System.ComponentModel.DataAnnotations;

    public class User : IdentityUser
    {
        [Required]
        public DateTime RegistrationDate { get; set; }

        public ICollection<Event> Events { get; set; } = new List<Event>();

        public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    }
}
