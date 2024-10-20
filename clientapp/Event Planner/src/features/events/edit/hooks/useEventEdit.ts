import { useEventDetailsQuery } from 'features/events/details/hooks/useEventDetailsQuery';
import { useParams } from 'react-router-dom';

export const useEventEdit = () => {
  const { id } = useParams();
  if (!id) throw new Error('No id found!');

  const query = useEventDetailsQuery(id);

  return query;
};
