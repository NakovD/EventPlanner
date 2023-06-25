namespace EventPlanner.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    using Services.Contracts;
    using Services.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService eventService;

        public EventController(IEventService eventService)
        {
            this.eventService = eventService;
        }
        [HttpGet("All")]
        public async Task<IEnumerable<EventDto>> All() => await eventService.GetAllAsync();

        [HttpGet("{id}")]
        public async Task<EventDto?> GetById([FromRoute]int id)
        {
            if (id == 0)
            {
                //handle error;
            }
            var neededEvent = await eventService.GetByIdAsync(id);

            return neededEvent;
        }

        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
