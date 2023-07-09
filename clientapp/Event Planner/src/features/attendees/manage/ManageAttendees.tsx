import { useAppContext } from 'AppContext';
import { EventAttendee } from 'features/attendees/components/EventAttendee';
import { EventPotentialAttendee } from 'features/attendees/components/EventPotentialAttendee';
import { ExternalAttendeeForm } from 'features/attendees/form/ExternalAttendeeForm';
import { IAttendee } from 'features/attendees/models/attendee';
import { IAttendeeUser } from 'features/attendees/models/attendeeUser';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useParams } from 'react-router-dom';

export const ManageAttendees = () => {
  const { id: eventId } = useParams();
  if (!eventId) throw new Error('No id found!');

  const { data: invitedAttendees } = useReadQuery<IAttendee[]>({
    endpoint: replacePlaceholderWithId(
      getRequestsOptions.GetAllEventAttendees.endpoint,
      eventId,
    ),
    queryKey: [getRequestsOptions.GetAllEventAttendees.queryKey, +eventId],
  });

  const { data: internalUsers } = useReadQuery<IAttendeeUser[]>({
    endpoint: getRequestsOptions.GetAllUsers.endpoint,
    queryKey: [getRequestsOptions.GetAllUsers.queryKey],
  });

  const { user } = useAppContext();

  const filteredInternalUsers = internalUsers?.filter(
    (au) =>
      !invitedAttendees?.some((ia) => ia.userId === au.id) && au.id !== user?.userId,
  );

  return (
    <div>
      <h1 className="mb-3 text-xl font-bold">Manage your event attendees</h1>
      <p className="mb-3">These are your current attendees:</p>
      {invitedAttendees?.length === 0 && <p>You havent invited anyone!</p>}
      <div className="grid grid-cols-3 gap-3 my-5">
        {invitedAttendees?.map((a) => (
          <EventAttendee key={a.id} attendee={a} />
        ))}
      </div>
      <p className="mb-8">Here you can invite more people on our platform:</p>
      <div className="mb-5">
        {filteredInternalUsers?.map((au, i) => (
          <EventPotentialAttendee
            eventId={+eventId}
            key={`attendee-external-${i}`}
            userData={au}
          />
        ))}
      </div>
      <p className="text-lg mb-3 font-medium">Or add external person:</p>
      <ExternalAttendeeForm eventId={+eventId} />
    </div>
  );
};
