namespace EventPlanner.Services.Models.User
{
    public class UserDto
    {
        public string Id { get; set; }

        public string Username { get; set; } = null!;

        public string Email { get; set; } = null!;
    }
}
