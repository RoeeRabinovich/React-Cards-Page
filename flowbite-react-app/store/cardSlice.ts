import { createSlice } from "@reduxjs/toolkit";
import { TCard } from "../src/types/TCard";

const cardSlice = createSlice({
  name: "cardSlice",
  initialState: {
    cards: [] as TCard[],
  },
  reducers: {
    storeCards: (state, action) => {
      state.cards = action.payload;
    },
  },
});

export const { storeCards } = cardSlice.actions;
export default cardSlice.reducer;
