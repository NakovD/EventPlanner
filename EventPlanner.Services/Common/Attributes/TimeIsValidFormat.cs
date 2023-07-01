namespace EventPlanner.Services.Common.Attributes
{
    using static Common.ErrorMessages.EventErrorMessages;

    using System.ComponentModel.DataAnnotations;
    using System.Text.RegularExpressions;

    public class TimeIsValidFormat : ValidationAttribute
    {
        private readonly string format = "^[\\d]{2}:[\\d]{2}$";

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var time = (string?)value;

            if (time == null) return new ValidationResult(InvalidTime);

            var regex = new Regex(format);

            var isValid = regex.IsMatch(time);

            if (!isValid) return new ValidationResult(InvalidTimeFormat);

            return ValidationResult.Success;
        }

    }
}
