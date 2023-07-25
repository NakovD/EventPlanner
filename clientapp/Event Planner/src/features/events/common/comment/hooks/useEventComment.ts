import { useAppContext } from 'AppContext';
import { IComment } from 'features/events/common/comment/models/comment';
import { useState } from 'react';

interface IUseEventCommentOptions {
  comment: IComment;
}

export const useEventComment = ({ comment }: IUseEventCommentOptions) => {
  const { user } = useAppContext();

  const userId = user?.userId;

  const canEdit = comment.userId === userId;

  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleEditForm = () => setIsFormVisible(!isFormVisible);

  const closeEditForm = () => setIsFormVisible(false);

  return {
    canEdit,
    isFormVisible,
    toggleEditForm,
    closeEditForm,
  };
};
