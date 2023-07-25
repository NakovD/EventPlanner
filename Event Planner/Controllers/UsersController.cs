namespace EventPlanner.Controllers
{
    using Data.Models;
    using Services.Contracts;
    using Services.Models.Auth;
    using static Common.RoleNamesConstants;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> userManager;

        private readonly IAuthService authService;

        private readonly IUserService userService;

        public UserController(UserManager<User> userManager, IAuthService authService, IUserService userService)
        {
            this.userManager = userManager;
            this.authService = authService;
            this.userService = userService;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<UserDto>> CreateUser(UserDto user)
        {
            var isValid = ModelState.IsValid;

            if (!isValid) return BadRequest(ModelState);

            var result = await userManager.CreateAsync(new User
            {
                UserName = user.UserName,
                Email = user.Email
            }, user.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var newUser = await userManager.FindByNameAsync(user.UserName);

            await userManager.AddToRoleAsync(newUser, "User");

            var response = authService.CreateToken(newUser, new List<string> { "User" });

            return Ok(response);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<AuthResponse>> CreateBearerToken(AuthUserDto userDto)
        {
            var isValid = ModelState.IsValid;

            if (!isValid) return BadRequest("Bad credentials!");

            var user = await userManager.FindByNameAsync(userDto.UserName);

            if (user == null) return BadRequest("Bad credentials!");

            var isPasswordValid = await userManager.CheckPasswordAsync(user, userDto.Password);

            if (!isPasswordValid) return BadRequest("Bad credentials!");

            var userRoles = await userManager.GetRolesAsync(user);

            var response = authService.CreateToken(user, userRoles);

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpGet("Authenticate/{token}")]
        public async Task<ActionResult<AuthResponse>> AuthenticateUser([FromRoute] string token)
        {
            var isTokenValid = await authService.ValidateTokenAsync(token);

            if (!isTokenValid) return Unauthorized();

            var userId = authService.GetUserIdFromToken(token);

            var user = await userManager.FindByIdAsync(userId);

            if (user == null) return BadRequest();

            var roles = await userManager.GetRolesAsync(user);

            var authResponse = authService.CreateToken(user, roles);

            return Ok(authResponse);
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
