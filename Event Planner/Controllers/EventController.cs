namespace EventPlanner.Controllers
{
    using EventPlanner.Data.Models;
    using EventPlanner.Services.Models.Event;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using Services.Contracts;
    using System.Security.Claims;

    [Route("api/[controller]")]
    [ApiController]
    public class EventController : BasicController
    {
        private readonly IEventService eventService;

        private readonly UserManager<User> userManager;

        public EventController(IEventService eventService, UserManager<User> userManager)
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
        public async Task<IActionResult> Create([FromBody]CreateEventDto eventDto)
        {
            var isDtoValid = ModelState.IsValid;

            var userId = GetUserId();

            if (!isDtoValid) return BadRequest();

            var isActionSuccess = await eventService.CreateEventAsync(eventDto, userId);

            if (!isActionSuccess) return BadRequest();

            return Ok();
        }
    }
}
