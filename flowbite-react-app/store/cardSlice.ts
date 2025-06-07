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
    removeCard: (state, action) => {
      state.cards = state.cards.filter((card) => card._id !== action.payload);
    },
    addCard: (state, action) => {
      state.cards.push(action.payload);
    }
  },
});

export const { storeCards, removeCard, addCard } = cardSlice.actions;
export default cardSlice.reducer;
