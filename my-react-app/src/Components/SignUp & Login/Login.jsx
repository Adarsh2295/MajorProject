import { TextInput, PasswordInput, Button, LoadingOverlay } from "@mantine/core"
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { LoginValidation } from "../../services/FormValidation"
import { notifications } from "@mantine/notifications"
import { useDisclosure } from "@mantine/hooks"
import ResetPassword from "./ResetPassword"
import { useDispatch } from "react-redux"
import { setUser } from "../../Slices/UserSlice"
import { setJwt } from "../../Slices/JwtSlice"
import { loginUser } from "../../services/AuthService"
import { jwtDecode } from "jwt-decode"

const form={
    email : "",
    password : "",
}
const Login =()=>{
    const dispatch = useDispatch();
    const [data, setData] = useState(form);
    const [formError, setFormError] = useState(form);
    const [loading,setLoading] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [notificationId, setNotificationId] = useState(null);
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (countdown >0  && notificationId) {
          const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
          }, 1000);
    
          // Update the notification with the new countdown value
          notifications.update({
            id: notificationId,
            title: 'Login Successful',
                    message: `Redirecting to home page in ${countdown} seconds.`,
                    withCloseButton:true,
                    icon:<IconCheck style={{width:"90%", height:"90%"}}/>,
                    color: "teal",
                    withBorder:true,
                    autoClose:3000,
                    className:"!border-green-600"
          });
    
          return () => clearInterval(timer);
        } else if (countdown === 0 && notificationId) {
          // Close the notification when the countdown reaches 
          // Redirect to another page after a short delay
            setLoading(false);
            navigate('/'); // Replace '/another-page' with your desired route// Wait for 2 seconds before redirecting
          setNotificationId(null); // Reset the notification ID
        }
      }, [countdown, notificationId, navigate]);
    
    const handleChange=(event)=>{
        setFormError({...formError, [event.target.name]:""});
        setData({...data,[event.target.name]:event.target.value})
    }
    const handleSubmit=()=>{
        let valid = true, newFormError={};
        for(let key in data){
            newFormError[key]=LoginValidation(key, data[key]);
            if(newFormError[key]) valid=false;
        }
        setFormError(newFormError);
        if(valid) {
            setLoading(true);
            loginUser(data).then((res)=>{
                //dispatch(setUser(res));
                dispatch(setJwt(res.jwt));
                const decoded = jwtDecode(res.jwt);
                dispatch(setUser({...decoded, email:decoded.sub}));
                setCountdown(3)
                const id = notifications.show({
                    title: 'Login Successful',
                    message: `Redirecting to home page in ${countdown} seconds.`,
                    withCloseButton:true,
                    icon:<IconCheck style={{width:"90%", height:"90%"}}/>,
                    color: "teal",
                    withBorder:true,
                    className:"!border-green-600"
                });
                setNotificationId(id);
            }).catch((error)=>{
                setLoading(false);
                console.log(error.response.data);
                notifications.show({
                    title: 'Login Failed',
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
    return <><LoadingOverlay
    visible={loading}
    zIndex={1000}
    overlayProps={{ radius: 'sm', blur: 2 }}
    loaderProps={{ color: 'bright-sun.4', type: 'bars' }}
  /><div className="w-1/2 sm-mx:w-full px-20 bs-mx:px-10 md-mx:px-5 flex flex-col justify-center gap-3">
    <div className="text-2xl font-semibold">
        Login
    </div>
    <TextInput
    name="email"
    error={formError.email}
    onChange={handleChange}
    value={data.email}
    withAsterisk
    leftSection={<IconAt size={16} />}
    label="Email"
    placeholder="Your email"
    />
    <PasswordInput name="password" error={formError.password} onChange={handleChange} value={data.password} withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
    
        <div onClick={open} className="text-bright-sun-400  sm-mx:text-sm xs-mx:text-xs hover:underline cursor-pointer text-right text-sm mb-2">Forgot password ?</div>
    
    <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Login</Button>
    <div className="mx-auto  sm-mx:text-sm xs-mx:text-xs">Don't have an accout ? <span onClick={()=>{navigate("/sign-up");setFormError(form);setData(form)}} className="text-bright-sun-400  sm-mx:text-sm xs-mx:text-xs hover:underline cursor-pointer text-sm">SignUp</span></div>
    
</div>
<ResetPassword opened={opened} close={close}/> 
</>
}
export default Login