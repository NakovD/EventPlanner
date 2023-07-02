import * as yup from 'yup';

export const eventValidationSchema = yup.object({
  title: yup.string().required().max(50),
  description: yup.string().required().max(250),
  location: yup.string().required().max(30),
  time: yup
    .string()
    .required()
    .matches(new RegExp(/^[\d]{2}:[\d]{2}$/g), {
      message: 'The time field should match the following pattern: hh:mm',
    }),
  category: yup.string().required(),
  date: yup
    .string()
    .required()
    .matches(new RegExp(/^[0-9]{2}[/\-\\.]+[\d]{2}[/\-\\.][\d]{4}$/g), {
      message: 'The date field should match the following pattern: dd/MM/yyyy',
    }),
  image: yup.string().required().url().max(200),
});
