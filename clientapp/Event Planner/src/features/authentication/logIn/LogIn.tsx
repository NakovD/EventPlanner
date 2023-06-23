import { Button } from 'features/common/button/Button';

export const LogIn = () => {
  return (
    <div className="xl:max-w-4xl xl:m-auto w-full grid grid-cols-2">
      <img src="/images/sign-up.jpg" alt="free event image" />
      <form className="p-10 flex gap-10 flex-col justify-center">
        <h2 className="text-4xl mb-10">Login</h2>
        <div className="form-row">
          <input
            type="text"
            name="full-name"
            id="full-name"
            className="input-text"
            placeholder="Your Name"
          />
        </div>

        <div className="form-row">
          <input
            type="password"
            name="password"
            id="password"
            className="input-text"
            placeholder="Password"
          />
        </div>

        <Button label="Login" isSubmit={true} />
      </form>
    </div>
  );
};
