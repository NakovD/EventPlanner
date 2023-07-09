import { yupResolver } from '@hookform/resolvers/yup';
import { IEventForm } from 'features/events/form/models/eventForm';
import { eventValidationSchema } from 'features/events/form/validators/eventValidationSchema';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { useAppMutation } from 'infrastructure/api/hooks/useAppMutation';
import { routePaths } from 'infrastructure/routing/routePaths';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const useEventForm = (formData?: IEventForm, eventId?: string) => {
  const navigate = useNavigate();

  const defaultValues: IEventForm = formData
    ? formData
    : {
        title: '',
        description: '',
        time: '',
        location: '',
        image: '',
        category: '',
        date: '',
      };

  const { control, handleSubmit } = useForm<IEventForm>({
    defaultValues,
    resolver: yupResolver(eventValidationSchema),
  });

  const endpoint =
    formData && eventId
      ? replacePlaceholderWithId(endpoints.events.edit, eventId)
      : endpoints.events.create;

  const { mutate, isSuccess } = useAppMutation<IEventForm>({
    endpoint: endpoint,
  });

  const onSubmit = handleSubmit((data) => mutate(data));

  useEffect(() => {
    if (!isSuccess) return;
    navigate(routePaths.allEvents.path);
  }, [isSuccess]);

  return {
    control,
    onSubmit,
  };
};
