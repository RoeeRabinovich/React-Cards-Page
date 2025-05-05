import { createSlice } from "@reduxjs/toolkit";

type Tuser = {
  _id: string;
  image: {
    url: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  address: {
    city: string;
    street: string;
    address: string;
    houseNumber: string;
  };
};

//this is the initial state of the user slice
const initialState = {
  user: null as Tuser | null,
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
