namespace EventPlanner.Services.Profiles
{
    using Models;
    using Data.Models;

    using AutoMapper;
    using EventPlanner.Services.Models.Event;

    public class EventProfile : Profile
    {
        public EventProfile()
        {
            CreateMap<Event, EventDto>();
        }
    }
}
