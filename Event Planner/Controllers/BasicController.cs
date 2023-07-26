namespace EventPlanner.Controllers
{
    using Common.Contracts;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System.Security.Claims;

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BasicController : ControllerBase
    {
        protected string? GetUserId() => User.FindFirstValue(ClaimTypes.NameIdentifier);

        protected IActionResult GenerateActionResult<T, TError>(IResult<T, TError> result)
        {
            if (result.Succeeded) return Ok(result.Result);

            return StatusCode(result.RequestCode, result.Errors);
        }
    }
}
