
import { useParams } from "react-router-dom";
import TalentCard from "../FindTalent/TalentCard";

const RecommendTalent=(props)=>{
    const {id} = useParams();

    return <div className="py-5">
        <div className="text-xl font-semibold mb-5">
        Recommended Talent
    </div>
    <div className="flex bs:flex-col flex-wrap gap-5 justify-between bs-mx:justify-start">
        {props?.talents?.map((talent,index)=>index<4 && Number(id) !== talent.id && <TalentCard key={index} {...talent} />)}
    </div>
    </div>

}

export default RecommendTalent;