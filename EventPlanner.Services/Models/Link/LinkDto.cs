namespace EventPlanner.Services.Models.Link
{
    using EventPlanner.Services.Models.Attendee;

    public class LinkDto
    {
        public string Id { get; set; } = null!;

        public AttendeeDto Attendee { get; set; } = null!;

        public DateTime CreatedOn { get; set; }

        public DateTime ValidTo { get; set; }
    }
}
