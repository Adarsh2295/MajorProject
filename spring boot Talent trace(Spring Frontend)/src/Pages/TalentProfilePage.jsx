import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import RecommendTalent from "../Components/TalentProfile/RecommendTalent";
import Profile from "../Components/TalentProfile/Profile";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../services/ProfileService";

const TalentProfile=()=>{
    const navigate = useNavigate();
    const [talents, setTalents] = useState([]);

    useEffect(()=>{
        getAllProfiles().then((response)=>{
            setTalents(response);
            }).catch((error)=>{
                console.log(error);
            });
    }, [])
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] px-4">
            <Divider size="xs" />
            
                <Button onClick={()=>navigate(-1)} leftSection={<IconArrowLeft size={20}/>} color="bright-sun.4" my={"sm"} variant="light">Back</Button>
            
            <div className="flex gap-16 lg-mx:flex-wrap">
                <Profile/>
                <RecommendTalent talents={talents}/>
            </div>
        </div>
    )
}
export default TalentProfile;