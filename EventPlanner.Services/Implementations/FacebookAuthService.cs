namespace EventPlanner.Services.Implementations
{
    using EventPlanner.Common.Configurations.Facebook;
    using EventPlanner.Common.Results.Identity;
    using Services.Contracts;

    using Microsoft.Extensions.Configuration;

    using System.Net.Http;
    using System.Threading.Tasks;

    public class FacebookAuthService : IFacebookAuthService
    {
        private FacebookConfiguration facebookConfiguration;

        private readonly IConfiguration configuration;

        private readonly IJsonService jsonService;

        private readonly HttpClient httpClient;

        public FacebookAuthService(HttpClient httpClient, IJsonService jsonService, IConfiguration configuration)
        {
            this.httpClient = httpClient;
            this.jsonService = jsonService;
            this.configuration = configuration;
            AddFacebookConfiguration();
        }

        public async Task<FacebookUserInfoResult> GetUserInfoAsync(string accessToken)
        {
            var formattedUrl = string.Format(facebookConfiguration.UserInfoUrl, accessToken);

            var result = await httpClient.GetAsync(formattedUrl);

            result.EnsureSuccessStatusCode();

            var stringResponse = await result.Content.ReadAsStringAsync();

            return jsonService.Deserialize<FacebookUserInfoResult>(stringResponse)!;
        }

        public async Task<FacebookTokenValidationResult> ValidateAccessTokenAsync(string accessToken)
        {
            var formattedUrl = string.Format(facebookConfiguration.TokenValidationUrl, accessToken, "", "");

            var result = await httpClient.GetAsync(formattedUrl);

            result.EnsureSuccessStatusCode();

            var stringResponse = await result.Content.ReadAsStringAsync();

            return jsonService.Deserialize<FacebookTokenValidationResult>(stringResponse)!;
        }

        private void AddFacebookConfiguration()
        {
            var tokenValidationUrl = configuration.GetSection(nameof(FacebookConfiguration))[nameof(FacebookConfiguration.TokenValidationUrl)];
            var userInfoUrl = configuration.GetSection(nameof(FacebookConfiguration))[nameof(FacebookConfiguration.UserInfoUrl)];

            facebookConfiguration = new FacebookConfiguration { TokenValidationUrl = tokenValidationUrl, UserInfoUrl = userInfoUrl };
        }
    }
}
