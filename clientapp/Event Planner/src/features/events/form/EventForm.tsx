import { Button } from 'features/common/button/Button';
import { TextArea } from 'features/common/form/TextArea';
import { TextField } from 'features/common/form/TextField';
import { useEventForm } from 'features/events/form/hooks/useEventForm';
import { IEventForm } from 'features/events/form/models/eventForm';
import { propertyOf } from 'infrastructure/utilities/propertyOf';

interface IEventFormProps {
  title: string;
  eventId?: string;
  formData?: IEventForm;
}

export const EventForm = ({ title, eventId, formData }: IEventFormProps) => {
  const { control, onSubmit } = useEventForm(formData, eventId);

  return (
    <>
      <h1 className="text-3xl text-center mb-5">{title}</h1>
      <form onSubmit={onSubmit} className="grid grid-cols-2 gap-6 my-12 w-4/5 mx-auto">
        <TextField
          control={control}
          name={propertyOf<IEventForm>('title')}
          label="Title"
          info="The title. Think of something awesome."
        />
        <TextArea
          control={control}
          name={propertyOf<IEventForm>('description')}
          label="Description"
          info="Some brief explanation(250 chars) about your event."
        />
        <TextField
          control={control}
          name={propertyOf<IEventForm>('category')}
          label="Category"
          info="Under contruction."
        />
        <TextField
          control={control}
          name={propertyOf<IEventForm>('image')}
          label="Image Link"
          info="Under contruction."
        />
        <TextField
          control={control}
          name={propertyOf<IEventForm>('location')}
          label="Location"
          info="The place where you event will happen."
        />
        <TextField
          control={control}
          name={propertyOf<IEventForm>('time')}
          label="Time"
          info="Events need to have exact hour which they start in format: hh:mm."
        />
        <TextField
          control={control}
          name={propertyOf<IEventForm>('date')}
          label="Date"
          info="The date for your epic event in format: dd/MM/yyyy."
        />
        <Button className="place-self-center w-28" isSubmit={true} label="Submit" />
      </form>
    </>
  );
};
