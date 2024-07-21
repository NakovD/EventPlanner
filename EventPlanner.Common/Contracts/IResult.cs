namespace EventPlanner.Common.Contracts
{
    using System.Net;

    public interface IResult<T, TError>
    {
        public bool Succeeded { get; set; }

        public HttpStatusCode RequestStatusCode { get; set; }

        public T? Result { get; set; }

        public IEnumerable<TError> Errors { get; set; }
    }
}
