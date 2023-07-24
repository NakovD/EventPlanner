namespace EventPlanner.Services.Contracts
{
    using Models.User;

    public interface IUserService
    {
        public Task<IEnumerable<UserAdminDto>> GetAllUsersAsync();

        Task<bool> DeleteUserAsync(string userId);
    }
}
