namespace EventPlanner.Services.Models
{
    public class EventDto
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Time { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string Location { get; set; } = null!;

        public string Category { get; set; } = null!;

        public string Image { get; set; } = null!;
    }
}
