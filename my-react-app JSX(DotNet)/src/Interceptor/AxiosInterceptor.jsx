import axios, { InternalAxiosRequestConfig } from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:8081",
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token');
        console.log('Axios Debug - Token from localStorage:', token ? 'Token present' : 'No token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Axios Debug - Authorization header set for URL:', config.url);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// Create a variable to store Redux actions for cleanup
let reduxCleanupActions= null

// Function to set Redux actions from outside
export const setReduxCleanupActions = (actions) => {
    reduxCleanupActions = actions;
}

export const setupResponseInterceptor=(navigate, dispatch?)=>{
    // Store Redux actions if dispatch is provided
    if (dispatch && !reduxCleanupActions) {
        // We'll set the cleanup actions from the Header component
        console.log('Dispatch available for interceptor cleanup');
    }
    
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
            },
            (error) => {
                    if (error.response?.status === 401) {
                        // Clear all authentication state on 401 error
                        localStorage.clear();
                        sessionStorage.clear()

                        // If dispatch and cleanup actions are available, clear Redux state
                        if (dispatch && reduxCleanupActions) {
                            try {
                                dispatch(reduxCleanupActions.removeUser());
                                dispatch(reduxCleanupActions.removeJwt());
                                dispatch(reduxCleanupActions.setProfile({}));
                                console.log('Redux state cleared on 401 error');
                            } catch (e) {
                                console.log('Could not clear Redux state:', e);
                            }
                        }
                        
                        navigate('/login', { replace: true });
                    }
                return Promise.reject(error);
                }
            );
}

export default axiosInstance;
