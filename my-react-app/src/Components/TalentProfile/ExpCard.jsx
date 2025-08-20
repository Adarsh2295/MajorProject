import { formatDate } from "../../services/Utilities";

const ExpCard=(props)=>{
    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between gap-2 flex-wrap">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-700 rounded-md">
                        <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold">{props.title}</div>
                        <div className="text-sm text-mine-shaft-300">{props.company} &#x2022; {props.location}</div>
                    </div>
                </div>
                <div>
                    <div className="text-sm text-mine-shaft-300">
                        {formatDate(props.startDate)} - {formatDate(props.endDate)}
                    </div>
                </div>
            </div>
            <div className="text-sm xs-mx:text-xs text-justify text-mine-shaft-300">
               {props.description}
            </div>
        </div>
    )
}
export default ExpCard;