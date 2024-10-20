import { TextArea } from 'features/common/form/TextArea';
import { useEventCommentForm } from 'features/events/common/comment/form/hooks/useEventCommentForm';
import { IComment } from 'features/events/common/comment/models/comment';

interface IEventCommentFormProps {
  eventId: number;
  comment?: IComment;
  onSubmitCallback?: VoidFunction;
}

export const EventCommentForm = ({
  eventId,
  comment,
  onSubmitCallback,
}: IEventCommentFormProps) => {
  const { control, isEdit, onSubmit } = useEventCommentForm({
    eventId,
    comment,
    onSubmitCallback,
  });

  const submitLabel = isEdit ? 'Edit comment' : 'Add comment';

  return (
    <form className="mt-6 mb-3 flex gap-5" onSubmit={onSubmit}>
      <div className="w-80">
        <TextArea control={control} name="content" label="Content" />
      </div>
      <button className="text-sm self-end font-semibold text-primary-light" type="submit">
        {submitLabel}
      </button>
    </form>
  );
};
