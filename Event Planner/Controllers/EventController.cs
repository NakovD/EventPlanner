using EventPlanner.Common;

namespace EventPlanner.Controllers
{
    using Services.Models.Event;
    using Services.Contracts;
    using static WebConstants;
    using static Common.RoleNamesConstants;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.DataProtection;
    using Microsoft.AspNetCore.Authorization;
    using EventPlanner.Services.Queries.Event;

    [Route("api/[controller]")]
    [ApiController]
    public class EventController : BasicController
    {
        private readonly IEventService eventService;

        private readonly IDataProtector dataProtector;

        private readonly IJsonService jsonService;

        public EventController(IEventService eventService, IDataProtectionProvider dataProtectionProvider, IJsonService jsonService)
        {
            this.eventService = eventService;
            this.jsonService = jsonService;
            dataProtector = dataProtectionProvider.CreateProtector(AttendeeInviteDataPurpose);
        }

        [HttpGet("All")]
        public async Task<IActionResult> All([FromQuery]AllEventsQuery query)
        {
            var result = await eventService.GetAllAsync(query);
            return Ok(result);
        }

        [HttpGet("All-Administration")]
        [Authorize(Roles = Admin)]
        public async Task<IActionResult> AllAdmin() => Ok(await eventService.GetAllAdministrationAsync());

        [HttpGet("User")]
        public async Task<IActionResult> AllUserEvents()
        {
            var userId = GetUserId();

            var result = await eventService.GetUserEventsAsync(userId);

            if (result == null) return BadRequest();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (id <= 0) return BadRequest();
            var neededEvent = await eventService.GetByIdAsync(id);

            return Ok(neededEvent);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] EventFormDto eventDto)
        {
            var isDtoValid = ModelState.IsValid;

            var userId = GetUserId();

            if (!isDtoValid) return BadRequest();

            var isActionSuccess = await eventService.CreateEventAsync(eventDto, userId);

            if (!isActionSuccess) return BadRequest();

            return Ok();
        }

        [HttpPost("Edit/{id}")]
        public async Task<IActionResult> Edit([FromBody] EventFormDto eventDto, [FromRoute] int id)
        {
            var isDtoValid = ModelState.IsValid;

            if (!isDtoValid) return BadRequest();

            var actionSuccess = await eventService.UpdateEventAsync(eventDto, id);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("AttendeeOnly/{encryptedData}")]
        public async Task<IActionResult> AttendeeOnly(string encryptedData)
        {
            var unprotectedData = dataProtector.Unprotect(encryptedData);

            var dto = jsonService.Deserialize<EventAttendeeDto>(unprotectedData);

            if (dto == null) return BadRequest();

            if (dto.EventId <= 0) return BadRequest();

            var neededEvent = await eventService.GetByIdAsync(dto.EventId);

            if (neededEvent == null) return BadRequest();

            if (neededEvent.OrganizerId == dto.AttendeeId.ToString()) return BadRequest();

            return Ok(neededEvent);
        }

        [HttpPost("Delete/{id}")]
        [Authorize(Roles = Admin)]
        public async Task<IActionResult> MarkAsDeleted([FromRoute] int id)
        {
            if (id <= 0) return BadRequest();

            var actionSuccess = await eventService.MarkAsDeletedAsync(id);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }

        [HttpPost("Restore/{id}")]
        [Authorize(Roles = Admin)]
        public async Task<IActionResult> UnmarkAsDeleted([FromRoute] int id)
        {
            if (id <= 0) return BadRequest();

            var actionSuccess = await eventService.UnmarkAsDeletedAsync(id);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }
    }
}
