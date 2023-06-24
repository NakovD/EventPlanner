namespace EventPlanner.Data
{
    using Models;
    using Microsoft.EntityFrameworkCore;

    public class EventPlannerDbContext : DbContext
    {
        public DbSet<Event> Events { get; set; } = null!;

        public DbSet<User> Users { get; set; } = null!;


        public EventPlannerDbContext(DbContextOptions<EventPlannerDbContext> options) : base(options)
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>().
              HasData(Seeder.SeedUsers());

            builder.Entity<Event>()
                .HasData(Seeder.SeedEvents());
        }
    }
}