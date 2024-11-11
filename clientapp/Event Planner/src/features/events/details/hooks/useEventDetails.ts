import { useAppContext } from 'AppContext';
import { useValidIdParam } from 'infrastructure/hooks/useValidIdParam';

import { useEventDetailsQuery } from './useEventDetailsQuery';

export const useEventDetails = () => {
  const id = useValidIdParam();

  const { user } = useAppContext();

  const query = useEventDetailsQuery(id);

  const canEdit = user?.userId === query.data?.organizerId;

  return {
    canEdit,
    query,
  };
};
