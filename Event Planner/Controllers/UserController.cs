namespace EventPlanner.Controllers
{
    using Services.Contracts;
    using static Common.RoleNamesConstants;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BasicController
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("Attendee-Users")]
        public async Task<IActionResult> GetAllAttendeeUsers() => Ok(await userService.GetAllAttendeeUsersAsync());

        [HttpGet("All")]
        [Authorize(Roles = Admin)]
        public async Task<IActionResult> GetAllUsers()
        {
            var allUsers = await userService.GetAllUsersAsync();

            return Ok(allUsers);
        }

        [HttpPost("Delete/{id}")]
        [Authorize(Roles = Admin)]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var actionSuccess = await userService.DeleteUserAsync(id);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }
    }
}
