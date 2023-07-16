namespace EventPlanner.Data.Models
{
    using Microsoft.AspNetCore.Identity;

    public class User : IdentityUser
    {
        public ICollection<Event> Events { get; set; } = new List<Event>();

        public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    }
}
