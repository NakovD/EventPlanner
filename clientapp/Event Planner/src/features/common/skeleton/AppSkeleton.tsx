import { Skeleton } from '@mui/material';

type SkeletonType = 'text' | 'rectangular' | 'rounded' | 'circular';

interface IAppSkeletonProps {
  width: number | 'full-width';
  height: number;
  type?: SkeletonType;
}

export const AppSkeleton = ({ width, height, type = 'rounded' }: IAppSkeletonProps) => (
  <Skeleton
    variant={type}
    width={width === 'full-width' ? '100%' : width}
    height={height}
  />
);
