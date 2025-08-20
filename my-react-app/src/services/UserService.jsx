import axiosInstance from "../Interceptor/AxiosInterceptor";

const registerUser= async(user)=>{
    return axiosInstance.post(`/users/register`, user).then(res=>res.data).catch(error=>{
        throw error;
    });
}

const loginUser= async(login)=>{
    return axiosInstance.post(`/users/login`, login)
    .then(res=>res.data)
    .catch(error=>{
        throw error;
    });
}

const sendOtp= async(email)=>{
    return axiosInstance.post(`/users/send-otp/${email}`)
    .then(res=>res.data)
    .catch(error=>{
        throw error;
    });
}

const veriftOtp = async (email, otp)=>{
    return axiosInstance.get(`/users/verify-otp/${email}/${otp}`)
    .then(res=>res.data)
    .catch(error=>{
        throw error;
    })
}

const changePassword = async(email, password)=>{
    return axiosInstance.post(`/users/changePassword`,{email, password})
    .then(res=>res.data)
    .catch(error=>{
        throw error;
    })
}

export {registerUser,loginUser,sendOtp,veriftOtp,changePassword};