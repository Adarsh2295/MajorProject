import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "../services/ProfileService";

const ProfileSlice=createSlice({
    name:"user",
    initialState:{},
    reducers:{
        changeProfile:(state, action)=>{

            state = updateProfile(action.payload);
            return action.payload;
        },
        setProfile:(state, action)=>{
            state = action.payload;
            return state;
        },
        removeProfile:(state, action)=>{
            return {};
        }
    }
});
export const {changeProfile,setProfile,removeProfile}=ProfileSlice.actions;
export default ProfileSlice.reducer;