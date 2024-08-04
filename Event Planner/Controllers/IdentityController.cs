namespace EventPlanner.Controllers
{
    using EventPlanner.Common;
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

            this.SetTokensInsideCookie(result.Result.Tokens, HttpContext);

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

            this.SetTokensInsideCookie(result.Result.Tokens, HttpContext);

            return GenerateActionResult(result);
        }

        [AllowAnonymous]
        [HttpGet(IdentityActionsConstants.RefreshAuth)]
        public async Task<IActionResult> RefreshAuth()
        {
            HttpContext.Request.Cookies.TryGetValue(Constants.AccessTokenCookieName, out var accessToken);
            HttpContext.Request.Cookies.TryGetValue(Constants.RefreshTokenCookieName, out var refreshToken);

            var tokenDto = new TokenDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
            };

            var result = await identityService.RefreshTokenAsync(tokenDto);

            return GenerateActionResult(result);
        }

        [HttpGet(IdentityActionsConstants.LogOut)]
        public async Task<IActionResult> LogOut()
        {
            var username = User.Identity.Name;

            var result = await this.identityService.LogOut(username);

            return GenerateActionResult(result);
        }

        private void SetTokensInsideCookie(TokenDto tokenDto, HttpContext context)
        {
            context.Response.Cookies.Append(WebConstants.AccessTokenCookieName, tokenDto.AccessToken, new CookieOptions
            {
                Secure = true,
                HttpOnly = true,
                IsEssential = true,
                Expires = DateTime.Now.AddMinutes(Constants.AccessTokenExpirationTimeInMinutes),
                SameSite = SameSiteMode.None
            });

            context.Response.Cookies.Append(WebConstants.RefreshTokenCookieName, tokenDto.RefreshToken, new CookieOptions
            {
                Secure = true,
                HttpOnly = true,
                IsEssential = true,
                Expires = DateTime.Now.AddDays(Constants.RefreshTokenExpirationTimeInDays),
                SameSite = SameSiteMode.None
            });
        }
    }
}
