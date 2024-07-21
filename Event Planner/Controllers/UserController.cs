namespace EventPlanner.Controllers
{
    using Services.Contracts;
    using static Common.RoleNamesConstants;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;
    using EventPlanner.Common.ActionsConstants;

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BasicController
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet(UserActionsConstants.GetAttendeeUsers)]
        public async Task<IActionResult> GetAllAttendeeUsers() => Ok(await userService.GetAllAttendeeUsersAsync());

        [HttpGet(UserActionsConstants.GetAll)]
        [Authorize(Roles = Admin)]
        public async Task<IActionResult> GetAllUsers()
        {
            var allUsers = await userService.GetAllUsersAsync();

            return Ok(allUsers);
        }

        [HttpPost(UserActionsConstants.Delete)]
        [Authorize(Roles = Admin)]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var actionSuccess = await userService.DeleteUserAsync(id);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }
    }
}
