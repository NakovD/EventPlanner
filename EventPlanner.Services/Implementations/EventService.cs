namespace EventPlanner.Services.Implementations
{
    using Data;
    using Contracts;
    using Models.Event;

    using AutoMapper;
    using AutoMapper.QueryableExtensions;

    using Microsoft.EntityFrameworkCore;

    using System.Collections.Generic;
    using System.Threading.Tasks;
    using EventPlanner.Data.Models;

    public class EventService : IEventService
    {
        private readonly EventPlannerDbContext context;

        private readonly IMapper mapper;

        public EventService(EventPlannerDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<bool> CreateEventAsync(CreateEventDto eventDto)
        {
            var newEvent = new Event
            {
                Title = eventDto.Title,
                Description = eventDto.Description,
                Time = eventDto.Time,
                Date = eventDto.Date,
                Category = eventDto.Category,
                Image = eventDto.Image,
                Location = eventDto.Location,
            };

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
