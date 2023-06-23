namespace EventPlanner.Data.Models
{
    using System;

    public class Comment
    {
        public int Id { get; set; }

        public string Content { get; set; } = null!;

        public int UserId { get; set; }

        public TimeSpan Timestamp { get; set; }
    }
}
