namespace EventPlanner.Services.Contracts
{
    using Models.User;

    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllAttendeeUsersAsync();

        Task<IEnumerable<UserAdminDto>> GetAllUsersAsync();

        Task<bool> DeleteUserAsync(string userId);
    }
}
