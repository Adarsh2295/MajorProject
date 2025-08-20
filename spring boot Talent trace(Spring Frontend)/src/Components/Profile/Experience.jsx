import { ActionIcon } from "@mantine/core";
import { IconPlus, IconEdit, IconX } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import ExpInput from "./ExpInput";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";

const Experience=()=>{
    const matches = useMediaQuery('(max-width: 475px)');
    const profile = useSelector((state)=>state.profile);
    const [edit, setEdit] = useState(false);
    const [addExp, setAddExp] = useState(false);
    const handleEdit=()=>{
        setEdit(!edit);
    }
    return <div><div className="px-3">
    <div className="text-2xl font-semibold mb-5 flex justify-between">Experience <div className="flex gap-2"><ActionIcon onClick={()=>setAddExp(true)} size={matches?"md":"lg"} color="bright-sun.4" variant="subtle"><IconPlus className="h-4/5 w-4/5" />
    </ActionIcon>
    <ActionIcon onClick={handleEdit} size={matches?"md":"lg"} color={edit?"red.8":"bright-sun.4"} variant="subtle">
    {edit?<IconX className="h-4/5 w-4/5" />:<IconEdit className="h-4/5 w-4/5" />}
    </ActionIcon></div></div>
        <div className="flex flex-col gap-8">
            {
                profile?.experience?.map((exp,index)=><ExpCard key={index} {...exp} index={index} edit={edit}/>)
            }
            {addExp&&<ExpInput add setEdit={setAddExp}/>}
        </div>
        </div>
    </div>
}

export default Experience;