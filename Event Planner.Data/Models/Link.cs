namespace EventPlanner.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Link
    {
        [Key]
        public string Id { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(Attendee))]
        public int AttendeeId { get; set; }

        [Required]
        public Attendee Attendee { get; set; } = null!;

        public DateTime CreatedOn { get; set; }

        public DateTime ValidTo { get; set; }
    }
}
