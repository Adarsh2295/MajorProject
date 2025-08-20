import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../services/LocalStorageService"

const UserSlice=createSlice({
    name:"user",
    initialState: getItem("user") || null,
    reducers:{
        setUser:(state, action)=>{
            setItem("user",action.payload);
            return action.payload;
        },
        removeUser:(state)=>{
            removeItem("user");
            removeItem("token");
            return null;
        }
    }
});
export const {setUser,removeUser}=UserSlice.actions;
export default UserSlice.reducer;
