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

    public class NotificationServiceTest
    {
        private IEnumerable<NotificationDto> notificationDtos;

        private IEnumerable<Notification> notifications;

        private EventPlannerDbContext db;

        private IMapper mapper;

        private INotificationService notificationService;

        [OneTimeSetUp]
        public void Setup()
        {
            SeedNotifications();

            SeedNotificationDtos();

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

        private void SeedNotificationDtos()
        {
            notificationDtos = new List<NotificationDto>()
            {
                new NotificationDto() {
                    Id = 1,
                    CreatedAt = DateTime.Now.AddDays(3).ToString(),
                    Description = "Very fun description",
                    EventId = 2,
                    IsReaded = false,
                    Type = (int)NotificationType.EventInvite,
                },
                new NotificationDto() {
                    Id = 1,
                    CreatedAt = DateTime.Now.AddDays(2).ToString(),
                    Description = "Very fun description",
                    EventId = 3,
                    IsReaded = false,
                    Type = (int)NotificationType.EventInvite,
                },
                new NotificationDto() {
                    Id = 1,
                    CreatedAt = DateTime.Now.AddDays(1).ToString(),
                    Description = "Very fun description",
                    EventId = 1,
                    IsReaded = true,
                    Type = (int)NotificationType.EventInvite,
                }
            };
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
                Id = 4,
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

            var createdNotification = await db.Notifications.FindAsync(expected.Id);

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
    }
}
