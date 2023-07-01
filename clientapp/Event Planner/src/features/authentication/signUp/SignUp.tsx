import { useRegister } from 'features/authentication/signUp/hooks/useRegister';
import { IRegisterForm } from 'features/authentication/signUp/models/registerForm';
import { Button } from 'features/common/button/Button';
import { TextField } from 'features/common/form/TextField';
import { propertyOf } from 'infrastructure/utilities/propertyOf';

export const SignUp = () => {
  const { control, onSubmit } = useRegister();
  return (
    <div className="h-full min-h-screen flex bg-gradient-to-l from-light-blue to-background-light to-blue-500">
      <div className="xl:max-w-4xl xl:m-auto w-full grid grid-cols-2 rounded-2xl overflow-hidden bg-background-light">
        <img src="/images/sign-up.jpg" alt="free event image" />
        <form className="p-10 flex gap-7 flex-col justify-center" onSubmit={onSubmit}>
          <h2 className="text-4xl mb-10">Register Form</h2>
          <TextField
            name={propertyOf<IRegisterForm>('userName')}
            control={control}
            label="Username"
          />
          <TextField
            name={propertyOf<IRegisterForm>('email')}
            control={control}
            label="Email"
          />
          <TextField
            name={propertyOf<IRegisterForm>('password')}
            control={control}
            label="Password"
          />
          <TextField
            name={propertyOf<IRegisterForm>('repeatPassword')}
            control={control}
            label="Repeat password"
          />
          <Button label="Register" isSubmit={true} />
        </form>
      </div>
    </div>
  );
};
