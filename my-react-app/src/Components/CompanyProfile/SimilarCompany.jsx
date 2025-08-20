
import { similar } from "../../Data/Company";
import CompanyCard from "./CompanyCard";

const SimilarCompany=()=>{
    return <div className="w-1/5">
    <div className="text-xl font-semibold mb-5">
    Similar Companies
</div>
<div className="flex flex-col flex-wrap gap-5 justify-between">
    {similar.map((company,index)=>company.name!=='Google'&&<CompanyCard key={index} {...company} />)}
</div>
</div>
}
export default SimilarCompany;