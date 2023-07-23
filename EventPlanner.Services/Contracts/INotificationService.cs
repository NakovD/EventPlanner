namespace EventPlanner.Services.Contracts
{
    using Models.Attendee;
    using Models.Event;
    using Models.Notification;

    public interface INotificationService
    {
        Task<bool> CreateNotificationAsync(string userId, NotificationFormDto dto);

        Task<int> GetUnreadNotificationsCount(string userId);

        Task<IEnumerable<NotificationDto>> GetAllUserNotificationsAsync(string userId);

        Task<bool> MarkSingleNotificationAsReaded(int id, string userId);

        Task<bool> CreateEventInviteNotificationAsync(string userId, EventDto eventDto);

        Task<bool> CreateEventUpdateNotificationAsync(string userId, AttendeeDto eventDto);

        Task<bool> MarkNotificationAsDeleted(int id);
    }
}
