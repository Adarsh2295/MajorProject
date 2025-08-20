import { Avatar, Divider, FileInput, Overlay } from "@mantine/core";

import { useDispatch, useSelector } from "react-redux";
import Info from "./Info";
import { changeProfile, setProfile } from "../../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certifications from "./Certifications";
import { useHover } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { successNotification } from "../../services/NotificationService";
import { useEffect } from "react";
import { getProfile } from "../../services/ProfileService";
import { getBase64 } from "../../services/Utilities";

const Profile=()=>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const profile = useSelector((state)=>state.profile);
    useEffect(()=>{
            if(user?.profileId){
                getProfile(user.profileId).then((data)=>{
                    dispatch(setProfile(data));
                }).catch((error)=>{
                    console.log(error);
                    }
                )
            }
        },[dispatch,user?.profileId])
    
    const handleFileChange=async (image)=>{
        let picture = await getBase64(image);
        
        let updatedProfile={...profile, picture: picture.split(',')[1]}
        dispatch(changeProfile(updatedProfile))
        successNotification("Success","Profile Picture Updated Succesfully");
    }
    
    const { hovered, ref } = useHover();
    return <div className="w-4/5 lg-mx:w-full mx-auto">
            <div className="relative px-5">
                <img className="rounded-t-2xl xs-mx:h-32" src="/Profile/banner.jpg" alt="banner" />
                <div ref={ref} className="absolute flex items-center justify-center -bottom-14 lg-mx:-bottom-1/3 md-mx:-bottom-12 sm-mx:-bottom-18 left-6">

                <Avatar  className="!h-48 !w-48 rounded-full md-mx:!w-40 md-mx:!h-40 sm-mx:!w-36 sm-mx:!h-36 xs-mx:!w-32 xs-mx:!h-32 border-mine-shaft-950 border-8" src={profile.picture?`data:image/jpeg;base64,${profile.picture}`:"/avatar.png"} alt="" />
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