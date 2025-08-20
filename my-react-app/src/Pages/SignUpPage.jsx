import { IconArrowLeft, IconSparkles } from "@tabler/icons-react";

import { useLocation, useNavigate } from "react-router-dom";
import Login from "../Components/SignUp & Login/Login";
import SignUp from "../Components/SignUp & Login/SignUp";
import { Button } from "@mantine/core";

const SignUpPage=()=>{
    const location = useLocation();
    const navigate = useNavigate();
    return(<div className="h-[100vh] w-[100vw] bg-mine-shaft-950 font-['poppins'] flex flex-col overflow-hidden sm:overflow-y-auto relative">
        <Button size="sm" className="!absolute left-5 top-5 z-20" leftSection={<IconArrowLeft size={20}/>} color="bright-sun.4" onClick={()=>navigate("/")} variant="light">Home</Button>
            <div className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0 ${location.pathname==='/sign-up'?"-translate-x-1/2 sm-mx:-translate-x-full":"translate-x-0"}`}>
                <Login/>
                <div className={`w-1/2 h-[100vh] sm-mx:hidden sm-mx:min-h-full transition-all duration-1000 ease-in-out ${location.pathname==="/sign-up"?"rounded-r-[200px]":"rounded-l-[200px]"} bg-mine-shaft-900 flex flex-col items-center gap-2 justify-center`}>
                    <div className="flex gap-1 items-center p- text-bright-sun-400">
                        <IconSparkles className="h-16 w-16" stroke={2} />
                        <div className="text-6xl font-semibold bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl">TalentTrace</div>
                    </div>
                    <div className="text-2xl text-center bs-mx:text-xl md-mx:text-lg text-mine-shaft-200 font-semibold">
                        Discover your passion, shape your career!
                    </div>
                </div>
                <SignUp/>
            </div>
        </div>
    )
}
export default SignUpPage;