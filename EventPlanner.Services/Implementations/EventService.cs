namespace EventPlanner.Services.Implementations
{
    using Data;
    using Contracts;
    using Models.Event;
    using Data.Models;
    using static Common.Formats.EventFormats;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    using AutoMapper;
    using AutoMapper.QueryableExtensions;

    using Microsoft.EntityFrameworkCore;
    using System.Globalization;

    public class EventService : IEventService
    {
        private readonly EventPlannerDbContext context;

        private readonly IMapper mapper;

        public EventService(EventPlannerDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<bool> CreateEventAsync(EventFormDto eventDto, string? userId)
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

        public async Task<bool> UpdateEventAsync(EventFormDto eventDto, int eventId)
        {
            var neededEvent = await context.Events.FindAsync(eventId);

            if (neededEvent == null) return false;

            neededEvent.Title = eventDto.Title;
            neededEvent.Description = eventDto.Description;
            neededEvent.Location = eventDto.Location;
            neededEvent.Category = eventDto.Category;
            neededEvent.Date = DateTime.ParseExact(eventDto.Date, DateFormat, CultureInfo.InvariantCulture);
            neededEvent.Time = eventDto.Time;
            neededEvent.Image = eventDto.Image;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (OperationCanceledException)
            {
                return false;
            }

            return true;
        }
    }
}
