import axiosInstance from "../Interceptor/AxiosInterceptor";

    const postJob = async (job)=>{
        return  axiosInstance.post(`/job/post`,job)
        .then(result=> result.data)
        .catch (error=>{throw error});
    }

const getAllJobs = async ()=>{
    return axiosInstance.get(`/job/getAll`)
    .then(result=>result.data)
    .catch(error=>{throw error});
}

const getJob = async (id)=>{
    return  axiosInstance.get(`/job/get/${id}`)
    .then(result=>result.data)
    .catch(error=>{throw error});
}

const applyJob = async (id, applicant)=>{
    return  axiosInstance.post(`/job/apply/${id}`,applicant)
    .then(result=> result.data)
    .catch (error=>{throw error});
}

const getJobPostedBy=async (id)=>{
    return axiosInstance.get(`/job/postedBy/${id}`)
    .then(result=>result.data)
    .catch(error=>{throw error});
}

const changeAppStatus=async(application)=>{
    return axiosInstance.post(`/job/changeAppStatus`,application)
    .then(result=>result.data)
    .catch(error=>{throw error});
}

export {postJob,getAllJobs,getJob,applyJob,getJobPostedBy,changeAppStatus};
