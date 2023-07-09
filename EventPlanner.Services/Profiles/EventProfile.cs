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
            CreateMap<Event, EventDto>()
                .ForMember(x => x.Date, y => y.MapFrom(x => x.Date.ToString(DateFormat, CultureInfo.InvariantCulture)))
                .ForMember(x => x.Category, y => y.MapFrom(x => x.Category.Name));

            CreateMap<EventFormDto, Event>()
                .ForMember(x => x.Date, y => y.MapFrom(x => DateTime.ParseExact(x.Date, DateFormat, CultureInfo.InvariantCulture)));
        }
    }
}
