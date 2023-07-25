import { AttendeeStatusType } from 'features/attendees/enums/attendeeStatusType';
import { IAttendeeStatusRequest } from 'features/attendees/models/attendeeStatusRequest';
import { Button } from 'features/common/button/Button';
import { ExpandableSection } from 'features/common/expandableSection/ExpandableSection';
import { useSnackBar } from 'features/common/snackbar/hooks/useSnackBar';
import { SnackBar } from 'features/common/snackbar/Snackbar';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useBlockingMutation } from 'infrastructure/api/hooks/useBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useEffect } from 'react';

interface IEventAttendeeControlsProps {
  attendeeId: number;
  eventId: number;
}

export const EventAttendeeControls = ({
  attendeeId,
  eventId,
}: IEventAttendeeControlsProps) => {
  const { mutate, isSuccess, isError } = useBlockingMutation<IAttendeeStatusRequest>({
    endpoint: replacePlaceholderWithId(endpoints.attendees.updateStatus, attendeeId),
    queryKey: [getRequestsOptions.GetAllEventAttendees.queryKey, eventId],
  });

  const snackbarType = isSuccess && !isError ? 'success' : 'error';

  const { snackBarProps, openSnackBar } = useSnackBar({ type: snackbarType });

  useEffect(() => {
    if (isSuccess) openSnackBar();
  }, [isSuccess]);

  return (
    <ExpandableSection sectionName="Your actions">
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
    </ExpandableSection>
  );
};
