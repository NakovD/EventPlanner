namespace EventPlanner.Services.Models.Attendee
{
    public class AttendeeDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public int EventId { get; set; }

        public string? UserId { get; set; }

        public string Status { get; set; } = null!;
    }
}
