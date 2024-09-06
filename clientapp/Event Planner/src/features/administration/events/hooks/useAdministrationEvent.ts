import { useAdministrationEventDeleteMutation } from 'features/administration/events/hooks/useAdministrationEventDeleteMutation';
import { useAdministrationEventRestoreMutation } from 'features/administration/events/hooks/useAdministrationEventRestoreMutation';
import { useInfoModal } from 'features/common/modal/infoModal/hooks/external/useInfoModal';

interface IUseAdministrationEventOptions {
  eventId: number;
}

export const useAdministrationEvent = ({ eventId }: IUseAdministrationEventOptions) => {
  const { mutate: deleteEvent } = useAdministrationEventDeleteMutation({
    eventId,
  });
  const { mutate: restoreEvent } = useAdministrationEventRestoreMutation({
    eventId,
  });
  const { modalRef, openModal } = useInfoModal();

  return {
    modalRef,
    restoreEvent,
    deleteEvent,
    openModal,
  };
};
