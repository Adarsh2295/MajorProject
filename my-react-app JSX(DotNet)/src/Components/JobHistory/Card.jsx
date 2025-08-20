import { IconBookmark, IconBookmarkFilled, IconCalendarWeek, IconClockHour3 } from "@tabler/icons-react";
import { Button, Divider, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { formatInterviewTime, timeAgo } from "../../services/Utilities";
import { changeProfile } from "../../Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { respondToOffer } from "../../services/JobService";
import { successNotification, errorNotification } from "../../services/NotificationService"

const Card=(props)=>{
    const dispatch = useDispatch();
    const profile = useSelector((state)=> state.profile)

    const handleSavedJob=()=>{
            let savedJobs= [...profile.savedJobs];
            if(savedJobs?.includes(props.id)){
                savedJobs = savedJobs?.filter((id) => id !== props.id);
            }
            else{
                savedJobs=[...savedJobs, props.id];
            }
            let updatedProfile = {...profile, savedJobs:savedJobs};
            dispatch(changeProfile(updatedProfile));
    }
    
    const handleOfferResponse = async (accept) => {
        try {
            console.log('Responding to offer:', {
                applicationId: props.applicationId,
                accept: accept
            })

            const response = await respondToOffer(props.applicationId, accept);
            console.log('Offer response successful:', response)

            if (accept) {
                successNotification("Success", "Job offer accepted successfully!");
            } else {
                successNotification("Success", "Job offer rejected successfully.");
            }
            
            // Refresh the page to show updated status
            window.location.reload()

        } catch (error) {
            console.error('Error responding to offer:', error);
            const errorMessage = error.response?.data?.Message || error.response?.data?.message || error.message || 'Unknown error occurred';
            errorNotification("Error", errorMessage);
        }
    }
    return(

       <div key={props.job} className="bg-mine-shaft-900 p-4 w-72 flex flex-col gap-5 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 cursor-pointer sm-mx:w-full">
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
                {profile.savedJobs?.includes(props.id)?<IconBookmarkFilled onClick={handleSavedJob} className="text-bright-sun-400 cursor-pointer" stroke={1.5}/>:<IconBookmark onClick={handleSavedJob} className="hover:text-bright-sun-400 text-mine-shaft-300 cursor-pointer" stroke={1.5}/>}
            </div>
            <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-700 [&>div]:text-bright-sun-400 [&>div]:rounded-xl text-xs">
                <div className="text-center">{props.experience}</div>
                <div className="text-center">{props.jobType}</div>
                <div className="text-center">{props.location}</div>
            </div>
            <Text className="!text-sm text-justify !text-mine-shaft-300" lineClamp={3}>{props.about}</Text>
            <Divider size="xs" color="mine-shaft.6"/>
            <div className="flex justify-between">
                <div className="font-semibold text-mine-shaft-200">&#8377; {props.packageOffered} LPA</div>
                <div className="flex gap-1 text-xs text-mine-shaft-400 items-center"><IconClockHour3  className="h-5 w-5" stroke={1.5}/>{(props.applied||props.interviewing)?"Applied":props.offered?"Interviewed":"Posted"} {timeAgo(props.postTime)}</div>
            </div>
            {(props.offered||props.interviewing)&& <Divider size="xs" color="mine-shaft.6"/>}
            {
                props.offered &&<div className="flex gap-2">
                    <Button onClick={() => handleOfferResponse(true)} color="green.4" variant="light" fullWidth>Accept</Button>
                    <Button onClick={() => handleOfferResponse(false)} color="red.6" variant="outline" fullWidth>Reject</Button>
                </div>
            }
            {
            props.interviewing&&<div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
                    <IconCalendarWeek className="text-bright-sun-400 w-5 h-5" stroke={1.5}/> Interview : {formatInterviewTime(props.applicants?.interviewTime)}</div>
            }
            <Link to={`/jobs/${props.id}`}>
            <Button fullWidth color="bright-sun.4" variant="outline">View Job</Button>
            </Link>
       </div>
    )
}
export default Card;
