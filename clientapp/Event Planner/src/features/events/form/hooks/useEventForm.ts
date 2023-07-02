import { yupResolver } from '@hookform/resolvers/yup';
import { IEventForm } from 'features/events/form/models/eventForm';
import { eventValidationSchema } from 'features/events/form/validators/eventValidationSchema';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { useCreateMutation } from 'infrastructure/api/hooks/useCreateMutation';
import { routePaths } from 'infrastructure/routing/routePaths';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const useEventForm = (formData?: IEventForm) => {
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

  const { mutate, isSuccess } = useCreateMutation<IEventForm>({
    endpoint: endpoints.events.create,
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
