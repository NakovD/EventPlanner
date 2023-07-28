import { useAdministrationUserDelete } from 'features/administration/users/hooks/useAdministrationUserDelete';
import { IAdminUser } from 'features/administration/users/models/adminUser';
import { Button } from 'features/common/button/Button';
import { AppDialog } from 'features/common/dialog/AppDialog';
import { useAppDialog } from 'features/common/dialog/hooks/useAppDialog';

interface IAdministrationUserProps {
  user: IAdminUser;
}

export const AdministrationUser = ({ user }: IAdministrationUserProps) => {
  const { deleteUser } = useAdministrationUserDelete({ userId: user.id });
  const { dialogProps, openDialog, closeDialog } = useAppDialog();
  const dialogActions = (
    <>
      <Button className="mb-2" label="Delete User?" onClick={deleteUser} />
      <Button label="No take me back" onClick={closeDialog} />
    </>
  );
  return (
    <div className="flex gap-4 mb-5 items-center">
      <p className="truncate w-52">{user.username}</p>
      <p className="truncate w-52">{user.email}</p>
      <p className="truncate w-34">{user.registrationDate}</p>
      <p className="truncate w-32 text-center">{user.eventsCount}</p>
      <Button label="Delete" onClick={openDialog} />
      <AppDialog {...dialogProps} actions={dialogActions}>
        Are you sure you want to delete this user? This cannot be reversed!
      </AppDialog>
    </div>
  );
};
