import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import searchSlice from "./searchSlice";
import cardSlice from "./cardSlice";

const RootReducer = combineReducers({ userSlice, searchSlice, cardSlice });
//using RootReducer as the reducer value.
const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, //this is to avoid the error of serializable check.
    }),
});

export type TRootState = ReturnType<typeof RootReducer>;
export default store;
