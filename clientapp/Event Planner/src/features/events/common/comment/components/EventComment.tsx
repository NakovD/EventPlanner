import { EventCommentForm } from 'features/events/common/comment/form/EventCommentForm';
import { useEventComment } from 'features/events/common/comment/hooks/useEventComment';
import { IComment } from 'features/events/common/comment/models/comment';

interface IEventCommentProps {
  eventId: number;
  comment: IComment;
}

export const EventComment = ({ eventId, comment }: IEventCommentProps) => {
  const { canEdit, isFormVisible, toggleEditForm, closeEditForm } = useEventComment({
    comment,
  });

  return (
    <div className="border-2 border-accent-dark rounded-lg p-4 mb-3">
      <div className="flex justify-between pb-2">
        <p>Author: {comment.userName}</p>
        <p>{comment.lastUpdated}</p>
      </div>
      <p className="border-t-2 border-t-text-light pt-2">{comment.content}</p>
      {canEdit && (
        <button
          onClick={toggleEditForm}
          className="mt-2 text-sm self-end font-semibold text-primary-light"
        >
          Edit comment
        </button>
      )}
      {isFormVisible && (
        <EventCommentForm
          onSubmitCallback={closeEditForm}
          eventId={eventId}
          comment={comment}
        />
      )}
    </div>
  );
};
