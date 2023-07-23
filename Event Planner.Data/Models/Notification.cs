namespace EventPlanner.Data.Models
{
    using Enums;
    using EventPlanner.Data.Interfaces;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Notification : IDeletable
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [ForeignKey(nameof(User))]
        [Required]
        public string UserId { get; set; } = null!;

        [Required]
        public User User { get; set; } = null!;

        [Required]
        public string Description { get; set; } = null!;

        [Required]
        public int EventId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public NotificationType Type { get; set; }

        [Required]
        public bool ReadStatus { get; set; }

        [Required]
        public bool IsDeleted { get; set; }
    }
}
