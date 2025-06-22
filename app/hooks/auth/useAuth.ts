import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { loginSuccess, logoutUser } from '../../store/features/auth/authSlice';
import { useNavigate } from 'react-router';
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
  authenticateStatus: {
    isAuthenticateSuccess: boolean;
    isAuthenticatePending: boolean;
  };
}

export const useAuth = (): UseAuthReturn => {
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
    return loginMutation(data, {
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
    return logoutMutation(undefined, {
      onSuccess: () => {
        dispatch(logoutUser());
        return navigate('/register');
      },
      onError: error => {
        console.error(error);
        return error;
      },
    });
  };

  const {
    mutate: authenticateMutation,
    isSuccess: isAuthenticateSuccess,
    isPending: isAuthenticatePending,
  } = useAuthenticateUser();

  const authenticate = async () => {
    if (!Cookies.get('auth-token')) {
      return navigate('/register');
    }

    return authenticateMutation(undefined, {
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
    authenticateStatus: {
      isAuthenticateSuccess,
      isAuthenticatePending,
    },
  };
};
