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

        private FacebookAuthUrls authUrls;

        private readonly IConfiguration configuration;

        private readonly IJsonService jsonService;

        private readonly HttpClient httpClient;

        public FacebookAuthService(HttpClient httpClient, IJsonService jsonService, IConfiguration configuration)
        {
            this.httpClient = httpClient;
            this.jsonService = jsonService;
            this.configuration = configuration;
            AddFacebookConfiguration();
            AddFacebookUrls();
        }

        public async Task<FacebookUserInfoResult> GetUserInfoAsync(string accessToken)
        {
            var formattedUrl = string.Format(authUrls.UserInfoUrl, accessToken);

            var result = await httpClient.GetAsync(formattedUrl);

            result.EnsureSuccessStatusCode();

            var stringResponse = await result.Content.ReadAsStringAsync();

            return jsonService.Deserialize<FacebookUserInfoResult>(stringResponse)!;
        }

        public async Task<FacebookTokenValidationResult> ValidateAccessTokenAsync(string accessToken)
        {
            var formattedUrl = string.Format(authUrls.TokenValidationUrl, accessToken, facebookConfiguration.AppId, facebookConfiguration.AppSecret);

            var result = await httpClient.GetAsync(formattedUrl);

            result.EnsureSuccessStatusCode();

            var stringResponse = await result.Content.ReadAsStringAsync();

            return jsonService.Deserialize<FacebookTokenValidationResult>(stringResponse)!;
        }

        private void AddFacebookConfiguration()
        {
            var secretsSection = configuration.GetSection(nameof(FacebookConfiguration));

            if (secretsSection == null) throw new ArgumentException(nameof(secretsSection), "Facebook secrets section not found!");

            var appId = secretsSection[nameof(FacebookConfiguration.AppId)];
            var appSecret = secretsSection[nameof(FacebookConfiguration.AppSecret)];

            facebookConfiguration = new FacebookConfiguration
            { 
                AppId = appId!,
                AppSecret = appSecret!,
            };
        }

        private void AddFacebookUrls()
        {
            var configurationSection = configuration.GetSection(nameof(FacebookAuthUrls));

            if (configurationSection == null) throw new ArgumentException(nameof(configurationSection), "Facebook configuration section not found!");

            var tokenValidationUrl = configurationSection[nameof(FacebookAuthUrls.TokenValidationUrl)];
            var userInfoUrl = configurationSection[nameof(FacebookAuthUrls.UserInfoUrl)];

            authUrls = new FacebookAuthUrls
            {
                TokenValidationUrl = tokenValidationUrl!,
                UserInfoUrl = userInfoUrl!,
            };
        }
    }
}
