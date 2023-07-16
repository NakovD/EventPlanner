namespace EventPlanner.Services.Profiles
{
    using Data.Models;
    using Models.Notification;
    using static Common.Formats.DateFormats;
    
    using AutoMapper;

    public class NotificationProfile : Profile
    {
        public NotificationProfile()
        {
            CreateMap<Notification, NotificationDto>()
                .ForMember(n => n.CreatedAt, y => y.MapFrom(x => x.CreatedAt.ToString(DateFormat)))
                .ForMember(n => n.IsReaded, y => y.MapFrom(x => x.ReadStatus));
        }
    }
}
