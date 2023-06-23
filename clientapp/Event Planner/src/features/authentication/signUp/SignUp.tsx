import { Button } from 'features/common/button/Button';
import { TextField } from 'features/common/form/TextField';

export const SignUp = () => {
  return (
    <div className="h-full flex bg-gradient-to-l from-light-blue to-background-light to-blue-500">
      <div className="xl:max-w-4xl xl:m-auto w-full grid grid-cols-2 rounded-2xl overflow-hidden bg-background-light">
        <img src="/images/sign-up.jpg" alt="free event image" />
        <form className="p-10 flex gap-10 flex-col justify-center">
          <h2 className="text-4xl mb-10">Register Form</h2>
          <TextField label="Username" />
          <TextField label="Email" />
          <TextField label="Password" />
          <TextField label="Repeat password" />
          <Button label="Register" isSubmit={true} />
        </form>
      </div>
    </div>
  );
};
