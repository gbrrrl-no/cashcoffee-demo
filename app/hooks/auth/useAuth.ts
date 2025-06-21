import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { loginSuccess, logoutUser } from '../../store/features/auth/authSlice';
import { useNavigate } from 'react-router';
import { loginSchema, useAuthenticateUser, useLogin, useLogout } from '../../queries/auth';
import type { z } from 'zod';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const {
    mutate: loginMutation,
    isPending: isLoginPending,
    isSuccess: isLoginSuccess,
    isError: isLoginError,
    error: loginError,
  } = useLogin();
  const login = async (data: z.infer<typeof loginSchema>) => {
    loginMutation(data, {
      onSuccess: data => {
        dispatch(loginSuccess({ user: data }));
        return navigate('/');
      },
      onError: error => {
        console.error(error);
        return error;
      },
    });
  };

  const {
    mutate: logoutMutation,
    isPending: isLogoutPending,
    isSuccess: isLogoutSuccess,
    isError: isLogoutError,
    error: logoutError,
  } = useLogout();
  const logout = async () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        dispatch(logoutUser());
        return navigate('/register');
      },
      onError: error => {
        console.error(error);
      },
    });
  };

  const { mutate: authenticateMutation } = useAuthenticateUser();

  const authenticate = () => {
    if (!Cookies.get('auth-token')) {
      return navigate('/register');
    }

    authenticateMutation(undefined, {
      onSuccess: data => {
        dispatch(loginSuccess({ user: data }));
      },
      onError: () => {
        dispatch(logoutUser());
        return navigate('/register');
      },
    });
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    isLoginPending,
    isLoginSuccess,
    isLoginError,
    loginError,
    isLogoutPending,
    isLogoutSuccess,
    isLogoutError,
    logoutError,
    authenticate,
  };
};
