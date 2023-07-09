namespace EventPlanner.Services.Contracts
{
    using Models.Category;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICategoryService
    {
        public Task<IEnumerable<CategoryDto>> GetAllAsync();
    }
}
