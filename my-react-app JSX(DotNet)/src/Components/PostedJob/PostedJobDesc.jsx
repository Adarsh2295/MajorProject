import { Badge, Tabs } from "@mantine/core";
import JobDesc from "../JobDesc/JobDesc"

import TalentCard from "../FindTalent/TalentCard";
import { useEffect, useState } from "react";
import { getApplicantsForJob } from "../../services/JobService"

const PostedJobDesc=(props)=>{
    const [tab, setTab] = useState("overview")
    const [arr, setArr] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [applicantsLoaded, setApplicantsLoaded] = useState(false)

    // Fetch applicants for this job
    const fetchApplicants = async () => {
        if (!props.id || applicantsLoaded) return

        try {
            setLoading(true);
            console.log('Fetching applicants for job:', props.id);
            const applicantsData = await getApplicantsForJob(props.id);
            console.log('Applicants received:', applicantsData)

            // Convert application status numbers to strings
            const processedApplicants = applicantsData.map((applicant) => {
                const statusMap = {
                    0: 'APPLIED',
                    1: 'UNDER_REVIEW', 
                    2: 'INTERVIEWING',
                    3: 'REJECTED',
                    4: 'OFFERED'
                }

                return {
                    ...applicant,
                    applicationStatus: statusMap[applicant.applicationStatus] || 'APPLIED'
                };
            })

            setApplicants(processedApplicants);
            setApplicantsLoaded(true);
        } catch (error) {
            console.error('Error fetching applicants:', error);
            console.error('Error details:', {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                config: error.config
            });
        } finally {
            setLoading(false);
        }
    }

    const handleTabChange=(value)=>{
        setTab(value)
        
        // Fetch applicants when first accessing any applicant-related tab
        if (['applicants', 'invited', 'offered', 'rejected'].includes(value) && !applicantsLoaded) {
            fetchApplicants();
        }
        
        if(value==="applicants"){
            setArr(applicants.filter((x)=>x.applicationStatus==="APPLIED"))
        }
        else if(value==="invited"){
            setArr(applicants.filter((x)=>x.applicationStatus==="INTERVIEWING"))
        }
        else if(value==="offered"){
            setArr(applicants.filter((x)=>x.applicationStatus==="OFFERED"))
        }
        else if(value==="rejected"){
            setArr(applicants.filter((x)=>x.applicationStatus==="REJECTED"))
        }
    }
    
    useEffect(()=>{
        handleTabChange("overview")
        // Reset applicants when job changes
        setApplicantsLoaded(false);
        setApplicants([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.id])
    return <div className="mt-5 w-3/4 md-mx:w-full px-5 md-mx:p-0">
       {props.jobTitle?<><div className="text-2xl xs-mx:text-xl font-semibold flex items-center">{props.jobTitle} <Badge size="sm" variant="light" ml={"sm"} color="bright-sun.4">{props.jobStatus}</Badge></div>
        <div className="font-medium xs-mx:text-sm text-mine-shaft-300 mb-5">{props.location}</div>

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
                        loading ? (
                            <div className="text-center text-2xl font-semibold">Loading applicants...</div>
                        ) : arr?.length ? (
                            arr.map((talent, index)=> <TalentCard key={index} {...talent} posted/>)
                        ) : (
                            <div className="text-center text-2xl font-semibold">No Applicants yet</div>
                        )
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
            
        </> : <div className="text-2xl font-semibold min-h-[70vh] flex justify-center items-center">No Job Selected</div>}
    </div>
}
export default PostedJobDesc;
