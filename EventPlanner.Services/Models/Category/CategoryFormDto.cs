namespace EventPlanner.Services.Models.Category
{
    using System.ComponentModel.DataAnnotations;

    public class CategoryFormDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;
    }
}
