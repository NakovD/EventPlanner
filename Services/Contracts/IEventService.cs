namespace EventPlanner.Services.Contracts
{
    using EventPlanner.Services.Models;

    public interface IEventService
    {
        Task<IEnumerable<EventDto>> GetAllAsync();
    }
}
