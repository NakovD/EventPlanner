namespace EventPlanner.Services.Contracts
{
    using EventPlanner.Services.Models.Event;
    using Models;

    public interface IEventService
    {
        Task<IEnumerable<EventDto>> GetAllAsync();

        Task<EventDto?> GetByIdAsync(int id);

        Task<bool> CreateEventAsync(CreateEventDto eventDto, string? userId);
    }
}
