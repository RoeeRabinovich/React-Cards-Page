import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
const store = configureStore({
  reducer: { userSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, //this is to avoid the error of serializable check.
    }),
});

const RootReducer = combineReducers({ userSlice });
export type TRootState = ReturnType<typeof RootReducer>;
export default store;
