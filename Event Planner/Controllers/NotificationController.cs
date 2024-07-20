namespace EventPlanner.Controllers
{
    using EventPlanner.Common.ActionsConstants;
    using EventPlanner.Services.Contracts;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : BasicController
    {
        private readonly INotificationService notificationService;

        public NotificationController(INotificationService notificationService)
        {
            this.notificationService = notificationService;
        }

        [HttpGet(NotificationActionsConstants.UnreadCount)]
        public async Task<IActionResult> UnreadNotificationsCount()
        {
            var userId = GetUserId();

            if (userId == null) return Unauthorized();

            var notificationCount = await notificationService.GetUnreadNotificationsCount(userId);

            return Ok(notificationCount);
        }

        [HttpGet(NotificationActionsConstants.GetAll)]
        public async Task<IActionResult> GetAllAsync()
        {
            var userId = GetUserId();

            if (userId == null) return Unauthorized();

            var notifications = await notificationService.GetAllUserNotificationsAsync(userId);

            return Ok(notifications);
        }

        [HttpPost(NotificationActionsConstants.MarkAsRead)]
        public async Task<IActionResult> MarkSingleAsReaded(int id)
        {
            var userId = GetUserId();

            if (userId == null) return Unauthorized();

            var actionSuccess = await notificationService.MarkSingleNotificationAsReaded(id, userId);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }

        [HttpPost(NotificationActionsConstants.Delete)]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            if (id <= 0) return BadRequest();

            var actionSuccess = await notificationService.MarkNotificationAsDeleted(id);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }
    }
}
