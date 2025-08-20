import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import ApplyJobComp from "../Components/Apply job/ApplyJobComp";
import { useState, useEffect } from "react";
import { getJob } from "../services/JobService";

    const ApplyJobPage=()=>{
        const navigate = useNavigate();
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
        return(
            <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] px-4">
            <Divider size="xs"/>
            <Button className="mt-5" mb={"xl"} onClick={()=> navigate(-1)} leftSection={<IconArrowLeft size={20}/>} color="bright-sun.4" variant="light">Back</Button>
            <ApplyJobComp {...job}/>
            </div>
        )
    }

export default ApplyJobPage;