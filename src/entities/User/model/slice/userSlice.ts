import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBuilding } from 'entities/Building';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { UserSchema } from '../types/user';

const initialState: UserSchema = {
  isLoading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<string>) => { 
      state.authData = action.payload 
    },
    initAuthData: (state) => { 
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      if (user) {
        state.authData = JSON.parse(user);
      }
    },
    logout: (state) => { 
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY); 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBuilding.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
      .addCase(fetchBuilding.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchBuilding.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
})

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;