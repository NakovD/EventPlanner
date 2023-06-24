namespace EventPlanner.Services.Implementations
{
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Contracts;
    using EventPlanner.Data;
    using EventPlanner.Services.Models;
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

        public async Task<IEnumerable<EventDto>> GetAll()
        {
            var neededEvents = await context.Events
                .AsNoTracking()
                .ProjectTo<EventDto>(mapper.ConfigurationProvider)
                .ToListAsync();

            return neededEvents;
        }
    }
}
