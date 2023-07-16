namespace EventPlanner.Services.Implementations
{
    using Data;
    using Services.Contracts;
    using Services.Models.Category;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    using AutoMapper;
    using AutoMapper.QueryableExtensions;

    using Microsoft.EntityFrameworkCore;

    public class CategoryService : ICategoryService
    {
        private readonly EventPlannerDbContext dbContext;

        private readonly IMapper mapper;

        public CategoryService(EventPlannerDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllAsync() => await dbContext
            .Categories
            .AsNoTracking()
            .ProjectTo<CategoryDto>(mapper.ConfigurationProvider)
            .ToListAsync();
    }
}
