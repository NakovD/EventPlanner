import { Button } from 'features/common/button/Button';
import { TextField } from 'features/common/form/TextField';

export const LogIn = () => {
  return (
    <div className="h-full min-h-screen flex bg-gradient-to-l from-light-blue to-background-light to-blue-500">
      <div className="xl:max-w-4xl xl:m-auto w-full grid grid-cols-2 rounded-2xl overflow-hidden bg-background-light">
        <img src="/images/sign-in.jpg" alt="free event image" />
        <form className="p-10 flex gap-7 flex-col justify-center">
          <h2 className="text-4xl mb-10">Login Form</h2>
          <TextField label="Username" />
          <TextField label="Password" />
          <Button label="Register" isSubmit={true} />
        </form>
      </div>
    </div>
  );
};
