﻿namespace EventPlanner.Controllers
{
    using Services.Contracts;
    using Services.Models.Attendee;
    using Services.Models.Event;
    using static WebConstants;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.DataProtection;
    using EventPlanner.Services.Models.Notification;

    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AttendeeController : BasicController
    {
        private readonly IAttendeeService attendeeService;

        private readonly IEventService eventService;

        private readonly IDataProtector dataProtector;

        private readonly IJsonService jsonService;

        private readonly IEmailService emailService;

        private readonly INotificationService notificationService;

        public AttendeeController(IAttendeeService attendeeService, IEventService eventService, IDataProtectionProvider dataProtectionProvider, IJsonService jsonService, IEmailService emailService, INotificationService notificationService)
        {
            this.attendeeService = attendeeService;
            this.eventService = eventService;
            dataProtector = dataProtectionProvider.CreateProtector(AttendeeInviteDataPurpose);
            this.jsonService = jsonService;
            this.emailService = emailService;
            this.notificationService = notificationService;
        }

        [AllowAnonymous]
        [HttpGet("AllByEvent/{id}")]
        public async Task<IActionResult> GetAllByEventId(int id)
        {
            if (id <= 0) return BadRequest();

            var result = await attendeeService.GetAllByEventAsync(id);

            return Ok(result);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateAttendee([FromBody] AttendeeFormDto attendeeFormDto)
        {
            var isModelValid = ModelState.IsValid;

            if (!isModelValid) return BadRequest();

            var (actionSuccess, attendeeId) = await attendeeService.CreateAttendeeAsync(attendeeFormDto);

            if (!actionSuccess) return BadRequest();

            var neededEvent = await eventService.GetByIdAsync(attendeeFormDto.EventId);

            var protectedUserData = ProtectUserData(new EventAttendeeDto { AttendeeId = attendeeId, EventId = neededEvent!.Id });

            await emailService.SendEmailInviteAsync(attendeeFormDto.Email, attendeeFormDto.Name, neededEvent.Title, attendeeFormDto.EmailUrl, protectedUserData);

            if (attendeeFormDto.UserId != null)
            {
                var notificationDto = new NotificationFormDto
                {
                    EventId = neededEvent.Id,
                    Description = string.Format(NotificationEventInviteText, neededEvent.Title),
                    Type = 0,
                };

                await notificationService.CreateNotificationAsync(attendeeFormDto.UserId, notificationDto);
            }

            return Ok();
        }

        [HttpPost("UpdateStatus/{id}")]
        public async Task<IActionResult> UpdateStatus([FromRoute]int id, [FromBody] AttendeeStatusDto dto)
        {
            if (id <= 0) return BadRequest();

            var isModelValid = ModelState.IsValid;

            if (!isModelValid) return BadRequest();

            var userId = GetUserId();

            var actionSuccess = await attendeeService.UpdateAttendeeStatusAsync(id, dto.NewStatus, userId!);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("UpdateExternalStatus/{encryptedData}")]
        public async Task<IActionResult> UpdateExternalAttendeeStatus([FromRoute]string encryptedData, [FromBody] AttendeeStatusDto dto)
        {
            var unprotectedData = UnProtectUserData(encryptedData);

            if (unprotectedData == null) return BadRequest();

            var isModeValid = ModelState.IsValid;

            if (!isModeValid) return BadRequest();

            var action = await attendeeService.UpdateExternalAttendeeStatusAsync(unprotectedData.AttendeeId, dto.NewStatus);

            if (!action) return BadRequest();

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("ExternalStatus/{encryptedData}")]
        public async Task<IActionResult> GetExternalAttendeeStatus([FromRoute] string encryptedData)
        {
            var unprotectedData = UnProtectUserData(encryptedData);

            if (unprotectedData == null) return BadRequest();

            var result = await attendeeService.GetExternalAttendeeStatusAsync(unprotectedData.AttendeeId);

            if (result == -1) return BadRequest();

            return Ok(result);

        }

        private string ProtectUserData(EventAttendeeDto eventAttendeeDto)
        {
            var eventAttendeeDtoAsJsonString = jsonService.Serialize(eventAttendeeDto);
            var protectedData = dataProtector.Protect(eventAttendeeDtoAsJsonString);

            return protectedData;
        }

        private EventAttendeeDto? UnProtectUserData(string encryptedData)
        {
            var unProtectedData = dataProtector.Unprotect(encryptedData);
            var data = jsonService.Deserialize<EventAttendeeDto>(unProtectedData);

            return data;
        }
    }
}
