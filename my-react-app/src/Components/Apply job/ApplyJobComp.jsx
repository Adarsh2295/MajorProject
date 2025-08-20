import { Divider } from "@mantine/core";
import ApplicationForm from "./ApplicationForm";
import { timeAgo } from "../../services/Utilities";

const ApplyJobComp=(props)=>{

    return <div className="w-2/3 bs-mx:w-4/5 sm-mx:w-full sm-mx:p-2  m-auto">
            <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                    <div className="p-3 bg-mine-shaft-700 rounded-xl flex shrink-0">
                        <img className="h-14 xs-mx:h-10 xs-mx:w-10" src={`/Icons/${props.company}.png`} alt="" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold text-2xl xs-mx:text-xl">{props.jobTitle}</div>
                        <div className="text-lg text-mine-shaft-300 flex flex-wrap xs-mx:text-base"><span>{props.company} &bull;&nbsp;</span><span>{timeAgo(props.postTime||"")} &bull;&nbsp;</span><span>{props.applicants?props.applicants.length:0} Applicants </span></div>
                    </div>
                </div>
            </div>
            <Divider my="xl"></Divider>
            <ApplicationForm/>
        </div>
}
export default ApplyJobComp;