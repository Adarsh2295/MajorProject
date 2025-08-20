import { useEffect, useState } from "react";
import { getJobPostedBy } from "../services/JobService"

const DebugPostedJobs = () => {
    const [jobsUser1, setJobsUser1] = useState([]);
    const [jobsUser20002, setJobsUser20002] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        const testPostedJobs = async () => {
            try {
                setLoading(true)

                // Test recruiter ID 1
                const jobs1 = await getJobPostedBy(1);
                setJobsUser1(jobs1);
                console.log('Jobs by user 1:', jobs1)

                // Test recruiter ID 20002
                const jobs20002 = await getJobPostedBy(20002);
                setJobsUser20002(jobs20002);
                console.log('Jobs by user 20002:', jobs20002)

            } catch (err) {
                console.error('Error fetching posted jobs:', err);
                setError(err.response?.data?.message || err.message || 'Failed to fetch jobs');
            } finally {
                setLoading(false);
            }
        }

        testPostedJobs();
    }, [])

    if (loading) return <div className="p-5">Loading posted jobs...</div>

    return (
        <div className="p-5 bg-mine-shaft-950 min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-5">Debug: Posted Jobs</h1>
            
            {error && (
                <div className="bg-red-500 text-white p-3 rounded mb-5">
                    Error: {error}
                </div>
            )}

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Jobs by Recruiter ID: 1</h2>
                {jobsUser1.length > 0 ? (
                    <div className="space-y-3">
                        {jobsUser1.map((job) => (
                            <div key={job.id} className="bg-mine-shaft-800 p-4 rounded">
                                <h3 className="font-semibold">{job.jobTitle}</h3>
                                <p>Company: {job.company}</p>
                                <p>Status: {job.jobStatus} ({job.jobStatus === 0 ? 'Active' : job.jobStatus === 1 ? 'Closed' : 'Draft'})</p>
                                <p>Posted: {new Date(job.postTime).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No jobs found for recruiter ID 1</p>
                )}
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Jobs by Recruiter ID: 20002</h2>
                {jobsUser20002.length > 0 ? (
                    <div className="space-y-3">
                        {jobsUser20002.map((job) => (
                            <div key={job.id} className="bg-mine-shaft-800 p-4 rounded">
                                <h3 className="font-semibold">{job.jobTitle}</h3>
                                <p>Company: {job.company}</p>
                                <p>Status: {job.jobStatus} ({job.jobStatus === 0 ? 'Active' : job.jobStatus === 1 ? 'Closed' : 'Draft'})</p>
                                <p>Posted: {new Date(job.postTime).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No jobs found for recruiter ID 20002</p>
                )}
            </div>
        </div>
    );
}

export default DebugPostedJobs;

