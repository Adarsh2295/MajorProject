import { useEffect, useState } from "react";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { getAllProfiles } from "../../services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";

const Talents=()=>{
    const dispatch = useDispatch();
    const [talents, setTalents] = useState([]);
    const filter = useSelector((state) => state.filter);
    const sort = useSelector((state)=> state.sort);
    const [filterTalents, setFilterTalents] = useState([]);
    useEffect(()=>{
        dispatch(resetFilter());
        getAllProfiles().then((res) => {
            console.log("All profiles received:", res);
            
            // Since the backend doesn't include accountType in ProfileDTO,
            // we'll show all profiles for now and let console logs help debug
            // In a real scenario, you'd need the backend to include user type info
            
            // For now, let's filter based on profile characteristics
            // Typically applicants have job titles, employers might not
            const filteredProfiles = res.filter((profile) => {
                // Show profiles that look like applicant profiles
                // This is a workaround since accountType is not available
                return profile.jobTitle || profile.skills?.length > 0 || profile.experience?.length > 0;
            });

            console.log("Filtered profiles (applicant-like):", filteredProfiles);
            setTalents(filteredProfiles.length > 0 ? filteredProfiles : res);
        }).catch((error) => {
            console.log(error);
        })
    },[dispatch])
    useEffect(() => {
        
        if(sort==="Experience: Low to High"){
            setTalents([...talents].sort((a,b)=>a.totalExp-b.totalExp));
        }
        else if(sort==="Experience: High to Low"){
            setTalents([...talents].sort((a,b)=>b.totalExp-a.totalExp));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sort])
    useEffect(() => {
        let filtered = talents;
        if (filter.name) {
            filtered = filtered.filter((talent) => talent.name.toLowerCase().includes(filter.name.toLowerCase()));
        }
        if (filter["Job Title"] && filter["Job Title"].length>0) {
            filtered = filtered.filter((talent) => filter["Job Title"]?.some((title)=> talent?.jobTitle?.toLowerCase().includes(title.toLowerCase())));
        }
        if (filter.Location&&filter.Location.length>0) {
            filtered = filtered.filter((talent) => filter["Location"]?.some((location)=> talent?.location?.toLowerCase().includes(location.toLowerCase())));
        }
        if (filter.Skills&&filter.Skills.length>0){
            filtered = filtered.filter((talent) => filter.Skills?.some((skill)=> talent?.skills?.some((talentSkill)=>talentSkill.toLowerCase().includes(skill.toLowerCase()))));
        }
        if(filter.exp && filter.exp.length>0){
            filtered = filtered.filter((talent) => talent?.experience >= filter.exp[0] && talent?.experience <= filter.exp[1]);
        }
        
        setFilterTalents(filtered);
    }, [filter, talents]);

    return(
    <div className="p-5">
        <div className="flex justify-between">
            <div className="text-2xl font-bold">Talents</div>
            <Sort/>
        </div>
        <div className="mt-16 flex gap-8 flex-wrap justify-around">
            {
                filterTalents.length?filterTalents.map((talent, index) => <TalentCard key={index} {...talent}/>):
                <div className="text-2xl font-bold text-center">No Talents Found</div>
            }
        </div>
    </div>
    )
}
export default Talents;