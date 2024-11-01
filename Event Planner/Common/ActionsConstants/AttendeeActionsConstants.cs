namespace EventPlanner.Common.ActionsConstants
{
    public static class AttendeeActionsConstants
    {
        public const string GetAllByEventId = "AllByEvent/{id}";

        public const string Create = "Create";

        public const string Delete = "Delete/{id}";

        public const string UpdateStatus = "UpdateStatus/{id}";

        public const string UpdateStatusExternal = "UpdateExternalStatus/{linkId}";

        public const string GetStatusExternal = "ExternalStatus/{linkId}";
    }
}
