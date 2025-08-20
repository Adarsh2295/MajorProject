import { IconBrandFacebook, IconBrandInstagram, IconBrandX, IconSparkles } from "@tabler/icons-react";

import { useLocation, Link } from "react-router-dom";
import { footerLinks } from "../../Data/Data";

const Footer = ()=>{
    const location = useLocation();
    return location.pathname!=="/sign-up"&&location.pathname!=="/login"?<div className="pt-20 pb-5 flex gap-8 justify-around flex-wrap bg-gray-100 dark:bg-mine-shaft-950 font-['poppins']">
            <div className="w-1/4 sm-mx:w-1/3 xs-mx:w-1/2 xsm-mx:w-full flex flex-col gap-4">
                <div className="flex gap-1 items-center p- text-bright-sun-400">
                    <IconSparkles className="h-6 w-7" stroke={2} />
                        <div className="text-xl font-semibold">TalentTrace</div>
                </div>
            
                <div className="text-sm text-mine-shaft-600 dark:text-mine-shaft-300">
                    Job portal with user profiles, skills updates, certifications, work experience and admin job posting.
                </div>
                <div className="flex gap-3 text-bright-sun-400 [&>div]:bg-gray-200 dark:[&>div]:bg-mine-shaft-900 [&>div]:p-1 [&>div]:rounded-full [&>div]:cursor-pointer hover:[&>div]:bg-gray-300 dark:hover:[&>div]:bg-mine-shaft-700">
                    <div onClick={() => window.open('https://facebook.com/talenttrace', '_blank')}><IconBrandFacebook/></div>
                    <div onClick={() => window.open('https://instagram.com/talenttrace', '_blank')}><IconBrandInstagram/></div>
                    <div onClick={() => window.open('https://twitter.com/talenttrace', '_blank')}><IconBrandX/></div>
                </div>
            </div>

            {
                footerLinks.map((item,index)=><div key={index} className="">
                    <div className="text-lg font-semibold mb-4 text-bright-sun-400">{item.title}</div>
                    {item.links.map((link,linkIndex)=> {
                        const getLinkPath = (linkText) => {
                            switch(linkText) {
                                case "About Us":
                                    return "/about-us";
                                case "Contact Us":
                                    return "/contact-us";
                                case "Find Job":
                                    return "/find-jobs";
                                case "Help & Support":
                                    return "/help-support";
                                default:
                                    return "#";
                            }
                        };
                        
                        const linkPath = getLinkPath(link);
                        
                        return linkPath !== "#" ? (
                            <Link 
                                key={linkIndex} 
                                to={linkPath} 
                                className="block text-mine-shaft-600 dark:text-mine-shaft-300 text-sm hover:translate-x-2 transition duration-300 ease-in-out hover:text-bright-sun-400 cursor-pointer mb-2"
                            >
                                {link}
                            </Link>
                        ) : (
                            <div key={linkIndex} className="text-mine-shaft-600 dark:text-mine-shaft-300 text-sm hover:translate-x-2 transition duration-300 ease-in-out hover:text-bright-sun-400 cursor-pointer mb-2">
                                {link}
                            </div>
                        );
                    })}
                </div>)
            }
        </div>
        :
        <></>

}

export default Footer;