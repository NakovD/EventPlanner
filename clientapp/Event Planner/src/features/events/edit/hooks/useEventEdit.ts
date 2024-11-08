import { useEventDetailsQuery } from 'features/events/details/hooks/useEventDetailsQuery';
import { useValidIdParam } from 'infrastructure/hooks/useValidIdParam';

export const useEventEdit = () => {
  const id = useValidIdParam();

  const query = useEventDetailsQuery(id);

  return query;
};
