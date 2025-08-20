import { ActionIcon, Button, Divider } from "@mantine/core";
import {IconBookmark, IconBookmarkFilled} from "@tabler/icons-react";
import { Link } from "react-router-dom";

// @ts-ignore
import DOMPurify from 'dompurify';
import {card} from "../../Data/JobDescData";
import { timeAgo } from "../../services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { useEffect, useState } from "react";
import { postJob } from "../../services/JobService";
import { errorNotification, successNotification } from "../../services/NotificationService";

const JobDesc=(props)=>{
    const user = useSelector((state)=>state.user);
    const data = DOMPurify.sanitize(props.description);
    const [applied, setApplied] = useState(false);
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
    useEffect(()=>{
        if(props.applicants?.filter((applicant)=>applicant.applicantId===user.id).length>0){
            setApplied(true);
        }
        else{
            setApplied(false);
        }
    }, [props, user.id]);

    const handleClose=()=>{
        postJob({...props, jobStatus:"CLOSED"}).then((res)=>{
            successNotification("Success", "Job Closed Successfully")
        }).catch((error)=>{
            errorNotification(
                "Error",
                error.response.data.errorMessage
            )
        })
        window.location.reload();
    }
        
    return(
        <div className="w-2/3 bs-mx:w-full p-3">
            <div className="flex justify-between items-center flex-wrap">
                <div className="flex gap-3 items-center">
                    <div className="p-3 bg-mine-shaft-700 rounded-xl flex shrink-0">
                        <img className="h-14 xs-mx:h-10 xs-mx:w-10" src={`/Icons/${props.company}.png`} alt="" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold text-2xl xs-mx:text-xl">{props.jobTitle}</div>
                        <div className="text-lg text-mine-shaft-300 flex flex-wrap xs-mx:text-base"><span>{props.company} &bull;&nbsp;</span><span>{timeAgo(props.postTime||"")} &bull;&nbsp;</span><span>{props.applicants?props.applicants.length:0} Applicants </span></div>
                    </div>
                </div>
                <div className="flex sm:flex-col gap-3 items-center sm-mx:my-5 sm-mx:w-full sm-mx:[&>button]:w-1/2">
                    {(props.edit || !applied) &&<Link to={props.edit?`/post-job/${props.id}`:`/apply-job/${props.id}`}>
                        <Button  color="bright-sun.4" size="sm" variant="light">{props.closed?"Active":props.edit?"Edit":"Apply"}</Button>
                    </Link>}
                    {
                       !props.edit&&applied&&<Button  color="green.6" size="sm" variant="light">Applied</Button>
                    }
                    {props.edit && !props.closed?<Button onClick={handleClose}  color="red.5" size="sm" variant="outline">Close</Button>:profile.savedJobs?.includes(props.id)?<IconBookmarkFilled onClick={handleSavedJob} className="text-bright-sun-400 cursor-pointer" stroke={1.5}/>:<IconBookmark onClick={handleSavedJob} className="hover:text-bright-sun-400 text-mine-shaft-300 cursor-pointer" stroke={1.5}/>}
                </div>
            </div>
            <Divider  my="xl"/>
            <div className="flex justify-between gap-4 flex-wrap">
                {
                    card.map((item,index)=><div className="flex flex-col items-center gap-1">
                    <ActionIcon color="bright-sun.4" className="!h-12 !w-12 xs-mx:!h-10 xs-mx:!w-10" variant="light" radius="xl" aria-label="Settings">
                    <item.icon className="h-4/5 w-4/5" stroke={1.5} />
                    </ActionIcon>
                    <div className="flex flex-col items-center">
                        <div className="text-mine-shaft-300 xs-mx:text-sm">
                            {item.name}
                        </div>
                        <div className="font-semibold xs-mx:text-sm">
                            {props?props[item.id]:"NA"}
                            {item.id==="packageOffered" && <> LPA</>}
                        </div>
                    </div>
                </div>
                )
                }
            </div>
            <Divider  my="xl"/>
            <div>
                <div className="text-xl font-semibold mb-5">Required Skills</div>
                    <div className="flex flex-wrap gap-3">
                    {
                        props?.skillsRequired?.map((item,index)=><ActionIcon key={index} color="bright-sun.4" p={"xs"} className="!h-fit font-medium !w-fit !text-sm xs-mx:!text-xs" variant="light" radius="xl" aria-label="Settings">
                        {item}
                        </ActionIcon>
                        )
                    }
                    </div>
            </div>
            <Divider  my="xl"/>
            <div className="[&_h4]:text-xl  [&_*]:text-mine-shaft-300   [&_li]:marker:text-bright-sun-400 [&_li]:mb-1  [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify [&_p]:text-sm [&_li]:text-sm" dangerouslySetInnerHTML={{__html:data}}>
            </div>
            <Divider  my="xl"/>
            <div>
            <div className="text-xl font-semibold mb-5">About Company</div>
            <div className="flex items-center justify-between mb-5 xs-mx:flex-wrap xs-mx:gap-2">
                <div className="flex gap-3 items-center">
                    <div className="p-3 bg-mine-shaft-700 rounded-xl">
                        <img className="h-8" src={`/Icons/${props.company}.png`} alt="Company" />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-medium text-lg">{props.company}</div>
                        <div className="text-mine-shaft-300">10K+ Employees</div>
                    </div>
                </div>
                    <Link to={`/company/${props.company}`}>
                        <Button  color="bright-sun.4" variant="light">Company Page</Button>
                    </Link>
            </div>
            <div className="text-mine-shaft-300 text-justifyc xs-mx:text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio cumque quam aliquam ducimus eligendi quis at reiciendis eaque numquam, veritatis reprehenderit quae harum odio rem sunt ullam magnam autem mollitia?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae, quae ad? Ipsum cumque vero inventore corrupti incidunt eligendi laboriosam quas?.</div>

            </div>
        </div>
    )

}
export default JobDesc;