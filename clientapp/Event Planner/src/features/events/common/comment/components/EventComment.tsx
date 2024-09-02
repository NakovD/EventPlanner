import { ActionModal } from 'features/common/modal/actionModal/ActionModal';
import { EventCommentForm } from 'features/events/common/comment/form/EventCommentForm';
import { useEventComment } from 'features/events/common/comment/hooks/useEventComment';
import { IComment } from 'features/events/common/comment/models/comment';

interface IEventCommentProps {
  eventId: number;
  comment: IComment;
}

export const EventComment = ({ eventId, comment }: IEventCommentProps) => {
  const {
    canEdit,
    isFormVisible,
    modalRef,
    openModal,
    onDeleteComment,
    toggleEditForm,
    closeEditForm,
  } = useEventComment({
    comment,
    eventId,
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
      {canEdit && (
        <>
          <button
            onClick={openModal}
            className="mt-2 ml-4 text-sm font-semibold text-primary-light"
          >
            Delete comment
          </button>
          <ActionModal
            ref={modalRef}
            onConfirm={onDeleteComment}
            confirmLabel="Delete comment?"
            cancelLabel="No take me back"
          >
            Are you sure you want to delete this comment? You cannot reverse this action!
          </ActionModal>
        </>
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
