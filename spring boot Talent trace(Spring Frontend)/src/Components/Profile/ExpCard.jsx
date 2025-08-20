import { Button } from "@mantine/core";
import { useState } from "react";
import ExpInput from "./ExpInput";
import { formatDate } from "../../services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../services/NotificationService";

const ExpCard=(props)=>{
    const [edit , setEdit] = useState(false)
    const profile = useSelector((state)=>state.profile)
    const dispatch = useDispatch();
    const handleDelete=()=>{
        let exp = [...profile.experience];
        exp.splice(props.index,1);
        let updateProfile = {...profile, experience:exp};
        dispatch(changeProfile(updateProfile));
        successNotification("Success", "Experience Deleted Successfully");
    }
    return (!edit?<div className="flex flex-col gap-5">
            <div className="flex justify-between gap-2 flex-wrap">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-700 rounded-md">
                        <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold">{props.title}</div>
                        <div className="text-sm text-mine-shaft-300">{props.company} &#x2022; {props.location}</div>
                    </div>
                </div>
                <div>
                    <div className="text-sm text-mine-shaft-300">
                        {formatDate(props.startDate)} - {props.working?"Present":formatDate(props.endDate)}
                    </div>
                </div>
            </div>
            <div className="text-sm xs-mx:text-xs text-justify text-mine-shaft-300">
               {props.description}
            </div>
            {props.edit &&<div className="flex gap-4">
                <Button onClick={()=>setEdit(true)} color="bright-sun.4" variant="outline">Edit</Button>
                <Button color="red.6" onClick={handleDelete} variant="light">Delete</Button>
            </div>
            }
        </div>
        :
        <ExpInput {...props} setEdit={setEdit}/>
    )
}
export default ExpCard;