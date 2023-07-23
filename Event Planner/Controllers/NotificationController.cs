namespace EventPlanner.Controllers
{
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

        [HttpGet("UnreadCount")]
        public async Task<IActionResult> UnreadNotificationsCount()
        {
            var userId = GetUserId();

            if (userId == null) return Unauthorized();

            var notificationCount = await notificationService.GetUnreadNotificationsCount(userId);

            return Ok(notificationCount);
        }

        [HttpGet("All")]
        public async Task<IActionResult> GetAllAsync()
        {
            var userId = GetUserId();

            if (userId == null) return Unauthorized();

            var notifications = await notificationService.GetAllUserNotificationsAsync(userId);

            return Ok(notifications);
        }

        [HttpPost("MarkSingleAsRead/{id}")]
        public async Task<IActionResult> MarkSingleAsReaded(int id)
        {
            var userId = GetUserId();

            if (userId == null) return Unauthorized();

            var actionSuccess = await notificationService.MarkSingleNotificationAsReaded(id, userId);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }

        [HttpPost("DeleteNotification/{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            if (id <= 0) return BadRequest();

            var actionSuccess = await notificationService.MarkNotificationAsDeleted(id);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }
    }
}
