namespace EventPlanner.Results
{
    using Common.Contracts;

    using Microsoft.AspNetCore.Identity;

    public class AuthenticationResult<T> : IResult<T, IdentityError> where T : class
    {
        public bool Succeeded { get; set; }

        public int RequestCode { get; set; }

        public T? Result { get; set; } = null!;

        public IEnumerable<IdentityError> Errors { get; set; } = new List<IdentityError>();
    }


    
}
