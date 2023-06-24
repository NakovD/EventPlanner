namespace EventPlanner
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;

    using Data;

    using Services.Implementations;
    using Services.Contracts;
    using Services.Profiles;

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

            #endregion

            var app = builder.Build();

            #region Configure Cors

            var clientAppHost = builder.Configuration.GetValue<string>(WebConstants.ClientAppHost);

            app.UseCors(options => options.WithOrigins(clientAppHost).AllowAnyMethod());

            #endregion

            #region Default Application Setup

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();

            #endregion
        }

        private static void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(configAction => configAction.AddProfile<EventProfile>());

            services.AddScoped<IEventService, EventService>();
        }

        private static void ConfigureDbContext(IServiceCollection services, string? connectionString)
        {
            if (string.IsNullOrEmpty(connectionString)) throw new ArgumentException($"Invalid connection string: {connectionString}");

            services.AddDbContext<EventPlannerDbContext>(options => options.UseSqlServer(connectionString));
        }
    }
}