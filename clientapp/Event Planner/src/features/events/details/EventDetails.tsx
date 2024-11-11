import { EventProfile } from 'features/events/common/EventProfile';

import { useEventDetails } from './hooks/useEventDetails';

//To do: refactor this;
export const EventDetails = () => {
  const { canEdit, query } = useEventDetails();

  const { isLoading, isError, data } = query;

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error occured!</p>;

  return <EventProfile event={data} canEdit={canEdit} />;
};
