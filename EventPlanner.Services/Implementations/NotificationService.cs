namespace EventPlanner.Services.Implementations
{
    using Contracts;
    using Data;
    using Models.Notification;
    using Data.Models;

    using AutoMapper;

    using System.Threading.Tasks;
    using EventPlanner.Data.Enums;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using AutoMapper.QueryableExtensions;

    public class NotificationService : INotificationService
    {
        private readonly EventPlannerDbContext dbContext;

        private readonly IMapper mapper;

        public NotificationService(EventPlannerDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<bool> CreateNotificationAsync(string userId, NotificationFormDto dto)
        {
            var notification = new Notification()
            {
                UserId = userId,
                CreatedAt = DateTime.Now,
                Description = dto.Description,
                EventId = dto.EventId,
                ReadStatus = false,
                Type = (NotificationType)dto.Type,
            };

            try
            {
                await dbContext.Notifications.AddAsync(notification);
                await dbContext.SaveChangesAsync();
            }
            catch (OperationCanceledException)
            {
                return false;
            }

            return true;
        }

        public async Task<IEnumerable<NotificationDto>> GetAllUserNotificationsAsync(string userId)
        {
            var allUserNotifications = await dbContext.Notifications
                .AsNoTracking()
                .Where(n => n.UserId == userId)
                .ProjectTo<NotificationDto>(mapper.ConfigurationProvider)
                .ToListAsync();

            return allUserNotifications;
        }

        public async Task<int> GetUnreadNotificationsCount(string userId) => await dbContext.Notifications
                .AsNoTracking()
                .CountAsync(n => n.UserId == userId && n.ReadStatus == false);

        public async Task<bool> MarkSingleNotificationAsReaded(int id, string userId)
        {
            var neededNotification = await dbContext.Notifications.FindAsync(id);

            if (neededNotification == null) return false;

            var canUpdate = neededNotification.UserId == userId;

            if (!canUpdate) return false;

            neededNotification.ReadStatus = true;

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
    }
}
