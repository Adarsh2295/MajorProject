import { ActionIcon, Textarea } from "@mantine/core"
import { IconCheck, IconEdit, IconX } from "@tabler/icons-react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../../services/NotificationService";
import { changeProfile } from "../../Slices/ProfileSlice";
import { useMediaQuery } from "@mantine/hooks";

const About=()=>{
    const matches = useMediaQuery('(max-width: 475px)');
    const [edit,setEdit] = useState(false);
    const profile = useSelector((state)=>state.profile);
    const dispatch = useDispatch();
    const [about, setAbout] = useState("");
        const handleEdit=()=>{
            if(!edit){
                setEdit(true);
                setAbout(profile.about);
            }
            else{
                setEdit(false);
            }
    }
    const handleSave=()=>{
        setEdit(false);
        let updatedProfile={...profile, about:about};
        console.log(updatedProfile);
        dispatch(changeProfile(updatedProfile))
        successNotification("Success","About Updated Successfully");
    }
    return <div className="px-3">
    <div className="text-2xl font-semibold mb-3 flex justify-between">About <div>{edit&&<ActionIcon onClick={handleSave} size={matches?"md":"lg"} color="green.8" variant="subtle">
  <IconCheck className="h-4/5 w-4/5" /></ActionIcon>}
  <ActionIcon onClick={handleEdit} size={matches?"md":"lg"} color={edit?"red.8":"bright-sun.4"} variant="subtle">
    {edit?<IconX className="h-4/5 w-4/5" />:<IconEdit className="h-4/5 w-4/5" />}
  </ActionIcon></div></div>
{
    edit?<Textarea
    autosize
    minRows={3}
    value={about}
    placeholder="Enter about yourself..."
    onChange={(event) => setAbout(event.currentTarget.value)}
    />
    :
    <><div className="text-sm text-mine-shaft-300 text-justify">{profile?.about}</div></>
    }
</div>
}

export default About;

