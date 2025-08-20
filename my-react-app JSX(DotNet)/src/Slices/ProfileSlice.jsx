import { createSlice } from "@reduxjs/toolkit";
// Removed direct import of updateProfile API function - this should not be called in reducers

const ProfileSlice=createSlice({
    name:"profile", // Fixed name to match purpose
    initialState:{},
    reducers:{
        changeProfile:(state, action)=>{
            // Redux reducers should be synchronous - just update the state
            // API calls should be made in components before dispatching this action
            console.log('ProfileSlice - changeProfile called with:', action.payload);
            return action.payload;
        },
        setProfile:(state, action)=>{
            console.log('ProfileSlice - setProfile called with:', action.payload);
            console.log('ProfileSlice - setProfile payload id:', action.payload?.id, 'Type:', typeof action.payload?.id);
            return action.payload;
        }
    }
});
export const {changeProfile,setProfile}=ProfileSlice.actions;
export default ProfileSlice.reducer;
