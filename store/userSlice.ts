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
  password?: string; // Optional field for password
};

//this is the initial state of the user slice
const initialState = {
  user: null as TUser | null,
  editUser: [] as TUser[], // Initialize as empty array
};

// this is the user slice of the redux store
// its created using the createSlice function from redux toolkit
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state, action) => {
      state.user = action.payload;
    },
    login: (state, data) => {
      state.user = data.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    editUser: (state, action) => {
      // Accepts an array of users and replaces the state
      if (Array.isArray(action.payload)) {
        state.editUser = action.payload;
        return;
      }
      // Fallback: single user update logic
      if (!state.editUser) {
        state.editUser = [];
      }
      const index = state.editUser.findIndex(
        (user) => user._id === action.payload._id,
      );
      if (index !== -1) {
        state.editUser[index] = {
          ...state.editUser[index],
          ...action.payload,
        };
      } else {
        state.editUser.push(action.payload);
      }
    },
    removeUser: (state, action) => {
      // Check if editUser array exists
      if (!state.editUser) {
        state.editUser = [];
      }

      // Filter out the user to be removed
      state.editUser = state.editUser.filter(
        (user) => user._id !== action.payload,
      );
    },
    // Add a new user to the editUser array
    updateUser: (state, action) => {
      const updated = action.payload;
      const idx = state.editUser.findIndex((u) => u._id === updated._id);
      if (idx !== -1) {
        state.editUser[idx] = updated;
      }
    },
  },
});

export const userActions = userSlice.actions; // this will give us the actions of the slice
export default userSlice.reducer; //this will give us the whole slice reducer
