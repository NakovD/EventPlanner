namespace Event_Planner.Data.Models
{
    using System;

    public class Event
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public DateTime Date { get; set; }

        public TimeSpan Time { get; set; }

        public int OrganizerId { get; set; }

        public string Location { get; set; } = null!;

        public string Category { get; set; } = null!;

        public ICollection<string> Images { get; set; } = new List<string>();

    }
}
