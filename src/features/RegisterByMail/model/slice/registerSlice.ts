import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerByEmail } from '../services/registerByEmail/registerByEmail';
import { RegisterSchema } from '../types/registerSchema';

const initialState: RegisterSchema = {
  email: '',
  password: '',
  nickname: '',
  isLoading: false,
}

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerByEmail.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
      .addCase(registerByEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
})

export const { actions: registerActions } = registerSlice;
export const { reducer: registerReducer } = registerSlice;