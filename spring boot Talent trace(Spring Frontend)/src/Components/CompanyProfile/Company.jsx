import { Avatar, Divider, Tabs } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import AboutComp from "./AboutComp";
import CompanyJob from "./CompanyJob";
import CompanyEmployees from "./CompanyEmployees";

const Company=()=>{
    return <div className="w-3/4">
        <div className="relative">
        <img className="rounded-t-2xl w-full h-48" src="/Profile/banner.png" alt="banner" />
        <img className="h-48 w-48 rounded-3xl -bottom-1/4 p-2 absolute left-5 bg-mine-shaft-900 border-mine-shaft-950 border-8" src="Google.png" alt="" />
        </div>
        <div className="px-3 mt-14">
                        <div className="text-3xl font-semibold flex justify-between px-2">Google  <Avatar.Group>
                            <Avatar src="avatar.png" />
                            <Avatar src="avatar-7.png" />
                            <Avatar src="avatar-8.png" />
                            <Avatar>+10K</Avatar>
                            </Avatar.Group>
                        </div>

                <div className="flex gap-1 text-lg text-mine-shaft-400 items-center px-2"><IconMapPin className="h-5 w-5" stroke={1.5}/>New York, United States</div>
                <Divider my="xl"/>
                <div>
                <Tabs variant="outline" radius="lg" defaultValue="about">
                    <Tabs.List className="[&_button]:text-lg font-semibold mb-5  [&_button[data-active='true']]:text-bright-sun-400">
                        <Tabs.Tab value="about">About</Tabs.Tab>
                        <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
                        <Tabs.Tab value="employees">Employees</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="about"><AboutComp/></Tabs.Panel>
                    <Tabs.Panel value="jobs"><CompanyJob/></Tabs.Panel>
                    <Tabs.Panel value="employees"><CompanyEmployees/></Tabs.Panel>
                </Tabs>
                </div>
                
        </div>
        
    </div>
    
}
export default Company;