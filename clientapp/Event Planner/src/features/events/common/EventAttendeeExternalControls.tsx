import { AttendeeStatusType } from 'features/attendees/enums/attendeeStatusType';
import { Button } from 'features/common/button/Button';
import { useInvalidateQueries } from 'infrastructure/api/hooks/useInvalidateQueries';
import { useValidIdParam } from 'infrastructure/hooks/useValidIdParam';

import { useEventAttendeeExternalStatusMutation } from './hooks/useEventAttendeeExternalStatusMutation';

interface IEventAttendeeExternalControlsProps {
  eventId: number;
}

export const EventAttendeeExternalControls = ({
  eventId,
}: IEventAttendeeExternalControlsProps) => {
  //to do: refactor that
  const linkId = useValidIdParam();

  //to do invalidate into custom hook;
  // const invalidate = useInvalidateQueries();

  const { mutate } = useEventAttendeeExternalStatusMutation({
    linkId,
    eventId: eventId.toString(),
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
