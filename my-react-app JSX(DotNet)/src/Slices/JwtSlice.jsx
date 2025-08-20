import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../services/LocalStorageService";
import { jwtDecode } from "jwt-decode"

// Safely get initial token
const getInitialToken = () => {
    try {
        const token = localStorage.getItem("token");
        if (token && token !== "") {
            // Validate token by trying to decode it
            jwtDecode(token);
            return token;
        }
    } catch (error) {
        console.log("Invalid token found, clearing...");
        localStorage.removeItem("token");
    }
    return "";
}

const JwtSlice=createSlice({
    name:"jwt",
    initialState: getInitialToken(),
    reducers:{
        setJwt:(state, action)=>{
            localStorage.setItem("token",action.payload);
            return action.payload;
        },
        removeJwt:(state)=>{
            localStorage.removeItem("token");
            return "";
        }
    }
});
export const {setJwt,removeJwt}=JwtSlice.actions;
export default JwtSlice.reducer;
