import { useAppContext } from 'AppContext';
import { useAppDialog } from 'features/common/dialog/hooks/useAppDialog';
import { IComment } from 'features/events/common/comment/models/comment';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useBlockingMutation } from 'infrastructure/api/hooks/useBlockingMutation';
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

  const { dialogProps, openDialog, closeDialog } = useAppDialog();

  const { mutate } = useBlockingMutation({
    endpoint: replacePlaceholderWithId(endpoints.comments.delete, comment.id),
    queryKey: [getRequestsOptions.GetAllComments.queryKey, eventId],
  });

  const deleteComment = () => mutate({});

  const onDeleteComment = () => {
    deleteComment();
    closeDialog();
  };

  return {
    canEdit,
    isFormVisible,
    dialogProps,
    openDialog,
    closeDialog,
    onDeleteComment,
    toggleEditForm,
    closeEditForm,
  };
};
