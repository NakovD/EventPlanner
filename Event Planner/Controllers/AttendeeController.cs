namespace EventPlanner.Controllers
{
    using Services.Contracts;
    using Services.Models.Attendee;
    using Services.Models.Event;
    using EmailService.Contracts;
    using EmailService.Messages;
    using static EmailService.EmailTextTemplates;
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

        private readonly IEmailSender emailService;

        private readonly IEventService eventService;

        private readonly IDataProtector dataProtector;

        private readonly IJsonService jsonService;

        public AttendeeController(IAttendeeService attendeeService, IEmailSender emailService, IEventService eventService, IDataProtectionProvider dataProtectionProvider, IJsonService jsonService)
        {
            this.attendeeService = attendeeService;
            this.emailService = emailService;
            this.eventService = eventService;
            dataProtector = dataProtectionProvider.CreateProtector(AttendeeInviteDataPurpose);
            this.jsonService = jsonService;
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

            //to Do move this to an email service

            var formattedEmailUrl = PrepareEmailUrl(attendeeFormDto.EmailUrl, new EventAttendeeDto { AttendeeId = attendeeId, EventId = neededEvent!.Id });

            var message = GenerateInviteMessage(attendeeFormDto.Email, attendeeFormDto.Name, neededEvent?.Title!, formattedEmailUrl);

            await emailService.SendEmailAsync(message);

            return Ok();
        }

        private Message GenerateInviteMessage(string receiver, string attendeeName, string eventName, string eventUrl)
        {
            var subject = string.Format(InviteEmailSubject, eventName);

            var body = string.Format(InviteEmailBody, attendeeName, eventName, eventUrl);

            var message = new Message(new string[] { receiver }, subject, body);

            return message;
        }

        private string PrepareEmailUrl(string eventUrl, EventAttendeeDto eventAttendeeDto)
        {
            var formattedUrl = eventUrl.Replace(":id", "");

            var protectedData = ProtectUserData(eventAttendeeDto);

            return $"{formattedUrl}{protectedData}";
        }

        private string ProtectUserData(EventAttendeeDto eventAttendeeDto)
        {
            var eventAttendeeDtoAsJsonString = jsonService.Serialize(eventAttendeeDto);
            var protectedData = dataProtector.Protect(eventAttendeeDtoAsJsonString);

            return protectedData;
        }
    }
}
