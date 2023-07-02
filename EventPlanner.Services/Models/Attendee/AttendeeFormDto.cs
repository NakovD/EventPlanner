namespace EventPlanner.Services.Models.Attendee
{
    using System.ComponentModel.DataAnnotations;

    public class AttendeeFormDto
    {
        [Required]
        public string Name { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [Range(1, int.MaxValue)]
        public int EventId { get; set; }

        public string? UserId { get; set; }
    }
}
