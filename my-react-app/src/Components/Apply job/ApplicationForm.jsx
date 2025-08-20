import { TextInput, NumberInput, FileInput, Textarea, Button, LoadingOverlay } from "@mantine/core"
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react"
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBase64 } from "../../services/Utilities";
import { applyJob } from "../../services/JobService";
import { errorNotification, successNotification } from "../../services/NotificationService";
import { useSelector } from "react-redux";

const ApplicationForm=()=>{
    const {id} = useParams();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const[preview, setPreview] = useState(false);
    const[submit, setSubmit] = useState(false);
        const handlePreview =()=>{
            form.validate();
            window.scrollTo({top:0, behavior:'smooth'})
            if(!form.isValid()) return;
            setPreview(!preview);
            console.log(form.getValues());
        }
        const handleSubmit=async()=>{
            setSubmit(true);
            let resume = await getBase64(form.getValues().resume);
            let applicant = {...form.getValues(), applicantId:user.id, resume:resume.split(',')[1]};
            applyJob(id, applicant).then((res)=>{
                setSubmit(false);
                successNotification("Success", "Application submitted successfully");
                navigate("/job-history")
            }).catch((error)=>{
                setSubmit(false);
                errorNotification(
                    "Error",
                    error.response.data.errorMessage
                );
            })

        }
        
        const form = useForm({
            mode:'controlled',
            validateInputOnChange: true,
            initialValues: {
                name: '',
                email: '',
                phone: '',
                website: '',
                resume: null,
                coverLetter: '',
                },
            validate:{
                name: isNotEmpty('Name is Required'),
                email: isNotEmpty('Email is Required'),
                phone: isNotEmpty('Phone is Required'),
                website: isNotEmpty('Website is Required'),
                resume: isNotEmpty('Resume is Required'),
            }
        })
    return <div>
        <LoadingOverlay
            className="!fixed"
            visible={submit}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'bright-sun.4', type: 'bars' }}
            />
        <div className="text-xl font-semibold mb-5">Submit Your Application</div>
    <div className="flex flex-col gap-5">
            <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:!w-full sm-mx:flex-wrap">
            <TextInput {...form.getInputProps("name")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk label="Full Name" placeholder="Enter Name" />
            <TextInput {...form.getInputProps("email")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk label="Email" placeholder="Enter email" />
            </div>
            <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:!w-full sm-mx:flex-wrap">
            <NumberInput {...form.getInputProps("phone")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`}  withAsterisk label="Phone Number" placeholder="Enter phone Number"  max={9999999999} clampBehavior="strict" hideControls/>
            <TextInput {...form.getInputProps("website")} readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`} withAsterisk label="Personal Website" placeholder="Enter Url" />
            </div>
            <FileInput
                {...form.getInputProps("resume")}
                accept="application/pdf"
                readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`}
                withAsterisk
                leftSection={<IconPaperclip stroke={1.5}/>}
                label="Attach your CV"
                placeholder="Your CV"
                leftSectionPointerEvents="none"
            />
            <Textarea
            {...form.getInputProps("coverLetter")}
            readOnly={preview} variant={preview?"unstyled":"default"} className={`${preview?"text-mine-shaft-300 font-semibold":""}`}
            withAsterisk
            label="Cover Letter"
            placeholder="Type Something about yourself..."
            autosize
            minRows={4}
            />
            {!preview && <Button onClick={handlePreview} color="bright-sun.4" variant="light">Preview</Button>
            }
            {
                preview && <div className="flex gap-10 [&>*]:w-1/4">
                    <Button fullWidth onClick={handlePreview} color="bright-sun.4" variant="outline">Edit</Button>
                    <Button fullWidth onClick={handleSubmit} color="bright-sun.4" variant="light">Submit</Button>

                </div>
            }
        </div>
    </div>

}

export default ApplicationForm;
