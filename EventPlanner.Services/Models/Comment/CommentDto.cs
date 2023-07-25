namespace EventPlanner.Services.Models.Comment
{
    public class CommentDto
    {
        public int Id { get; set; }

        public string Content { get; set; } = null!;

        public string UserId { get; set; } = null!;

        public string UserName { get; set; } = null!;

        public string LastUpdated { get; set; } = null!;
    }
}
