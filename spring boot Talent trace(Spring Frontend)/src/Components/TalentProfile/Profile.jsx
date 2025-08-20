import { Avatar, Button, Divider } from "@mantine/core";
import { IconBriefcase, IconMapPin, IconTagStarred } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../../services/ProfileService";
import { useMediaQuery } from "@mantine/hooks";

const Profile=()=>{
    const matches = useMediaQuery('(max-width: 475px)');
    const {id} = useParams();
    const [profile, setProfile] = useState({});
    useEffect(()=>{
        window.scrollTo(0,0);
        getProfile(id).then((res)=>{
            setProfile(res);
        }).catch((error)=>{
            console.log(error);
        })
    }, [id])
    return(
        <div className="w-2/3 py-5 lg-mx:w-full">
            <div className="relative">
                <img className="rounded-t-2xl xs-mx:h-32 xl-mx:h-40 lg-mx:w-full" src="/Profile/banner.jpg" alt="banner" />
                                <div className="absolute flex items-center justify-center -bottom-14 lg-mx:-bottom-1/3 md-mx:-bottom-12 sm-mx:-bottom-18 left-1">
                                <Avatar  className="!h-48 !w-48 rounded-full md-mx:!w-40 md-mx:!h-40 sm-mx:!w-36 sm-mx:!h-36 xs-mx:!w-32 xs-mx:!h-32 border-mine-shaft-950 border-8" src={profile.picture?`data:image/jpeg;base64,${profile.picture}`:"/avatar.png"} alt="" />
                                </div>
            </div>
            <div className="px-3 mt-16">
                    <div className="text-3xl xs-mx:text-2xl font-semibold flex justify-between">{profile.name}<Button size={matches?"sm":"md"} color="bright-sun.4" variant="light">Contact</Button></div>
                    <div className="text-xl xs-mx:text-base flex gap-1 items-center"><IconBriefcase className="h-5 w-5" stroke={1.5}/>{profile?.jobTitle} &bull; {profile?.company}</div>
                    <div className="flex gap-1 xs-mx:text-base text-lg text-mine-shaft-400 items-center"><IconMapPin className="h-5 w-5" stroke={1.5}/>{profile?.location}</div>
                    {profile.totalExp>0&&<div className="flex gap-1 xs-mx:text-base text-lg text-mine-shaft-400 items-center"><IconTagStarred className="h-5 w-5" stroke={1.5}/>Experience :  {profile?.totalExp} Years</div>}
            </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3">About</div>
                <div className="text-sm text-mine-shaft-300 text-justify">{profile?.about}</div>
            </div>
            <Divider mx={"xs"} my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3">Skills</div>
                <div className="flex flex-wrap gap-2">
                    {
                        profile?.skills?.map((skill,index)=><div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">
                        {skill}
                        </div>
                        )
                    }
                </div>
            </div>
            <Divider mx={"xs"} my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-5">Experience</div>
                <div className="flex flex-col gap-8">
                    {
                        profile?.experience?.map((exp,index)=><ExpCard key={index} {...exp} />)
                    }
                </div>
                
            </div>
            <Divider mx={"xs"} my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-5">Certifications</div>
                <div className="flex flex-col gap-6">
                    {
                        profile?.certifications?.map((exp,index)=><CertiCard key={index} {...exp} />)
                    }
                </div>
                
            </div>
        </div>
        
    )
}

export default Profile;