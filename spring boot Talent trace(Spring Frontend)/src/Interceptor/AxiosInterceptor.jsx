import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8081",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export const setupResponseInterceptor=(navigate)=>{
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
            },
            (error) => {
                    if (error.response.status === 401) {
                        navigate('/login');
                    }
                return Promise.reject(error);
                }
            );
}

export default axiosInstance;