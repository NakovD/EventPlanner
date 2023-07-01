import { CircularProgress, Typography } from '@mui/material';
import { useLogin } from 'features/authentication/logIn/hooks/useLogin';
import { ILoginForm } from 'features/authentication/logIn/models/loginForm';
import { Button } from 'features/common/button/Button';
import { TextField } from 'features/common/form/TextField';
import { propertyOf } from 'infrastructure/utilities/propertyOf';

export const LogIn = () => {
  const { isLoading, isError, error, control, onSubmit } = useLogin();

  return (
    <div className="h-full min-h-screen flex bg-gradient-to-l from-light-blue to-background-light to-blue-500">
      <div className="xl:max-w-4xl xl:m-auto w-full grid grid-cols-2 rounded-2xl overflow-hidden bg-background-light">
        <img src="/images/sign-in.jpg" alt="free event image" />
        <form className="p-10 flex gap-7 flex-col justify-center" onSubmit={onSubmit}>
          <h2 className="text-4xl mb-10">Login Form</h2>
          <TextField
            control={control}
            name={propertyOf<ILoginForm>('userName')}
            label="Username"
          />
          <TextField
            control={control}
            name={propertyOf<ILoginForm>('password')}
            label="Password"
          />
          <Button label="Login" isSubmit={true} />
          {isLoading && <CircularProgress color="secondary" />}
          {isError && error && <Typography color={'red'}>{error}</Typography>}
        </form>
      </div>
    </div>
  );
};
