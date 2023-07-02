namespace EventPlanner.Services.Profiles
{
    using Data.Models;
    using Models.Attendee;
    
    using AutoMapper;

    public class AttendeeProfile : Profile
    {
        public AttendeeProfile()
        {
            CreateMap<Attendee, AttendeeDto>();

            CreateMap<AttendeeFormDto, Attendee>();
        }
    }
}
