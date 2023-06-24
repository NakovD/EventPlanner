﻿namespace EventPlanner.Data.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

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
        public TimeSpan Time { get; set; }

        [Required]
        public int OrganizerId { get; set; }

        [Required]
        public string Location { get; set; } = null!;

        [Required]
        public string Category { get; set; } = null!;

        public string Image { get; set; } = null!;
    }
}
