
import { talents } from "../../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const CompanyEmployees=()=>{
    return <div className="mt-10 flex gap-20 flex-wrap">
    {
        talents.map((talent, index) =>index<6 && <TalentCard key={index} {...talent}/>)
    }
</div>
}
export default CompanyEmployees;