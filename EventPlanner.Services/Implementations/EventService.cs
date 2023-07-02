namespace EventPlanner.Services.Implementations
{
    using Data;
    using Contracts;
    using Models.Event;
    using Data.Models;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    using AutoMapper;
    using AutoMapper.QueryableExtensions;

    using Microsoft.EntityFrameworkCore;

    public class EventService : IEventService
    {
        private readonly EventPlannerDbContext context;

        private readonly IMapper mapper;

        public EventService(EventPlannerDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<bool> CreateEventAsync(CreateEventDto eventDto, string? userId)
        {
            var isUserIdValid = !string.IsNullOrEmpty(userId);

            if (!isUserIdValid) return false;

            var newEvent = mapper.Map<Event>(eventDto);

            newEvent.OrganizerId = userId!;

            try
            {
                await context.Events.AddAsync(newEvent);
                await context.SaveChangesAsync();
            }
            catch (OperationCanceledException)
            {
                return false;
            }

            return true;
        }

        public async Task<IEnumerable<EventDto>> GetAllAsync() =>
                await context.Events
                .AsNoTracking()
                .ProjectTo<EventDto>(mapper.ConfigurationProvider)
                .ToListAsync();

        public async Task<EventDto?> GetByIdAsync(int id)
        {
            var neededEvent = await context.Events.FindAsync(id);

            if (neededEvent == null) return null;

            var dto = mapper.Map<EventDto>(neededEvent);

            return dto;
        }
    }
}
