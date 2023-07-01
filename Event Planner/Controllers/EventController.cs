namespace EventPlanner.Controllers
{
    using EventPlanner.Services.Models.Event;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using Services.Contracts;

    [Route("api/[controller]")]
    [ApiController]
    public class EventController : BasicController
    {
        private readonly IEventService eventService;

        private readonly UserManager<IdentityUser> userManager;

        public EventController(IEventService eventService, UserManager<IdentityUser> userManager)
        {
            this.eventService = eventService;
            this.userManager = userManager;
        }

        [HttpGet("All")]
        public async Task<IEnumerable<EventDto>> All() => await eventService.GetAllAsync();

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (id <= 0) return BadRequest();
            var neededEvent = await eventService.GetByIdAsync(id);

            return Ok(neededEvent);
        }

        [HttpPost("Create")]
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody]CreateEventDto eventDto)
        {
            var isDtoValid = ModelState.IsValid;

            if (!isDtoValid) return BadRequest();

            var isActionSuccess = await eventService.CreateEventAsync(eventDto);

            if (!isActionSuccess) return BadRequest();

            return Ok();
        }
    }
}
