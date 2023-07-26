namespace EventPlanner.Services.Contracts
{
    using EventPlanner.Common.Results.Identity;

    public interface IFacebookAuthService
    {
        Task<FacebookTokenValidationResult> ValidateAccessTokenAsync(string accessToken);

        Task<FacebookUserInfoResult> GetUserInfoAsync(string accessToken);
    }
}
