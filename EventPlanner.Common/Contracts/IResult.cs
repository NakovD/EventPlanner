namespace EventPlanner.Common.Contracts
{
    public interface IResult<T, TError>
    {
        public bool Succeeded { get; set; }

        public int RequestCode { get; set; }

        public T? Result { get; set; }

        public IEnumerable<TError> Errors { get; set; }
    }
}
