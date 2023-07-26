namespace EventPlanner.Controllers
{
    using Data.Models;
    using Services.Contracts;
    using Services.Models.Auth;
    using static Common.RoleNamesConstants;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.IdentityModel.Tokens;

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BasicController
    {
        private readonly UserManager<User> userManager;

        private readonly IJwtService jwtService;

        private readonly IUserService userService;

        private readonly IIdentityService identityService;

        public UserController(UserManager<User> userManager, IJwtService jwtService, IUserService userService, IIdentityService identityService)
        {
            this.userManager = userManager;
            this.jwtService = jwtService;
            this.userService = userService;
            this.identityService = identityService;
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> CreateUser(RegisterDto dto)
        {
            var isValid = ModelState.IsValid;

            if (!isValid) return BadRequest(ModelState);

            var result = await identityService.RegisterAsync(dto);

            return GenerateActionResult(result);
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var isValid = ModelState.IsValid;

            if (!isValid) return BadRequest("Bad credentials!");

            var result = await identityService.LoginAsync(dto);

            return GenerateActionResult(result);
        }

        [AllowAnonymous]
        [HttpGet("Authenticate/{token}")]
        public async Task<IActionResult> AuthenticateUser([FromRoute] string token)
        {
            var isTokenValid = await jwtService.ValidateTokenAsync(token);

            if (!isTokenValid) return Unauthorized();

            var userId = jwtService.GetUserIdFromToken(token);

            var user = await userManager.FindByIdAsync(userId);

            if (user == null) return BadRequest();

            var result = await identityService.GenerateTokenForUserAsync(user);

            return GenerateActionResult(result);
        }

        [AllowAnonymous]
        [HttpPost("LoginWithFacebook")]
        public async Task<IActionResult> LoginWithFacebook([FromBody] FacebookDto dto)
        {
            var isModelValid = ModelState.IsValid;

            if (!isModelValid) return BadRequest();

            var result = await identityService.LoginWithFacebookAsync(dto.AccessToken);

            return GenerateActionResult(result);
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
