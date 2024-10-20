import { AdministrationUser } from 'features/administration/users/components/AdministrationUser';
import { useAdministrationUsersQuery } from 'features/administration/users/hooks/useAdministrationUsersQuery';

export const AdministrationUsers = () => {
  const { data, isLoading } = useAdministrationUsersQuery();

  const hasUsers = data?.length !== 0 && !isLoading;

  return (
    <div>
      {!hasUsers && <p>No users to show</p>}
      <div className="flex gap-4 mb-4">
        <p className="truncate text-primary-light font-bold w-52">Username</p>
        <p className="truncate text-primary-light font-bold w-52">User Email</p>
        <p className="truncate text-primary-light font-bold w-34">Registration Date</p>
        <p className="truncate text-primary-light font-bold w-32">Events Count</p>
      </div>
      {data?.map((u) => (
        <AdministrationUser user={u} key={u.id} />
      ))}
    </div>
  );
};
