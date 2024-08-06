namespace EventPlanner.Services.Models.User
{
    using System.Collections.Generic;

    public class CurrentAuthenticatedUserDto
    {
        public string UserEmail { get; set; } = null!;

        public string UserName { get; set; } = null!;

        public string UserId { get; set; } = null!;

        public IEnumerable<string> Roles { get; set; } = new List<string>();
    }
}
