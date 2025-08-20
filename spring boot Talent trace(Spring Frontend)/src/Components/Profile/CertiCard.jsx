import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { formatDate } from "../../services/Utilities";
import { successNotification } from "../../services/NotificationService";
import { changeProfile } from "../../Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";

const CertiCard=(props)=>{
    const dispatch = useDispatch();
    const matches = useMediaQuery('(max-width: 475px)');
    const profile = useSelector((state)=>state.profile);
    const handleDelete=()=>{
        let certi = [...profile.certifications];
        certi.splice(props.index,1);
        let updateProfile = {...profile, certifications:certi};
        dispatch(changeProfile(updateProfile));
        successNotification("Success", "Certificate Deleted Successfully");
    }
    return (
        <div className="flex justify-between sm-mx:flex-wrap gap-2">
                <div className="flex gap-2 items-center sm-mx:flex-wrap">
                    <div className="p-2 bg-mine-shaft-700 rounded-md">
                        <img className="h-7" src={`/Icons/${props.issuer}.png`} alt="" />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold xs-mx:text-sm">{props.name}</div>
                        <div className="text-sm xs-mx:text-xs text-mine-shaft-300">{props.issuer}</div>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="flex flex-col items-end sm-mx:gap-2 sm-mx:flex-row">
                        <div className="text-sm xs-mx:text-xs text-mine-shaft-300">Issued {formatDate(props.issueDate)}</div>
                        <div className="text-sm xs-mx:text-xs text-mine-shaft-300">ID : {props.certificateId}</div>
                    </div>
                    {props.edit&&<ActionIcon onClick={handleDelete}   color="red.6" variant="subtle">
                        <IconTrash size={matches?"md":"lg"} className="h-4/5 w-4/5" stroke={1.5} />
                    </ActionIcon>}
                </div>
            </div>
    )
}
export default CertiCard;