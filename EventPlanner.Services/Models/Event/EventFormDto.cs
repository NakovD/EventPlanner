namespace EventPlanner.Services.Models.Event
{
    using Common.Attributes;
    using static Common.ValidationValues.EventValidationValues;

    using System.ComponentModel.DataAnnotations;

    public class EventFormDto
    {

        [Required]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; } = null!;

        [Required]
        [DateGreaterThanToday]
        public string Date { get; set; } = null!;

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
        public int CategoryId { get; set; }

        [Required]
        [MaxLength(ImageLinkMaxLength)]
        public string Image { get; set; } = null!;
    }
}
