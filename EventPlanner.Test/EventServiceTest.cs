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
    using Moq;

    public class EventServiceTest
    {
        private IEnumerable<EventDto> eventDtos;

        private IEnumerable<Event> events;

        private EventPlannerDbContext db;

        private IMapper mapper;

        private IEventService eventService;

        [SetUp]
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
                    Image = "some img soruce",
                    Location = "Sliven",
                    Time = "04:12:00",
                },
                new EventDto
                {
                    Id = 2,
                    Title = "Second event",
                    Category = "birthday party",
                    Image = "another img soruce",
                    Location = "Pernik",
                    Time = "02:43:00",
                },
                new EventDto
                {
                    Id = 3,
                    Title = "Third event",
                    Category = "Dance show off",
                    Image = "yeah, yeah img soruce",
                    Location = "Sungulare",
                    Time = "12:57:00",
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
            eventService = new EventService(db, mapper);

            var result = await eventService.GetAllAsync();

            Assert.That(result.Count(), Is.EqualTo(eventDtos.Count()));
        }
    }
}