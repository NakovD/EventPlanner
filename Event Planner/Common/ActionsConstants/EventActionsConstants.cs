namespace EventPlanner.Common.ActionsConstants
{
    public static class EventActionsConstants
    {
        public const string GetAll = "All";

        public const string GetAllForAdmin = "All-Administration";

        public const string GetUserEvents = "User";

        public const string GetById = "{id}";

        public const string Create = "Create";

        public const string Edit = "Edit/{id}";

        public const string GetForExternalAttendee = "AttendeeOnly/{encryptedData}";

        public const string Delete = "Delete/{id}";

        public const string Restore = "Restore/{id}";
    }
}
