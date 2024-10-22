namespace EventPlanner.Data
{
    using Models;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

    public class EventPlannerDbContext : IdentityDbContext<User>
    {
        public DbSet<Event> Events { get; set; } = null!;

        public DbSet<Attendee> Attendees { get; set; } = null!;

        public DbSet<Category> Categories { get; set; } = null!;

        public DbSet<Notification> Notifications { get; set; } = null!;

        public DbSet<Comment> Comments { get; set; } = null!;

        public DbSet<Link> Links { get; set; } = null!;

        public EventPlannerDbContext(DbContextOptions<EventPlannerDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .Property(u => u.RegistrationDate)
                .HasDefaultValueSql("getdate()");

            builder.Entity<Link>()
                .Property(l => l.CreatedOn)
                .HasDefaultValueSql("getDate()");

            builder.Entity<Event>()
                .HasMany(e => e.Comments)
                .WithOne(c => c.Event)
                .OnDelete(DeleteBehavior.NoAction);

            base.OnModelCreating(builder);
        }
    }
}