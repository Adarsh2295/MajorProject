import { ActionIcon, NumberInput } from "@mantine/core";
import { IconEdit, IconBriefcase, IconMapPin, IconCheck, IconX, IconTagStarred } from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import fields from "../../Data/Profile";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const Info=()=>{
    const select = fields;
    const matches = useMediaQuery('(max-width: 475px)');
    const dispatch = useDispatch();
    const profile = useSelector((state)=>state.profile);
    const user = useSelector((state)=>state.user);
    const [edit,setEdit] = useState(false);
    const handleEdit=()=>{
        if(!edit){
            setEdit(true);
            form.setValues({'jobTitle' : profile.jobTitle, 'company' : profile.company, 'location' : profile.location, 'totalExp' : profile.totalExp});
        }
        else{
            setEdit(false);
        }
    }
    const form = useForm({
        mode: 'controlled',
        initialValues: { jobTitle: '', company: '', location:'', totalExp: 0},
      });
    const handleSave=()=>{
        setEdit(false);
        let updatedProfile={...profile, ...form.getValues()};
        console.log(updatedProfile);
        dispatch(changeProfile(updatedProfile))
        successNotification("Success","Profile Updated Successfully");
    }
    return <><div className="text-3xl xs-mx:text-2xl font-semibold flex justify-between">{user.name}<div>{edit&&<ActionIcon onClick={handleSave} size={matches?"md":"lg"} color="green.8" variant="subtle">
  <IconCheck className="h-4/5 w-4/5" /></ActionIcon>}
  <ActionIcon onClick={handleEdit} size={matches?"md":"lg"} color={edit?"red.8":"bright-sun.4"} variant="subtle">
    {edit?<IconX className="h-4/5 w-4/5" />:<IconEdit className="h-4/5 w-4/5" />}
  </ActionIcon></div></div>
        {
        edit?<><div className="flex gap-10 md-mx:gap-4 [&>*]:w-1/2 my-2 xs-mx:[&>*]:w-full xs-mx:flex-wrap">
        <SelectInput form={form} name="jobTitle" {...select[0]}/>
        <SelectInput form={form} name="company" {...select[1]}/>
    </div>
    <div className="flex gap-10 md-mx:gap-4 [&>*]:w-1/2 my-2 xs-mx:[&>*]:w-full xs-mx:flex-wrap">
        <SelectInput form={form} name="location"  {...select[2]}/>
        <NumberInput label="Experience" withAsterisk name="totalExp" clampBehavior="strict" min={1} max={50} {...form.getInputProps('totalExp')}/>
    </div>
    </>
    :
    <>
    <div className="text-xl xs-mx:text-base mt-1 flex gap-1 items-center"><IconBriefcase className="h-5 w-5" stroke={1.5}/>{profile.jobTitle} &bull; {profile.company}</div>
    <div className="flex gap-1 xs-mx:text-base text-lg text-mine-shaft-400 items-center"><IconMapPin className="h-5 w-5" stroke={1.5}/>{profile.location}</div>
    <div className="flex gap-1 xs-mx:text-base text-lg text-mine-shaft-400 items-center"><IconTagStarred className="h-5 w-5" stroke={1.5}/>Experience : &nbsp;{profile.totalExp} Years</div>
    </>
    }
    </>
}

export default Info;