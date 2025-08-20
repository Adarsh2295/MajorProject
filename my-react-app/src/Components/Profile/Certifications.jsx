import { ActionIcon } from "@mantine/core";
import { IconPlus, IconEdit, IconX } from "@tabler/icons-react";
import CertiCard from "./CertiCard";
import CertiInput from "./CertiInput";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";

const Certifications=()=>{
    const matches = useMediaQuery('(max-width: 475px)');
    const [addCerti, setAddCerti] = useState(false);
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state)=>state.profile);
    const handleEdit=()=>{
        setEdit(!edit);
    }
    return <div className="px-3">
    <div className="text-2xl font-semibold mb-5 flex justify-between">Certifications <div className="flex gap-2"><ActionIcon onClick={()=>setAddCerti(true)} size={matches?"md":"lg"} color="bright-sun.4" variant="subtle"><IconPlus className="h-4/5 w-4/5" />
    </ActionIcon>
    <ActionIcon onClick={handleEdit} size={matches?"md":"lg"} color={edit?"red.8":"bright-sun.4"} variant="subtle">
    {edit?<IconX className="h-4/5 w-4/5" />:<IconEdit className="h-4/5 w-4/5" />}
    </ActionIcon>
    </div>
    </div>
    <div className="flex flex-col gap-6">
        {
            profile?.certifications?.map((exp,index)=><CertiCard key={index} {...exp} index={index} edit={edit} />)
        }
        {addCerti&&<CertiInput add setEdit={setAddCerti}/>}
    </div>
    
</div>

}
export default Certifications;