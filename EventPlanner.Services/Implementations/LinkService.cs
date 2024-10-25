namespace EventPlanner.Services.Implementations
{
    using AutoMapper;
    using EventPlanner.Data;
    using EventPlanner.Data.Models;
    using EventPlanner.Services.Contracts;
    using EventPlanner.Services.Models.Link;
    using Microsoft.EntityFrameworkCore;

    public class LinkService : ILinkService
    {
        private readonly EventPlannerDbContext dbContext;

        private readonly IMapper mapper;

        public LinkService(EventPlannerDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<(bool isSuccess, string? linkId)> CreateAsync(int attendeeId, DateTime validTo)
        {
            var link = new Link
            {
                Id = Guid.NewGuid().ToString(),
                AttendeeId = attendeeId,
                ValidTo = validTo,
            };

            try
            {
                await this.dbContext.Links.AddAsync(link);
                await this.dbContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                return (false, null);
            }

            return (true, link.Id);
        }

        public async Task<LinkDto?> GetAsync(string linkId)
        {
            var neededLink = await this.dbContext.Links.SingleOrDefaultAsync(l => l.Id == linkId);
            
            return this.mapper.Map<LinkDto?>(neededLink);
        }
    }
}
