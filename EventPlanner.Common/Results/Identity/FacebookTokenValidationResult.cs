namespace EventPlanner.Common.Results.Identity
{
    using System.Text.Json.Serialization;
    public class FacebookTokenValidationResult
    {
        [JsonPropertyName("data")]
        public FacebookTokenValidationData Data { get; set; } = null!;
    }

    public class FacebookTokenValidationData
    {
        [JsonPropertyName("app_id")]
        public string AppId { get; set; } = null!;

        [JsonPropertyName("type")]
        public string Type { get; set; } = null!;

        [JsonPropertyName("application")]
        public string Application { get; set; } = null!;

        [JsonPropertyName("data_access_expires_at")]
        public long DataAccessExpiresAt { get; set; }

        [JsonPropertyName("expires_at")]
        public long ExpiresAt { get; set; }

        [JsonPropertyName("is_valid")]
        public bool IsValid { get; set; }

        [JsonPropertyName("scopes")]
        public string[] Scopes { get; set; } = null!;

        [JsonPropertyName("user_id")]
        public string UserId { get; set; } = null!;
    }
}
