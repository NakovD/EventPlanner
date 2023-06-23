namespace EventPlanner.Data.Models
{
    using EventPlanner.Data.Enums;

    public class Attendee
    {
        public int Id { get; set; }

        public int EventId { get; set; }

        public int UserId { get; set; }

        public RSVPStatus Status { get; set; }
    }
}
