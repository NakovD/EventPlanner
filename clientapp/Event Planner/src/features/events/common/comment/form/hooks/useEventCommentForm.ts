import { yupResolver } from '@hookform/resolvers/yup';
import { IEventCommentForm } from 'features/events/common/comment/form/models/eventCommentForm';
import { IComment } from 'features/events/common/comment/models/comment';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { getRequestsOptions } from 'infrastructure/api/endpoints/getRequestsOptions';
import { useBlockingMutation } from 'infrastructure/api/hooks/useBlockingMutation';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const validationSchema = yup.object({
  content: yup.string().required().min(3).max(250),
});

interface IEventCommentRequest {
  content: string;
  eventId: number;
}

interface IUseEventCommentFormOptions {
  eventId: number;
  comment?: IComment;
  onSubmitCallback?: VoidFunction;
}

export const useEventCommentForm = ({
  eventId,
  comment,
  onSubmitCallback,
}: IUseEventCommentFormOptions) => {
  const defaultValues: IEventCommentForm = comment
    ? { content: comment.content }
    : { content: '' };

  const { control, handleSubmit, reset } = useForm<IEventCommentForm>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const endpoint = comment
    ? replacePlaceholderWithId(endpoints.comments.edit, comment.id)
    : endpoints.comments.create;

  const { mutate } = useBlockingMutation<IEventCommentRequest>({
    endpoint,
    queryKey: [getRequestsOptions.GetAllComments.queryKey, eventId],
    onSettled: () => {
      onSubmitCallback?.();
      reset(defaultValues);
    },
  });

  const onSubmit = handleSubmit((data) => mutate({ content: data.content, eventId }));

  return {
    control,
    isEdit: !!comment,
    onSubmit,
  };
};
