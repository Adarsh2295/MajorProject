import { Divider } from "@mantine/core";
import PostJob from "../Components/PostJob/PostJob";

const PostJobPage=()=>{
    return(
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
            <Divider size="xs" mx={'md'}/>
            <div className="p-4">
                <PostJob/>
            </div>

        </div>
    )
}
export default PostJobPage;