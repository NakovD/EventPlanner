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
    using EventPlanner.Data.Models;

    public class CategoryService : ICategoryService
    {
        private readonly EventPlannerDbContext dbContext;

        private readonly IMapper mapper;

        public CategoryService(EventPlannerDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<bool> CreateAsync(CategoryFormDto dto)
        {
            var newCategory = new Category
            {
                Name = dto.Name,
                LastUpdated = DateTime.Now,
            };

            try
            {
                await dbContext.Categories.AddAsync(newCategory);
                await dbContext.SaveChangesAsync();
            }
            catch (OperationCanceledException)
            {
                return false;
            }

            return true;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllAsync() => await dbContext
            .Categories
            .AsNoTracking()
            .Where(c => !c.IsDeleted)
            .ProjectTo<CategoryDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        public async Task<bool> MarkAsDeletedAsync(int id)
        {
            var neededCategory = await dbContext.Categories.FindAsync(id);

            if (neededCategory == null) return false;

            neededCategory.IsDeleted = true;
            neededCategory.LastUpdated = DateTime.Now;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (OperationCanceledException)
            {
                return false;
            }

            return true;
        }

        public async Task<bool> UpdateAsync(CategoryFormDto dto)
        {
            var neededCategory = await dbContext.Categories.FindAsync(dto.Id);

            if (neededCategory == null) return false;

            neededCategory.Name = dto.Name;
            neededCategory.LastUpdated = DateTime.Now;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (OperationCanceledException)
            {
                return false;
            }

            return true;
        }
    }
}
