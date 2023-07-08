namespace EventPlanner.Services.Implementations
{
    using Contracts;
    using Data.Models;
    using Models.Auth;

    using System;
    using System.Text;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;

    using Microsoft.Extensions.Configuration;
    using Microsoft.IdentityModel.Tokens;
    using System.Threading.Tasks;

    public class AuthService : IAuthService
    {
        private const int EXPIRATION_HOURS = 12;

        private readonly IConfiguration configuration;

        private readonly JwtSecurityTokenHandler tokenHandler;

        private readonly TokenValidationParameters validationParameters;

        public AuthService(IConfiguration configuration)
        {
            this.configuration = configuration;
            tokenHandler = new JwtSecurityTokenHandler();
            validationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidAudience = configuration["Jwt:Audience"],
                ValidIssuer = configuration["Jwt:Issuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]))
            };

        }
        public AuthResponse CreateToken(User user)
        {
            var expiration = DateTime.UtcNow.AddHours(EXPIRATION_HOURS);

            var token = CreateJwtToken(
                CreateClaims(user),
                CreateSigningCredentials(),
                expiration
            );

            return new AuthResponse
            {
                Token = tokenHandler.WriteToken(token),
                Expiration = expiration,
                UserName = user.UserName,
                UserEmail = user.Email,
                UserId = user.Id,
            };
        }

        private JwtSecurityToken CreateJwtToken(Claim[] claims, SigningCredentials credentials, DateTime expiration) =>
            new JwtSecurityToken(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: expiration,
                signingCredentials: credentials
            );

        private Claim[] CreateClaims(User user) =>
          new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email)
          };

        private SigningCredentials CreateSigningCredentials() =>
            new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(configuration["Jwt:Key"])
                ),
                SecurityAlgorithms.HmacSha256
            );

        public async Task<bool> ValidateTokenAsync(string token)
        {
            var validateTokenResult = await tokenHandler.ValidateTokenAsync(token, validationParameters);

            var isTokenValid = validateTokenResult.IsValid;

            return isTokenValid;
        }

        public string GetUserIdFromToken(string token)
        {
            var claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out var _);

            return claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        }
    }
}
