namespace EventPlanner.Data.Models
{
    using EventPlanner.Data.Interfaces;
    using System.ComponentModel.DataAnnotations;

    public class Category : IDeletable
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public DateTime LastUpdated { get; set; }

        [Required]
        public bool IsDeleted { get; set; }
    }
}
