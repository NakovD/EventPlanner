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

import { useEventAttendeesQuery } from './hooks/useEventAttendeesQuery';

interface IEventProfileProps {
  canEdit: boolean;
  shouldShowExternalAttendeeControls?: boolean;
  event: IAllEventsEntity;
}

export const EventProfile = ({
  canEdit,
  shouldShowExternalAttendeeControls = false,
  event,
}: IEventProfileProps) => {
  const { user } = useAppContext();

  const { data: attendees } = useEventAttendeesQuery(event.id);

  const userAttendee = attendees?.find((a) => a.userId === user?.userId);

  const shouldShowAttendeeActions = userAttendee !== undefined;

  const isExternalAttendee = !user && !shouldShowExternalAttendeeControls;

  return (
    <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
      <div className="md:hidden">
        <img
          className="w-full"
          alt="img of a girl posing"
          src="https://i.ibb.co/QMdWfzX/component-image-one.png"
        />
        <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
          <img
            alt="img-tag-one"
            className="md:w-48 md:h-48 w-full"
            src="https://i.ibb.co/cYDrVGh/Rectangle-245.png"
          />
          <img
            alt="img-tag-one"
            className="md:w-48 md:h-48 w-full"
            src="https://i.ibb.co/f17NXrW/Rectangle-244.png"
          />
          <img
            alt="img-tag-one"
            className="md:w-48 md:h-48 w-full"
            src="https://i.ibb.co/cYDrVGh/Rectangle-245.png"
          />
          <img
            alt="img-tag-one"
            className="md:w-48 md:h-48 w-full"
            src="https://i.ibb.co/f17NXrW/Rectangle-244.png"
          />
        </div>
      </div>
      <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        {canEdit && (
          <ButtonLink
            className="mt-4"
            to={replacePlaceholderWithId(routePaths.eventEdit.path, event?.id)}
            label="Edit this event"
          />
        )}
        {shouldShowExternalAttendeeControls && (
          <EventAttendeeExternalControls eventId={event.id} />
        )}
        {isExternalAttendee && (
          <p className="mt-3">You have already updated your status for this event!</p>
        )}
        <div className="mt-4">
          Event Description
          <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">
            {event?.description}
          </p>
          <p className="text-base leading-4 mt-7 text-gray-600"></p>
        </div>
        {shouldShowAttendeeActions && (
          <EventAttendeeControls attendeeId={userAttendee.id} eventId={event.id} />
        )}
        <EventAttendeesList
          attendees={attendees ?? []}
          canEdit={canEdit}
          eventId={event?.id ?? 0}
        />
        <EventComments eventId={event.id} />
      </div>
    </div>
  );
};

EventProfile.Image = ({ imageUrl }: { imageUrl: string }) => (
  <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
    <img className="w-full" alt="img of a girl posing" src={imageUrl} />
    <img
      className="mt-6 w-full"
      alt="img of a girl posing"
      src="https://i.ibb.co/qxkRXSq/component-image-two.png"
    />
  </div>
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
