import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  email: string;
};

interface AuthState {
  token: string | null;
  email: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

const tokenFromStorage = localStorage.getItem("token");

const initialState: AuthState = {
  isAuthenticated: !!tokenFromStorage,
  token: tokenFromStorage,
  email: tokenFromStorage ? localStorage.getItem("email") : null,
  role: tokenFromStorage ? localStorage.getItem("role") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
  state,
  action: PayloadAction<{ token: string; email: string; role: string }>
) => {
  state.token = action.payload.token;
  state.email = action.payload.email;
  state.role = action.payload.role;
  state.isAuthenticated = true;

  localStorage.setItem("token", action.payload.token);
  localStorage.setItem("role", action.payload.role);
},
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      state.role = null;
      localStorage.removeItem("role");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;