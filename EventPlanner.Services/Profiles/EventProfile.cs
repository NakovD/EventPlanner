namespace EventPlanner.Services.Profiles
{
    using Models;
    using Data.Models;

    using AutoMapper;
    using EventPlanner.Services.Models.Event;
    using static Common.Formats.EventFormats;
    using System.Globalization;

    public class EventProfile : Profile
    {
        public EventProfile()
        {
            CreateMap<Event, EventDto>();
            CreateMap<CreateEventDto, Event>()
                .ForMember(x => x.Date, y => y.MapFrom(x => DateTime.ParseExact(x.Date, DateFormat, CultureInfo.InvariantCulture)));
        }
    }
}
