namespace EventPlanner.Controllers
{
    using EventPlanner.Common.ActionsConstants;
    using EventPlanner.Services.Contracts;
    using EventPlanner.Services.Models.Auth;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : BasicController
    {
        private readonly IIdentityService identityService;

        public IdentityController(IIdentityService identityService)
        {
            this.identityService = identityService;
        }

        [AllowAnonymous]
        [HttpPost(IdentityActionsConstants.Register)]
        public async Task<IActionResult> CreateUser(RegisterDto dto)
        {
            var isValid = ModelState.IsValid;

            if (!isValid) return BadRequest(ModelState);

            var result = await identityService.RegisterAsync(dto);

            return GenerateActionResult(result);
        }

        [AllowAnonymous]
        [HttpPost(IdentityActionsConstants.Login)]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var isValid = ModelState.IsValid;

            if (!isValid) return BadRequest("Bad credentials!");

            var result = await identityService.LoginAsync(dto);

            return GenerateActionResult(result);
        }

        [AllowAnonymous]
        [HttpGet(IdentityActionsConstants.Authenticate)]
        public async Task<IActionResult> AuthenticateUser([FromRoute] string token)
        {
            var result = await this.identityService.ValidateUserAsync(token);

            return GenerateActionResult(result);
        }

        [AllowAnonymous]
        [HttpPost(IdentityActionsConstants.LoginWithFacebook)]
        public async Task<IActionResult> LoginWithFacebook([FromBody] FacebookDto dto)
        {
            var isModelValid = ModelState.IsValid;

            if (!isModelValid) return BadRequest();

            var result = await identityService.LoginWithFacebookAsync(dto.AccessToken);

            return GenerateActionResult(result);
        }
    }
}
