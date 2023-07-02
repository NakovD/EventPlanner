namespace EventPlanner.Services.Models.Auth
{
    using System.ComponentModel.DataAnnotations;

    public class AuthUserDto
    {
        [Required]
        public string UserName { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;
    }
}
