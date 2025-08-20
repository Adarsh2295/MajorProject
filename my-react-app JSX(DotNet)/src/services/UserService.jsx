import axiosInstance from "../Interceptor/AxiosInterceptor"

const registerUser= async(user)=>{
    return axiosInstance.post(`/auth/register`, user).then(res=> {
        if (!res) {
            console.error('UserService - No response received for register');
            throw new Error('No response received from server');
        }
        return res.data;
    }).catch(error=>{
        throw error;
    });
}

const loginUser= async(login)=>{
    return axiosInstance.post(`/auth/login`, login)
    .then(res=> {
        if (!res) {
            console.error('UserService - No response received for login');
            throw new Error('No response received from server');
        }
        return res.data;
    })
    .catch(error=>{
        throw error;
    });
}

const sendOtp= async(email)=>{
    return axiosInstance.post(`/auth/forgot-password?email=${email}`)
    .then(res=>res.data)
    .catch(error=>{
        throw error;
    });
}

const veriftOtp = async (email, otp)=>{
    return axiosInstance.post(`/auth/verify-otp?email=${email}&otp=${otp}`)
    .then(res=>res.data)
    .catch(error=>{
        throw error;
    })
}

const changePassword = async(email, password, otp)=>{
    return axiosInstance.post(`/auth/reset-password?email=${email}&otp=${otp}`, JSON.stringify(password), {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res=>res.data)
    .catch(error=>{
        throw error;
    })
}

export {registerUser,loginUser,sendOtp,veriftOtp,changePassword};
