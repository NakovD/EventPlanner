import { AdministrationEvent } from 'features/administration/events/components/AdministrationEvent';
import { IAdminEvent } from 'features/administration/events/models/IAdminEvent';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';

export const AdministrationEvents = () => {
  const { data, isLoading } = useReadQuery<IAdminEvent[]>({
    endpoint: getRequestsOptions.GetAllEventsForAdmins.endpoint,
    queryKey: [getRequestsOptions.GetAllEventsForAdmins.queryKey],
  });

  const hasEvents = data?.length !== 0 && !isLoading;

  return (
    <div>
      {!hasEvents && <p>There are no events in the site!</p>}
      {isLoading && <p>Loading, please wait</p>}
      {hasEvents && (
        <div className="flex gap-6 mb-5">
          <p className="truncate font-bold w-40">Title</p>
          <p className="truncate font-bold w-40">Category</p>
          <p className="truncate font-bold w-26">Description</p>
          <p className="truncate font-bold w-24">Date</p>
          <p className="truncate font-bold w-12">Time</p>
          <p className="truncate font-bold w-44">Organizer</p>
          <p className="truncate font-bold w-20">Attendees</p>
          <p className="truncate font-bold w-32">Is Deleted?</p>
        </div>
      )}
      {data?.map((e) => (
        <AdministrationEvent event={e} key={e.id} />
      ))}
    </div>
  );
};
