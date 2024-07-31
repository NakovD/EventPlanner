namespace EventPlanner.Controllers
{
    using Common.Contracts;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System.Net;
    using System.Security.Claims;

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BasicController : ControllerBase
    {
        protected string? GetUserId() => User.FindFirstValue(ClaimTypes.NameIdentifier);

        protected IActionResult GenerateActionResult<T, TError>(IResult<T, TError> result)
        {
            if (result.Succeeded && result.RequestStatusCode == HttpStatusCode.OK) return Ok(result.Result);

            if (result.Succeeded && result.RequestStatusCode == HttpStatusCode.NoContent) return NoContent();

            return StatusCode((int)result.RequestStatusCode, result.Errors);
        }
    }
}
