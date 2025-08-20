import { Button, Modal, PasswordInput, PinInput, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { changePassword, sendOtp, veriftOtp } from "../../services/UserService";
import { SignUpValidation } from "../../services/FormValidation";
import { errorNotification, successNotification } from "../../services/NotificationService";
import { useInterval } from "@mantine/hooks";

const ResetPassword=(props)=>{
    const [email, setEmail] = useState("");
    const [otpSend, setOtpSend] = useState(false);
    const [otpSending, setOtpSending] = useState(false);
    const [verified, setVerified] = useState(false);
    const [passError, setPassError] = useState("");
    const [password, setPassword] = useState("");
    const [resendLoader, setResendLoader] = useState(false);
    const [seconds, setSeconds] = useState(60);
    
    const interval = useInterval(() =>{
        if(seconds===0){
            setResendLoader(false);
            setSeconds(60);
            interval.stop();
        }
        else setSeconds((s) => s - 1)
        }, 1000);
    const handleSendOtp=()=>{
        //send otp to email
        setOtpSending(true);
        sendOtp(email).then((res)=>{
            console.log(res);
            successNotification("OTP send successfully on your Email", "Enter OTP to reset password.");
            setOtpSend(true);
            setOtpSending(false);
            setResendLoader(true);
            interval.start();
        }).catch((error)=>{
            console.log(error);
            setOtpSending(false)
            errorNotification("OTP sending failed", error.response.data.errorMessage);
        })

    }
    const handleVerifyOtp=(otp)=>{
        //verify otp
        veriftOtp(email,otp).then((res)=>{
            console.log(res);
            successNotification("OTP verified", "Enter new password to reset.");
            setVerified(true);
        })
        .catch((error)=>{
            console.log(error);
            errorNotification("OTP verification failed", error.response.data.errorMessage);

        })
    }
    const resendOtp=()=>{
        if(resendLoader) return
        handleSendOtp();
    }
    const changeEmail=()=>{
        setOtpSend(false);
        setResendLoader(false);
        setSeconds(60);
        setVerified(false);
        interval.stop();
    }
    const handleResetPassword=()=>{
        //reset password
        changePassword(email,password).then((res)=>{
            console.log(res);
            successNotification("Password reset successfully", "Login with new password.");
            props.close();
        })
        .catch((error)=>{
            console.log(error);
            errorNotification("Password reset failed", error.response.data.errorMessage);
        })
        
    }

    return <Modal opened={props.opened} onClose={props.close} title="Reset Password" >

    {/* Modal content */}
    <div className="flex flex-col gap-6">
    <TextInput
    size="md"
    name="email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    withAsterisk
    leftSection={<IconAt size={16} />}
    label="Email"
    placeholder="Your email"
    rightSection={<Button loading={otpSending && !otpSend} size="xs" className="mr-2" disabled={email===""|| otpSend}  onClick={handleSendOtp} autoContrast variant="filled">Send OTP</Button> } rightSectionWidth={"xl"}
    />
    {
        otpSend && <PinInput length={6} className="mx-auto" size="md" gap={"lg"} onComplete={handleVerifyOtp} type="number"/>
    }
    {otpSend&&!verified&&<div className="flex">
        <Button fullWidth loading={otpSending} size="xs" className="mr-2" onClick={resendOtp} color="bright-sun.4" autoContrast variant="light">{resendLoader?seconds:"Resend"}</Button>
        <Button fullWidth size="xs" className="mr-2"  onClick={changeEmail} autoContrast variant="filled">Change email</Button>
    </div>
    }
    {
        verified&& <PasswordInput name="password" value={password} error={passError} onChange={(e)=>{setPassword(e.target.value); setPassError(SignUpValidation("password",e.target.value))}}  withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="New Password" placeholder="Password" />
    }
    {
        verified&& <Button onClick={handleResetPassword} autoContrast variant="filled">Change Password</Button> 
    }
    </div>
  </Modal>

}

export default ResetPassword;