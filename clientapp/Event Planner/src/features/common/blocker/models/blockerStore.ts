export interface IBlockerStore {
  isBlocking: boolean;
  block: VoidFunction;
  unblock: VoidFunction;
}
