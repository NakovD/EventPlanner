namespace EventPlanner.Services.Models.Notification
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class NotificationFormDto
    {
        public int EventId { get; set; }

        public string Description { get; set; } = null!;

        [Range(0, 1)]
        public int Type { get; set; }
    }
}
