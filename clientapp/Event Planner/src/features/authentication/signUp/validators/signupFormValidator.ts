import * as yup from 'yup';

export const signUpValidationSchema = yup.object({
  userName: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().min(6),
  repeatPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
});
