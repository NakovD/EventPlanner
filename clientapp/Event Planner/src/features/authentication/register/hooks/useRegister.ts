import { yupResolver } from '@hookform/resolvers/yup';
import { useAppContext } from 'AppContext';
import { IAuthResponse } from 'features/authentication/common/models/authResponse';
import { IRegisterErrorResponse } from 'features/authentication/register/models/registerErrorResponse';
import { IRegisterForm } from 'features/authentication/register/models/registerForm';
import { IRegisterRequest } from 'features/authentication/register/models/registerRequest';
import { registerValidationSchema } from 'features/authentication/register/validators/registerFormValidator';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { useBlockingMutation } from 'infrastructure/api/hooks/useBlockingMutation';
import { routePaths } from 'infrastructure/routing/routePaths';
import { propertyOf } from 'infrastructure/utilities/propertyOf';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const { isAuthenticated, setUser } = useAppContext();
  const { mutate, isError, error, isSuccess, data } = useBlockingMutation<
    IRegisterRequest,
    IAuthResponse,
    IRegisterErrorResponse[]
  >({
    endpoint: endpoints.identity.register,
  });

  const navigate = useNavigate();

  const { control, handleSubmit, setError } = useForm<IRegisterForm>({
    defaultValues: { userName: '', password: '', repeatPassword: '', email: '' },
    resolver: yupResolver(registerValidationSchema),
  });

  const onValid = (data: IRegisterForm) => {
    mutate(data);
  };

  useEffect(() => {
    if (!isError || !error) return;
    const errors = error.response?.data;

    const errorsForForm = errors?.map((e) => {
      const errorCode = e.code;
      const message = e.description;

      const field = errorCode === 'DuplicateUserName' ? 'userName' : 'email';

      return {
        field: propertyOf<IRegisterForm>(field),
        type: 'custom',
        message: message,
      };
    });

    errorsForForm?.forEach((e) =>
      setError(e.field, { type: e.type, message: e.message }),
    );
  }, [isError]);

  useEffect(() => {
    if (isAuthenticated) navigate(routePaths.allEvents.path);
    if (!isSuccess || !data) return;

    setUser({
      userId: data.userId,
      userName: data.userName,
      userEmail: data.userEmail,
      userRoles: data.roles,
    });
    navigate(routePaths.allEvents.path);
  }, [isSuccess]);

  const onSubmit = handleSubmit(onValid);

  return { control, onSubmit };
};
