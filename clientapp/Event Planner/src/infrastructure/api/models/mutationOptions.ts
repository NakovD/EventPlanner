import { QueryKey } from '@tanstack/react-query';

export interface IUseAppMutationOptions {
  endpoint: string;
  queryKey?: QueryKey;
}
