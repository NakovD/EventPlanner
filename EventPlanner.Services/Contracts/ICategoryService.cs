namespace EventPlanner.Services.Contracts
{
    using Models.Category;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICategoryService
    {
        public Task<IEnumerable<CategoryDto>> GetAllAsync();

        public Task<bool> CreateAsync(CategoryFormDto dto);

        public Task<bool> UpdateAsync(CategoryFormDto dto);

        public Task<bool> MarkAsDeletedAsync(int id);
    }
}
