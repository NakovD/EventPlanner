namespace EventPlanner.Services.Profiles
{
    using AutoMapper;
    using EventPlanner.Data.Models;
    using EventPlanner.Services.Models.Link;

    public class LinkProfile : Profile
    {
        public LinkProfile()
        {
            CreateMap<Link, LinkDto>();
        }
    }
}
