/* eslint-disable react/display-name */
import { useAppContext } from 'AppContext';
import { EventAttendeesList } from 'features/attendees/components/EventAttendeesList';
import { ButtonLink } from 'features/common/button/ButtonLink';
import { EventComments } from 'features/events/common/comment/EventComments';
import { EventAttendeeControls } from 'features/events/common/EventAttendeeControls';
import { EventAttendeeExternalControls } from 'features/events/common/EventAttendeeExternalControls';
import { IAllEventsEntity } from 'features/events/models/allEventsEntity';
import { routePaths } from 'infrastructure/routing/routePaths';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { ComponentProps, ReactNode } from 'react';

import { useEventAttendeesQuery } from './hooks/useEventAttendeesQuery';

interface IEventProfileProps {
  children: ReactNode;
}

export const EventProfile = ({ children }: IEventProfileProps) => (
  <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
    {children}
  </div>
);

EventProfile.Image = ({ imageUrl }: { imageUrl: string }) => (
  <>
    <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
      <img className="w-full" alt="img of a girl posing" src={imageUrl} />
    </div>
    <div className="md:hidden">
      <img className="w-full" alt="img of a girl posing" src={imageUrl} />
    </div>
  </>
);

EventProfile.Details = ({ event }: { event: IAllEventsEntity }) => (
  <>
    <div className="border-b border-gray-200 pb-6">
      <p className="text-sm leading-none text-gray-600">{event?.date}</p>
      <h1
        className="
                lg:text-2xl
                text-xl
                font-semibold
                lg:leading-6
                leading-7
                text-gray-800
                mt-2
              "
      >
        {event?.title}
      </h1>
    </div>
    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
      <p className="text-base leading-4 text-gray-800">Location</p>
      <div className="flex items-center justify-center">
        <p className="text-sm leading-none text-gray-600">{event?.location}</p>
      </div>
    </div>
    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
      <p className="text-base leading-4 text-gray-800">Category</p>
      <div className="flex items-center justify-center">
        <p className="text-sm leading-none text-gray-600">{event?.category}</p>
      </div>
    </div>
    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
      <p className="text-base leading-4 text-gray-800">Time</p>
      <div className="flex items-center justify-center">
        <p className="text-sm leading-none text-gray-600 mr-3">{event?.time}</p>
      </div>
    </div>
  </>
);

EventProfile.Edit = ({ eventId }: { eventId: number }) => (
  <ButtonLink
    className="mt-4"
    to={replacePlaceholderWithId(routePaths.eventEdit.path, eventId)}
    label="Edit this event"
  />
);

EventProfile.AttendeeControls = ({ eventId }: { eventId: number }) => (
  <EventAttendeeExternalControls eventId={eventId} />
);

EventProfile.ExternalControlls = ({
  eventId,
  hasAttendeeUpdatedStatus,
}: {
  eventId: number;
  hasAttendeeUpdatedStatus: boolean;
}) => {
  const { user } = useAppContext();

  const isExternalAttendee = !user && hasAttendeeUpdatedStatus;

  return (
    <>
      {!hasAttendeeUpdatedStatus && <EventAttendeeExternalControls eventId={eventId} />}
      {isExternalAttendee && (
        <p className="mt-3">You have already updated your status for this event!</p>
      )}
    </>
  );
};

EventProfile.Description = ({ description }: { description: string }) => (
  <div className="mt-4">
    Event Description
    <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">
      {description}
    </p>
    <p className="text-base leading-4 mt-7 text-gray-600"></p>
  </div>
);

EventProfile.Wrapper = ({ children }: { children: ReactNode }) => (
  <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">{children} </div>
);

EventProfile.Attendees = ({
  canEdit,
  eventId,
}: {
  eventId: number;
  canEdit: boolean;
}) => {
  const { user } = useAppContext();

  const { data: attendees } = useEventAttendeesQuery(eventId);

  const userAttendee = attendees?.find((a) => a.userId === user?.userId);

  const shouldShowAttendeeActions = userAttendee !== undefined;

  return (
    <>
      <EventAttendeesList
        attendees={attendees ?? []}
        canEdit={canEdit}
        eventId={eventId}
      />
      {shouldShowAttendeeActions && (
        <EventAttendeeControls attendeeId={userAttendee.id} eventId={eventId} />
      )}
    </>
  );
};

EventProfile.Comments = (props: ComponentProps<typeof EventComments>) => (
  <EventComments {...props} />
);
