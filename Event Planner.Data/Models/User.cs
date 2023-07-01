namespace EventPlanner.Data.Models
{
    using Microsoft.AspNetCore.Identity;

    public class User : IdentityUser
    {
        public ICollection<Event> Events { get; set; } = new List<Event>();
    }
}
