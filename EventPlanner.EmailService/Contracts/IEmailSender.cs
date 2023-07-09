namespace EventPlanner.EmailSender.Contracts
{
    using Messages;

    public interface IEmailSender
    {
        Task SendEmailAsync(Message message);
    }
}
