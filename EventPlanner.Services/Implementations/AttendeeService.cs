namespace EventPlanner.Services.Implementations
{
    using Data;
    using Data.Models;
    using Models.Attendee;
    using Contracts;

    using System.Threading.Tasks;
    using System.Collections.Generic;

    using AutoMapper.QueryableExtensions;
    using AutoMapper;
    using Microsoft.EntityFrameworkCore;

    public class AttendeeService : IAttendeeService
    {
        private readonly EventPlannerDbContext dbContext;

        private readonly IMapper mapper;

        public AttendeeService(EventPlannerDbContext dbContext, IMapper mapper)
        {
            this.mapper = mapper;
            this.dbContext = dbContext;
        }

        public async Task<(bool, int)> CreateAttendeeAsync(AttendeeFormDto attendeeDto)
        {
            var neededEvent = await dbContext.Events.FindAsync(attendeeDto.EventId);

            if (neededEvent == null) return (false, -1);

            var newAttendee = mapper.Map<Attendee>(attendeeDto);

            try
            {
                await dbContext.Attendees.AddAsync(newAttendee);
                await dbContext.SaveChangesAsync();
            }
            catch (OperationCanceledException)
            {
                return (false, -1);
            }

            return (true, newAttendee.Id);
        }

        public async Task<IEnumerable<AttendeeDto>> GetAllByEventAsync(int eventId) => await dbContext
            .Attendees
            .AsNoTracking()
            .Where(a => a.EventId == eventId)
            .ProjectTo<AttendeeDto>(mapper.ConfigurationProvider)
            .ToListAsync();

    }
}
