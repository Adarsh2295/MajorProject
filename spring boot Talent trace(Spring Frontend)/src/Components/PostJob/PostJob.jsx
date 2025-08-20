import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";

import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";
import { content, fields } from "../../Data/PostJob";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJob, postJob } from "../../services/JobService";
import { errorNotification, successNotification } from "../../services/NotificationService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const PostJob=()=>{
    const {id} = useParams();
    // const matches = useMediaQuery('(min-width: 350px)');
    const [editorData, setEditorData] = useState(content);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const select=fields
    useEffect(()=>{
        window.scrollTo(0,0);
        if(id!=="0"){
            getJob(id).then((res)=>{
                form.setValues(res);
                setEditorData(res.description);
            }).catch((err)=>{
                console.log(err);
            })
        }
        else{
            form.reset();
            setEditorData(content);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    const form = useForm({
        mode:'controlled',
        validateInputOnChange:true,
        initialValues:{
            jobTitle: '',
            company: '',
            experience:'',
            jobType:'',
            location:'',
            packageOffered:'',
            skillsRequired:[],
            about:'',
            description:content
        },
        validate:{
            jobTitle:isNotEmpty("Title is required"),
            company:isNotEmpty("Company is required"),
            experience:isNotEmpty("Experience is required"),
            jobType:isNotEmpty("Job Type is required"),
            location:isNotEmpty("Location is required"),
            packageOffered:isNotEmpty("Package Offered is required"),
            skillsRequired:isNotEmpty("Skills Required is required"),
            about:isNotEmpty("About is required"),
            description:isNotEmpty("Description is required"),
        }
    })
    const handlePost=()=>{
        form.validate();
        if(!form.isValid()) return;
        postJob({...form.getValues(),id, postedBy: user.id , jobStatus:"ACTIVE"}).then((res)=>{
            successNotification("Success", "Job Posted successfully");
            navigate(`/posted-job/${res.id}`);
           
        }).catch((error)=>{
            console.log(error);
            errorNotification("Error", error.response.data.errorMessag);
        })
    }

    const handleDraft=()=>{
        postJob({...form.getValues(),id, postedBy: user.id , jobStatus:"DRAFT"}).then((res)=>{
            successNotification("Success", "Job Drafted successfully");
            navigate(`/posted-job/${res.id}`);
           
        }).catch((error)=>{
            console.log(error);
            errorNotification("Error", error.response.data.errorMessag);
        })
    }

    return(
        <div className="px-16 py-5 md-mx:px-5 bs-mx:px-10">
            <div className="text-2xl font-semibold mb-5">Post Job</div>
            <div className="flex flex-col gap-5">
                <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:!w-full sm-mx:flex-wrap">
                    <SelectInput form={form} name="jobTitle" {...select[0]}/>
                    <SelectInput form={form} name="company" {...select[1]}/>
                </div>
                <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:w-full sm-mx:flex-wrap">
                    <SelectInput form={form} name="experience" {...select[2]}/>
                    <SelectInput form={form} name="jobType" {...select[3]}/>
                </div>
                <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:w-full sm-mx:flex-wrap">
                    <SelectInput form={form} name="location" {...select[4]}/>
                    <NumberInput {...form.getInputProps('packageOffered')} label="Salary" withAsterisk min={1} max={300} clampBehavior="strict" placeholder="Enter Salary" hideControls />
                </div>
                <TagsInput {...form.getInputProps('skillsRequired')}  withAsterisk label="Skills" placeholder="Enter skill" clearable acceptValueOnBlur splitChars={[',', ' ', '|']}/>
                <Textarea
                                withAsterisk
                                label="About Job"
                                {...form.getInputProps("about")}
                                    autosize
                                    minRows={3}
                                    placeholder="Enter About Job..."
                                />
                <div className="[&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:bg-bright-sun-400/20">
                    <div  className="text-sm font-medium">Job Description <span className="text-red-600">*</span></div>
                    <TextEditor form={form} data={editorData}/>
                </div>
                <div className="flex gap-4">
                <Button size=""  color="bright-sun.4" onClick={handlePost} variant="light">Publish Job</Button>
                <Button onClick={handleDraft}  color="bright-sun.4" variant="outline">Save</Button>
                </div>
            </div>
        </div>
    )
}
export default PostJob;