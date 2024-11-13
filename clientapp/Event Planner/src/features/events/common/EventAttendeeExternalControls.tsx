import { AttendeeStatusType } from 'features/attendees/enums/attendeeStatusType';
import { Button } from 'features/common/button/Button';

import { useEventAttendeeExternalControls } from './hooks/useEventAttendeeExternalControls';

interface IEventAttendeeExternalControlsProps {
  eventId: number;
}

export const EventAttendeeExternalControls = ({
  eventId,
}: IEventAttendeeExternalControlsProps) => {
  const { mutate } = useEventAttendeeExternalControls({ eventId });

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
