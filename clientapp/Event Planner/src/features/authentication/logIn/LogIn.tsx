import { FacebookAuth } from 'features/authentication/facebook/FacebookAuth';
import { useLogin } from 'features/authentication/logIn/hooks/useLogin';
import { Button } from 'features/common/button/Button';
import { Textfield } from 'features/common/form/Textfield';
import { routePaths } from 'infrastructure/routing/routePaths';
import { generateUniqueUuid } from 'infrastructure/utilities/generateUniqueUuid';
import { Link } from 'react-router-dom';

export const LogIn = () => {
  const { isError, errors, control, onSubmit } = useLogin();

  return (
    <div className="h-full min-h-screen flex bg-gradient-to-l from-light-blue to-background-light to-blue-500">
      <div className="xl:max-w-4xl xl:m-auto w-full grid grid-cols-2 rounded-2xl overflow-hidden bg-background-light">
        <img src="/images/sign-in.jpg" alt="free event image" />
        <form className="p-10 flex gap-7 flex-col justify-center" onSubmit={onSubmit}>
          <h2 className="text-4xl mb-10">Login Form</h2>
          <Textfield control={control} name="userName" label="Username" />
          <Textfield control={control} name="password" label="Password" type="password" />
          <p className="shadow-text-light">
            Dont have an account?{' '}
            <Link
              className="hover:underline text-primary-dark"
              to={routePaths.signup.path}
            >
              Sign up here
            </Link>
          </p>
          <Button label="Login" type="submit" />
          <FacebookAuth />
          {isError &&
            errors?.length !== 0 &&
            errors?.map((e) => (
              <p className="text-primary-light" key={generateUniqueUuid()}>
                {e.description}
              </p>
            ))}
        </form>
      </div>
    </div>
  );
};
