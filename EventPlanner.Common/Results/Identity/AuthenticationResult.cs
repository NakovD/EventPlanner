namespace EventPlanner.Results
{
    using Common.Contracts;

    using Microsoft.AspNetCore.Identity;
    using System.Net;

    public class AuthenticationResult<T> : IResult<T, IdentityError> where T : class
    {
        public bool Succeeded { get; set; }

        public HttpStatusCode RequestStatusCode { get; set; }

        public T? Result { get; set; }

        public IEnumerable<IdentityError> Errors { get; set; } = new List<IdentityError>();
    }


    
}
