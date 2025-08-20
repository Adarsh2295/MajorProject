import { Avatar, Divider, FileInput, Overlay } from "@mantine/core"

import { useDispatch, useSelector } from "react-redux";
import Info from "./Info";
import { changeProfile, setProfile } from "../../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certifications from "./Certifications";
import { useHover } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { successNotification, errorNotification } from "../../services/NotificationService";
import { useEffect } from "react";
import { getProfile, updateProfile } from "../../services/ProfileService";
import { getBase64 } from "../../services/Utilities"

const Profile=()=>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const profile = useSelector((state)=>state.profile);
    useEffect(()=>{
        console.log('Profile useEffect - User object:', user);
        console.log('Profile useEffect - user.profileId:', user?.profileId, 'Type:', typeof user?.profileId)

        // Try to determine the profile ID from multiple sources
        let profileId = user?.profileId || user?.id

        // For testing purposes, if no profileId is found, use ID 1
        if (!profileId) {
            console.log('Profile Debug - No profileId found in user, using hardcoded ID 1 for testing');
            profileId = 1;
        }
        
        console.log('Profile Debug - Using profile ID:', profileId)

        getProfile(profileId).then((data)=>{
            console.log('Profile Debug - Profile data received:', data);
            console.log('Profile Debug - Profile data id:', data?.id, 'Type:', typeof data?.id)

            // Ensure the profile has an ID field
            if (data && !data.id) {
                data.id = profileId;
                console.log('Profile Debug - Added missing ID to profile data:', data.id);
            }
            
            console.log('Profile Debug - About to dispatch setProfile with:', data);
            dispatch(setProfile(data));
        }).catch((error)=>{
            console.log('Profile Debug - Error fetching profile:', error);
            // If profile fetch fails, create a minimal profile object with the ID
            const fallbackProfile = {
                id,
                name: '',
                email: '',
                about: '',
                jobTitle: '',
                company: '',
                location: '',
                totalExp: 0,
                skills: [],
                experiences: [],
                certifications: [],
                savedJobIds: []
            };
            console.log('Profile Debug - Using fallback profile:', fallbackProfile);
            dispatch(setProfile(fallbackProfile));
        })
    },[dispatch,user])
    
    const handleFileChange=async (image)=>{
        try {
            let picture= await getBase64(image)

            let updatedProfile={...profile, pictureBase64: picture.split(',')[1]}

            // Debug logging
            console.log('Profile - Current profile object:', profile);
            console.log('Profile - Updated profile before API call:', updatedProfile)

            // Ensure we have a valid profile ID
            if (!updatedProfile.id) {
                // Try multiple fallback sources for profile ID
                const fallbackId = user?.profileId || user?.id || 1; // Default to 1 for testing
                updatedProfile.id = fallbackId;
                console.log('Profile - Using fallback ID:', updatedProfile.id, 'Source: user.profileId=', user?.profileId, 'user.id=', user?.id);
            }
            
            console.log('Profile - Updating profile picture for ID:', updatedProfile.id)

            // Call API to update profile in backend
            const result = await updateProfile(updatedProfile);
            console.log('Profile - Profile picture updated successfully:', result)

            // Update Redux store with the updated profile
            dispatch(changeProfile(updatedProfile));
            successNotification("Success","Profile Picture Updated Successfully");
        } catch (error) {
            console.error('Profile - Error updating profile picture:', error);
            errorNotification("Error", "Failed to update profile picture: " + (error.message || 'Unknown error'));
        }
    }
    
    const { hovered, ref } = useHover();
    return <div className="w-4/5 lg-mx:w-full mx-auto">
            <div className="relative px-5">
                <img className="rounded-t-2xl xs-mx:h-32" src="/Profile/banner.jpg" alt="banner" />
                <div ref={ref} className="absolute flex items-center justify-center -bottom-14 lg-mx:-bottom-1/3 md-mx:-bottom-12 sm-mx:-bottom-18 left-6">

                <Avatar  className="!h-48 !w-48 rounded-full md-mx:!w-40 md-mx:!h-40 sm-mx:!w-36 sm-mx:!h-36 xs-mx:!w-32 xs-mx:!h-32 border-mine-shaft-950 border-8" src={profile.pictureBase64?`data:image/jpeg;base64,${profile.pictureBase64}`:"/avatar.png"} alt="" />
                {hovered && <Overlay color="#000" backgroundOpacity={0.75} className="!rounded-full" />}
                {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16"/>}
                {hovered&&<FileInput
                    onChange={handleFileChange}
                    className="absolute [&_*]:!rounded-full w-full z-[301]  !h-full [&_*]:!h-full"
                    variant="transparent"
                    accept="image/png, image/jpeg"
                    />}
                </div>
            </div>
            <div className="px-3 mt-16">
                    <Info/>
            </div>
            <Divider mx="xs" my="xl"/>
            <About/>
            <Divider mx={"xs"} my="xl"/>
            <Skills/>
            <Divider mx={"xs"} my="xl"/>
            <Experience/>
            <Divider mx={"xs"} my="xl"/>
            <Certifications/>
        </div>
}

export default Profile;
