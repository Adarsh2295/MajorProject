import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const NavLinks=()=>{
    const token = useSelector((state)=>state.jwt);
    const location = useLocation();
    
    // Get user role from token
    let userRole = null;
    if(token) {
        try {
            const decoded = jwtDecode(token);
            userRole = decoded.applicantType || decoded.accountType || decoded.role;
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }
    
    // Define all possible links
    const allLinks = [
        {index:1, name:"Find Jobs", url:"find-jobs", roles: ["APPLICANT", "EMPLOYER", "RECRUITER"]},
        {index:2, name:"Find Talent", url:"find-talent", roles: ["EMPLOYER", "RECRUITER"]},
        {index:3, name:"Post Job", url:"post-job/0", roles: ["EMPLOYER", "RECRUITER"]},
        {index:4, name:"Posted Job", url:"posted-job/0", roles: ["EMPLOYER", "RECRUITER"]},
        {index:5, name:"Job History", url:"job-history", roles: ["APPLICANT"]},
    ];
    
    // Filter links based on user role
    const links = userRole ? allLinks.filter(link => link.roles.includes(userRole)) : allLinks.filter(link => link.roles.includes("APPLICANT"));
    return(
        <div className="flex lg-mx:hidden gap-8 text-mine-shaft-600 dark:text-mine-shaft-200 h-full items-center">{
            links.map((link, index)=>
            <div className={`${location.pathname==="/"+link.url ? "border-bright-sun-400 text-bright-sun-400":"border border-none"} border-t-[3px] h-full flex items-center`}>
            <Link key={index} to={link.url}>{link.name}</Link>
            </div>
            )
        }
        </div>
    )
}

export default NavLinks;