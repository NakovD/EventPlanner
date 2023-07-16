namespace EventPlanner.Services.Contracts
{
    using Models.Notification;

    public interface INotificationService
    {
        Task<bool> CreateNotificationAsync(string userId, NotificationFormDto dto);

        Task<int> GetUnreadNotificationsCount(string userId);

        Task<IEnumerable<NotificationDto>> GetAllUserNotificationsAsync(string userId);

        Task<bool> MarkSingleNotificationAsReaded(int id, string userId);
    }
}
