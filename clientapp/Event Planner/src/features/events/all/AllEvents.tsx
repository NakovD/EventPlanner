import { IAllEventsEntity } from 'features/events/all/models/allEventsEntity';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { routePaths } from 'infrastructure/routing/routePaths';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { Link } from 'react-router-dom';

export const AllEvents = () => {
  const { data } = useReadQuery<IAllEventsEntity[]>({
    endpoint: getRequestsOptions.GetAllEvents.endpoint,
    queryKey: [getRequestsOptions.GetAllEvents.queryKey],
  });

  return (
    <div className="my-5 flex flex-wrap gap-8 justify-center text-secondary-light ">
      {data?.map((e) => (
        <div
          key={e.id}
          className="w-96 h-[576px] rounded-lg overflow-hidden cursor-pointer relative shadow-2xl shadow-black group"
        >
          <img
            src={e.image}
            className="absolute object-cover w-full h-full opacity-90 transition-opacity duration-500 group-hover:opacity-1 group-hover:brightness-50"
          />
          <h2 className="absolute uppercase top-auto right-auto bottom-8 left-8 transition-all duration-500 group-hover:bottom-56 group-hover:left-8">
            {e.title}
          </h2>
          <p className="absolute opacity-0 max-w-[80%] transition-opacity duration-500 top-auto right-auto bottom-20 left-8 group-hover:opacity-100">
            Category: {e.category}
            <br />
            <br />
            Location: {e.location}
          </p>
          <Link
            className="absolute opacity-0 max-w-[80%] top-auto right-auto bottom-4 left-8 group-hover:opacity-100"
            to={replacePlaceholderWithId(routePaths.eventDetails.path, e.id)}
          >
            Find out more <span className="align-text-top"> --{'>'}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};
