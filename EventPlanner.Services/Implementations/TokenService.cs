namespace EventPlanner.Services.Implementations
{
    using EventPlanner.Services.Contracts;

    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Security.Cryptography;
    using System.Text;
    using System.Threading.Tasks;
    
    using Microsoft.Extensions.Configuration;
    using Microsoft.IdentityModel.Tokens;
    using EventPlanner.Common;

    public class TokenService : ITokenService
    { 
        private readonly IConfiguration configuration;

        private readonly JwtSecurityTokenHandler tokenHandler;

        private readonly TokenValidationParameters validationParameters;

        private readonly SigningCredentials signingCredentials;

        public TokenService(IConfiguration configuration)
        {
            this.configuration = configuration;
            var jwtKey = this.GetJwtKey();
            tokenHandler = new JwtSecurityTokenHandler();
            validationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidAudience = configuration["Jwt:Audience"],
                ValidIssuer = configuration["Jwt:Issuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
            };

            this.signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtKey)
                ),
                SecurityAlgorithms.HmacSha256
            );
        }

        public string CreateAccessToken(IEnumerable<Claim> claims)
        {
            var expiration = DateTime.Now.AddMinutes(Constants.AccessTokenExpirationTimeInMinutes);

            var accessToken = new JwtSecurityToken(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: expiration,
                signingCredentials: this.signingCredentials
            );

            return tokenHandler.WriteToken(accessToken);
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);

                return Convert.ToBase64String(randomNumber);
            }
        }

        public ClaimsPrincipal ValidateExpiredToken(string token)
        {
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = false,
                ValidateIssuerSigningKey = true,
                ValidAudience = configuration["Jwt:Audience"],
                ValidIssuer = configuration["Jwt:Issuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.GetJwtKey()))
            }, out var validatedToken);

            var jwtSecurityToken = validatedToken as JwtSecurityToken;

            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new ApplicationException("Invalid token");
            }

            return principal;
        }

        public async Task<(bool isTokenValid, ClaimsPrincipal?)> ValidateTokenAsync(string token)
        {
            var validateTokenResult = await tokenHandler.ValidateTokenAsync(token, this.validationParameters);

            var isTokenValid = validateTokenResult.IsValid;

            if (!isTokenValid) return (isTokenValid, null);

            return (isTokenValid, new ClaimsPrincipal(validateTokenResult.ClaimsIdentity));
        }

        private string GetJwtKey()
        {
            var key = this.configuration["Jwt:Key"];

            if (string.IsNullOrWhiteSpace(key))
            {
                throw new ApplicationException("No jwt Key was provided!");
            }

            return key;
        }
    }
}
