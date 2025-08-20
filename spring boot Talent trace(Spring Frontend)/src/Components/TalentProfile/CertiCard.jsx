import { formatDate } from "../../services/Utilities";

const CertiCard=(props)=>{
    return (
        <div className="flex justify-between gap-2 sm-mx:flex-wrap">
                <div className="flex gap-2 items-center sm-mx:flex-wrap">
                    <div className="p-2 bg-mine-shaft-700 rounded-md shrink-0">
                        <img className="h-7" src={`/Icons/${props.issuer}.png`} alt="" />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold xs-mx:text-sm">{props.name}</div>
                        <div className="text-sm xs-mx:text-xs text-mine-shaft-300">{props.issuer}</div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex flex-col items-end sm-mx:gap-2 xs-mx:flex-row">
                        <div className="text-sm xs-mx:text-xs text-mine-shaft-300">{formatDate(props.issueDate)}</div>
                        <div className="text-sm xs-mx:text-xs text-mine-shaft-300">ID : {props.certificateId}</div>
                    </div>
                </div>
            </div>
    )
}
export default CertiCard;