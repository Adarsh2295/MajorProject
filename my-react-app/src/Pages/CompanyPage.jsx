import { Divider, Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import Company from "../Components/CompanyProfile/Company";
import SimilarCompany from "../Components/CompanyProfile/SimilarCompany";

const CompanyPage=()=>{
    const navigate = useNavigate();
    return <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] space-y-5 px-3">
            <Divider size="xs" />
            <div></div>
                <Button my={5} leftSection={<IconArrowLeft size={20}/>} color="bright-sun.4" onClick={()=>navigate(-1)} variant="light">Back</Button>
            <div className="flex gap-5 justify-between px-4">
                <Company/>
                <SimilarCompany/>
            </div>
        </div>
}
export default CompanyPage;