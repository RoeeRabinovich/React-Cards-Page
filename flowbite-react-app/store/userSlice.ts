import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  _id: string;
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  phone: string;
  image: {
    url: string;
    alt: string;
  };
  isBusiness: boolean;
  isAdmin: boolean;
  email: string;
  address: {
    city: string;
    state: string;
    country: string;
    houseNumber: string;
    street: string;
    zip?: string;
  };
  userSlice: {
    user: {
      id?: string;
      name?: string;
      email?: string;
    } | null;
  };
};

//this is the initial state of the user slice
const initialState = {
  user: null as TUser | null,
};

// this is the user slice of the redux store
// its created using the createSlice function from redux toolkit
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //actions to update the state
    login: (state, data) => {
      state.user = data.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const userActions = userSlice.actions; // this will give us the actions of the slice
export default userSlice.reducer; //this will give us the whole slice reducer
