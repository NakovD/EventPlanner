import { useAppContext } from 'AppContext';
import { IComment } from 'features/events/common/comment/models/comment';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useReadQuery } from 'infrastructure/api/hooks/useReadQuery';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useState } from 'react';

interface IUseEventCommentsOptions {
  eventId: number;
}

export const useEventComments = ({ eventId }: IUseEventCommentsOptions) => {
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

  const toggleForm = () => setIsFormVisible(!isFormVisible);

  return {
    isAuthenticated,
    hasComments,
    isFormVisible,
    comments: data ?? [],
    toggleForm,
  };
};
