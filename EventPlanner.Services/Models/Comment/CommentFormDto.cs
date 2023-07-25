namespace EventPlanner.Services.Models.Comment
{
    using static Common.ValidationValues.CommentValidationsValues;

    using System.ComponentModel.DataAnnotations;

    public class CommentFormDto
    {
        [Required]
        public int EventId { get; set; }

        [Required]
        [StringLength(CommentMaxLength, MinimumLength = CommentMinLength)]
        public string Content { get; set; } = null!;
    }
}
