namespace EventPlanner.Services.Implementations
{
    using Data;
    using Contracts;
    using Models;

    using AutoMapper;
    using AutoMapper.QueryableExtensions;

    using Microsoft.EntityFrameworkCore;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class EventService : IEventService
    {
        private readonly EventPlannerDbContext context;

        private readonly IMapper mapper;

        public EventService(EventPlannerDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
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
