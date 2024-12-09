interface IAppSkeletonProps {
  width: number | 'full-width';
  height: number;
}

export const AppSkeleton = ({ width, height }: IAppSkeletonProps) => (
  <div
    className="animate-pulse bg-background-light opacity-75 rounded-3xl"
    style={{ width: width === 'full-width' ? '100%' : width, height }}
  />
);
