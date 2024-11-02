using EventPlanner.Common;

namespace EventPlanner.Controllers
{
    using Services.Contracts;
    using Services.Models.Attendee;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using EventPlanner.Common.ActionsConstants;

    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AttendeeController : BasicController
    {
        private readonly IAttendeeService attendeeService;

        private readonly IEventService eventService;

        private readonly ILinkService linkService;

        private readonly IJsonService jsonService;

        private readonly IEmailService emailService;

        private readonly INotificationService notificationService;

        public AttendeeController(IAttendeeService attendeeService, IEventService eventService, ILinkService linkService, IJsonService jsonService, IEmailService emailService, INotificationService notificationService)
        {
            this.attendeeService = attendeeService;
            this.eventService = eventService;
            this.linkService = linkService;
            this.jsonService = jsonService;
            this.emailService = emailService;
            this.notificationService = notificationService;
        }

        [AllowAnonymous]
        [HttpGet(AttendeeActionsConstants.GetAllByEventId)]
        public async Task<IActionResult> GetAllByEventId(int id)
        {
            if (id <= 0) return BadRequest();

            var result = await attendeeService.GetAllByEventAsync(id);

            return Ok(result);
        }

        [HttpPost(AttendeeActionsConstants.Create)]
        public async Task<IActionResult> CreateAttendee([FromBody] AttendeeFormDto attendeeFormDto)
        {
            var isModelValid = ModelState.IsValid;

            if (!isModelValid) return BadRequest();

            var (actionSuccess, attendeeId) = await attendeeService.CreateAttendeeAsync(attendeeFormDto);

            if (!actionSuccess) return BadRequest();

            var neededEvent = await eventService.GetByIdAsync(attendeeFormDto.EventId);

            var isExternal = attendeeFormDto.UserId == null;

            if (isExternal) {
                var (isSuccess, linkId) = await this.linkService.CreateAsync(attendeeId, DateTime.Parse(neededEvent!.Date));

                if (!isSuccess) return this.StatusCode(500);

                await emailService.SendEmailInviteAsync(attendeeFormDto.Email, attendeeFormDto.Name, neededEvent!.Title, attendeeFormDto.EmailUrl, linkId!);
            }

            else
            {
                await emailService.SendEmailInviteAsync(attendeeFormDto.Email, attendeeFormDto.Name, neededEvent!.Title, attendeeFormDto.EmailUrl, "");

                var notificaitonCreationSuccess = await notificationService.CreateEventInviteNotificationAsync(attendeeFormDto.UserId, neededEvent);

                if (!notificaitonCreationSuccess) return StatusCode(500);
            }

            return Ok();
        }

        [HttpPost(AttendeeActionsConstants.Delete)]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (id <= 0) return BadRequest();

            var userId = GetUserId();

            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var actionSuccess = await attendeeService.MarkAsDeletedAsync(id, userId);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }

        [HttpPost(AttendeeActionsConstants.UpdateStatus)]
        public async Task<IActionResult> UpdateStatus([FromRoute] int id, [FromBody] AttendeeStatusDto dto)
        {
            if (id <= 0) return BadRequest();

            var isModelValid = ModelState.IsValid;

            if (!isModelValid) return BadRequest();

            var userId = GetUserId();

            var actionSuccess = await attendeeService.UpdateAttendeeStatusAsync(id, dto.NewStatus, userId!);

            if (!actionSuccess) return BadRequest();

            var attendee = await attendeeService.GetByIdAsync(id);

            if (attendee == null) return BadRequest();

            var eventCreatorId = await eventService.GetEventCreatorIdAsync(attendee.EventId);

            var notificationCreationSuccess = await notificationService.CreateEventUpdateNotificationAsync(eventCreatorId, attendee);

            if (!notificationCreationSuccess) return StatusCode(500);

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost(AttendeeActionsConstants.UpdateStatusExternal)]
        public async Task<IActionResult> UpdateExternalAttendeeStatus([FromRoute] string linkId, [FromBody] AttendeeStatusDto dto)
        {
            var link = await this.linkService.GetAsync(linkId);

            if (link == null) return BadRequest();

            var isModeValid = ModelState.IsValid;

            if (!isModeValid) return BadRequest();

            var action = await attendeeService.UpdateExternalAttendeeStatusAsync(link.Attendee.Id, dto.NewStatus);

            if (!action) return BadRequest();

            if (link.Attendee == null) return BadRequest();

            var eventCreatorId = await eventService.GetEventCreatorIdAsync(link.Attendee.EventId);

            var notificationCreationSuccess = await notificationService.CreateEventUpdateNotificationAsync(eventCreatorId, link.Attendee);

            if (!notificationCreationSuccess) return StatusCode(500);

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet(AttendeeActionsConstants.GetStatusExternal)]
        public async Task<IActionResult> GetExternalAttendeeStatus([FromRoute] string linkId)
        {
            var link = await this.linkService.GetAsync(linkId);

            if (link == null) return BadRequest();

            var result = await attendeeService.GetExternalAttendeeStatusAsync(link.Attendee.Id);

            if (result == -1) return BadRequest();

            return Ok(result);

        }
    }
}
