
import axiosInstance from "../Interceptor/AxiosInterceptor"

    const getProfile=async (id)=>{
        if (!id || id === undefined || id === null) {
            console.error('ProfileService - getProfile called with invalid id:', id);
            throw new Error('Profile ID is required and cannot be undefined or null');
        }
        console.log('ProfileService - Fetching profile for ID:', id);
        return await axiosInstance.get(`/api/profiles/${id}`)
        .then(result=> {
            if (!result) {
                console.error('ProfileService - No response received');
                throw new Error('No response received from server');
            }
            return result.data;
        })
        .catch (error=>{throw error});
     }

    const updateProfile= async(profile)=>{
        if (!profile) {
            console.error('ProfileService - updateProfile called with null/undefined profile:', profile);
            throw new Error('Profile object is required');
        }
        
        if (!profile.id || profile.id === undefined || profile.id === null) {
            console.error('ProfileService - updateProfile called with invalid profile.id:', {
                profile,
                id: profile.id,
                idType: typeof profile.id,
                hasId: 'id' in profile,
                profileKeys: Object.keys(profile)
            });
            throw new Error(`Profile ID is required and cannot be undefined or null. Current ID: ${profile.id} (type: ${typeof profile.id})`);
        }
        
        console.log('ProfileService - Updating profile for ID:', profile.id, 'Type:', typeof profile.id);
        return axiosInstance.put(`/api/profiles/${profile.id}`, profile)
        .then(res=> {
            if (!res) {
                console.error('ProfileService - No response received for update');
                throw new Error('No response received from server');
            }
            return res.data;
        })
        .catch(error=>{
            console.error('ProfileService - API error:', error);
            throw error;
        });
    }

    const getAllProfiles = async ()=>{
        return axiosInstance.get(`/api/profiles/all`)
        .then(result=> {
            if (!result) {
                console.error('ProfileService - No response received for getAllProfiles');
                throw new Error('No response received from server');
            }
            return result.data;
        })
        .catch(error=>{
            throw error;
        });
    }

    export {getProfile,updateProfile, getAllProfiles}


