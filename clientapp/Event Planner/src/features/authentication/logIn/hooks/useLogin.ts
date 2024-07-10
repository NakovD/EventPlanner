import { yupResolver } from '@hookform/resolvers/yup';
import { useAppContext } from 'AppContext';
import { IAuthResponse } from 'features/authentication/common/models/authResponse';
import { ILoginForm } from 'features/authentication/logIn/models/loginForm';
import { ILoginRequest } from 'features/authentication/logIn/models/loginRequest';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { useBlockingMutation } from 'infrastructure/api/hooks/useBlockingMutation';
import { routePaths } from 'infrastructure/routing/routePaths';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

type AuthError = { code: string; description: string };

const validationSchema = yup.object({
  userName: yup.string().required(),
  password: yup.string().required(),
});

export const useLogin = () => {
  const { isAuthenticated, setIsAuthenticated } = useAppContext();
  const { mutate, isSuccess, data, error, isError } = useBlockingMutation<
    ILoginRequest,
    IAuthResponse,
    AuthError[]
  >({
    endpoint: endpoints.identity.login,
  });

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<ILoginForm>({
    defaultValues: { userName: '', password: '' },
    resolver: yupResolver(validationSchema),
  });

  const onValid = (data: ILoginForm) => mutate(data);

  useEffect(() => {
    if (isAuthenticated) navigate(routePaths.allEvents.path);
    if (!isSuccess || !data) return;

    setIsAuthenticated(data.token, {
      userId: data.userId,
      userName: data.userName,
      userEmail: data.userEmail,
      userRoles: data.roles,
    });

    navigate(routePaths.allEvents.path);
  }, [isSuccess]);

  const onSubmit = handleSubmit(onValid);

  return { isError, errors: error?.response?.data, control, onSubmit };
};
