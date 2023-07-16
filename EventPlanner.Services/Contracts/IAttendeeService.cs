namespace EventPlanner.Services.Contracts
{
    using Data.Enums;
    using Models.Attendee;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IAttendeeService
    {
        Task<IEnumerable<AttendeeDto>> GetAllByEventAsync(int eventId);

        Task<(bool, int)> CreateAttendeeAsync(AttendeeFormDto dto);

        Task<bool> UpdateAttendeeStatusAsync(int id, int newStatus, string userId);

        Task<bool> UpdateExternalAttendeeStatusAsync(int id, int newStatus);

        Task<int> GetExternalAttendeeStatusAsync(int id);
    }
}
