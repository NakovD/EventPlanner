import { useAppContext } from 'AppContext';
import { useActionModal } from 'features/common/modal/actionModal/hooks/external/useActionModal';
import { IComment } from 'features/events/common/comment/models/comment';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useSnackbarBlockingMutation } from 'infrastructure/api/hooks/useSnackbarBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useState } from 'react';

interface IUseEventCommentOptions {
  comment: IComment;
  eventId: number;
}

export const useEventComment = ({ comment, eventId }: IUseEventCommentOptions) => {
  const { user } = useAppContext();

  const userId = user?.userId;

  const canEdit = comment.userId === userId;

  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleEditForm = () => setIsFormVisible(!isFormVisible);

  const closeEditForm = () => setIsFormVisible(false);

  const { modalRef, openModal, closeModal } = useActionModal();

  const { mutate } = useSnackbarBlockingMutation<void>({
    endpoint: replacePlaceholderWithId(endpoints.comments.delete, comment.id),
    queryKey: [getRequestsOptions.GetAllComments.queryKey, eventId],
  });

  const deleteComment = () => mutate();

  const onDeleteComment = () => {
    deleteComment();
    closeModal();
  };

  return {
    canEdit,
    isFormVisible,
    modalRef,
    openModal,
    onDeleteComment,
    toggleEditForm,
    closeEditForm,
  };
};
