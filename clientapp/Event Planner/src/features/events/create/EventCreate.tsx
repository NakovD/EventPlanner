import { TextField } from 'features/common/form/TextField';
import { IEventForm } from 'features/events/models/eventForm';
import { propertyOf } from 'infrastructure/utilities/propertyOf';
import { useForm } from 'react-hook-form';

export const EventCreate = () => {
  const { control } = useForm<IEventForm>();
  return (
    <form>
      <TextField control={control} name={propertyOf<IEventForm>('title')} label="Title" />
      <TextField control={control} name={propertyOf<IEventForm>('title')} label="Title" />
      <TextField control={control} name={propertyOf<IEventForm>('title')} label="Title" />
      <TextField control={control} name={propertyOf<IEventForm>('title')} label="Title" />
      <TextField control={control} name={propertyOf<IEventForm>('title')} label="Title" />
      <TextField control={control} name={propertyOf<IEventForm>('title')} label="Title" />
      <TextField control={control} name={propertyOf<IEventForm>('title')} label="Title" />
    </form>
  );
};
