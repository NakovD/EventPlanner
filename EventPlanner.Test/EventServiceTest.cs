namespace EventPlanner.Test
{
    using Data;
    using Data.Models;
    using static Services.Common.Formats.EventFormats;
    using Services.Contracts;
    using Services.Implementations;
    using Services.Models.Event;
    using Services.Profiles;

    using AutoMapper;

    using Microsoft.EntityFrameworkCore;
    using System.Globalization;
    using AutoMapper.QueryableExtensions;

    [TestFixture]
    public class EventServiceTest
    {
        private IEnumerable<EventDto> eventDtos;

        private IEnumerable<Event> events;

        private IEnumerable<Category> categories;

        private EventPlannerDbContext db;

        private IMapper mapper;

        private IEventService eventService;

        [OneTimeSetUp]
        public void Setup()
        {
            SeedCategories();

            SeedEventDtos();

            SeedEvents();

            var dbOptions = new DbContextOptionsBuilder<EventPlannerDbContext>()
                .UseInMemoryDatabase(databaseName: "EventPlannerInMemory")
                .Options;

            db = new EventPlannerDbContext(dbOptions);

            var mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<EventProfile>()));
            this.mapper = mapper;

            //Prepare service
            eventService = new EventService(db, mapper);

            //Fill Db
            db.AddRange(events);
            db.Categories.AddRange(categories);
            db.SaveChanges();

        }

        private void SeedEventDtos()
        {
            eventDtos = new List<EventDto>
            {
                new EventDto
                {
                    Id = 1,
                    Title = "First event",
                    Category = "wedding",
                    Description = "some desc",
                    Image = "some img soruce",
                    Location = "Sliven",
                    Time = "12:23",
                },
                new EventDto
                {
                    Id = 2,
                    Title = "Second event",
                    Category = "birthday party",
                    Image = "another img soruce",
                    Location = "Pernik",
                    Time = "12:21",
                },
                new EventDto
                {
                    Id = 3,
                    Title = "Third event",
                    Category = "Dance show off",
                    Description = "some desc",
                    Image = "yeah, yeah img soruce",
                    Location = "Sungulare",
                    Time = "12:13",
                }
            };
        }

        private void SeedEvents()
        {
            events = new List<Event>
            {
                    new Event
                {
                    Id = 1,
                    Title = "First event",
                    CategoryId = 1,
                    Image = "some img soruce",
                    Location = "Sliven",
                    Description = "some desc",
                    OrganizerId = "2",
                    Date = new DateTime(2023, 12, 11),
                    Time = "12:23",
                },
                new Event
                {
                    Id = 2,
                    Title = "Second event",
                    CategoryId = 2,
                    Image = "another img soruce",
                    Location = "Pernik",
                    Description = "some desc",
                    OrganizerId = "1",
                    Date = new DateTime(2023, 3, 11),
                    Time = "12:21",
                },
                new Event
                {
                    Id = 3,
                    Title = "Third event",
                    CategoryId = 3,
                    Image = "yeah, yeah img soruce",
                    Location = "Sungulare",
                    Description = "some desc",
                    OrganizerId = "2",
                    Date = new DateTime(2023, 3, 11),
                    Time = "12:13",
                }
            };
        }

        private void SeedCategories()
        {
            categories = new List<Category>() {
                new Category
                {
                    Id = 1,
                    Name = "First Category",
                    LastUpdated = DateTime.Now,
                },
                new Category
                {
                    Id = 2,
                    Name = "Second Category",
                    LastUpdated = DateTime.Now,
                },
                new Category
                {
                    Id = 3,
                    Name = "Third Category",
                    LastUpdated = DateTime.Now,
                }
            };
        }

        [Test]
        public async Task GetAllReturnsCorrectData()
        {

            var result = await eventService.GetAllAsync();

            Assert.That(result.Count(), Is.EqualTo(db.Events.Count()));
        }

        [Test]
        public async Task GetByIdAsyncReturnsCorrectData()
        {
            var id = 1;

            var result = await eventService.GetByIdAsync(id);

            var expected = eventDtos.SingleOrDefault(e => e.Id == id);

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

            var expected = await db.Events.Where(e => e.OrganizerId == userId)
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
    }
}