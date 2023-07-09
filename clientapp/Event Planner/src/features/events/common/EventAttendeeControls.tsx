import { useQueryClient } from '@tanstack/react-query';
import { AttendeeStatusType } from 'features/attendees/enums/attendeeStatusType';
import { IAttendeeStatusRequest } from 'features/attendees/models/attendeeStatusRequest';
import { Button } from 'features/common/button/Button';
import { useSnackBar } from 'features/common/snackbar/hooks/useSnackBar';
import { SnackBar } from 'features/common/snackbar/Snackbar';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useCreateMutation } from 'infrastructure/api/hooks/useCreateMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useEffect, useState } from 'react';

interface IEventAttendeeControlsProps {
  attendeeId: number;
  eventId: number;
}

export const EventAttendeeControls = ({
  attendeeId,
  eventId,
}: IEventAttendeeControlsProps) => {
  const [show, setShow] = useState(false);

  const { mutate, isSuccess, isError } = useCreateMutation<IAttendeeStatusRequest>({
    endpoint: replacePlaceholderWithId(endpoints.attendees.updateStatus, attendeeId),
  });

  const queryClient = useQueryClient();

  const snackbarType = isSuccess && !isError ? 'success' : 'error';

  const { snackBarProps, openSnackBar } = useSnackBar({ type: snackbarType });

  useEffect(() => {
    if (isSuccess) {
      openSnackBar();
      queryClient.invalidateQueries([
        getRequestsOptions.GetAllEventAttendees.queryKey,
        eventId,
      ]);
    }
  }, [isSuccess]);

  return (
    <div>
      <div className="border-b py-4 border-gray-200">
        <div
          onClick={() => setShow(!show)}
          className="flex justify-between items-center cursor-pointer"
        >
          <p className="text-base leading-4 text-gray-800">Your Actions</p>
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
          <div className="flex gap-2">
            <SnackBar {...snackBarProps} />
            <Button
              label={'I will come!'}
              onClick={() => mutate({ newStatus: AttendeeStatusType.Attending })}
            />
            <Button
              label={'Maybe'}
              onClick={() => mutate({ newStatus: AttendeeStatusType.Maybe })}
            />
            <Button
              label={'I wont come'}
              onClick={() => mutate({ newStatus: AttendeeStatusType.NotAttending })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
