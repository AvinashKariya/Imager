import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setId: (state, id) => {
      state.id = id;
    },
    resetId: (state) => {
      state.id = "";
    },
  },
});

export const { setId, resetId } = loginSlice.actions;

export default loginSlice.reducer;
