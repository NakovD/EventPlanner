namespace EventPlanner.Services.Implementations
{
    using Contracts;
    using Data;
    using Data.Models;
    using Models.Comment;

    using AutoMapper;
    using AutoMapper.QueryableExtensions;

    using Microsoft.EntityFrameworkCore;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class CommentService : ICommentService
    {
        private readonly EventPlannerDbContext dbContext;

        private readonly IMapper mapper;

        public CommentService(EventPlannerDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<bool> CreateAsync(string userId, CommentFormDto dto)
        {
            var isEventValidEvent = await dbContext.Events.AnyAsync(e => e.Id == dto.EventId);

            if (!isEventValidEvent) return false;

            var comment = new Comment
            {
                EventId = dto.EventId,
                Content = dto.Content,
                LastUpdated = DateTime.Now,
                UserId = userId,
            };

            try
            {
                await dbContext.Comments.AddAsync(comment);
                await dbContext.SaveChangesAsync();
            }
            catch (OperationCanceledException)
            {
                return false;
            }

            return true;
        }

        public async Task<bool> EditAsync(int commentId, string userId, CommentFormDto dto)
        {
            var comment = await dbContext.Comments.FindAsync(commentId);

            if (comment == null) return false;

            var canEdit = comment.UserId == userId;

            if (!canEdit) return false;

            comment.Content = dto.Content;

            comment.LastUpdated = DateTime.Now;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (OperationCanceledException)
            {
                return false;
            }

            return true;
        }

        public async Task<IEnumerable<CommentDto>> GetAllAsync(int eventId) => await dbContext.Comments
            .AsNoTracking()
            .Include(c => c.User)
            .Where(c => !c.IsDeleted && c.EventId == eventId)
            .ProjectTo<CommentDto>(mapper.ConfigurationProvider)
            .ToListAsync();
    }
}
