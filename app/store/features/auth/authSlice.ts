import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  token: string | null;
  isAuthenticateSuccess: boolean;
  isAuthenticatePending: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isAuthenticateSuccess: false,
  isAuthenticatePending: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: { email: string; name: string } }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logoutUser: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    changeAuthenticateStatus: (
      state,
      action: PayloadAction<{ isAuthenticateSuccess: boolean; isAuthenticatePending: boolean }>,
    ) => {
      state.isAuthenticateSuccess = action.payload.isAuthenticateSuccess;
      state.isAuthenticatePending = action.payload.isAuthenticatePending;
    },

    reset: () => initialState,
  },
});

export const { loginSuccess, logoutUser, changeAuthenticateStatus, reset } = authSlice.actions;
export default authSlice.reducer;
