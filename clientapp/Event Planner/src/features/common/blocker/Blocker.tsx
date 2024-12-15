import { Loader } from '../loader/Loader';

export const Blocker = () => {
  return (
    <div className="w-screen h-screen fixed grid place-items-center bg-blocker-color">
      <Loader className="w-20 h-20" />
    </div>
  );
};
