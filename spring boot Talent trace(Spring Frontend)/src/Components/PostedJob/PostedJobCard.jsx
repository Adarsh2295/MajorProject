import { Link, useParams } from "react-router-dom";
import { timeAgo } from "../../services/Utilities";

const PostedJobCard=(props)=>{
    const {id} = useParams();
    return <Link to={`/posted-job/${props.id}`} className={`bg-mine-shaft-900 rounded-xl lg-mx:w-48 bs-mx:w-44 p-2 border-l-2 border-l-bright-sun-400 hover:bg-opacity-80 cursor-pointer ${props.id===Number(id)? "!bg-bright-sun-400 !text-black" : "!bg-mine-shaft-900 !text-mine-shaft-300"}`}>
        <div className="text-sm font-semibold">
            {props.jobTitle}
        </div>
        <div className="text-xs   font-medium">
            {props.location}
        </div>
        <div className="text-xs">
            {props.jobStatus==="DRAFT"?"Drafted":props.jobStatus==="CLOSED"?"Closed":"Posted"} {timeAgo(props.postTime)}
        </div>
    </Link>
}
export default PostedJobCard;