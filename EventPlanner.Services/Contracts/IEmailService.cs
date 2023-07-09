namespace EventPlanner.Services.Contracts
{
    using System.Threading.Tasks;

    public interface IEmailService
    {
        Task SendEmailInviteAsync(string receiver, string attendeeName, string eventName, string eventUrl, string protectedData);
    }
}
