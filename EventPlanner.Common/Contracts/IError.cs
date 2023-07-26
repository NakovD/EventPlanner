namespace EventPlanner.Common.Contracts
{
    public interface IError
    {
        public string Code { get; set; }

        public string Description { get; set; }
    }
}
