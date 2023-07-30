import { Skeleton } from '@mui/material';

type SkeletonType = 'text' | 'rectangular' | 'rounded' | 'circular';

interface IAppSkeletonProps {
  width: number;
  height: number;
  type?: SkeletonType;
}

export const AppSkeleton = ({ width, height, type = 'rounded' }: IAppSkeletonProps) => {
  return <Skeleton variant={type} width={width} height={height} />;
};
