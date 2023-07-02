namespace EventPlanner.Services.Common.Attributes
{
    using static Common.ErrorMessages.EventErrorMessages;
    using static Common.Formats.EventFormats;

    using System.ComponentModel.DataAnnotations;
    using System.Globalization;

    public class DateGreaterThanToday : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var date = (string?)value;

            var isValidDate = DateTime.TryParseExact(date, DateFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out var validDate);

            if (!isValidDate) return new ValidationResult(InvalidDate);

            var isBeforeToday = validDate < DateTime.Today;

            if (isBeforeToday) return new ValidationResult(DateIsBeforeToday);

            return ValidationResult.Success;
        }
    }
}
