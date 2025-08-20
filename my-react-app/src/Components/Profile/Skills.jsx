import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconEdit, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { successNotification } from "../../services/NotificationService";
import { changeProfile } from "../../Slices/ProfileSlice";
import { useMediaQuery } from "@mantine/hooks";

const Skills=()=>{
    const matches = useMediaQuery('(max-width: 475px)');
    const [edit,setEdit] = useState(false);
    const profile = useSelector((state)=>state.profile);
    const dispatch = useDispatch();
    const [skills, setSkills] = useState([]);
    
        const handleEdit=()=>{
            if(!edit){
                setEdit(true);
                setSkills(profile.skills);
            }
            else{
                setEdit(false);
            }
    }
    const handleSave=()=>{
        setEdit(false);
        let updatedProfile={...profile, skills:skills};
        console.log(updatedProfile);
        dispatch(changeProfile(updatedProfile))
        successNotification("Success","Skills Updated Successfully");
    }
    return <div className="px-3">
    <div className="text-2xl font-semibold mb-3 flex justify-between">Skills <div>{edit&&<ActionIcon onClick={handleSave} size={matches?"md":"lg"} color="green.8" variant="subtle">
  <IconCheck className="h-4/5 w-4/5" /></ActionIcon>}
  <ActionIcon onClick={handleEdit} size={matches?"md":"lg"} color={edit?"red.8":"bright-sun.4"} variant="subtle">
    {edit?<IconX className="h-4/5 w-4/5" />:<IconEdit className="h-4/5 w-4/5" />}
  </ActionIcon></div></div>

    {
        edit?<><TagsInput
        placeholder="Add Skills"
        splitChars={[',', ' ', '|']}
        value={skills}
        onChange={setSkills}
        />
        </>
        :
        <>
        <div className="flex flex-wrap gap-2">
        {
            profile.skills?.map((skill,index)=><div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">
            {skill}
            </div>
            )
        }
        </div>
        </>
    }
</div>
}

export default Skills;