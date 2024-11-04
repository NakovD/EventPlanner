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
    using EventPlanner.Common.ActionsConstants;

    [Route("api/[controller]")]
    [ApiController]
    public class EventController : BasicController
    {
        private readonly IEventService eventService;

        private readonly ILinkService linkService;

        private readonly IJsonService jsonService;

        public EventController(IEventService eventService, ILinkService linkService, IJsonService jsonService)
        {
            this.eventService = eventService;
            this.jsonService = jsonService;
            this.linkService = linkService;
        }

        [HttpGet(EventActionsConstants.GetAll)]
        public async Task<IActionResult> All([FromQuery]AllEventsQuery query)
        {
            var result = await eventService.GetAllAsync(query);
            return Ok(result);
        }

        [HttpGet(EventActionsConstants.GetAllForAdmin)]
        [Authorize(Roles = Admin)]
        public async Task<IActionResult> AllAdmin() => Ok(await eventService.GetAllAdministrationAsync());

        [HttpGet(EventActionsConstants.GetUserEvents)]
        public async Task<IActionResult> AllUserEvents()
        {
            var userId = GetUserId();

            var result = await eventService.GetUserEventsAsync(userId);

            if (result == null) return BadRequest();

            return Ok(result);
        }

        [HttpGet(EventActionsConstants.GetById)]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (id <= 0) return BadRequest();
            var neededEvent = await eventService.GetByIdAsync(id);

            return Ok(neededEvent);
        }

        [HttpPost(EventActionsConstants.Create)]
        public async Task<IActionResult> Create([FromBody] EventFormDto eventDto)
        {
            var isDtoValid = ModelState.IsValid;

            var userId = GetUserId();

            if (!isDtoValid) return BadRequest();

            var isActionSuccess = await eventService.CreateEventAsync(eventDto, userId);

            if (!isActionSuccess) return BadRequest();

            return Ok();
        }

        [HttpPost(EventActionsConstants.Edit)]
        public async Task<IActionResult> Edit([FromBody] EventFormDto eventDto, [FromRoute] int id)
        {
            var isDtoValid = ModelState.IsValid;

            if (!isDtoValid) return BadRequest();

            var actionSuccess = await eventService.UpdateEventAsync(eventDto, id);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet(EventActionsConstants.GetForExternalAttendee)]
        public async Task<IActionResult> AttendeeOnly(string linkId)
        {
            var link = await this.linkService.GetAsync(linkId);

            if (link == null) return BadRequest();

            if (link.Attendee.EventId <= 0) return BadRequest();

            var neededEvent = await eventService.GetByIdAsync(link.Attendee.EventId);

            if (neededEvent == null) return BadRequest();

            if (neededEvent.OrganizerId == link.Attendee.Id.ToString()) return BadRequest();

            return Ok(neededEvent);
        }

        [HttpPost(EventActionsConstants.Delete)]
        [Authorize(Roles = Admin)]
        public async Task<IActionResult> MarkAsDeleted([FromRoute] int id)
        {
            if (id <= 0) return BadRequest();

            var actionSuccess = await eventService.MarkAsDeletedAsync(id);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }

        [HttpPost(EventActionsConstants.Restore)]
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
