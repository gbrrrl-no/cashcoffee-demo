import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import {
  changeAuthenticateStatus,
  loginSuccess,
  logoutUser,
} from '../../store/features/auth/authSlice';
import { useLocation, useNavigate } from 'react-router';
import { loginSchema, useAuthenticateUser, useLogin, useLogout } from '../../queries/auth';
import type { z } from 'zod';
import Cookies from 'js-cookie';

interface UseAuthReturn {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  login: (data: z.infer<typeof loginSchema>) => Promise<void>;
  loginStatus: {
    isLoginPending: boolean;
    isLoginSuccess: boolean;
    isLoginError: boolean;
    loginError: Error | null;
  };
  logout: () => Promise<void>;
  logoutStatus: {
    isLogoutPending: boolean;
    isLogoutSuccess: boolean;
    isLogoutError: boolean;
    logoutError: Error | null;
  };
  authenticate: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const {
    mutate: loginMutation,
    isPending: isLoginPending,
    isSuccess: isLoginSuccess,
    isError: isLoginError,
    error: loginError,
  } = useLogin();
  const login = async (data: z.infer<typeof loginSchema>) => {
    return loginMutation(data, {
      onSuccess: data => {
        dispatch(loginSuccess({ user: data }));
        return navigate('/');
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
    return logoutMutation(undefined, {
      onSuccess: () => {
        dispatch(logoutUser());
        return navigate('/register');
      },
    });
  };

  const { mutate: authenticateMutation } = useAuthenticateUser();
  const authenticate = async () => {
    dispatch(
      changeAuthenticateStatus({ isAuthenticateSuccess: false, isAuthenticatePending: true }),
    );

    if (!Cookies.get('auth-token')) {
      if (['/register', '/login'].includes(location.pathname)) return;
      return navigate('/register');
    }

    return authenticateMutation(undefined, {
      onSuccess: data => {
        dispatch(loginSuccess({ user: data }));
        dispatch(
          changeAuthenticateStatus({ isAuthenticateSuccess: true, isAuthenticatePending: false }),
        );
        if (['/register', '/login'].includes(location.pathname)) return navigate('/');
        return;
      },
      onError: () => {
        dispatch(logoutUser());
        dispatch(
          changeAuthenticateStatus({ isAuthenticateSuccess: false, isAuthenticatePending: false }),
        );
        return navigate('/register');
      },
    });
  };

  return {
    isAuthenticated,
    user,
    login,
    loginStatus: {
      isLoginPending,
      isLoginSuccess,
      isLoginError,
      loginError,
    },
    logout,
    logoutStatus: {
      isLogoutPending,
      isLogoutSuccess,
      isLogoutError,
      logoutError,
    },
    authenticate,
  };
};
