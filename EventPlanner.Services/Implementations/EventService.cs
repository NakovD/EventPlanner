namespace EventPlanner.Services.Implementations
{
    using Data;
    using Contracts;
    using Models.Event;
    using Data.Models;
    using static Common.Formats.DateFormats;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    using AutoMapper;
    using AutoMapper.QueryableExtensions;

    using Microsoft.EntityFrameworkCore;
    using System.Globalization;

    public class EventService : IEventService
    {
        private readonly EventPlannerDbContext dbContext;

        private readonly IMapper mapper;

        public EventService(EventPlannerDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
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
                await dbContext.Events.AddAsync(newEvent);
                await dbContext.SaveChangesAsync();
            }
            catch (OperationCanceledException)
            {
                return false;
            }

            return true;
        }

        public async Task<IEnumerable<EventDto>> GetAllAsync() =>
                await dbContext.Events
                .AsNoTracking()
                .Include(e => e.Category)
                .ProjectTo<EventDto>(mapper.ConfigurationProvider)
                .ToListAsync();

        public async Task<EventDto?> GetByIdAsync(int id)
        {
            var neededEvent = await dbContext.Events.FindAsync(id);

            if (neededEvent == null) return null;

            var dto = mapper.Map<EventDto>(neededEvent);

            return dto;
        }

        public async Task<string> GetEventCreatorIdAsync(int eventId)
        {
            var _event = await dbContext.Events.FindAsync(eventId);

            if (_event == null) return string.Empty;

            return _event.OrganizerId;
        }

        public async Task<IEnumerable<EventDto>?> GetUserEventsAsync(string? userId)
        {
            var isUserIdValid = !string.IsNullOrEmpty(userId);

            if (!isUserIdValid) return null;

            var userEvents = await dbContext.Events
                .AsNoTracking()
                .Where(e => e.OrganizerId == userId)
                .ProjectTo<EventDto>(mapper.ConfigurationProvider)
                .ToListAsync();

            return userEvents;
        }

        public async Task<bool> UpdateEventAsync(EventFormDto eventDto, int eventId)
        {
            var neededEvent = await dbContext.Events.FindAsync(eventId);

            if (neededEvent == null) return false;

            neededEvent.Title = eventDto.Title;
            neededEvent.Description = eventDto.Description;
            neededEvent.Location = eventDto.Location;
            neededEvent.CategoryId = eventDto.CategoryId;
            neededEvent.Date = DateTime.ParseExact(eventDto.Date, DateFormat, CultureInfo.InvariantCulture);
            neededEvent.Time = eventDto.Time;
            neededEvent.Image = eventDto.Image;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (OperationCanceledException)
            {
                return false;
            }

            return true;
        }
    }
}
