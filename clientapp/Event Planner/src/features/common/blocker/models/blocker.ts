export interface IBlocker {
  isBlocking: boolean;
  block: VoidFunction;
  unblock: VoidFunction;
}
