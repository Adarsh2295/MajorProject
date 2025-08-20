import { Tabs } from "@mantine/core"

import PostedJobCard from "./PostedJobCard";
import { useEffect, useState } from "react"

const PostedJob =(props)=>{
    const[activeTab, setActiveTab] = useState(null);
    useEffect(()=>{
        // Convert numeric jobStatus to string for tabs: 0=Active, 1=Closed, 2=Draft
        const statusMap = { 0: 'ACTIVE', 1: 'CLOSED', 2: 'DRAFT' };
        const jobStatus = props.job?.jobStatus;
        setActiveTab(statusMap[jobStatus] || 'ACTIVE');
    }, [props.job?.jobStatus]);
    return <div className="w-1/5 mt-5">
        <div className="text-2xl font-semibold mb-5">Jobs</div>
        
        <Tabs autoContrast variant="pills" value={activeTab} onChange={setActiveTab}>
            <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
                <Tabs.Tab value="ACTIVE">Active [{props.jobList?.filter((job)=>job?.jobStatus===0).length}]</Tabs.Tab>
                <Tabs.Tab value="DRAFT">Draft [{props.jobList?.filter((job)=>job?.jobStatus===2).length}]</Tabs.Tab>
                <Tabs.Tab value="CLOSED">Closed [{props.jobList?.filter((job)=>job?.jobStatus===1).length}]</Tabs.Tab>
            </Tabs.List>
        </Tabs>
        
        <div className="flex flex-col flex-wrap gap-5 mt-5">
        {
            props.jobList?.filter((job)=>{
                // Convert activeTab string back to numeric=0, CLOSED=1, DRAFT=2
                const tabToStatus = { 'ACTIVE': 0, 'CLOSED': 1, 'DRAFT': 2 };
                return activeTab ? job?.jobStatus === tabToStatus[activeTab] : false;
            }).map((item,index)=><PostedJobCard key={index} {...item}/>)
        }
        </div>
    </div>
}
export default PostedJob;
