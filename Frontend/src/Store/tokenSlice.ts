import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./Store";

 
 
const initialState = 
 {  
   token:null
 }

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state,action) => {
      state.token=action.payload.token;
    },
    removeToken: (state,action) => {
      state.token=null;
    }
    
    },
    
  },
);

export const { setToken,removeToken } = tokenSlice.actions
export const selectToken = (state: RootState) => state.tokens;

export default tokenSlice.reducer


 