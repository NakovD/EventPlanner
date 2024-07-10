namespace EventPlanner.Controllers
{
    using EventPlanner.Data.Models;
    using EventPlanner.Services.Contracts;
    using EventPlanner.Services.Models.Auth;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : BasicController
    {
        private readonly UserManager<User> userManager;

        private readonly IJwtService jwtService;

        private readonly IIdentityService identityService;

        public IdentityController(UserManager<User> userManager, IJwtService jwtService, IIdentityService identityService)
        {
            this.userManager = userManager;
            this.jwtService = jwtService;
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
    }
}
