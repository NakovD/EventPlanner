namespace EventPlanner.Controllers
{
    using Services.Contracts;

    using Microsoft.AspNetCore.Mvc;
    using EventPlanner.Services.Models.Comment;
    using Microsoft.AspNetCore.Authorization;
    using EventPlanner.Common.ActionsConstants;

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
        [HttpGet(CommentActionsConstants.GetAllForEvent)]
        public async Task<IActionResult> All([FromRoute]int eventId) => Ok(await commentService.GetAllAsync(eventId));

        [HttpPost(CommentActionsConstants.Create)]
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

        [HttpPost(CommentActionsConstants.Edit)]
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

        [HttpPost(CommentActionsConstants.Delete)]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (id <= 0) return BadRequest();

            var userId = GetUserId();

            if (userId == null) return Unauthorized();

            var actionResult = await commentService.DeleteAsync(id, userId);

            if (!actionResult) return BadRequest();

            return Ok();
        }


    }
}
