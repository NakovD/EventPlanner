import { yupResolver } from '@hookform/resolvers/yup';
import { IOption } from 'features/common/form/models/option';
import { useEventCategories } from 'features/events/form/hooks/useEventCategories';
import { ICategory } from 'features/administration/categories/models/category';
import { IEventForm } from 'features/events/form/models/eventForm';
import { IEventRequest } from 'features/events/form/models/eventRequest';
import { eventValidationSchema } from 'features/events/form/validators/eventValidationSchema';
import { IAllEventsEntity } from 'features/events/models/allEventsEntity';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { useBlockingMutation } from 'infrastructure/api/hooks/useBlockingMutation';
import { routePaths } from 'infrastructure/routing/routePaths';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface IImageState {
  isUpdated: boolean;
  imageUrl: string;
}

export const useEventForm = (event?: IAllEventsEntity, eventId?: string) => {
  const navigate = useNavigate();

  const categories = useEventCategories();

  const eventFormData = event ? mapCategoryToForm(event, categories) : void 0;

  const defaultValues: IEventForm = eventFormData
    ? eventFormData
    : {
        title: '',
        description: '',
        time: '',
        location: '',
        category: { label: '', value: 0 },
        date: '',
      };

  const [imageState, setImageState] = useState<IImageState>({
    imageUrl: event?.image ?? '',
    isUpdated: false,
  });

  const {
    control,
    formState: { isDirty, isValid },
    handleSubmit,
  } = useForm<IEventForm>({
    defaultValues,
    resolver: yupResolver(eventValidationSchema),
  });

  const endpoint =
    event && eventId
      ? replacePlaceholderWithId(endpoints.events.edit, eventId)
      : endpoints.events.create;

  const { mutate, isSuccess } = useBlockingMutation<IEventRequest>({
    endpoint: endpoint,
  });

  const onSubmit = handleSubmit((data) =>
    mutate({ ...data, categoryId: data.category.value, image: imageState.imageUrl }),
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

  const onCloudinarySuccess = (url: string) => {
    if (!url) setImageState({ imageUrl: '', isUpdated: true });
    else setImageState({ imageUrl: url, isUpdated: true });
  };

  const onCloudinaryError = () => setImageState({ imageUrl: '', isUpdated: true });

  return {
    isSubmitEnabled:
      isValid && imageState.imageUrl !== '' && (imageState.isUpdated === true || isDirty),
    categories: categoriesOptions,
    imageUrl: imageState.imageUrl,
    control,
    onSubmit,
    onCloudinarySuccess,
    onCloudinaryError,
  };
};

const mapCategoryToForm = (event: IAllEventsEntity, categories: ICategory[]) => {
  const currentCategory = categories.find((c) => c.name === event.category) as ICategory;

  const newFormData: IEventForm = {
    ...event,
    category: { label: currentCategory?.name, value: currentCategory?.id },
  };

  return newFormData;
};
