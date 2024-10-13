import { FacebookAuth } from 'features/authentication/facebook/FacebookAuth';
import { useRegister } from 'features/authentication/register/hooks/useRegister';
import { Button } from 'features/common/button/Button';
import { TextField } from 'features/common/form/TextField';

export const Register = () => {
  const { control, onSubmit } = useRegister();
  return (
    <div className="h-full min-h-screen flex bg-gradient-to-l from-light-blue to-background-light to-blue-500">
      <div className="xl:max-w-4xl xl:m-auto w-full grid grid-cols-2 rounded-2xl overflow-hidden bg-background-light">
        <img src="/images/sign-up.jpg" alt="free event image" />
        <form className="p-10 flex gap-7 flex-col justify-center" onSubmit={onSubmit}>
          <h2 className="text-4xl mb-10">Register Form</h2>
          <TextField name="userName" control={control} label="Username" />
          <TextField name="email" control={control} label="Email" />
          <TextField name="password" control={control} type="password" label="Password" />
          <TextField
            name="repeatPassword"
            control={control}
            type="password"
            label="Repeat password"
          />
          <Button label="Register" type="submit" />
          <FacebookAuth />
        </form>
      </div>
    </div>
  );
};
