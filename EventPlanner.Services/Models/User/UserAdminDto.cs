namespace EventPlanner.Services.Models.User
{
    public class UserAdminDto
    {
        public string Id { get; set; } = null!;

        public string Username { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string RegistrationDate { get; set; } = null!;

        public int EventsCount { get; set; }
    }
}
