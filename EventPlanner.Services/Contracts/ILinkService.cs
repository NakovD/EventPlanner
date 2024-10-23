namespace EventPlanner.Services.Contracts
{
    using EventPlanner.Services.Models.Link;

    public interface ILinkService
    {
        Task<( bool isSuccess, string? linkId)> CreateAsync(int attendeeId, DateTime validTo);

        Task<LinkDto?> GetAsync(string linkId);
    }
}
