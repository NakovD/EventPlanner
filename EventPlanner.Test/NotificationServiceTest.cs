namespace EventPlanner.Test
{
    using EventPlanner.Data.Models;
    using EventPlanner.Data;
    using EventPlanner.Services.Contracts;
    using EventPlanner.Services.Models.Notification;

    using AutoMapper;
    using EventPlanner.Services.Implementations;
    using EventPlanner.Services.Profiles;
    using Microsoft.EntityFrameworkCore;
    using System;
    using EventPlanner.Data.Enums;
    using EventPlanner.Services.Models.Attendee;
    using EventPlanner.Services.Models.Event;

    public class NotificationServiceTest
    {
        private IEnumerable<Notification> notifications;

        private EventPlannerDbContext db;

        private IMapper mapper;

        private INotificationService notificationService;

        [SetUp]
        public void Setup()
        {
            SeedNotifications();

            var dbOptions = new DbContextOptionsBuilder<EventPlannerDbContext>()
                .UseInMemoryDatabase(databaseName: "EventPlannerInMemory")
                .Options;

            db = new EventPlannerDbContext(dbOptions);

            var mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<NotificationProfile>()));
            this.mapper = mapper;

            //Prepare service
            notificationService = new NotificationService(db, mapper);

            //Fill Db
            db.AddRange(notifications);
            db.SaveChanges();
        }

        [TearDown]
        public void TearDown()
        {
            db.Database.EnsureDeleted();
        }

        private void SeedNotifications()
        {
            notifications = new List<Notification>()
            {
                new Notification() {
                    Id = 1,
                    Description = "description",
                    CreatedAt = DateTime.Now.AddMinutes(3),
                    EventId = 1,
                    ReadStatus = false,
                    Type = NotificationType.EventInvite,
                    UserId = "1"
                },
                new Notification() {
                    Id = 2,
                    Description = "description",
                    CreatedAt = DateTime.Now.AddMinutes(1),
                    EventId = 2,
                    ReadStatus = true,
                    Type = NotificationType.EventUpdate,
                    UserId = "1"
                },
                new Notification() {
                    Id = 3,
                    Description = "description",
                    CreatedAt = DateTime.Now.AddMinutes(15),
                    EventId = 3,
                    ReadStatus = false,
                    Type = NotificationType.EventInvite,
                    UserId = "1"
                },
            };
        }

        [Test]
        public async Task CreateNotificationCreatesNotification()
        {
            var expected = new Notification()
            {
                Description = "description",
                CreatedAt = DateTime.Now.AddMinutes(3),
                EventId = 1,
                ReadStatus = false,
                Type = NotificationType.EventInvite,
                UserId = "1"
            };

            var result = await notificationService.CreateNotificationAsync("1", new NotificationFormDto
            {
                EventId = expected.EventId,
                Description = expected.Description,
                Type = (int)expected.Type,
            });

            Assert.IsTrue(result);

            var createdNotification = await db.Notifications.FindAsync(1);

            Assert.IsNotNull(createdNotification);

            Assert.IsTrue(expected.Description == createdNotification.Description);
            Assert.IsTrue(expected.EventId == createdNotification.EventId);
            Assert.IsTrue(expected.UserId == createdNotification.UserId);
            Assert.IsTrue(expected.ReadStatus == createdNotification.ReadStatus);
            Assert.IsTrue(expected.Type == createdNotification.Type);
        }

        [Test]
        public async Task GetAllUserNotificationsReturnsCorrect()
        {
            var userId = "1";

            var expected = await notificationService.GetAllUserNotificationsAsync(userId);

            var actual = await db.Notifications.CountAsync();

            Assert.IsTrue(expected.Count() == actual);
        }

        [Test]
        public async Task GetUnreadNotificationsCountReturnsCorrectResult()
        {
            var userId = "1";

            var result = await notificationService.GetUnreadNotificationsCount(userId);

            var expected = await db.Notifications.AsNoTracking().Where(n => n.UserId == userId && n.ReadStatus == false).CountAsync();

            Assert.IsTrue(result == expected);
        }

        [Test]
        public async Task GetUnreadNotificationsCountReturnsZeroWithInvalidUserId()
        {
            var userId = "15";

            var result = await notificationService.GetUnreadNotificationsCount(userId);

            var expected = 0;

            Assert.IsTrue(result == expected);
        }

        [Test]
        public async Task MarkNotificationAsReadedWorksCorrectly()
        {
            var userId = "1";

            var notificationId = 1;

            var result = await notificationService.MarkSingleNotificationAsReaded(1, userId);

            Assert.IsTrue(result);

            var notification = await db.Notifications.FindAsync(notificationId);

            Assert.IsNotNull(notification);

            Assert.IsTrue(notification.ReadStatus);
        }

        [Test]
        public async Task MarkNotificationReturnsFalseWithInvalidId()
        {
            var notificationId = 501;

            var result = await notificationService.MarkSingleNotificationAsReaded(notificationId, "1");

            Assert.IsFalse(result);
        }

        [Test]
        public async Task MarkNotificationFailsIfUserCannotUpdateTheNotification()
        {
            var userId = "15";

            var result = await notificationService.MarkSingleNotificationAsReaded(1, userId);

            Assert.IsFalse(result);
        }

        [Test]
        public async Task MarkNotificationAsDeletedMarksNotificationAsDeleted()
        {
            var notificationId = 1;

            var result = await notificationService.MarkNotificationAsDeleted(notificationId);


            var expected = await db.Notifications.FindAsync(notificationId);

            Assert.IsNotNull(expected);

            Assert.IsTrue(result);

            Assert.IsTrue(expected.IsDeleted);
        }

        [Test]
        public async Task MarkNotificationAsDeletedReturnsFalseWithInvalidId()
        {
            var notificationid = 123;

            var result = await notificationService.MarkNotificationAsDeleted(notificationid);

            Assert.IsFalse(result);
        }

        [Test]
        public async Task CreateEventUpdateNotificationCreatesEventUpdateNotification()
        {
            var result = await notificationService.CreateEventUpdateNotificationAsync("1", new AttendeeDto { EventId = 1, Name = "Some Name", Status = "status" });

            var expected = await db.Notifications.LastAsync();

            Assert.IsTrue(result);

            Assert.IsNotNull(expected);

            Assert.IsTrue(expected.Type == NotificationType.EventUpdate);
        }

        [Test]
        public async Task CreateEventInviteNotificationCreatesEventInviteNotification()
        {
            var result = await notificationService.CreateEventInviteNotificationAsync("1", new EventDto { Id = 1, Title = "Hello" });

            var expected = await db.Notifications.LastAsync();

            Assert.IsTrue(result);

            Assert.IsNotNull(expected);

            Assert.IsTrue(expected.Type == NotificationType.EventInvite);
        }
    }
}
