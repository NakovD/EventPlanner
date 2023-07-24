namespace EventPlanner.Services.Models.Event
{
    public class EventAdministrationDto
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Date { get; set; } = null!;

        public string Time { get; set; } = null!;

        public string Category { get; set; } = null!;

        public string OrganizerName { get; set; } = null!;

        public string Description { get; set; } = null!;

        public int Attendees { get; set; }

        public bool IsDeleted { get; set; }
    }
}
