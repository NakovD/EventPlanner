namespace EventPlanner.Test
{
    using Data;
    using Data.Models;
    using static Services.Common.Formats.DateFormats;
    using Services.Contracts;
    using Services.Implementations;
    using Services.Models.Event;
    using Services.Profiles;

    using AutoMapper;

    using Microsoft.EntityFrameworkCore;
    using System.Globalization;
    using AutoMapper.QueryableExtensions;
    using EventPlanner.Services.Queries.Event;

    [TestFixture]
    public class EventServiceTest
    {
        private IEnumerable<Event> events;

        private IEnumerable<Category> categories;

        private EventPlannerDbContext db;

        private IMapper mapper;

        private IEventService eventService;

        [SetUp]
        public void Setup()
        {
            SeedCategories();

            SeedEvents();

            var dbOptions = new DbContextOptionsBuilder<EventPlannerDbContext>()
                .UseInMemoryDatabase(databaseName: "EventPlannerInMemory")
                .Options;

            db = new EventPlannerDbContext(dbOptions);

            var mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<EventProfile>()));
            this.mapper = mapper;

            //Prepare service
            eventService = new EventService(db, mapper);

            SeedUsers(db);

            //Fill Db
            db.AddRange(events);
            db.Categories.AddRange(categories);
            db.SaveChanges();
        }

        [TearDown]
        public void Teardown()
        {
            db.Database.EnsureDeleted();
        }

        private void SeedEvents()
        {
            events = new List<Event>
            {
                new Event
                {
                    Id = 1,
                    Title = "First event",
                    CategoryId = 10,
                    Image = "some img soruce",
                    Location = "Sliven",
                    Description = "some desc",
                    OrganizerId = "2",
                    Date = new DateTime(2023, 12, 11),
                    Time = "12:23",
                    Attendees = new List<Attendee>(),
                },
                new Event
                {
                    Id = 2,
                    Title = "Second event",
                    CategoryId = 20,
                    Image = "another img soruce",
                    Location = "Pernik",
                    Description = "some desc",
                    OrganizerId = "1",
                    Date = new DateTime(2023, 3, 11),
                    Time = "12:21",
                    IsDeleted = true,
                    Attendees = new List<Attendee>(),
                },
                new Event
                {
                    Id = 3,
                    Title = "Third event",
                    CategoryId = 30,
                    Image = "yeah, yeah img soruce",
                    Location = "Sungulare",
                    Description = "some desc",
                    OrganizerId = "2",
                    Date = new DateTime(2023, 3, 11),
                    Time = "12:13",
                    Attendees = new List<Attendee>(),
                }
            };
        }

        private void SeedUsers(EventPlannerDbContext db)
        {
            db.Users.AddRange(new List<User>
            {
                new User
                {
                    Id = "1",
                    UserName = "Pesho"
                },
                    new User {
                        Id = "2",
                        UserName = "Gosho"
                    }
                ,new User
                {
                    Id = "3", UserName = "Tosho"
                }
            });
        }

        private void SeedCategories()
        {
            categories = new List<Category>() {
                new Category
                {
                    Id = 10,
                    Name = "First Category",
                    LastUpdated = DateTime.Now,
                },
                new Category
                {
                    Id = 20,
                    Name = "Second Category",
                    LastUpdated = DateTime.Now,
                },
                new Category
                {
                    Id = 30,
                    Name = "Third Category",
                    LastUpdated = DateTime.Now,
                }
            };
        }

        [Test]
        public async Task GetAllReturnsCorrectData()
        {
            var query = new AllEventsQuery();

            var result = await eventService.GetAllAsync(query);

            var expected = db.Events.Where(e => !e.IsDeleted);

            Assert.That(result.Count(), Is.EqualTo(expected.Count()));
        }

        [Test]
        public async Task GetByIdAsyncReturnsCorrectData()
        {
            var id = 1;

            var result = await eventService.GetByIdAsync(id);

            var expected = db.Events.Find(id);

            Assert.That(result?.Id, Is.EqualTo(expected?.Id));
        }

        [Test]
        public async Task GetByIdAsyncReturnsNullWithInvalidId()
        {
            var id = 0;

            var result = await eventService.GetByIdAsync(id);

            EventDto expected = null;

            Assert.IsTrue(result == expected);
        }

        [Test]
        public async Task CreateEventCreatesCorrectEvent()
        {
            var organizerId = "userId";
            var customTitle = "Very custom title";

            var eventDto = new EventFormDto
            {
                Title = customTitle,
                Date = "22/09/2023",
                Time = "12:23",
                Description = "Description",
                Location = "Location",
                CategoryId = 1,
                Image = "some img"
            };

            var actual = await eventService.CreateEventAsync(eventDto, organizerId);

            var createdEvent = db.Events.SingleOrDefault(e => e.Title == customTitle);

            Assert.IsTrue(actual);

            Assert.That(createdEvent?.OrganizerId, Is.EqualTo(organizerId));
        }

        [Test]
        [TestCase("")]
        [TestCase(null)]
        public async Task CreateEventReturnsFalseWithInvalidUserId(string? userId)
        {
            var actual = await eventService.CreateEventAsync(new EventFormDto(), userId);

            var expected = false;

            Assert.IsTrue(actual == expected);
        }

        [Test]
        public async Task EditEventEditsTheEventCorrectly()
        {
            var eventId = 1;

            var updatedEvent = new EventFormDto
            {
                Title = "This Very new title",
                Description = "The updated description",
                Time = "12:43",
                Date = "12/10/2023",
                Location = "Kri4im",
                CategoryId = 1,
                Image = "the best new image"
            };

            var actual = await eventService.UpdateEventAsync(updatedEvent, eventId);

            var expected = await db.Events.SingleAsync(e => e.Id == eventId);

            Assert.IsTrue(actual);

            Assert.IsTrue(eventId == expected.Id);
            Assert.IsTrue(updatedEvent.Title == expected.Title);
            Assert.IsTrue(updatedEvent.Description == expected.Description);
            Assert.IsTrue(updatedEvent.Time == expected.Time);
            Assert.IsTrue(updatedEvent.Date == expected.Date.ToString(DateFormat, CultureInfo.InvariantCulture));
            Assert.IsTrue(updatedEvent.Location == expected.Location);
            Assert.IsTrue(updatedEvent.CategoryId == expected.CategoryId);
            Assert.IsTrue(updatedEvent.Image == expected.Image);
        }

        [Test]
        [TestCase(-1)]
        [TestCase(0)]
        [TestCase(500)]
        public async Task EditEventReturnsFalseWithInvalidEventId(int eventId)
        {
            var expected = await eventService.UpdateEventAsync(new EventFormDto(), eventId);

            Assert.IsFalse(expected);
        }

        [Test]
        [TestCase("1")]
        [TestCase("2")]
        public async Task GetUserEventsReturnsTheEventsOfTheUser(string userId)
        {
            var actual = await eventService.GetUserEventsAsync(userId);

            var expected = await db.Events.Where(e => e.OrganizerId == userId && !e.IsDeleted)
                .ProjectTo<EventDto>(mapper.ConfigurationProvider).ToListAsync();

            var actualIds = actual.Select(e => e.Id).ToList();

            var expectedIs = expected.Select(e => e.Id).ToList();

            Assert.IsTrue(actual.Count() == expected.Count());

            CollectionAssert.AreEquivalent(actualIds, expectedIs);
        }

        [Test]
        [TestCase(null)]
        [TestCase("")]
        public async Task GetUserEventsReturnsNullWithInvalidUserId(string? userId)
        {
            var expected = await eventService.GetUserEventsAsync(userId);

            Assert.IsNull(expected);
        }

        [Test]
        public async Task GetEventCreatorIDReturnsCorrectData()
        {
            var expected = "2";

            var result = await eventService.GetEventCreatorIdAsync(1);

            Assert.IsTrue(expected == result);
        }

        [Test]
        public async Task GetEventOrganizerIdReturnsEmptyStringWithInvalidId()
        {
            var expected = string.Empty;

            var result = await eventService.GetEventCreatorIdAsync(123);

            Assert.IsTrue(expected == result);
        }

        [Test]
        public async Task MarkAsDeletedWorksCorrectly()
        {
            var eventId = 1;

            var result = await eventService.MarkAsDeletedAsync(eventId);

            Assert.IsTrue(result);

            var neededEvent = db.Events.Find(eventId);

            Assert.IsTrue(neededEvent!.IsDeleted);
        }

        [Test]
        public async Task MarkAsDeletedReturnsFalseWithInvalidEvent()
        {
            var eventId = 100;

            var result = await eventService.MarkAsDeletedAsync(eventId);

            Assert.IsFalse(result);
        }

        [Test]
        public async Task UnmarkAsDeletedWorksCorrectly()
        {
            var eventId = 2;

            var result = await eventService.UnmarkAsDeletedAsync(eventId);

            Assert.IsTrue(result);

            var actual = db.Events.Find(eventId);

            Assert.IsFalse(actual.IsDeleted);
        }

        [Test]
        public async Task UnmarkAsDeletedReturnsFalseWithInvalidId()
        {
            var eventId = 13123;

            var result = await eventService.UnmarkAsDeletedAsync(eventId);

            Assert.IsFalse(result);
        }

        [Test]
        public async Task Someth()
        {
            var result = await eventService.GetAllAdministrationAsync();

            var actual = db.Events.AsNoTracking();

            Assert.IsTrue(result.Count() == actual.Count());
        }
    }
}