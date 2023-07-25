namespace EventPlanner.Services.Implementations
{
    using Contracts;
    using Models.User;
    using Data.Models;

    using System.Threading.Tasks;

    using AutoMapper.QueryableExtensions;
    using AutoMapper;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;

    public class UserService : IUserService
    {
        private readonly UserManager<User> userManager;

        private readonly IMapper mapper;

        public UserService(UserManager<User> userManager, IMapper mapper)
        {
            this.userManager = userManager;
            this.mapper = mapper;
        }

        public async Task<bool> DeleteUserAsync(string userId)
        {
            var neededUser = await userManager.FindByIdAsync(userId);

            if (neededUser == null) return false;

            await userManager.DeleteAsync(neededUser);

            return true;
        }

        public async Task<IEnumerable<UserDto>> GetAllAttendeeUsersAsync() => await userManager.Users
            .AsNoTracking()
            .ProjectTo<UserDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        public async Task<IEnumerable<UserAdminDto>> GetAllUsersAsync() => await userManager.Users
                .AsNoTracking()
                .Include(u => u.Events)
                .ProjectTo<UserAdminDto>(mapper.ConfigurationProvider)
                .ToListAsync();
    }
}
