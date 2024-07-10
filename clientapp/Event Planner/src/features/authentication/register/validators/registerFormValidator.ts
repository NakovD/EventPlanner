import * as yup from 'yup';

export const registerValidationSchema = yup.object({
  userName: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  repeatPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});
