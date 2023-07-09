namespace EventPlanner.Controllers
{
    using Services.Contracts;
    using Services.Models.Attendee;
    using Services.Models.Event;
    using static WebConstants;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.DataProtection;

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

        public AttendeeController(IAttendeeService attendeeService, IEventService eventService, IDataProtectionProvider dataProtectionProvider, IJsonService jsonService, IEmailService emailService)
        {
            this.attendeeService = attendeeService;
            this.eventService = eventService;
            dataProtector = dataProtectionProvider.CreateProtector(AttendeeInviteDataPurpose);
            this.jsonService = jsonService;
            this.emailService = emailService;
        }

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

            return Ok();
        }

        private string ProtectUserData(EventAttendeeDto eventAttendeeDto)
        {
            var eventAttendeeDtoAsJsonString = jsonService.Serialize(eventAttendeeDto);
            var protectedData = dataProtector.Protect(eventAttendeeDtoAsJsonString);

            return protectedData;
        }
    }
}
