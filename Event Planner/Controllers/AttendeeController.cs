namespace EventPlanner.Controllers
{
    using Services.Contracts;
    using Services.Models.Attendee;
    using EmailService.Contracts;
    using EmailService.Messages;
    using static EmailService.EmailTextTemplates;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AttendeeController : BasicController
    {
        private readonly IAttendeeService attendeeService;

        private readonly IEmailSender emailService;

        private readonly IEventService eventService;

        public AttendeeController(IAttendeeService attendeeService, IEmailSender emailService, IEventService eventService)
        {
            this.attendeeService = attendeeService;
            this.emailService = emailService;
            this.eventService = eventService;
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

            var actionSuccess = await attendeeService.CreateAttendeeAsync(attendeeFormDto);

            if (!actionSuccess) return BadRequest();

            var neededEvent = await eventService.GetByIdAsync(attendeeFormDto.EventId);

            //to Do move this to an email service

            var message = GenerateInviteMessage(attendeeFormDto.Email, attendeeFormDto.Name, neededEvent?.Title!);

            await emailService.SendEmailAsync(message);

            return Ok();
        }

        private Message GenerateInviteMessage(string receiver, string attendeeName, string eventName)
        {
            var subject = string.Format(InviteEmailSubject, eventName);

            var body = string.Format(InviteEmailBody, attendeeName, eventName);

            var message = new Message(new string[] { receiver }, subject, body);

            return message;
        }
    }
}
