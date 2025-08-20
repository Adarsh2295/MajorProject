import { Divider, Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import JobDesc from "../Components/JobDesc/JobDesc";
import RecommendJob from "../Components/JobDesc/RecommendJob";
import { useEffect, useState } from "react";
import { getJob } from "../services/JobService";

const JobDescPage=()=>{
    const {id} = useParams();
    const [job, setJob] = useState(null);
    useEffect(()=>{
        window.scrollTo(0,0);
        getJob(id).then((res)=>{
            setJob(res);
        }).catch((error)=>{
            console.log(error);
        })
    },[id])
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] px-4">
            <Divider size="xs" />
            <Link className="my-5 inline-block" to={"/find-jobs"}>
                <Button leftSection={<IconArrowLeft size={20}/>} color="bright-sun.4" variant="light">Back</Button>
            </Link>
            <div className="flex gap-5 justify-around bs-mx:flex-wrap">
               <JobDesc {...job}/>
               <RecommendJob {...job}/>
            </div>
        </div>
    )
}

export default JobDescPage;