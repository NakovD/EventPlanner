namespace EventPlanner.Services.Contracts
{
    using Models.Attendee;

    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IAttendeeService
    {
        Task<IEnumerable<AttendeeDto>> GetAllByEventAsync(int eventId);

        Task<bool> CreateAttendeeAsync(AttendeeFormDto attendeeDto);
    }
}
