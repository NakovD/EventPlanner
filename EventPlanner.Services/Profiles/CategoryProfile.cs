namespace EventPlanner.Services.Profiles
{
    using Data.Models;
    using Models.Category;

    using AutoMapper;

    public class CategoryProfile : Profile
    {

        public CategoryProfile()
        {
            CreateMap<Category, CategoryDto>();
        }
    }
}
