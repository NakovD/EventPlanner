namespace EventPlanner.EmailService.Contracts
{
    using Messages;

    public interface IEmailSender
    {
        Task SendEmailAsync(Message message);
    }
}
