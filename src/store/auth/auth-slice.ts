import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthStateType, AuthUserType } from "./auth-type";

const initialState: AuthStateType = {
  user: null,
  loading: false,
  error: "",
  verificationMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUserType | null>) => {
      state.user = action.payload;
    },

    setUserEmailVerified: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.emailVerified = action.payload;
      }
    },

    setVerificationMessage: (state, action: PayloadAction<string>) => {
      state.verificationMessage = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setUserEmailVerified, setVerificationMessage, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;
