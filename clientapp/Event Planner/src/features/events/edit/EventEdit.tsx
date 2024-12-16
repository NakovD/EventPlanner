import { Loader } from 'features/common/loader/Loader';
import { ServerErrorMessage } from 'features/common/message/errorMessage/ServerErrorMessage';
import { EventForm } from 'features/events/form/EventForm';

import { useEventEdit } from './hooks/useEventEdit';

export const EventEdit = () => {
  const { isSuccess, isError, data: event, isLoading } = useEventEdit();

  return (
    <div className="my-10">
      {isLoading && <Loader />}
      {isSuccess && (
        <EventForm
          event={event}
          eventId={event?.id.toString()}
          title="Edit your special event"
        />
      )}
      {isError && <ServerErrorMessage />}
    </div>
  );
};
