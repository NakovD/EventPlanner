namespace EventPlanner.Services.Models.Auth
{
    using System.ComponentModel.DataAnnotations;

    public class FacebookDto
    {
        [Required]
        public string AccessToken { get; set; } = null!;
    }
}
