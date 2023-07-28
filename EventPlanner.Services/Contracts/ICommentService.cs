namespace EventPlanner.Services.Contracts
{
    using Models.Comment;

    public interface ICommentService
    {
        Task<IEnumerable<CommentDto>> GetAllAsync(int eventId);

        Task<bool> CreateAsync(string userId, CommentFormDto dto);

        Task<bool> EditAsync(int commentId, string userId, CommentFormDto dto);

        Task<bool> DeleteAsync(int commentId, string userId);
    }
}
