import { IAttendee } from 'features/attendees/models/attendee';
import { Button } from 'features/common/button/Button';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { routePaths } from 'infrastructure/routing/routePaths';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useState } from 'react';

interface IEventAttendeesListProps {
  eventId: number;
}

export const EventAttendeesList = ({ eventId }: IEventAttendeesListProps) => {
  const [show, setShow] = useState(false);

  const { data, isLoading, isError } = useReadQuery<IAttendee[]>({
    endpoint: replacePlaceholderWithId(
      getRequestsOptions.GetAllEventAttendees.endpoint,
      eventId,
    ),
    queryKey: [getRequestsOptions.GetAllEventAttendees.queryKey, eventId],
    enabled: show,
  });

  return (
    <div className="border-t border-b py-4 mt-7 border-gray-200">
      <div
        onClick={() => setShow(!show)}
        className="flex justify-between items-center cursor-pointer"
      >
        <p className="text-base leading-4 text-gray-800">Attendees</p>
        <button
          className="
        cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
        rounded
      "
          aria-label="show or hide"
        >
          <svg
            className={'transform ' + (show ? 'rotate-180' : 'rotate-0')}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 1L5 5L1 1"
              stroke="#4B5563"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div
        className={
          'pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 ' +
          (show ? 'block' : 'hidden')
        }
        id="sect"
      >
        {isLoading && <p>Loading please, wait!</p>}
        {isError && <p>Something went wrong on the server :(</p>}
        {data?.map((a) => (
          <div key={a.id} className="flex gap-4">
            <p>Name: {a.name}</p>
            <p>Status: {a.status}</p>
          </div>
        ))}
        <Button
          label="Manage attendees"
          to={replacePlaceholderWithId(routePaths.manageAttendees.path, eventId)}
        />
      </div>
    </div>
  );
};
