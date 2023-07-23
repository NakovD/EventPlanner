import { useAppContext } from 'AppContext';
import { ILoginForm } from 'features/authentication/logIn/models/loginForm';
import { ILoginRequest } from 'features/authentication/logIn/models/loginRequest';
import { IAuthResponse } from 'features/authentication/models/authResponse';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { useAppMutation } from 'infrastructure/api/hooks/useAppMutation';
import { routePaths } from 'infrastructure/routing/routePaths';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const { isAuthenticated, setIsAuthenticated } = useAppContext();
  const { mutate, isLoading, isSuccess, data, error, isError } = useAppMutation<
    ILoginRequest,
    IAuthResponse,
    string
  >({
    endpoint: endpoints.user.login,
  });

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<ILoginForm>({
    defaultValues: { userName: '', password: '' },
  });

  const onValid = (data: ILoginForm) => mutate(data);

  useEffect(() => {
    if (isAuthenticated) navigate(routePaths.allEvents.path);
    if (!isSuccess || !data) return;

    setIsAuthenticated(data.token);

    navigate(routePaths.allEvents.path);
  }, [isSuccess]);

  const onSubmit = handleSubmit(onValid);

  return { isLoading, isError, error: error?.response?.data, control, onSubmit };
};
