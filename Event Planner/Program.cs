namespace EventPlanner
{
    using Data;
    using Data.Models;
    using Services.Implementations;
    using Services.Contracts;
    using Services.Profiles;
    using EmailSender;
    using EmailSender.Contracts;
    using EmailService = Services.Implementations.EmailService;
    using Common;

    using System.Text;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.IdentityModel.Tokens;

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            #region Default Services Configurations

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddCors();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            #endregion

            #region Project Specific Configurations

            var connectionString = builder.Configuration.GetConnectionString(WebConstants.DefaultConnection);

            ConfigureDbContext(builder.Services, connectionString);

            ConfigureServices(builder.Services);

            ConfigureAutoMapper(builder.Services);

            #endregion

            #region Identity Setup

            ConfigureIdentity(builder.Services, builder.Configuration);

            #endregion

            #region Email Service Setup

            ConfigureEmailService(builder);

            #endregion


            var app = builder.Build();

            #region Configure Cors

            var clientAppHost = builder.Configuration.GetValue<string>(WebConstants.ClientAppHost);

            app.UseCors(options => options.WithOrigins(clientAppHost).AllowAnyHeader().AllowCredentials().AllowAnyMethod());

            #endregion

            #region Default Application Setup

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();

            #endregion
        }

        private static void ConfigureIdentity(IServiceCollection services, ConfigurationManager configuration)
        {
            var validAudience = configuration.GetValue<string>("Jwt:Audience");
            var validIssuer = configuration.GetValue<string>("Jwt:Issuer");
            var validKey = configuration.GetValue<string>("Jwt:Key");

            services
            .AddIdentityCore<User>(options =>
                {
                    options.SignIn.RequireConfirmedAccount = false;
                    options.User.RequireUniqueEmail = true;
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 6;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireLowercase = false;
                })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<EventPlannerDbContext>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                { 
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidAudience = validAudience,
                        ValidIssuer = validIssuer,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(validKey))
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = (ctx) =>
                        {
                            ctx.Request.Cookies.TryGetValue(Constants.AccessTokenCookieName, out var accessToken);

                            if (string.IsNullOrWhiteSpace(accessToken)) return Task.CompletedTask;

                            ctx.Token = accessToken;

                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddAuthorization();
        }

        private static void ConfigureServices(IServiceCollection services)
        {
            services.AddDataProtection();

            services.AddScoped<IEventService, EventService>();

            services.AddScoped<IEmailSender, EmailSender.Implementations.EmailSender>();

            services.AddScoped<IAttendeeService, AttendeeService>();

            services.AddScoped<IJsonService, JsonService>();

            services.AddScoped<IEmailService, EmailService>();

            services.AddScoped<ICategoryService, CategoryService>();

            services.AddScoped<INotificationService, NotificationService>();

            services.AddScoped<IUserService, UserService>();

            services.AddScoped<IIdentityService, IdentityService>();

            services.AddScoped<ICommentService, CommentService>();

            services.AddScoped<IFacebookAuthService, FacebookAuthService>();

            services.AddScoped<ITokenService, TokenService>();

            services.AddScoped<ILinkService, LinkService>();

            services.AddHttpClient();
        }

        private static void ConfigureAutoMapper(IServiceCollection services)
        {
            services.AddAutoMapper(configAction =>
            {
                configAction.AddProfile<EventProfile>();

                configAction.AddProfile<AttendeeProfile>();

                configAction.AddProfile<CategoryProfile>();

                configAction.AddProfile<NotificationProfile>();

                configAction.AddProfile<UserProfile>();

                configAction.AddProfile<CommentProfile>();

                configAction.AddProfile<LinkProfile>();
            });
        }

        private static void ConfigureDbContext(IServiceCollection services, string? connectionString)
        {
            if (string.IsNullOrEmpty(connectionString)) throw new ArgumentException($"Invalid connection string: {connectionString}");

            services.AddDbContext<EventPlannerDbContext>(options => options.UseSqlServer(connectionString));
        }

        private static void ConfigureEmailService(WebApplicationBuilder builder)
        {
            var emailConfig = builder.Configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>();

            builder.Services.AddSingleton(emailConfig);
        }
    }
}