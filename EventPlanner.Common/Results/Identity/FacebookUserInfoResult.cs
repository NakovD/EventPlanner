namespace EventPlanner.Common.Results.Identity
{
    using System.Text.Json.Serialization;

    public class FacebookUserInfoResult
    {
        [JsonPropertyName("first_name")]
        public string FirstName { get; set; } = null!;

        [JsonPropertyName("last_name")]
        public string LastName { get; set; } = null!;

        [JsonPropertyName("email")]
        public string Email { get; set; } = null!;

        [JsonPropertyName("id")]
        public string Id { get; set; } = null!;
    }
}
