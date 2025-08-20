import { Avatar } from "@mantine/core";
import { work } from "../../Data/Data";

const Working=()=>{

    return (
        <div className="mt-20 pb-5">
            <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl text-center font-semibold mb-3 text-mine-shaft-100">How it <span className="text-bright-sun-400">Works</span></div>
            <div className="text-lg sm-mx:text-base xs-mx:text-sm mx-auto mb-10 text-mine-shaft-300 text-center w-1/2">Effortlessly navigate through the process and land your dream job.</div>
            <div className="flex px-14 justify-between bs-mx:px-10 lg-mx:gap-16 md-mx:flex-col md-mx:px-5 items-center">
                <div className="relative">
                    <img className="w-[30rem]" src="Girl.png" alt="Girl" />
                    <div className="w-36 xs-mx:w-28 flex flex-col absolute top-[13%] -right-[4%] xs-mx:-right-[3%] xs-mx:top-[10%] items-center gap-1 border border-bright-sun-400 rounded-xl py-3 px-1 backdrop-blur-md">
                        <Avatar src="avatar-8.png" className="!h-16 !w-16" alt="avatar" />
                        <div className="text-sm font-semibold text-mine-shaft-200 text-center">Complete your profile</div>
                        <div className="text-xs text-mine-shaft-300">70% Completed</div>
                    </div>
                </div>
                <div className="flex flex-col gap-10">
                    {
                        work.map((item,index)=><div key={index} className="flex items-center gap-4">
                        <div className="p-2.5 bg-bright-sun-300 rounded-full flex items-center justify-center shrink-0">
                            <img className="h-12 w-12" src={`${item.name}.png`} alt="" />
                        </div>
                        <div>
                                <div className="text-mine-shaft-200 text-xl font-semibold">
                                    {item.name}
                                </div>
                                <div className="text-mine-shaft-300">
                                    {item.desc}
                                </div>
                        </div>
                    </div>
                    )
                    }
                </div>
            </div>
        </div>
    )

}

export default Working;