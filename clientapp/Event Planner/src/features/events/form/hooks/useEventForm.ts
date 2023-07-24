import { yupResolver } from '@hookform/resolvers/yup';
import { IOption } from 'features/common/form/models/option';
import { useEventCategories } from 'features/events/form/hooks/useEventCategories';
import { IEventForm } from 'features/events/form/models/eventForm';
import { IEventRequest } from 'features/events/form/models/eventRequest';
import { eventValidationSchema } from 'features/events/form/validators/eventValidationSchema';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { useBlockingMutation } from 'infrastructure/api/hooks/useBlockingMutation';
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
        category: { label: '', value: 0 },
        date: '',
      };

  const categories = useEventCategories();

  const { control, handleSubmit } = useForm<IEventForm>({
    defaultValues,
    resolver: yupResolver(eventValidationSchema),
  });

  const endpoint =
    formData && eventId
      ? replacePlaceholderWithId(endpoints.events.edit, eventId)
      : endpoints.events.create;

  const { mutate, isSuccess } = useBlockingMutation<IEventRequest>({
    endpoint: endpoint,
  });

  const onSubmit = handleSubmit((data) =>
    mutate({ ...data, categoryId: data.category.value }),
  );

  useEffect(() => {
    if (!isSuccess) return;
    navigate(routePaths.allEvents.path);
  }, [isSuccess]);

  const categoriesOptions: IOption<number>[] = categories.map((c) => {
    const option: IOption<number> = {
      label: c.name,
      value: c.id,
    };

    return option;
  });

  return {
    categories: categoriesOptions,
    control,
    onSubmit,
  };
};
