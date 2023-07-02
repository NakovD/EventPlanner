namespace EventPlanner.Services.Contracts
{
    using Models.Event;

    public interface IEventService
    {
        Task<IEnumerable<EventDto>> GetAllAsync();

        Task<EventDto?> GetByIdAsync(int id);

        Task<bool> CreateEventAsync(CreateEventDto eventDto, string? userId);
    }
}
