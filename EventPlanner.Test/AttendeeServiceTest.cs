namespace EventPlanner.Test
{
    using Data;
    using Data.Enums;
    using Data.Models;
    using Services.Contracts;
    using Services.Implementations;
    using Services.Models.Attendee;
    using Services.Profiles;

    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Microsoft.EntityFrameworkCore;
    using NUnit.Framework;

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    [TestFixture]
    public class AttendeeServiceTest
    {
        private IEnumerable<Attendee> attendees;

        private EventPlannerDbContext db;

        private IMapper mapper;

        private IAttendeeService attendeeService;

        [SetUp]
        public void Setup()
        {
            SeedAttendees();

            var events = SeedEvents();

            var dbOptions = new DbContextOptionsBuilder<EventPlannerDbContext>()
                .UseInMemoryDatabase(databaseName: "EventPlannerInMemory")
                .Options;

            db = new EventPlannerDbContext(dbOptions);

            var mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<AttendeeProfile>()));
            this.mapper = mapper;

            //Prepare service
            attendeeService = new AttendeeService(db, mapper);

            db.Events.AddRange(events);
            db.Attendees.AddRange(attendees);
            db.SaveChanges();
        }

        [TearDown]
        public void TearDown()
        {
            db.Database.EnsureDeleted();
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
                Status = RSVPStatus.NotResponded
                },
            };

        }

        private IEnumerable<Event> SeedEvents() => new List<Event> {
            new Event
        {
            Id = 1,
            CategoryId = 1,
            Date = DateTime.Now,
            Description = "desc",
            Image = "image",
            Location = "location",
            Time = "12:30",
            Title = "title",
            OrganizerId = "organizer-id"
        },
            new Event
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
            }
        };

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

        [Test]
        public async Task GetExternalAttendeeStatusReturnsCorrectData()
        {
            var attendeeId = 2;

            var result = (RSVPStatus)await attendeeService.GetExternalAttendeeStatusAsync(attendeeId);

            var expected = RSVPStatus.Attending;

            Assert.IsTrue(result == expected);
        }

        [Test]
        public async Task GetExternalAttendeeStatusReturnsCorrectResultWithInvalidAttendeeId()
        {
            var attendeeId = 123912;

            var result = await attendeeService.GetExternalAttendeeStatusAsync(attendeeId);

            var expected = -1;

            Assert.IsTrue(result == expected);
        }

        [Test]
        public async Task UpdateExternalAttendeeStatusUpdatedTheStatusCorrectly()
        {
            var attendeeId = 3;

            var result = await attendeeService.UpdateExternalAttendeeStatusAsync(attendeeId, 2);

            Assert.IsTrue(result);

            var attendee = await db.Attendees.FindAsync(attendeeId);

            var status = attendee.Status;

            Assert.IsTrue(status == RSVPStatus.NotAttending);
        }

        [Test]
        public async Task UpdateExternalAttendeeReturnsFalseWithInvalidAttendeeId()
        {
            var attendeeId = 213123;

            var result = await attendeeService.UpdateExternalAttendeeStatusAsync(attendeeId, 2);

            Assert.IsFalse(result);
        }

        [Test]
        public async Task UpdateExternalAttendeeReturnsFalseIfAttendeeIsAlreadyUpdatedHisStatus()
        {
            var attendeeId = 2;

            var result = await attendeeService.UpdateExternalAttendeeStatusAsync(attendeeId, 3);

            Assert.IsFalse(result);
        }

        [Test]
        public async Task GetByIdAsyncReturnsCorrectAttendee()
        {
            var attendeeId = 1;

            var result = await attendeeService.GetByIdAsync(attendeeId);

            Assert.IsTrue(result.Id! == attendeeId);
        }

        [Test]
        public async Task GetByIdReturnNullWithNonExistentId()
        {
            var result = await attendeeService.GetByIdAsync(1331);

            Assert.IsNull(result);
        }

        [Test]
        public async Task MarkAsDeletedWorksCorrectly()
        {
            var id = 1;

            var userId = "organizer-id";

            var result = await attendeeService.MarkAsDeletedAsync(id, userId);

            Assert.IsTrue(result);

            var actual = db.Attendees.Find(id);

            Assert.IsNotNull(actual);

            Assert.IsTrue(actual.IsDeleted);
        }

        [Test]
        public async Task MarkAsDeletedFailsWithInvalidId()
        {
            var id = 123;

            var result = await attendeeService.MarkAsDeletedAsync(id, "userid");

            Assert.IsFalse(result);
        }

        [Test]
        public async Task MarkAsDeletedFailsIfUserCannotDelete()
        {
            var id = 1;
            var userId = "some invalid user id";

            var result = await attendeeService.MarkAsDeletedAsync(id, userId);

            Assert.IsFalse(result);
        }
    }
}
