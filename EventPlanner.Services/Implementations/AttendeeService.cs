﻿namespace EventPlanner.Services.Implementations
{
    using Data;
    using Data.Models;
    using Data.Enums;
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

        public async Task<(bool, int)> CreateAttendeeAsync(AttendeeFormDto dto)
        {
            var neededEvent = await dbContext.Events.FindAsync(dto.EventId);

            if (neededEvent == null) return (false, -1);

            var newAttendee = mapper.Map<Attendee>(dto);

            if (dto.UserId != null && dto.UserId == neededEvent.OrganizerId) return (false, -1);

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
            .Where(a => a.EventId == eventId && !a.IsDeleted)
            .ProjectTo<AttendeeDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        public async Task<AttendeeDto?> GetByIdAsync(int id)
        {
            var neededAttendee = await dbContext.Attendees.FindAsync(id);

            var dto = mapper.Map<AttendeeDto>(neededAttendee);

            return dto;
        }

        public async Task<int> GetExternalAttendeeStatusAsync(int id)
        {
            var neededAttendee = await dbContext.Attendees.FindAsync(id);

            if (neededAttendee == null) return -1;

            return (int)neededAttendee.Status;
        }

        public async Task<bool> MarkAsDeletedAsync(int id, string userId)
        {
            var attendee = await dbContext.Attendees.FindAsync(id);

            if (attendee == null) return false;

            var eventt = await dbContext.Events.FindAsync(attendee.EventId);

            var canDelete = eventt!.OrganizerId == userId;

            if (!canDelete) return false;

            attendee.IsDeleted = true;

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

        public async Task<bool> UpdateAttendeeStatusAsync(int id, int newStatus, string userId)
        {
            var neededAttendee = await dbContext.Attendees.FindAsync(id);

            if (neededAttendee == null) return false;

            var canUpdate = neededAttendee.UserId == userId;

            if (!canUpdate) return false;

            try
            {
                neededAttendee.Status = (RSVPStatus)newStatus;
                await dbContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }

        public async Task<bool> UpdateExternalAttendeeStatusAsync(int id, int newStatus)
        {
            var neededAttendee = await dbContext.Attendees.FindAsync(id);

            if (neededAttendee == null) return false;

            var hasStatusBeenConfirmed = neededAttendee.Status != RSVPStatus.NotResponded;

            if (hasStatusBeenConfirmed) return false;

            try
            {
                neededAttendee.Status = (RSVPStatus)newStatus;
                await dbContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }
    }
}
