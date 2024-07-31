namespace EventPlanner.Common.ActionsConstants
{
    public static class IdentityActionsConstants
    {
        public const string Register = "Register";

        public const string Login = "Login";

        public const string Authenticate = "Authenticate/{token}";

        public const string LoginWithFacebook = "LoginWithFacebook";

        public const string RefreshAuth = "Refresh";

        public const string LogOut = "Logout";
    }
}
