import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"

const NavLinks=()=>{
    const token = useSelector((state)=>state.jwt);
    const location = useLocation()

    console.log('NavLinks Debug - Token:', token)

    // Get user role from token
    let userRole= null;
    if(token && token !== "") {
        try {
            const decoded= jwtDecode(token);
            console.log('NavLinks Debug - Decoded token:', decoded);
            userRole = decoded.applicantType || decoded.accountType || decoded.role;
            console.log('NavLinks Debug - User role:', userRole);
        } catch (error) {
            console.error("Error decoding token:", error);
            // Clear invalid token from localStorage if it exists
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                localStorage.removeItem("token");
            }
        }
    }
    
    // Define all possible links
    const allLinks = [
        {index:1, name:"Find Jobs", url:"find-jobs", roles: ["JobSeeker", "Recruiter", "Admin"]},
        {index:2, name:"Find Talent", url:"find-talent", roles: ["Recruiter", "Admin"]},
        {index:3, name:"Post Job", url:"post-job/0", roles: ["Recruiter", "Admin"]},
        {index:4, name:"Posted Job", url:"posted-job/0", roles: ["Recruiter", "Admin"]},
        {index:5, name:"Job History", url:"job-history", roles: ["JobSeeker"]},
    ]

    // Filter links based on user role
    const links = userRole ? allLinks.filter(link => link.roles.includes(userRole)) : allLinks.filter(link => link.roles.includes("JobSeeker"));
    console.log('NavLinks Debug - Filtered links:', links);
    return(
        <div className="flex lg-mx:hidden gap-8 text-mine-shaft-600 dark:text-mine-shaft-200 h-full items-center">{
            links.map((link, index)=>
            <div key={link.index} className={`${location.pathname==="/"+link.url ? "border-bright-sun-400 text-bright-sun-400":"border border-none"} border-t-[3px] h-full flex items-center`}>
            <Link to={`/${link.url}`}>{link.name}</Link>
            </div>
            )
        }
        </div>
    )
}

export default NavLinks;
