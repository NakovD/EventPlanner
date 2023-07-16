namespace EventPlanner.Services.Models.Notification
{
    public class NotificationDto
    {
        public int Id { get; set; }

        public string Description { get; set; } = null!;

        public string CreatedAt { get; set; } = null!;

        public int Type { get; set; }

        public bool IsReaded { get; set; }

        public int EventId { get; set; }
    }
}
