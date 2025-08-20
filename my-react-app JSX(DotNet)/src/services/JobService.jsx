import axiosInstance from "../Interceptor/AxiosInterceptor"

// Job Management APIs
const postJob = async (job) => {
    // Map frontend fields to backend expected fields
    const mappedJob = {
        ...job,
        PostedBy: job.postedBy || job.PostedBy,
        Skills: job.skills || job.Skills || [],
        JobTitle: job.jobTitle,
        Company: job.company,
        About: job.about,
        Experience: job.experience,
        JobType: job.jobType,
        Location: job.location,
        PackageOffered: job.packageOffered,
        Description: job.description,
        JobStatus: job.jobStatus
    }

    // If job has an ID and it's not "0", use PUT for update
    if (job.id && job.id !== "0" && job.id !== 0) {
        return axiosInstance.put(`/api/jobs/${job.id}`, mappedJob)
            .then(result => {
                if (!result) {
                    console.error('JobService - No response received for job update');
                    throw new Error('No response received from server');
                }
                return result.data;
            })
            .catch(error => { throw error });
    } else {
        // Create new job
        return axiosInstance.post(`/api/jobs`, mappedJob)
            .then(result => {
                if (!result) {
                    console.error('JobService - No response received for job creation');
                    throw new Error('No response received from server');
                }
                return result.data;
            })
            .catch(error => { throw error });
    }
}

const getAllJobs = async () => {
    return axiosInstance.get(`/api/jobs`)
        .then(result => {
            if (!result) {
                console.error('JobService - No response received for getAllJobs');
                throw new Error('No response received from server');
            }
            return result.data;
        })
        .catch(error => { throw error });
}

const getJob = async (id) => {
    return axiosInstance.get(`/api/jobs/${id}`)
        .then(result => {
            if (!result) {
                console.error('JobService - No response received for getJob');
                throw new Error('No response received from server');
            }
            return result.data;
        })
        .catch(error => { throw error });
}

const getJobPostedBy = async (recruiterId) => {
    return axiosInstance.get(`/api/jobs/postedBy/${recruiterId}`)
        .then(result => {
            if (!result) {
                console.error('JobService - No response received for getJobPostedBy');
                throw new Error('No response received from server');
            }
            return result.data;
        })
        .catch(error => { throw error });
}

const updateJob = async (id, job) => {
    return axiosInstance.put(`/api/jobs/${id}`, job)
        .then(result => result.data)
        .catch(error => { throw error });
}

const deleteJob = async (id) => {
    return axiosInstance.delete(`/api/jobs/${id}`)
        .then(result => result.data)
        .catch(error => { throw error });
}

const searchJobs = async (keyword, location, jobType, experience) => {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (location) params.append('location', location);
    if (jobType) params.append('jobType', jobType);
    if (experience) params.append('experience', experience)

    return axiosInstance.get(`/api/jobs/search?${params.toString()}`)
        .then(result => {
            if (!result) {
                console.error('JobService - No response received for searchJobs');
                throw new Error('No response received from server');
            }
            return result.data;
        })
        .catch(error => { throw error });
}

// Job Application APIs (using ApplicantsController)
const applyJob = async (applicantData) => {
    const formData = new FormData();
    Object.keys(applicantData).forEach(key => {
        if (applicantData[key] !== null && applicantData[key] !== undefined) {
            formData.append(key, applicantData[key]);
        }
    })

    return axiosInstance.post(`/api/applicants`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(result => result.data)
    .catch(error => { throw error });
}

const getApplicantsForJob = async (jobId) => {
    return axiosInstance.get(`/api/applicants/job/${jobId}`)
        .then(result => result.data)
        .catch(error => { throw error });
}

const getMyApplications = async () => {
    return axiosInstance.get(`/api/applicants/my-applications`)
        .then(result => result.data)
        .catch(error => { throw error });
}

const changeAppStatus = async (applicantId, newStatus, interviewTime) => {
    const params = new URLSearchParams();
    params.append('newStatus', newStatus);
    if (interviewTime) {
        // Convert JavaScript Date to ISO string format that .NET can parse
        const isoString = interviewTime.toISOString();
        params.append('interviewTime', isoString);
    }
    
    return axiosInstance.put(`/api/applicants/${applicantId}/status?${params.toString()}`)
        .then(result => result.data)
        .catch(error => { throw error });
}

const getApplicantById = async (id) => {
    return axiosInstance.get(`/api/applicants/${id}`)
        .then(result => result.data)
        .catch(error => { throw error });
}

const deleteApplication = async (id) => {
    return axiosInstance.delete(`/api/applicants/${id}`)
        .then(result => result.data)
        .catch(error => { throw error });
}

const respondToOffer = async (applicationId, accept) => {
    return axiosInstance.put(`/api/applicants/${applicationId}/respond?accept=${accept}`)
        .then(result => result.data)
        .catch(error => { throw error });
}

export {
    // Job Management
    postJob,
    getAllJobs,
    getJob,
    getJobPostedBy,
    updateJob,
    deleteJob,
    searchJobs,
    // Job Applications
    applyJob,
    getApplicantsForJob,
    getMyApplications,
    changeAppStatus,
    getApplicantById,
    deleteApplication,
    respondToOffer
};

