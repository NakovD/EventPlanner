namespace EventPlanner.Controllers
{
    using Services.Contracts;
    using Services.Models;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;

        private readonly RoleManager<IdentityRole> roleManager;

        private readonly IAuthService authService;

        public UserController(UserManager<IdentityUser> userManager, IAuthService authService, RoleManager<IdentityRole> roleManager)
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

            var result = await userManager.CreateAsync(new IdentityUser
            {
                UserName = user.UserName,
                Email = user.Email
            }, user.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var newUser = await userManager.FindByNameAsync(user.UserName);

            var response = authService.CreateToken(newUser);

            await userManager.AddToRoleAsync(newUser, "User");

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

            var response = authService.CreateToken(user);

            return Ok(response);
        }
    }
}
