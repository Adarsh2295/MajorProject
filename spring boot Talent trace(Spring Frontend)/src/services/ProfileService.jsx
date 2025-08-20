
import axiosInstance from "../Interceptor/AxiosInterceptor";

    const getProfile=async (id)=>{
        return await axiosInstance.get(`/profiles/get/${id}`)
        .then(result=> result.data)
        .catch (error=>{throw error});
     }

    const updateProfile= async(profile)=>{
        return axiosInstance.put(`/profiles/update`, profile)
        .then(res=>res.data)
        .catch(error=>{
            throw error;
        });
    }

    const getAllProfiles = async ()=>{
        return axiosInstance.get(`/profiles/getAll`)
        .then(result=>result.data)
        .catch(error=>{
            throw error;
        });
    }

    export {getProfile,updateProfile, getAllProfiles};

