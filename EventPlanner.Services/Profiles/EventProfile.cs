namespace EventPlanner.Services.Profiles
{
    using Data.Models;
    using Models.Event;
    using static Common.Formats.EventFormats;

    using System.Globalization;

    using AutoMapper;

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
