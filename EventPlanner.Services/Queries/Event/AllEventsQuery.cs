namespace EventPlanner.Services.Queries.Event
{
    using Enums;

    public class AllEventsQuery
    {
        public string SearchString { get; set; } = string.Empty;

        public int? CategoryId { get; set; }

        public EventTitleSortType SortDirection { get; set; } = EventTitleSortType.Ascending;
    }
}
