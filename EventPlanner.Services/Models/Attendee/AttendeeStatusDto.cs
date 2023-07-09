namespace EventPlanner.Services.Models.Attendee
{
    using System.ComponentModel.DataAnnotations;

    public class AttendeeStatusDto
    {
        [Range(0, 3)]
        public int NewStatus { get; set; }
    }
}
