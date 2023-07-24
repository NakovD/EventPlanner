namespace EventPlanner.Services.Profiles
{
    using Models.User;
    using Data.Models;
    using static Common.Formats;
    
    using AutoMapper;

    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserAdminDto>()
                .ForMember(x => x.RegistrationDate, y => y.MapFrom(x => x.RegistrationDate.ToString(DateFormats.DateTimeFormat)))
                .ForMember(x => x.EventsCount, y => y.MapFrom(x => x.Events.Count));
        }
    }
}
