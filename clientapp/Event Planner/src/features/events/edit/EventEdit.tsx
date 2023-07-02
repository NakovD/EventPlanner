import { CircularProgress } from '@mui/material';
import { EventForm } from 'features/events/form/EventForm';
import { IEventForm } from 'features/events/form/models/eventForm';
import { IAllEventsEntity } from 'features/events/models/allEventsEntity';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useParams } from 'react-router-dom';

export const EventEdit = () => {
  const { id } = useParams();
  if (!id) throw new Error('No id found!');

  const { data: event, isLoading } = useReadQuery<IAllEventsEntity>({
    endpoint: replacePlaceholderWithId(getRequestsOptions.GetSingleEvent.endpoint, id),
    queryKey: [getRequestsOptions.GetSingleEvent.queryKey],
  });

  const eventFormData = getEventFormData(event, isLoading);

  return (
    <>
      {isLoading ? (
        <CircularProgress color="secondary" />
      ) : (
        <EventForm
          formData={eventFormData}
          eventId={event?.id.toString()}
          title="Edit your special event"
        />
      )}
    </>
  );
};

const getEventFormData = (event: IAllEventsEntity | undefined, isLoading: boolean) => {
  if (isLoading || !event) return undefined;

  const eventFormData: IEventForm = { ...event };

  return eventFormData;
};
