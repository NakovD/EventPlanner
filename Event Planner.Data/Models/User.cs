namespace EventPlanner.Data.Models
{
    using System.Collections.Generic;

    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public ICollection<string> Events { get; set; } = new List<string>();
    }
}
