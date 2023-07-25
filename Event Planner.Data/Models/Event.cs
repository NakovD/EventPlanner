namespace EventPlanner.Data.Models
{
    using Interfaces;

    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Event : IDeletable
    {

        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = null!;

        [Required]
        public string Description { get; set; } = null!;

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Time { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(Organizer))]
        public string OrganizerId { get; set; } = null!;

        [Required]
        public User Organizer { get; set; } = null!;

        [Required]
        public string Location { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(Category))]
        public int CategoryId { get; set; }

        [Required]
        public Category Category { get; set; } = null!;

        [Required]
        public string Image { get; set; } = null!;

        public ICollection<Attendee> Attendees { get; set; } = new List<Attendee>();

        public ICollection<Comment> Comments { get; set; } = new List<Comment>();

        [Required]
        public bool IsDeleted { get; set; }
    }
}
