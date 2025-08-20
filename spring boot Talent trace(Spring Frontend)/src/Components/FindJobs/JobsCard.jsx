import { IconBookmark, IconBookmarkFilled, IconClockHour3 } from "@tabler/icons-react";
import { Button, Divider, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { timeAgo } from "../../services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";

const JobsCard=(props)=>{
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);
    const handleSavedJob=()=>{
        let savedJobs = [...profile.savedJobs];
        if(savedJobs?.includes(props.id)){
            savedJobs = savedJobs?.filter((id) => id !== props.id);
        }
        else{
            savedJobs=[...savedJobs, props.id];
        }
        let updatedProfile = {...profile, savedJobs:savedJobs};
        dispatch(changeProfile(updatedProfile));
    }
    return(
       <div className="bg-mine-shaft-900 p-4 w-72 md-mx:64 sm-mx:w-64 xs-mx:w-full flex flex-col gap-5 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 cursor-pointer">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-700 rounded-md">
                        <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
                    </div>
                    <div>
                        <div className="font-semibold">{props.jobTitle}</div>
                        <div className="text-sm text-mine-shaft-300">{props.company} &#x2022; {props.applicants?props.applicants.length:0} Applicants</div>
                    </div>
                </div>
                <div>
                    {profile.savedJobs?.includes(props.id)?<IconBookmarkFilled onClick={handleSavedJob} className="text-bright-sun-400 cursor-pointer" stroke={1.5}/>:<IconBookmark onClick={handleSavedJob} className="hover:text-bright-sun-400 text-mine-shaft-300 cursor-pointer" stroke={1.5}/>}
                </div>
            </div>
            <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-700 [&>div]:text-bright-sun-400 [&>div]:rounded-xl text-xs">
                <div className="text-center">{props.experience}</div>
                <div className="text-center">{props.jobType}</div>
                <div className="text-center">{props.location}</div>
            </div>
            <Text className="!text-sm text-justify !text-mine-shaft-300" lineClamp={3}>{props.about}</Text>
            <Divider size="xs" color="mine-shaft.6"/>
            <div className="flex justify-between">
                <div className="font-semibold text-mine-shaft-200">&#8377;{props.packageOffered} LPA</div>
                <div className="flex gap-1 text-xs text-mine-shaft-400 items-center"><IconClockHour3 className="h-5 w-5" stroke={1.5}/>Posted {timeAgo(props.postTime)}</div>
            </div>
            <Link to={`/jobs/${props.id}`}>
            <Button fullWidth color="bright-sun.4" variant="outline">View Job</Button>
            </Link>
       </div>
    )
}
export default JobsCard;