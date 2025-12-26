import { TokenSliceParams } from "@/types/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const tokenInitialState: TokenSliceParams = {
  token: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState: tokenInitialState,
  reducers: {
    setToken(state: TokenSliceParams, action: PayloadAction<string>) {
      state.token = action.payload;
    },

    deleteToken() {
      return tokenInitialState;
    },
  },
});

export const tokenActions = tokenSlice.actions;
export default tokenSlice.reducer;