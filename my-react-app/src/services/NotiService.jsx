
import axiosInstance from "../Interceptor/AxiosInterceptor";

const getNotifications=async (id)=>{
    return await axiosInstance.get(`/notification/get/${id}`)
    .then(result=> result.data)
    .catch (error=>{throw error});
}

const readNotifications=async (id)=>{
    return await axiosInstance.put(`/notification/read/${id}`)
    .then(result=> result.data)
    .catch (error=>{throw error});
}

export {getNotifications, readNotifications};