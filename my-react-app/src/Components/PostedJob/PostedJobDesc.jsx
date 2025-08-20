import { Badge, Tabs } from "@mantine/core";
import JobDesc from "../JobDesc/JobDesc";

import TalentCard from "../FindTalent/TalentCard";
import { useEffect, useState } from "react";

const PostedJobDesc=(props)=>{
    const [tab, setTab] = useState("overview")
    const [arr, setArr] = useState([]);
    const handleTabChange=(value)=>{
        setTab(value)
        if(value==="applicants"){
            setArr(props.applicants?.filter((x)=>x.applicationStatus==="APPLIED"))
        }
        else if(value==="invited"){
            setArr(props.applicants?.filter((x)=>x.applicationStatus==="INTERVIEWING"))
        }
        else if(value==="offered"){
            setArr(props.applicants?.filter((x)=>x.applicationStatus==="OFFERED"))
        }
        else if(value==="rejected"){
            setArr(props.applicants?.filter((x)=>x.applicationStatus==="REJECTED"))
        }
    }
    useEffect(()=>{
        handleTabChange("overview")
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])
    return <div className="mt-5 w-3/4 md-mx:w-full px-5 md-mx:p-0">
       {props.jobTitle?<><div className="text-2xl xs-mx:text-xl font-semibold flex items-center">{props.jobTitle} <Badge size="sm" variant="light" ml={"sm"} color="bright-sun.4">{props.jobStatus}</Badge></div>
        <div className="font-medium xs-mx:text-sm text-mine-shaft-300 mb-5">{props.location}</div>
        <div>
        
            <Tabs variant="outline" radius="lg" value={tab} onChange={handleTabChange}>
                <Tabs.List className="[&_button]:!text-xl font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400 sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base xs-mx:[&_button]:!px-1.5 xs-mx:!font-medium xsm-mx:[&_button]:!text-sm">
                    <Tabs.Tab  value="overview">Overview</Tabs.Tab>
                    <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                    <Tabs.Tab value="invited">Invited</Tabs.Tab>
                    <Tabs.Tab value="offered">Offered</Tabs.Tab>
                    <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="overview" className="[&>div]:w-full">
                    <JobDesc {...props} edit closed ={props.jobStatus==="CLOSED"}/>
                </Tabs.Panel>
                <Tabs.Panel value="applicants">
                <div className="mt-10 flex gap-10 flex-wrap justify-around">
                    {
                        arr?.length?arr.map((talent, index)=> <TalentCard key={index} {...talent} posted/>):
                        <div className="text-center text-2xl font-semibold">No Applicants yet</div>
                    }
                </div>
                </Tabs.Panel>
                <Tabs.Panel value="invited">
                <div className="mt-10 flex gap-10 flex-wrap justify-around">
                    {
                        arr?.length?arr.map((talent, index)=><TalentCard key={index} {...talent} invited/>):<div className="text-center text-2xl font-semibold">
                            No Invited yet
                        </div>
                    }
                </div>
                </Tabs.Panel>
                <Tabs.Panel value="offered">
                <div className="mt-10 flex gap-10 flex-wrap justify-around">
                    {
                        arr?.length?arr.map((talent, index)=><TalentCard key={index} {...talent} offered/>):
                        <div className="text-center text-2xl font-semibold">
                            No Offered yet
                        </div>
                    }
                </div>
                </Tabs.Panel>
                <Tabs.Panel value="rejected">
                <div className="mt-10 flex gap-10 flex-wrap justify-around">
                    {
                       arr?.length?arr.map((talent, index)=><TalentCard key={index} {...talent} rejected/>):
                       <div className="text-center text-2xl font-semibold">
                        No Rejected yet
                        </div>
                    }
                </div>
                </Tabs.Panel>

            </Tabs>
            
        </div></>:<div className="text-2xl font-semibold min-h-[70vh] flex justify-center items-center">No Job Selected</div>}
    </div>
}
export default PostedJobDesc;