import { AttendeeStatusType } from 'features/attendees/enums/attendeeStatusType';
import { IAttendeeStatusRequest } from 'features/attendees/models/attendeeStatusRequest';
import { Button } from 'features/common/button/Button';
import { ExpandableSection } from 'features/common/expandableSection/ExpandableSection';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

interface IEventAttendeeControlsProps {
  attendeeId: number;
  eventId: number;
}

export const EventAttendeeControls = ({
  attendeeId,
  eventId,
}: IEventAttendeeControlsProps) => {
  const { mutate } = useSnackbarBlockingMutation<IAttendeeStatusRequest>({
    endpoint: replacePlaceholderWithId(endpoints.attendees.updateStatus, attendeeId),
    queryKey: [getRequestsOptions.GetAllEventAttendees.queryKey, eventId],
  });

  return (
    <ExpandableSection sectionName="Your actions">
      <div className="flex gap-2">
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
