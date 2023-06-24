namespace EventPlanner
{
    using Data;

    using Services.Implementations;
    using Services.Contracts;
    using Microsoft.EntityFrameworkCore;
    using AutoMapper;
    using EventPlanner.Services.Profiles;

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            #region Project Specific Configurations

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            ConfigureDbContext(builder.Services, connectionString);

            ConfigureServices(builder.Services);

            #endregion

            var app = builder.Build();

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