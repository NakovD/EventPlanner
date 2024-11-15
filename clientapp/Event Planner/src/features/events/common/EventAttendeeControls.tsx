import { AttendeeStatusType } from 'features/attendees/enums/attendeeStatusType';
import { Button } from 'features/common/button/Button';
import { ExpandableSection } from 'features/common/expandableSection/ExpandableSection';

import { useEventAttendeeStatusMutation } from './hooks/useEventAttendeeStatusMutation';

interface IEventAttendeeControlsProps {
  attendeeId: number;
  eventId: number;
}

export const EventAttendeeControls = ({
  attendeeId,
  eventId,
}: IEventAttendeeControlsProps) => {
  const { mutate } = useEventAttendeeStatusMutation({ attendeeId, eventId });

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
