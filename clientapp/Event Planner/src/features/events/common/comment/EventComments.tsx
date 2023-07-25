import { useAppContext } from 'AppContext';
import { Button } from 'features/common/button/Button';
import { ExpandableSection } from 'features/common/expandableSection/ExpandableSection';
import { EventComment } from 'features/events/common/comment/components/EventComment';
import { EventCommentForm } from 'features/events/common/comment/form/EventCommentForm';
import { IComment } from 'features/events/common/comment/models/comment';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useState } from 'react';

interface IEventCommentsProps {
  eventId: number;
}

export const EventComments = ({ eventId }: IEventCommentsProps) => {
  const { isAuthenticated } = useAppContext();
  const { data, isLoading } = useReadQuery<IComment[]>({
    endpoint: replacePlaceholderWithId(
      getRequestsOptions.GetAllComments.endpoint,
      eventId,
    ),
    queryKey: [getRequestsOptions.GetAllComments.queryKey, eventId],
  });

  const hasComments = data?.length !== 0 && !isLoading;

  const [isFormVisible, setIsFormVisible] = useState(false);

  const addCommentLabel = isFormVisible ? 'Hide form' : 'Add comment!';

  return (
    <ExpandableSection sectionName="Discussion">
      {!hasComments && <p>No comments yet!</p>}
      {data?.map((c) => (
        <EventComment comment={c} eventId={eventId} key={c.id} />
      ))}
      {isAuthenticated && (
        <Button
          className="mt-5"
          onClick={() => setIsFormVisible(!isFormVisible)}
          label={addCommentLabel}
        />
      )}
      {isFormVisible && <EventCommentForm eventId={eventId} />}
    </ExpandableSection>
  );
};
