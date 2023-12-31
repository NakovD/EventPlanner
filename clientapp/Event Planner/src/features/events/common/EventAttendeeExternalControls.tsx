import { AttendeeStatusType } from 'features/attendees/enums/attendeeStatusType';
import { IAttendeeStatusRequest } from 'features/attendees/models/attendeeStatusRequest';
import { Button } from 'features/common/button/Button';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useInvalidateQueries } from 'infrastructure/api/hooks/useInvalidateQueries';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useParams } from 'react-router-dom';

interface IEventAttendeeExternalControlsProps {
  eventId: number;
}

export const EventAttendeeExternalControls = ({
  eventId,
}: IEventAttendeeExternalControlsProps) => {
  const { id: encryptedData } = useParams();
  if (!encryptedData) throw new Error('No id was found!');

  const invalidate = useInvalidateQueries();

  const { mutate } = useSnackbarBlockingMutation<IAttendeeStatusRequest>({
    endpoint: replacePlaceholderWithId(
      endpoints.attendees.updateExternalStatus,
      encryptedData,
    ),
    queryKey: [getRequestsOptions.GetAllEventAttendees.queryKey, eventId],
    onSuccess: () => invalidate([getRequestsOptions.GetExternalAttendeeStatus.queryKey]),
  });

  return (
    <div className="my-3 flex gap-2">
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
  );
};
