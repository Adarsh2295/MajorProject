import { IconCalendarWeek, IconHeart, IconMapPin } from "@tabler/icons-react";
import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { DateInput, TimeInput } from "@mantine/dates";
import { useEffect, useRef, useState } from 'react';
import { getProfile } from "../../services/ProfileService";
import { changeAppStatus } from "../../services/JobService";
import { errorNotification, successNotification } from "../../services/NotificationService";
import { formatInterviewTime, openBase64PDF } from "../../services/Utilities";

const TalentCard=(props)=>{
    const {id} = useParams();
    const [opened, { open, close }] = useDisclosure(false);
    const [app, { open : openApp, close: closeApp }] = useDisclosure(false);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const ref = useRef(null);
    const [profile, setProfile] = useState({});
    useEffect(()=>{
        if(props.applicantId){
            getProfile(props.applicantId).then((res)=>{
                setProfile(res);
        }).catch((error)=>{
            console.log(error);
        })
        }
        else{
            setProfile(props);
        }
    }, [props, props.applicantId])

    const handleOffer=(status)=>{
        //handle offer logic here
        let interview = {id, applicantId:profile?.id, applicationStatus:status};
        if(status==="INTERVIEWING"){
            const[hours, minutes] = time.split(":").map(Number);
            date?.setHours(hours, minutes);
            interview = {...interview, interviewTime:date};
        }
        changeAppStatus(interview).then((res)=>{
            if(status==="INTERVIEWING") successNotification("Success", "Interview Scheduled Successfully");
            else if(status==="OFFERED") successNotification(
                "Success",
                "Offer has been Sent Successfully"
            )
            else if(status==="REJECTED") successNotification(
                "Success",
                "Application has been Rejected Successfully"
            )
            window.location.reload();
        }).catch((error)=>{
            console.log(error);
            errorNotification("Error", error.response.data.errorMessage);
        })
    }
    return(
       <div className="bg-mine-shaft-900 p-4 w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 bs-mx:w-[50%] md-mx:w-full">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-700 rounded-full">
                        <Avatar size={"lg"} src={profile?.picture?`data:image/jpeg;base64,${profile?.picture}`:"/avatar.png"} alt="Talent-Image" />
                    </div>
                    <div>
                        <div className="font-semibold text-lg">{profile?.name}</div>
                        <div className="text-sm text-mine-shaft-300">{profile?.jobTitle} &#x2022; {profile?.company}</div>
                    </div>
                </div>
                <div>
                    <IconHeart className="text-mine-shaft-300 cursor-pointer"/>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                    {
                        profile?.skills?.map((skill,index)=>index<4&&<div key={index} className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-700 [&>div]:text-bright-sun-400 [&>div]:rounded-xl text-xs"><div className="text-center">{skill}</div></div>)
                    }
            </div>
            <Text className="!text-sm text-justify !text-mine-shaft-300" lineClamp={3}>{profile.about}</Text>
            <Divider size="xs" color="mine-shaft.6"/>
            {
                props.invited?<div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
                    <IconCalendarWeek stroke={1.5}/>Interview : {formatInterviewTime(props.interviewTime)}
                </div>
                :
                <div className="flex justify-between">
                <div className=" text-mine-shaft-300">Exp: {profile?.totalExp>0?profile.totalExp:0} Years</div>
                <div className="flex gap-1 text-xs text-mine-shaft-400 items-center"><IconMapPin className="h-5 w-5" stroke={1.5}/>{profile.location}</div>
            </div>
            }
            
            <Divider size="xs" color="mine-shaft.6"/>
            <div className="flex [&>*]:w-1/2 [&>*]:p-2">
            {
                !props.invited &&<>
                <Link to={`/talent-profile/${profile?.id}`}>
                    <Button color="bright-sun.4" variant="outline" fullWidth>Profile</Button>
                </Link>
                <div className="">
                    {props.posted?<Button onClick={open} rightSection={<IconCalendarWeek className="w-5 h-5" stroke={1.5}/>} color="bright-sun.4" variant="light" fullWidth>Schedule</Button>:<Button color="bright-sun.4" variant="light" fullWidth>Contact</Button>}
                </div>
                </>
            }
            {
                props.invited && <>
                <div>
                <Button color="green.4" onClick={()=> handleOffer("OFFERED")} variant="light" fullWidth>Accept</Button>
                </div>
                <div>
                <Button color="red.6" variant="outline" onClick={()=> handleOffer("REJECTED")} fullWidth>Reject</Button>
                </div>
                </>
            }
            </div>
            {(props.invited||props.posted)&&<Button onClick={openApp} autoContrast color="bright-sun.4" variant="filled" fullWidth>View Application</Button>}
            <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
                <div className="flex flex-col gap-4">
                <DateInput
                value={date}
                minDate={new Date()}
                onChange={setDate}
                label="Date"
                placeholder="Enter Date"
                />
                <TimeInput label="Time" value={time} onChange={(event)=> setTime(event.currentTarget.value)} ref={ref} onClick={() => ref.current?.showPicker()}/>
                <Button onClick={()=> handleOffer("INTERVIEWING")} color="bright-sun.4" variant="light" fullWidth>Schedule</Button>
                </div>
            </Modal>
            <Modal opened={app} onClose={closeApp} title="Application" centered>
                <div className="flex flex-col gap-4">
                    <div>
                        Email : &emsp; <a href={`mailto://${props.email}`} className="text-bright-sun-400 hover:underline cursor-pointer text-right text-sm mb-2">{props.email}</a>
                    </div>
                    <div>
                        Website : &emsp; <a target="_blank"  href={props.website} className="text-bright-sun-400 hover:underline cursor-pointer text-right text-sm mb-2" rel="noreferrer">{props.website}</a>
                    </div>
                    <div>
                        Resume : &emsp; <span onClick={()=>openBase64PDF(props.resume)} className="text-bright-sun-400 hover:underline cursor-pointer text-right text-sm mb-2">{props.name}</span>
                    </div>
                    <div>
                        Cover Letter : &emsp; <span className="text-bright-sun-400 hover:underline cursor-pointer text-right text-sm mb-2">{props.coverLetter}</span>
                    </div>
                </div>
            </Modal>
       </div>
    )
}
export default TalentCard;

