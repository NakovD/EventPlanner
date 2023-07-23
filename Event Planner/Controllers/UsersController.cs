namespace EventPlanner.Controllers
{
    using Data.Models;
    using Services.Contracts;
    using Services.Models;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using EventPlanner.Services.Models.Auth;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> userManager;

        private readonly RoleManager<IdentityRole> roleManager;

        private readonly IAuthService authService;

        public UserController(UserManager<User> userManager, IAuthService authService, RoleManager<IdentityRole> roleManager)
        {
            this.userManager = userManager;
            this.authService = authService;
            this.roleManager = roleManager;
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

        [HttpGet("All")]
        public async Task<IActionResult> GetAllUsers()
        {
            var allUsers = await userManager.Users
                .AsNoTracking()
                .Select(u => new { Username = u.UserName, u.Email, u.Id })
                .ToListAsync();

            return Ok(allUsers);
        }
    }
}
