import { CircularProgress } from '@mui/material';
import { EventForm } from 'features/events/form/EventForm';

import { useEventEdit } from './hooks/useEventEdit';

export const EventEdit = () => {
  const { isSuccess, isError, data: event, isLoading } = useEventEdit();

  return (
    <div className="my-10">
      {isLoading && <CircularProgress color="secondary" />}
      {isSuccess && (
        <EventForm
          event={event}
          eventId={event?.id.toString()}
          title="Edit your special event"
        />
      )}
      {isError && <p>Something went wrong.</p>}
    </div>
  );
};
