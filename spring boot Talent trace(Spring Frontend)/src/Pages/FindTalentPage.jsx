import { Divider } from "@mantine/core";
import Talents from "../Components/FindTalent/Talent";
import SearchBar from "../Components/FindTalent/SearchBar";

const FindTalentPage=()=>{
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
            <Divider size="xs" mx="md"/>
            <SearchBar/>
            <Divider mx="md" size="xs"/>
            <Talents/>
        </div>
    )
}
export default FindTalentPage;