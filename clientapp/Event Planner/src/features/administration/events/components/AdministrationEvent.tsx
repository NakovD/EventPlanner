import InfoIcon from '@mui/icons-material/Info';
import { useAdministrationEventDeleteMutation } from 'features/administration/events/hooks/useAdministrationEventDelete';
import { useAdministrationEventRestore } from 'features/administration/events/hooks/useAdministrationEventRestore';
import { IAdminEvent } from 'features/administration/events/models/IAdminEvent';
import { Button } from 'features/common/button/Button';
import { AppDialog } from 'features/common/dialog/AppDialog';
import { useAppDialog } from 'features/common/dialog/hooks/useAppDialog';

interface IAdministrationEventProps {
  event: IAdminEvent;
}

export const AdministrationEvent = ({ event }: IAdministrationEventProps) => {
  const { mutate: deleteEvent } = useAdministrationEventDeleteMutation({
    eventId: event.id,
  });
  const { restoreEvent } = useAdministrationEventRestore({ eventId: event.id });
  const { openDialog, dialogProps } = useAppDialog();

  return (
    <div className="flex gap-6 mb-4 items-center">
      <p className="truncate w-40">{event.title}</p>
      <p className="truncate w-40" title={event.category}>
        {event.category}
      </p>
      <p className="truncate w-32">
        Description
        <button className="ml-1" onClick={openDialog}>
          <InfoIcon sx={{ width: '20px' }} />
        </button>
      </p>
      <p className="truncate w-24">{event.date}</p>
      <p className="truncate w-12">{event.time}</p>
      <p className="truncate w-40">{event.organizerName}</p>
      <p className="truncate w-20">{event.attendees}</p>
      <p className="truncate w-32">{event.isDeleted ? 'Yes' : 'No'}</p>
      {!event.isDeleted && <Button label="Delete" onClick={() => deleteEvent()} />}
      {event.isDeleted && <Button label="Restore" onClick={restoreEvent} />}
      <AppDialog {...dialogProps}>{event.description}</AppDialog>
    </div>
  );
};
