
import { jobList } from "../../Data/JobsData";
import JobsCard from "../FindJobs/JobsCard"

const CompanyJob=()=>{
    return <div className="mt-10 flex gap-5 flex-wrap">
    {
        jobList.map((job,index)=><JobsCard key={index} {...job} />)
    }
</div>
}
export default CompanyJob;