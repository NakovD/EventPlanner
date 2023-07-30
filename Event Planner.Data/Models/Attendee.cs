namespace EventPlanner.Data.Models
{
    using Enums;
    using EventPlanner.Data.Interfaces;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Attendee : IDeletable
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public string Email { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(Event))]
        public int EventId { get; set; }

        [Required]
        public Event Event { get; set; } = null!;

        [ForeignKey(nameof(User))]
        public string? UserId { get; set; }

        public User? User { get; set; }

        [Required]
        public RSVPStatus Status { get; set; }

        [Required]
        public bool IsDeleted { get; set; }
    }
}
