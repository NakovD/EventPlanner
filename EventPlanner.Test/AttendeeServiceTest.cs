namespace EventPlanner.Test
{
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using EventPlanner.Data;
    using EventPlanner.Data.Enums;
    using EventPlanner.Data.Models;
    using EventPlanner.Services.Contracts;
    using EventPlanner.Services.Implementations;
    using EventPlanner.Services.Models.Attendee;
    using EventPlanner.Services.Profiles;
    using Microsoft.EntityFrameworkCore;
    using Moq;
    using NUnit.Framework;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    [TestFixture]
    public class AttendeeServiceTest
    {
        private IEnumerable<Attendee> attendees;

        private IEnumerable<AttendeeDto> attendeeDtos;

        private EventPlannerDbContext db;

        private IMapper mapper;

        private IAttendeeService attendeeService;

        [OneTimeSetUp]
        public void OneTimeSetup()
        {
            SeedAttendeeDtos();

            SeedAttendees();

            var dbOptions = new DbContextOptionsBuilder<EventPlannerDbContext>()
                .UseInMemoryDatabase(databaseName: "EventPlannerInMemory")
                .Options;

            db = new EventPlannerDbContext(dbOptions);

            var mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<AttendeeProfile>()));
            this.mapper = mapper;

            //Prepare service
            attendeeService = new AttendeeService(db, mapper);

            var eventt = new Event
            {
                Id = 50,
                CategoryId = 1,
                Date = DateTime.Now,
                Title = "Title",
                Description = "Description",
                Image = "image:url",
                Time = "12:30",
                OrganizerId = "1",
                Location = "Sliven"
            };

            db.Events.Add(eventt);
            db.Attendees.AddRange(attendees);
            db.SaveChanges();
        }

        private void SeedAttendees()
        {
            attendees = new List<Attendee>
            {
                new Attendee
                {
                Id = 1,
                UserId = "user-id",
                Email = "some@email.bg",
                EventId = 1,
                Name = "Milana",
                Status = RSVPStatus.NotResponded
                },
                new Attendee
                {
                Id = 2,
                Email = "silviq@email.bg",
                EventId = 2,
                Name = "Silviq",
                Status = RSVPStatus.Attending
                },
                new Attendee
                {
                Id = 3,
                Email = "Hristina@email.bg",
                EventId = 3,
                Name = "Hristina",
                Status = RSVPStatus.NotAttending
                },
            };

        }

        private void SeedAttendeeDtos()
        {
            attendeeDtos = new List<AttendeeDto>
            {
                new AttendeeDto
                {
                Id = 1,
                EventId = 1,
                Name = "Milana",
                Status = RSVPStatus.NotResponded.ToString()
                },
                new AttendeeDto
                {
                Id = 2,
                EventId = 2,
                Name = "Silviq",
                Status = RSVPStatus.Attending.ToString()
                },
                new AttendeeDto
                {
                Id = 3,
                EventId = 3,
                Name = "Hristina",
                Status = RSVPStatus.NotAttending.ToString()
                },
            };
        }

        [Test]
        public async Task GetAllReturnsValidCollection()
        {
            var eventId = 1;

            var actual = await attendeeService.GetAllByEventAsync(eventId);

            var expected = await db.Attendees
                .Where(a => a.EventId == eventId)
                .ProjectTo<AttendeeDto>(mapper.ConfigurationProvider)
                .ToListAsync();

            Assert.IsTrue(actual.Count() == expected.Count());
        }

        [Test]
        public async Task CreateCreatesAttendeeForCorrectEvent()
        {
            var eventId = 50;
            var name = "Test";

            var (isSuccess, _) = await attendeeService.CreateAttendeeAsync(new AttendeeFormDto
            {
                Email = "some@email.bg",
                Name = name,
                EventId = eventId,
            });

            Assert.IsTrue(isSuccess);

            var addedAttendee = await db.Attendees
                .AsNoTracking()
                .SingleAsync(a => a.Name == name);

            Assert.IsTrue(addedAttendee.EventId == eventId);
        }

        [Test]
        public async Task CreateReturnsFalseWithInvalidEventId()
        {
            var (isSuccess, _) = await attendeeService.CreateAttendeeAsync(new AttendeeFormDto { EventId = -1 });

            Assert.IsFalse(isSuccess);
        }

        [Test]
        [TestCase(0)]
        [TestCase(1)]
        [TestCase(2)]
        [TestCase(3)]
        public async Task UpdateAttendeeStatusReturnTrueWithValidStatus(int status)
        {
            var attendeeId = 1;
            var userId = "user-id";

            var isSuccess = await attendeeService.UpdateAttendeeStatusAsync(attendeeId, status, userId);

            var attendee = await db.Attendees.FindAsync(attendeeId);
            var userActualStatus = attendee!.Status;

            Assert.IsTrue(isSuccess);

            Assert.IsTrue((RSVPStatus)status == userActualStatus);
        }

        [Test]
        public async Task UpdateAttendeeStatusReturnsFalseWithInvalidAttendee()
        {
            var isSuccess = await attendeeService.UpdateAttendeeStatusAsync(-1, 1, "user-id");

            Assert.IsFalse(isSuccess);
        }

        [Test]
        public async Task UpdateAttendeeStatusReturnsFalseIfTheUserIsNotTheAttendee()
        {
            var isSuccess = await attendeeService.UpdateAttendeeStatusAsync(2, 1, "user-id");

            Assert.IsFalse(isSuccess);
        }
    }
}
