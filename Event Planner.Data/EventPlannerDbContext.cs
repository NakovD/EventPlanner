namespace EventPlanner.Data
{
    using Models;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

    public class EventPlannerDbContext : IdentityDbContext<User>
    {
        public DbSet<Event> Events { get; set; } = null!;

        public DbSet<Attendee> Attendees { get; set; } = null!;

        public EventPlannerDbContext(DbContextOptions<EventPlannerDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}