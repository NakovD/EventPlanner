import { AppSkeleton } from 'features/common/skeleton/AppSkeleton';
import { IAllEventsEntity } from 'features/events/models/allEventsEntity';
import { routePaths } from 'infrastructure/routing/routePaths';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { Link } from 'react-router-dom';

interface IEventCardProps {
  event: IAllEventsEntity;
  isLoading: boolean;
}

export const EventCard = ({ event, isLoading }: IEventCardProps) => {
  if (isLoading) return <AppSkeleton width={384} height={576} />;
  return (
    <div className="w-96 h-[576px] rounded-lg overflow-hidden cursor-pointer relative shadow-2xl shadow-black group">
      <img
        src={event.image}
        className="absolute object-cover w-full h-full opacity-90 transition-opacity duration-500 group-hover:opacity-1 group-hover:brightness-50"
        loading="lazy"
      />
      <h2 className="absolute uppercase top-auto right-auto bottom-8 left-8 transition-all duration-500 group-hover:bottom-56 group-hover:left-8">
        {event.title}
      </h2>
      <p className="absolute opacity-0 max-w-[80%] transition-opacity duration-500 top-auto right-auto bottom-20 left-8 group-hover:opacity-100">
        Category: {event.category}
        <br />
        <br />
        Location: {event.location}
      </p>
      <Link
        className="absolute opacity-0 max-w-[80%] top-auto right-auto bottom-4 left-8 group-hover:opacity-100"
        to={replacePlaceholderWithId(routePaths.eventDetails.path, event.id)}
      >
        Find out more <span className="align-text-top"> --{'>'}</span>
      </Link>
    </div>
  );
};
