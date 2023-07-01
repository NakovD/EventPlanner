namespace EventPlanner.Services.Common.Attributes
{
    using System.ComponentModel.DataAnnotations;
    using static Common.ErrorMessages.EventErrorMessages;

    public class DateGreaterThanToday : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var date = (DateTime?)value;

            if (date == null) return new ValidationResult(InvalidDate);

            var isBeforeToday = date < DateTime.Today;

            if (isBeforeToday) return new ValidationResult(DateIsBeforeToday);

            return ValidationResult.Success;
        }
    }
}
