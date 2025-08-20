import { Button, Checkbox, Textarea } from "@mantine/core";

import SelectInput from "./SelectInput";
import { useEffect } from "react";
import { MonthPickerInput } from "@mantine/dates";
import fields from "../../Data/Profile";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { successNotification } from "../../services/NotificationService";
import { changeProfile } from "../../Slices/ProfileSlice";

const ExpInput = (props)=>{
    const select = fields
    const profile = useSelector((state)=>state.profile);
    const dispatch = useDispatch();

        const form = useForm({
            mode:'controlled',
            validateInputOnChange:true,
            initialValues: {
                title:'',
                company:'',
                location:'',
                description:'',
                startDate:  new Date(),
                endDate: new Date(),
                'working' : false,
            },
            validate:{
                title: isNotEmpty("Title is Required"),
                company: isNotEmpty("Company is Required"),
                location: isNotEmpty("Location is Required"),
                description: isNotEmpty("Description is Required"),
            }
        })
    useEffect(()=>{
            if(!props.add)form.setValues({
                    title:props.title, company:props.company, location:props.location, description:props.description, startDate:new Date(props.startDate), endDate:new Date(props.endDate), working: props.working})
            // eslint-disable-next-line react-hooks/exhaustive-deps
            },[])

    const handleSave=()=>{
        form.validate();
        if(!form.isValid()) return;
        let exp = [...profile.experience];
        if(props.add){
            exp.push(form.getValues());
            exp[exp.length-1].startDate=exp[exp.length-1].startDate.toISOString();
            exp[exp.length-1].endDate=exp[exp.length-1].endDate.toISOString();
        }
        else {
            exp[props.index]= form.getValues();
            exp[props.index].startDate=exp[props.index].startDate.toISOString();
            exp[props.index].endDate=exp[props.index].endDate.toISOString();
        }
        let updatedProfile = {...profile, experience: exp};
        props.setEdit(false);
        dispatch(changeProfile(updatedProfile))
        successNotification("Success",`Experience ${props.add ? "Added" : "Updated"} Successfully`);
    }
    return <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold">{props.add?"Add":"Edit"} Experience</div>
        <div className="flex gap-10 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap md-mx:gap-4">
                    <SelectInput form={form} name="title" {...select[0]}/>
                    <SelectInput form={form} name="company" {...select[1]}/>
                </div>
                <SelectInput form={form} name="location" {...select[2]}/>
                <Textarea
                withAsterisk
                label="Summary"
                {...form.getInputProps("description")}
                    autosize
                    minRows={3}
                    placeholder="Enter Summary..."
                />
                <div className="flex gap-10 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap md-mx:gap-4">
                <MonthPickerInput
                {...form.getInputProps("startDate")}
                withAsterisk
                label="Start date"
                placeholder="Pick date"
                maxDate={form.getValues().endDate||undefined}
                />
                <MonthPickerInput
                {...form.getInputProps("endDate")}
                disabled={form.getValues().working}
                withAsterisk
                label="End date"
                placeholder="Pick date"
                minDate={form.getValues().startDate||undefined}
                maxDate={new Date()}
                />
                </div>
                <Checkbox checked={form.getValues().working} onChange={(event)=>form.setFieldValue("working", event.currentTarget.checked)}  autoContrast label= "Currently working here ?"/>
                <div className="flex gap-4">
                    <Button onClick={handleSave} color="green.8" variant="light">Save</Button>
                    <Button color="red.6" onClick={()=>props.setEdit(false)} variant="light">Cancel</Button>
                </div>
    </div>

}

export default ExpInput;