namespace EventPlanner.Controllers
{
    using EventPlanner.Common;
    using EventPlanner.Common.ActionsConstants;
    using EventPlanner.Results;
    using EventPlanner.Services.Contracts;
    using EventPlanner.Services.Models.Auth;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System.Net;

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

            return HandleAuthResult(result);
        }

        [AllowAnonymous]
        [HttpPost(IdentityActionsConstants.Login)]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var isValid = ModelState.IsValid;

            if (!isValid) return BadRequest("Bad credentials!");

            var result = await identityService.LoginAsync(dto);

            return HandleAuthResult(result);
        }

        [HttpGet(IdentityActionsConstants.UserData)]
        public async Task<IActionResult> UserData()
        {
            var username = User.Identity.Name;

            var result = await this.identityService.GetCurrentUserData(username);

            return this.GenerateActionResult(result);
        }

        [AllowAnonymous]
        [HttpPost(IdentityActionsConstants.LoginWithFacebook)]
        public async Task<IActionResult> LoginWithFacebook([FromBody] FacebookDto dto)
        {
            var isModelValid = ModelState.IsValid;

            if (!isModelValid) return BadRequest();

            var result = await identityService.LoginWithFacebookAsync(dto.AccessToken);

            return HandleAuthResult(result);
        }

        [AllowAnonymous]
        [HttpGet(IdentityActionsConstants.RefreshAuth)]
        public async Task<IActionResult> RefreshAuth()
        {
            HttpContext.Request.Cookies.TryGetValue(Constants.AccessTokenCookieName, out var accessToken);
            HttpContext.Request.Cookies.TryGetValue(Constants.RefreshTokenCookieName, out var refreshToken);

            if (accessToken == null || refreshToken == null) return Unauthorized();

            var tokenDto = new TokenDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
            };

            var result = await identityService.RefreshTokenAsync(tokenDto);

            return HandleAuthResult(result);
        }

        [HttpPost(IdentityActionsConstants.LogOut)]
        public async Task<IActionResult> LogOut()
        {
            var username = User.Identity.Name;

            var result = await this.identityService.LogOut(username);

            this.identityService.ExpireAuthCookie(HttpContext);

            return GenerateActionResult(result);
        }

        private IActionResult HandleAuthResult(AuthenticationResult<AuthResponse> result)
        {
            if (result.RequestStatusCode == HttpStatusCode.OK && result.Result != null)
            {
                this.identityService.SetTokensInsideCookie(result.Result.TokenDto, HttpContext);

                return Ok(result.Result.User);
            }

            this.identityService.ExpireAuthCookie(HttpContext);

            return this.GenerateActionResult(result);
        }
    }
}
