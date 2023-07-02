namespace EventPlanner.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System.Security.Claims;

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BasicController : ControllerBase
    {
        protected string? GetUserId() => User.FindFirstValue(ClaimTypes.NameIdentifier);
    }
}
