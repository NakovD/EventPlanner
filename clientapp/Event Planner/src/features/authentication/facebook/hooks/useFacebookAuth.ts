import { useAppContext } from 'AppContext';
import { IAuthResponse } from 'features/authentication/common/models/authResponse';
import { endpoints } from 'infrastructure/api/endpoints/endpoints';
import { useBlockingMutation } from 'infrastructure/api/hooks/useBlockingMutation';
import { routePaths } from 'infrastructure/routing/routePaths';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FACEBOOK_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID as string;

interface IFacebookAuthRequest {
  accessToken: string;
}

export const useFacebookAuth = () => {
  const navigate = useNavigate();

  const { setUser } = useAppContext();

  FB.init({
    appId: FACEBOOK_APP_ID,
    cookie: true,
    xfbml: true,
    version: '17.0',
  });

  const { mutate, isSuccess, data } = useBlockingMutation<
    IFacebookAuthRequest,
    IAuthResponse
  >({
    endpoint: endpoints.identity.loginWithFacebook,
  });

  useEffect(() => {
    if (!isSuccess || !data) return;

    setUser({
      userId: data.userId,
      userName: data.userName,
      userEmail: data.userEmail,
      userRoles: data.roles,
    });

    navigate(routePaths.allEvents.path);
  }, [isSuccess]);

  const onButtonClick = () =>
    FB.getLoginStatus((responseStatus) => {
      if (responseStatus.status === 'connected') {
        mutate({ accessToken: responseStatus.authResponse.accessToken });
      } else {
        FB.login(
          (response) => {
            if (response.status === 'connected')
              mutate({ accessToken: response.authResponse.accessToken });
          },
          { scope: 'public_profile, email' },
        );
      }
    });

  return {
    onButtonClick,
  };
};
