namespace EventPlanner.Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class Event
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
        public string OrganizerId { get; set; } = null!;

        [Required]
        public User Organizer { get; set; } = null!;

        [Required]
        public string Location { get; set; } = null!;

        [Required]
        public string Category { get; set; } = null!;

        [Required]
        public string Image { get; set; } = null!;
    }
}
