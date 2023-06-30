namespace EventPlanner.Services.Profiles
{
    using Models;
    using Data.Models;

    using AutoMapper;

    public class EventProfile : Profile
    {
        public EventProfile()
        {
            CreateMap<Event, EventDto>();
        }
    }
}
