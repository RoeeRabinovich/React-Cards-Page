import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import searchSlice from "./searchSlice";
const store = configureStore({
  reducer: { userSlice, searchSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, //this is to avoid the error of serializable check.
    }),
});

const RootReducer = combineReducers({ userSlice, searchSlice });
export type TRootState = ReturnType<typeof RootReducer>;
export default store;
