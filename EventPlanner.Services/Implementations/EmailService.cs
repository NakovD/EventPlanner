namespace EventPlanner.Services.Implementations
{
    using Contracts;
    using EventPlanner.EmailSender.Contracts;
    using EventPlanner.EmailSender.Messages;
    using static EventPlanner.EmailSender.EmailTextTemplates;


    using System.Threading.Tasks;

    public class EmailService : IEmailService
    {
        private readonly IEmailSender emailSender;

        public EmailService(IEmailSender emailSender)
        {
            this.emailSender = emailSender;
        }

        public async Task SendEmailInviteAsync(string receiver, string attendeeName, string eventName, string eventUrl, string linkId)
        {
            var validEmailUrl = PrepareEmailUrl(eventUrl, linkId);

            var message = GenerateInviteMessage(receiver, attendeeName, eventName, validEmailUrl);

            await emailSender.SendEmailAsync(message);
        }

        private Message GenerateInviteMessage(string receiver, string attendeeName, string eventName, string eventUrl)
        {
            var subject = string.Format(InviteEmailSubject, eventName);

            var body = string.Format(InviteEmailBody, attendeeName, eventName, eventUrl);

            var message = new Message(new string[] { receiver }, subject, body);

            return message;
        }

        private string PrepareEmailUrl(string eventUrl, string linkId)
        {
            var formattedUrl = eventUrl.Replace(":id", "");

            return $"{formattedUrl}{linkId}";
        }
    }
}
