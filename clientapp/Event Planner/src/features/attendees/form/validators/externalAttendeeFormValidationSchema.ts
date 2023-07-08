import * as yup from 'yup';

export const externalAttendeeFormValidationSchema = yup.object({
  attendeeEmail: yup.string().required().email(),
  attendeeName: yup.string().required(),
});
