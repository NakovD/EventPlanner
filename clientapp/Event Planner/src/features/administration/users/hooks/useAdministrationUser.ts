import { useAdministrationUserDelete } from 'features/administration/users/hooks/useAdministrationUserDelete';
import { useActionModal } from 'features/common/modal/actionModal/hooks/external/useActionModal';

interface IUseAdministrationUserOptions {
  userId: string;
}

export const useAdministrationUser = ({ userId }: IUseAdministrationUserOptions) => {
  const { deleteUser } = useAdministrationUserDelete({ userId });

  const { modalRef, openModal } = useActionModal();

  return {
    modalRef,
    deleteUser,
    openModal,
  };
};
