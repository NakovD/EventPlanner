namespace EventPlanner.Controllers
{
    using Services.Contracts;

    using Microsoft.AspNetCore.Mvc;
    using EventPlanner.Services.Models.Comment;
    using Microsoft.AspNetCore.Authorization;

    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : BasicController
    {
        private readonly ICommentService commentService;

        public CommentController(ICommentService commentService)
        {
            this.commentService = commentService;
        }

        [AllowAnonymous]
        [HttpGet("All/{eventId}")]
        public async Task<IActionResult> All([FromRoute]int eventId) => Ok(await commentService.GetAllAsync(eventId));

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody]CommentFormDto dto)
        {
            var isModelValid = ModelState.IsValid;

            if (!isModelValid) return BadRequest();

            var userId = GetUserId();

            if (userId == null) return Unauthorized();

            var actionSuccess = await commentService.CreateAsync(userId, dto);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }

        [HttpPost("Edit/{id}")]
        public async Task<IActionResult> Edit([FromRoute] int id, [FromBody] CommentFormDto dto)
        {
            var isModelValid = ModelState.IsValid;

            if (!isModelValid) return BadRequest();

            var userId = GetUserId();

            if (userId == null) return Unauthorized();

            var actionSuccess = await commentService.EditAsync(id, userId, dto);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }


    }
}
