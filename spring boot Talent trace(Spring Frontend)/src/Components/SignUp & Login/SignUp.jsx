import { Anchor, Button, Checkbox, Group, LoadingOverlay, PasswordInput, Radio, TextInput } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/UserService";
import { SignUpValidation } from "../../services/FormValidation";
import { notifications } from "@mantine/notifications";

const form={
    name : "",
    email : "",
    password : "",
    confirmPassword : "",
    accountType : "APPLICANT"
}

const SignUp=()=>{
    const [data, setData] = useState(form);
    const [formError, setFormError] = useState(form);
    const [countdown, setCountdown] = useState(3);
    const [loading, setLoading] = useState(false);
    const [notificationId, setNotificationId] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
            if (countdown >0  && notificationId) {
              const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
              }, 1000);
        
              // Update the notification with the new countdown value
              notifications.update({
                id: notificationId,
                title: 'Registered Successfully',
                    message: `Redirecting to login page in ${countdown} seconds.`,
                    withCloseButton:true,
                    icon:<IconCheck style={{width:"90%", height:"90%"}}/>,
                    color: "teal",
                    withBorder : true,
                    autoClose : 3000,
                    className:"!border-green-600"
              });
        
              return () => clearInterval(timer);
            } else if (countdown === 0 && notificationId) {
              // Close the notification when the countdown reaches 
              // Redirect to another page after a short delay
                setLoading(false);
                navigate('/login'); // Replace '/another-page' with your desired route// Wait for 2 seconds before redirecting
                setNotificationId(null); // Reset the notification ID
            }
    }, [countdown, notificationId, navigate]);

    const handleChange=(event)=>{
        if(typeof(event)==="string"){
            setData({...data, accountType:event});
            return;
        }
        let name = event.target.name, value = event.target.value
        setData({...data,[event.target.name]:event.target.value})
        setFormError({...formError, [name]:SignUpValidation(name,value)})
        if(name==="password"&&data.confirmPassword!==""){
            let err = "";
            if(value!==data.confirmPassword){
                err="Passwords do not match";
            }
            setFormError({...formError, [name]:SignUpValidation(name,value), confirmPassword:err});
        }
        if(name==="confirmPassword"){
            if(value!==data.password){
                setFormError({...formError, [name]: "Passwords do not match."});
            }
            else{
                setFormError({...formError, [name]:""})
            }
        }
    }
    const handleSubmit=()=>{
        let valid = true, newFormError={};
        for(let key in data){
            if(key==="accountType") continue;
            if(key!=="confirmPassword")newFormError[key]=SignUpValidation(key, data[key]);
            else if(data[key]!==data["password"]) newFormError[key]="Password do not match"
            if(newFormError[key]) valid=false;
        }
        setFormError(newFormError);
        if(valid===true){
            setLoading(true);
            registerUser(data).then((res)=>{
                console.log(res);
                setData(form);
                setCountdown(3)
                const id = notifications.show({
                    title: 'Registered Successfully',
                    message: 'Redirecting to login page...',
                    withCloseButton:true,
                    icon:<IconCheck style={{width:"90%", height:"90%"}}/>,
                    color: "teal",
                    withBorder:true,
                    className:"!border-green-600"
                })
                setNotificationId(id);
            }).catch((error)=>{
                setLoading(false);
                console.log(error.response.data);
                notifications.show({
                    title: 'Registeration Failed',
                    message: `${error.response.data.errorMessage}`,
                    withCloseButton:true,
                    icon:<IconX style={{width:"90%", height:"90%"}}/>,
                    color: "red",
                    withBorder:true,
                    className:"!border-red-500"
                })
            });
        }
    }
    return<><LoadingOverlay
        visible={loading}
        className="translate-x-1/2"
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'bright-sun.4', type: 'bars' }}/> <div className="w-1/2 sm-mx:w-full sm-mx:h-full sm-mx:py-20 px-20 bs-mx:px-10 md-mx:px-5 flex flex-col justify-center gap-4">
        <div className="text-2xl font-semibold">
            Create Account
        </div>
        <TextInput
        name="name"
        
        onChange={handleChange}
        error={formError.name}
        value={data.name}
        withAsterisk
        label="Full Name"
        description=""
        placeholder="Your name"
        />
        <TextInput
        name="email"
        onChange={handleChange}
        error={formError.email}
        value={data.email}
        withAsterisk
        leftSection={<IconAt size={16} />}
        label="Email"
        placeholder="Your email"
        />
        <PasswordInput error={formError.password} name="password" onChange={handleChange} value={data.password} withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
        <PasswordInput error={formError.confirmPassword} name="confirmPassword" onChange={handleChange} value={data.confirmPassword} withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Confirm Password" placeholder="Confirm Password" />
        <Radio.Group
            onChange={handleChange}
            value={data.accountType}
            label="Who are you ?"
            withAsterisk
            >
            <Group mt="xs">
            <div className="flex gap-6 xs-mx:gap-3">
            <Radio className="py-3 px-5 sm-mx:px-3 sm-mx:py-2 border has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg" autoContrast value="APPLICANT" label="Applicant" />
            <Radio className="py-3 px-5 sm-mx:px-3 sm-mx:py-2 border has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg" autoContrast value="EMPLOYER" label="Employer" />
            </div>
            </Group>
        </Radio.Group>
        <Checkbox autoContrast label={<>I accept{''} <Anchor>terms & conditions</Anchor></>}/>
        <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Sign Up</Button>
        <div className="mx-auto sm-mx:text-sm xs-mx:text-xs">Have an accout ? <span  className="text-bright-sun-400 hover:underline cursor-pointer sm-mx:text-sm xs-mx:text-xs" onClick={()=>{navigate("/login");setFormError(form);setData(form)}}>Login</span></div>
    </div>
    </>
}
export default SignUp;