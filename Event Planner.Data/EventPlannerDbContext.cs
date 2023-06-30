namespace EventPlanner.Data
{
    using Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

    public class EventPlannerDbContext : IdentityUserContext<IdentityUser>
    {
        public DbSet<Event> Events { get; set; } = null!;

        public EventPlannerDbContext(DbContextOptions<EventPlannerDbContext> options) : base(options)
        {
            //Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Event>()
                .HasData(Seeder.SeedEvents());
        }
    }
}