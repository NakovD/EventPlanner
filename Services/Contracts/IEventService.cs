namespace EventPlanner.Services.Contracts
{
    using Models;

    public interface IEventService
    {
        Task<IEnumerable<EventDto>> GetAllAsync();

        Task<EventDto?> GetByIdAsync(int id);
    }
}
