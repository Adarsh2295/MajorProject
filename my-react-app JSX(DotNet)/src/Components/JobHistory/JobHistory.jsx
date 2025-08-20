import { Tabs } from "@mantine/core";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getMyApplications, getJob } from "../../services/JobService";
import { useSelector } from "react-redux"

const JobHistory=()=>{
    const profile = useSelector((state)=>state.profile);
    const user = useSelector((state)=>state.user);
    const [activeTab, setActiveTab] = useState('Applied');
    const [applications, setApplications] = useState([]);
    const [jobsWithApplications, setJobsWithApplications] = useState([]);
    const [showList, setShowList] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const fetchApplications = async () => {
            try {
                setLoading(true);
                console.log('JobHistory: Starting to fetch applications for user:', user.id);
                console.log('JobHistory: User object:', user)

                // Get user's applications
                const applicationsRes = await getMyApplications();
                console.log('JobHistory: Applications received:', applicationsRes);
                console.log('JobHistory: Number of applications:', applicationsRes?.length || 0);
                setApplications(applicationsRes)

                // For each application, fetch the associated job details
                const jobPromises = applicationsRes.map(async (app) => {
                    try {
                        const jobRes = await getJob(app.jobId)

                        // Convert enum number to string
                        const statusMap = {
                            0: 'Applied',
                            1: 'UnderReview', 
                            2: 'InterviewScheduled',
                            3: 'Rejected',
                            4: 'Hired',
                            5: 'Accepted',
                            6: 'OfferRejected'
                        };
                        const statusString = statusMap[app.applicationStatus] || 'Applied';

                        return {
                            ...jobRes,
                            applicationStatus: statusString,
                            applicationId: app.id,
                            appliedDate: app.timeStamp,
                            interviewTime: app.interviewTime
                        };
                    } catch (error) {
                        console.error(`Error fetching job ${app.jobId}:`, error);
                        return null;
                    }
                })

                const jobsData = await Promise.all(jobPromises);
                const validJobs = jobsData.filter(job => job !== null)

                console.log('Jobs with applications:', validJobs);
                setJobsWithApplications(validJobs)

                // Filter for 'Applied' status by default
                const appliedJobs = validJobs.filter((job) => 
                    job.applicationStatus === 'Applied'
                );
                setShowList(appliedJobs)

            } catch (error) {
                console.error('Error fetching applications:', error);
            } finally {
                setLoading(false);
            }
        }

        if (user.id) {
            fetchApplications();
        }
    }, [user.id])

    const handleTabChange = (value) => {
        setActiveTab(value)

        if(value === "SAVED"){
            // Handle saved jobs - this would need to be implemented based on your saved jobs logic
            // For now, we'll show an empty list([]);
        }
        else {
            // Filter jobs by application status
            // Map UI tab names to backend enum values
            const statusMap = {
                'Applied': 'Applied',
                'Offered': 'Hired',  // Backend uses 'Hired' for offered jobs
                'In Progress': 'InterviewScheduled',  // Backend uses 'InterviewScheduled' for in-progress
                'Accepted': 'Accepted',
                'Rejected': 'OfferRejected'  // Backend uses 'OfferRejected' for user-rejected offers
            };

            const mappedStatus = statusMap[value || ''] || value;
            const filteredJobs = jobsWithApplications.filter((job) => 
                job.applicationStatus === mappedStatus
            );
            setShowList(filteredJobs);
        }
    }

    return (
    <div className="">
    <div className="text-2xl font-semibold mb-5">Job History</div>
        <Tabs value={activeTab} onChange={handleTabChange} radius="lg" defaultValue="applied">
                    <Tabs.List className="[&_button]:!text-xl font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400 sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base xs-mx:[&_button]:!px-2.5 xs-mx:[&_button]:!font-medium xsm-mx:[&_button]:!text-sm">
                        <Tabs.Tab value="Applied">Applied</Tabs.Tab>
                        <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
                        <Tabs.Tab value="Offered">Offered</Tabs.Tab>
                        <Tabs.Tab value="In Progress">In Progress</Tabs.Tab>
                        <Tabs.Tab value="Accepted">Accepted</Tabs.Tab>
                        <Tabs.Tab value="Rejected">Rejected</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value={activeTab}>
                    <div className="mt-16 flex gap-10 flex-wrap">
                        {
                            loading ? (
                                <div className="text-center text-gray-400 w-full">
                                    <div className="text-lg">Loading your applications...</div>
                                </div>
                            ) : showList.length > 0 ? (
                                showList.map((job,index)=> <Card key={index} {...job} {...{[activeTab.toLowerCase()]:true}}/>)
                            ) : (
                                <div className="text-center text-gray-400 w-full">
                                    <div className="text-lg">
                                        {activeTab === 'SAVED' 
                                            ? 'No saved jobs yet' 
                                            : `No ${activeTab.toLowerCase()} applications yet`
                                        }
                                    </div>
                                    <div className="text-sm mt-2">
                                        {activeTab === 'Applied' && 'Start applying to jobs to see them here!'}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    </Tabs.Panel>
        </Tabs>
    </div>
    );
}
export default JobHistory;
