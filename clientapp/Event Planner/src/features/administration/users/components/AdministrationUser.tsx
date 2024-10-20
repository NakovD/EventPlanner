import { useAdministrationUser } from 'features/administration/users/hooks/useAdministrationUser';
import { IAdminUser } from 'features/administration/users/models/adminUser';
import { Button } from 'features/common/button/Button';
import { ActionModal } from 'features/common/modal/actionModal/ActionModal';

interface IAdministrationUserProps {
  user: IAdminUser;
}

export const AdministrationUser = ({ user }: IAdministrationUserProps) => {
  const { modalRef, deleteUser, openModal } = useAdministrationUser({ userId: user.id });
  return (
    <div className="flex gap-4 mb-5 items-center">
      <p className="truncate w-52">{user.username}</p>
      <p className="truncate w-52">{user.email}</p>
      <p className="truncate w-34">{user.registrationDate}</p>
      <p className="truncate w-32 text-center">{user.eventsCount}</p>
      <Button label="Delete" onClick={openModal} />
      <ActionModal
        heading={<p>warning, dude</p>}
        confirmLabel="Delete User?"
        cancelLabel="No, take me back"
        onConfirm={deleteUser}
        ref={modalRef}
      >
        Are you sure you want to delete this user? This cannot be reversed!
      </ActionModal>
    </div>
  );
};
