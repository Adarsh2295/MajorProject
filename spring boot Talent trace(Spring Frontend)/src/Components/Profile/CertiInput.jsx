import { Button, TextInput } from "@mantine/core";
import SelectInput from "./SelectInput";

import { MonthPickerInput } from "@mantine/dates";
import fields from "../../Data/Profile";
import { useForm, isNotEmpty } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../services/NotificationService";

const CertiInput = (props)=>{
    const select = fields
    const profile = useSelector((state)=>state.profile);
    const dispatch = useDispatch();
    const form = useForm({
                mode:'controlled',
                validateInputOnChange:true,
                initialValues: {
                    name:'',
                    issuer:'',
                    issueDate:  new Date(),
                    certificateId:''
                },
                validate:{
                    name: isNotEmpty("Name is Required"),
                    issuer: isNotEmpty("Issuer is Required"),
                    issueDate: isNotEmpty("Issue Date is Required"),
                    certificateId: isNotEmpty("Certificate Id is Required"),
                }
    })
    const handleSave=()=>{
        form.validate();
        if(!form.isValid()) return;
        let certi=[...profile.certifications];
        certi.push(form.values);
        certi[certi.length-1].issueDate = certi[certi.length-1].issueDate.toISOString();
        let updatedProfile = {...profile, certifications:certi};
        props.setEdit(false);
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Certificate Added Successfully");

    }
    return <div className="flex flex-col gap-5">
        <div className="text-lg font-semibold">Add Certificate</div>
        <div className="flex gap-10 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap md-mx:gap-4">
        <TextInput
        {...form.getInputProps("name")}
            withAsterisk
            label="Title"
            placeholder="Enter Title"
        />
        <SelectInput form={form} name="issuer" {...select[1]}/>
        </div>
        <div className="flex gap-10 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap md-mx:gap-4">
            <MonthPickerInput
            {...form.getInputProps("issueDate")}
                        withAsterisk
                        label="Issue date"
                        placeholder="Pick date"
                        maxDate={new Date()}
                        />

        <TextInput
        {...form.getInputProps("certificateId")}
            withAsterisk
            label="Certificate Id"
            placeholder="Enter id"
        />
        </div>

        <div className="flex gap-4">
            <Button onClick={handleSave} color="green.8" variant="light">Save</Button>
            <Button color="red.6" onClick={()=>props.setEdit(false)} variant="light">Cancel</Button>
        </div>
    </div>
}

export default CertiInput;