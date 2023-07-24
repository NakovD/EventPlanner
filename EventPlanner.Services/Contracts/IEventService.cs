namespace EventPlanner.Services.Contracts
{
    using Models.Event;

    public interface IEventService
    {
        Task<IEnumerable<EventDto>> GetAllAsync();

        Task<IEnumerable<EventAdministrationDto>> GetAllAdministrationAsync();

        Task<IEnumerable<EventDto>?> GetUserEventsAsync(string? userId);

        Task<EventDto?> GetByIdAsync(int id);

        Task<string> GetEventCreatorIdAsync(int eventId);

        Task<bool> CreateEventAsync(EventFormDto eventDto, string? userId);

        Task<bool> UpdateEventAsync(EventFormDto eventDto, int eventId);

        Task<bool> MarkAsDeletedAsync(int eventId);

        Task<bool> UnmarkAsDeletedAsync(int eventId);
    }
}
