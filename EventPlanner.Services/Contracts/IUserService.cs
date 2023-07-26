namespace EventPlanner.Services.Contracts
{
    using Models.Auth;
    using Models.User;

    using Microsoft.AspNetCore.Identity;

    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllAttendeeUsersAsync();

        Task<IEnumerable<UserAdminDto>> GetAllUsersAsync();

        Task<bool> DeleteUserAsync(string userId);
    }
}
