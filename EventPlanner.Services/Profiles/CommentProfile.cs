namespace EventPlanner.Services.Profiles
{
    using Data.Models;
    using Models.Comment;
    using static EventPlanner.Services.Common.Formats;

    using AutoMapper;

    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<Comment, CommentDto>()
                .ForMember(x => x.LastUpdated, c => c.MapFrom(y => y.LastUpdated.ToString(DateFormats.DateTimeFormat)))
                .ForMember(x => x.UserName, c => c.MapFrom(y => y.User.UserName));
        }
    }
}
