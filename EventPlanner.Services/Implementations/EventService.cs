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
    using EventPlanner.Services.Queries.Event;
    using EventPlanner.Services.Queries.Enums;
    using System.Linq;

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

        public async Task<IEnumerable<EventAdministrationDto>> GetAllAdministrationAsync() => await dbContext.Events
                .AsNoTracking()
                .Include(e => e.Organizer)
                .Include(e => e.Category)
                .ProjectTo<EventAdministrationDto>(mapper.ConfigurationProvider)
                .ToListAsync();

        public async Task<IEnumerable<EventDto>> GetAllAsync(AllEventsQuery query)
        {
            var filtered = dbContext.Events
                .AsNoTracking()
                .Include(e => e.Category)
                .Where(e => !e.IsDeleted)
                .Where(e => e.Title.Contains(query.SearchString!) || e.Location.Contains(query.SearchString) || e.Description.Contains(query.SearchString))
                .AsQueryable();

            var filteredByCategory = FilteredByCategory( filtered, query.CategoryId);

            var sorted = GetSortedEvents(filteredByCategory, query.SortDirection);

            return await sorted.
                ProjectTo<EventDto>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        private IQueryable<Event> FilteredByCategory(IQueryable<Event> events, int? categoryId)
        {
            if (categoryId == null) return events;
            return events.Where(e => e.CategoryId == categoryId);
        }

        private bool GetCategoryFilter(int? categoryidFilter, int categoryId) => categoryidFilter == null ? categoryId > 0 : categoryidFilter == categoryId;

        private IQueryable<Event> GetSortedEvents(IQueryable<Event> filtered, EventTitleSortType sortDirection)
        {
            if (sortDirection == EventTitleSortType.Ascending) return filtered.OrderBy(e => e.Title);

            return filtered.OrderByDescending(e => e.Title);
        }

        public async Task<EventDto?> GetByIdAsync(int id)
        {
            var neededEvent = await dbContext.Events
                .Include(e => e.Category)
                .SingleOrDefaultAsync(e => e.Id == id);

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
                .Where(e => e.OrganizerId == userId && !e.IsDeleted)
                .ProjectTo<EventDto>(mapper.ConfigurationProvider)
                .ToListAsync();

            return userEvents;
        }

        public async Task<bool> MarkAsDeletedAsync(int eventId)
        {
            var neededEvent = await dbContext.Events.FindAsync(eventId);

            if (neededEvent == null) return false;

            neededEvent.IsDeleted = true;

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

        public async Task<bool> UnmarkAsDeletedAsync(int eventId)
        {
            var neededEvent = await dbContext.Events.FindAsync(eventId);

            if (neededEvent == null) return false;

            neededEvent.IsDeleted = false;

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
