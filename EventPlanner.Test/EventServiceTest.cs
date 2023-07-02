namespace EventPlanner.Test
{
    using AutoMapper;
    using EventPlanner.Data;
    using EventPlanner.Data.Models;
    using EventPlanner.Services.Contracts;
    using EventPlanner.Services.Implementations;
    using EventPlanner.Services.Models.Event;
    using EventPlanner.Services.Profiles;
    using Microsoft.EntityFrameworkCore;

    public class EventServiceTest
    {
        private IEnumerable<EventDto> eventDtos;

        private IEnumerable<Event> events;

        private EventPlannerDbContext db;

        private IMapper mapper;

        private IEventService eventService;

        [OneTimeSetUp]
        public void Setup()
        {
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
                    Category = "wedding",
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
                    Category = "birthday party",
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
                    Category = "Dance show off",
                    Image = "yeah, yeah img soruce",
                    Location = "Sungulare",
                    Description = "some desc",
                    OrganizerId = "2",
                    Date = new DateTime(2023, 3, 11),
                    Time = "12:13",
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

            var eventDto = new CreateEventDto
            {
                Title = customTitle,
                Date = "22/09/2023",
                Time = "12:23",
                Description = "Description",
                Location = "Location",
                Category = "Category",
                Image = "some img"
            };

            var actual = await eventService.CreateEventAsync(eventDto, organizerId);

            var createdEvent = db.Events.SingleOrDefault(e => e.Title == customTitle);

            Assert.IsTrue(actual);

            Assert.That(createdEvent?.OrganizerId, Is.EqualTo(organizerId));
        }

        [Test]
        public async Task CreateEventReturnsFalseWithInvalidUserId()
        {
            string userId = "";

            var actual = await eventService.CreateEventAsync(new CreateEventDto(), userId);

            var expected = false;

            Assert.IsTrue(actual == expected);
        }
    }
}