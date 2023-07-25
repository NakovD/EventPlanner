namespace EventPlanner.Services.Common
{
    public static class ValidationValues
    {
        public static class EventValidationValues
        {
            public const int TitleMaxLength = 50;

            public const int DescriptionMaxLength = 250;

            public const int LocationMaxLength = 30;

            public const int ImageLinkMaxLength = 200;
        }

        public static class CommentValidationsValues
        {
            public const int CommentMinLength = 3;

            public const int CommentMaxLength = 250;
        }
    }
}
