import { Divider } from "@mantine/core";

import Profile from "../Components/Profile/Profile";

const ProfilePage=()=>{
    return <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
        <Divider mx="md" mb="xl"/>
        <Profile/>
    </div>
}
export default ProfilePage;