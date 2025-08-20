
import axiosInstance from "../Interceptor/AxiosInterceptor"

const getNotifications=async (id)=>{
    return await axiosInstance.get(`/api/notifications/my-notifications`)
    .then(result=> {
        if (!result) {
            console.error('NotiService - No response received for getNotifications');
            throw new Error('No response received from server');
        }
        return result.data;
    })
    .catch (error=>{throw error});
}

const readNotifications=async (id)=>{
    return await axiosInstance.put(`/api/notifications/${id}/mark-as-read`)
    .then(result=> {
        if (!result) {
            console.error('NotiService - No response received for readNotifications');
            throw new Error('No response received from server');
        }
        return result.data;
    })
    .catch (error=>{throw error});
}

export {getNotifications, readNotifications};
