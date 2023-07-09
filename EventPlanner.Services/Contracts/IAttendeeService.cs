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

        Task<bool> UpdateAttendeeStatus(int id, int newStatus, string userId);
    }
}
