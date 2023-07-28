import { Button } from 'features/common/button/Button';
import { ExpandableSection } from 'features/common/expandableSection/ExpandableSection';
import { EventComment } from 'features/events/common/comment/components/EventComment';
import { EventCommentForm } from 'features/events/common/comment/form/EventCommentForm';
import { useEventComments } from 'features/events/common/comment/hooks/useEventComments';

interface IEventCommentsProps {
  eventId: number;
}

export const EventComments = ({ eventId }: IEventCommentsProps) => {
  const { isAuthenticated, hasComments, isFormVisible, comments, toggleForm } =
    useEventComments({
      eventId,
    });
  const addCommentLabel = isFormVisible ? 'Hide form' : 'Add comment!';

  return (
    <ExpandableSection sectionName="Discussion">
      {!hasComments && <p>No comments yet!</p>}
      {comments.map((c) => (
        <EventComment comment={c} eventId={eventId} key={c.id} />
      ))}
      {isAuthenticated && (
        <Button className="mt-5" onClick={toggleForm} label={addCommentLabel} />
      )}
      {isFormVisible && <EventCommentForm eventId={eventId} />}
    </ExpandableSection>
  );
};
