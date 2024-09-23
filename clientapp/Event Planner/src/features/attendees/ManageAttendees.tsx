import { EventAttendee } from 'features/attendees/components/EventAttendee';
import { EventPotentialAttendee } from 'features/attendees/components/EventPotentialAttendee';
import { ExternalAttendeeForm } from 'features/attendees/form/ExternalAttendeeForm';

import { useManageAttendees } from './hooks/useManageAttendees';

export const ManageAttendees = () => {
  const { eventId, attendeeInternalUsersQuery, invitedAttendeesQuery, user } =
    useManageAttendees();

  const hasAttendees =
    invitedAttendeesQuery.isSuccess && invitedAttendeesQuery.data.length > 0;

  const filteredInternalUsers = attendeeInternalUsersQuery.isSuccess
    ? attendeeInternalUsersQuery.data.filter(
        (au) =>
          invitedAttendeesQuery.data?.some((ia) => ia.userId === au.id) &&
          au.id !== user?.userId,
      )
    : [];

  return (
    <div>
      <h1 className="mb-3 text-xl font-bold">Manage your event attendees</h1>
      <p className="mb-3">These are your current attendees:</p>
      {invitedAttendeesQuery.isLoading && <p>Loading...</p>}
      {!hasAttendees && <p>You havent invited anyone!</p>}
      {invitedAttendeesQuery.isSuccess && (
        <div className="grid grid-cols-3 gap-3 my-5">
          {invitedAttendeesQuery.data.map((a) => (
            <EventAttendee key={a.id} attendee={a} />
          ))}
        </div>
      )}
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
