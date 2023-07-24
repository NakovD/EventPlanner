import { CircularProgress } from '@mui/material';

export const Blocker = () => {
  return (
    <div className="w-screen h-screen fixed grid place-items-center bg-blocker-color">
      <CircularProgress sx={{ width: '80px !important;', height: '80px !important;' }} />
    </div>
  );
};
