namespace EventPlanner.Services.Models.Event
{
    using Common.Attributes;
    using static Common.ValidationValues.EventValidationValues;

    using System.ComponentModel.DataAnnotations;

    public class CreateEventDto
    {

        [Required]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; } = null!;

        [Required]
        [DateGreaterThanToday]
        public DateTime Date { get; set; }

        [Required]
        [TimeIsValidFormat]
        public string Time { get; set; } = null!;

        [Required]
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; } = null!;

        [Required]
        [MaxLength(LocationMaxLength)]
        public string Location { get; set; } = null!;

        [Required]
        public string Category { get; set; } = null!;

        [Required]
        [MaxLength(ImageLinkMaxLength)]
        public string Image { get; set; } = null!;
    }
}
