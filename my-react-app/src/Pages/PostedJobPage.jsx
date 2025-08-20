import { Button, Divider, Drawer } from "@mantine/core"
import PostedJob from "../Components/PostedJob/PostedJob";
import PostedJobDesc from "../Components/PostedJob/PostedJobDesc";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../services/JobService";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const PostedJobPage=()=>{

    const matches = useMediaQuery('(max-width: 767px)');
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const {id} = useParams();
    const nid = (Number)(id);
    const user = useSelector((state)=>state.user);
    const[jobList, setJobList] = useState([]);
    const [job, setJob] = useState({});
    useEffect(()=>{
        window.scroll(0,0);
        getJobPostedBy(user.id).then((res)=>{
            setJobList(res);
            if(res &&res.length>0&&Number(id)===0){
                navigate(`/posted-job/${res[0].id}`);
            }
            setJob(res.find((item)=>item.id===nid));
        }).catch((error)=>{
            console.log(error);
        })
    }, [id, navigate, nid, user.id])
    return  <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] px-5">
    <Divider size="xs" />
    {matches&&<Button size="sm" className="!bg-bright-sun-400 !text-black" my={"xs"} color="bright-sun.4" variant="default" onClick={open}>
        All Jobs
    </Button>}
    <Drawer opened={opened} size={230} overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} onClose={close} title="All Jobs">
        <PostedJob job={job} jobList={jobList}/>
    </Drawer>
    <div className="flex gap-5 justify-around py-5">
        {!matches&&<PostedJob job={job} jobList={jobList}/>}
        <PostedJobDesc {...job}/>
    </div>
</div>
}
export default PostedJobPage;