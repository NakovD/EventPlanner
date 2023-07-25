namespace EventPlanner.Data.Models
{
    using Interfaces;

    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Comment : IDeletable
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Content { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(User))]
        public string UserId { get; set; } = null!;

        [Required]
        public User User { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(Event))]
        public int EventId { get; set; }

        [Required]
        public Event Event { get; set; } = null!;

        [Required]
        public DateTime LastUpdated { get; set; }

        [Required]
        public bool IsDeleted { get; set; }
    }
}
