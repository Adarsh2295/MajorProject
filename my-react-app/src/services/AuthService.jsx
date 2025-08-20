import axios from "axios"
import { removeUser } from "../Slices/UserSlice";

const base_url="http://localhost:8081/auth/"
const loginUser= async(login)=>{
    return axios.post(`${base_url}login`, login)
    .then(res=>res.data)
    .catch(error=>{
        throw error;
    });
}
const navigateToLogin=(navigate)=>{
    localStorage.removeItem('token')
    removeUser();
    navigate('/login');
}

export {loginUser, navigateToLogin};