namespace EventPlanner.EmailService
{
    public static class EmailTextTemplates
    {
        public const string InviteEmailSubject = "Event Planer App - Event Invite for {0}";

        public const string InviteEmailBody = "Hi {0}, \n \nYou have been invited to {1} event. \n\n You can check the event and change your status here:{2} \n \nPlease answer! \nKindly\n \nEvent Planner App team!";
    }
}
