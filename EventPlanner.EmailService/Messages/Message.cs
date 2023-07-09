namespace EventPlanner.EmailSender.Messages
{
    using MimeKit;
    using System.Collections.Generic;
    using System.Linq;

    public class Message
    {
        public List<MailboxAddress> To { get; set; }

        public string Subject { get; set; } = null!;

        public string Body { get; set; } = null!;

        public Message(IEnumerable<string> to, string subject, string content)
        {
            To = new List<MailboxAddress>();

            To.AddRange(to.Select(e => new MailboxAddress("email", e)));
            
            Subject = subject;
            Body = content;
        }
    }
}
