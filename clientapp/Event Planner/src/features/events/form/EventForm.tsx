import { CloudinaryWidget } from 'features/cloudinaryWidget/CloudinaryWidget';
import { Button } from 'features/common/button/Button';
import { ESelect } from 'features/common/form/ESelect';
import { TextArea } from 'features/common/form/TextArea';
import { TextField } from 'features/common/form/TextField';
import { useEventForm } from 'features/events/form/hooks/useEventForm';
import { IAllEventsEntity } from 'features/events/models/allEventsEntity';

interface IEventFormProps {
  title: string;
  eventId?: string;
  event?: IAllEventsEntity;
}

export const EventForm = ({ title, eventId, event }: IEventFormProps) => {
  const {
    isSubmitEnabled,
    imageUrl,
    categories,
    control,
    onSubmit,
    onCloudinarySuccess,
    onCloudinaryError,
  } = useEventForm(event, eventId);

  return (
    <>
      <h1 className="text-3xl text-center mb-5">{title}</h1>
      <form onSubmit={onSubmit} className="grid grid-cols-2 gap-6 my-12 w-4/5 mx-auto">
        <TextField
          control={control}
          name="title"
          label="Title"
          info="The title. Think of something awesome."
        />
        <TextArea
          control={control}
          name="description"
          label="Description"
          info="Some brief explanation(250 chars) about your event."
        />
        <ESelect
          label="Category"
          control={control}
          options={categories}
          name="category"
        />
        <div className="flex flex-col gap-2">
          <span>Image Link: </span>
          <span className="truncate" title={imageUrl}>
            {imageUrl}
          </span>
          <CloudinaryWidget onError={onCloudinaryError} onSuccess={onCloudinarySuccess} />
        </div>
        <TextField
          control={control}
          name="location"
          label="Location"
          info="The place where you event will happen."
        />
        <TextField
          control={control}
          name="time"
          label="Time"
          info="Events need to have exact hour which they start in format: hh:mm."
        />
        <TextField
          control={control}
          name="date"
          label="Date"
          info="The date for your epic event in format: dd/MM/yyyy and should be after today."
        />
        <Button
          className="place-self-center w-28"
          type="submit"
          disabled={!isSubmitEnabled}
          label="Submit"
        />
      </form>
    </>
  );
};
