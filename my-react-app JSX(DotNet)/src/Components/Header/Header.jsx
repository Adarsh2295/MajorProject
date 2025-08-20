import { Burger, Button, Drawer, useMantineColorScheme} from "@mantine/core";
import {IconSparkles, IconX, IconXboxX} from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getProfile } from "../../services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";
import NotificationMenu from "./NotificationMenu";
import { jwtDecode } from "jwt-decode";
import { setUser, removeUser } from "../../Slices/UserSlice";
import { removeJwt } from "../../Slices/JwtSlice";
import { setupResponseInterceptor, setReduxCleanupActions } from "../../Interceptor/AxiosInterceptor";
import { useDisclosure } from "@mantine/hooks"

// Mobile menu links will be filtered based on user role
const getAllLinks = (userRole) => {
    const allLinks = [
        {index:1, name:"Find Jobs", url:"find-jobs", roles: ["JobSeeker", "Recruiter", "Admin"]},
        {index:2, name:"Find Talent", url:"find-talent", roles: ["Recruiter", "Admin"]},
        {index:3, name:"Post Job", url:"post-job/0", roles: ["Recruiter", "Admin"]},
        {index:4, name:"Posted Job", url:"posted-job/0", roles: ["Recruiter", "Admin"]},
        {index:5, name:"Job History", url:"job-history", roles: ["JobSeeker"]},
    ];
    return userRole ? allLinks.filter(link => link.roles.includes(userRole)) : allLinks.filter(link => link.roles.includes("JobSeeker"));
}

const Header = ()=>{
    // All hooks must be called first, before any conditional logic
    const [opened, { open, close }] = useDisclosure(false);
    const { colorScheme } = useMantineColorScheme();
    const user = useSelector((state)=>state.user);
    const token = useSelector((state)=> state.jwt);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    // Debug logging
    console.log('Header Debug - User:', user);
    console.log('Header Debug - Token:', token)

    // Get user role for mobile menu
    let userRole= null;
    if(token && token !== "") {
        try {
            const decoded= jwtDecode(token);
            console.log('Header Debug - Decoded token:', decoded);
            userRole = decoded.applicantType || decoded.accountType || decoded.role;
            console.log('Header Debug - User role:', userRole);
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }
    
    const mobileLinks = getAllLinks(userRole)

    useEffect(()=>{
        // Set up Redux cleanup actions for the interceptor
        setReduxCleanupActions({
            removeUser,
            removeJwt,
            setProfile
        });
        setupResponseInterceptor(navigate, dispatch);
    },[navigate, dispatch])
    
    useEffect(()=>{
        if(token!==""){
            const storedToken = localStorage.getItem("token");
            if(storedToken && storedToken !== ""){
                try {
                    const decoded= jwtDecode(storedToken);
                    dispatch(setUser({...decoded, email:decoded.sub}));
                } catch (error) {
                    console.error("Error decoding stored token:", error);
                    // Clear invalid token
                    localStorage.removeItem("token");
                }
            }
        }
        if(user?.profileId && user.profileId !== undefined && user.profileId !== null){
            console.log('Header Debug - Fetching profile for ID:', user.profileId);
            getProfile(user.profileId).then((data)=>{
                console.log('Header Debug - Profile data received:', data);
                dispatch(setProfile(data));
            }).catch((error)=>{
                console.log('Header Debug - Error fetching profile:', error);
                // Don't try to fetch profile if error
            })
        } else {
            console.log('Header Debug - No valid profileId found, skipping profile fetch. User:', user);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token, navigate])
    
    // Conditional rendering after all hooks
    if(location.pathname==="/sign-up" || location.pathname==="/login") {
        return <React.Fragment></React.Fragment>;
    }
    
    return (
        <div className="flex justify-between w-full px-6 h-24 items-center font-['poppins'] bg-white dark:bg-mine-shaft-950 text-mine-shaft-950 dark:text-white border-b border-gray-200 dark:border-mine-shaft-800">
            <Link to="/" className="flex gap-1 items-center p- text-bright-sun-400 hover:text-bright-sun-300 transition-colors">
                <IconSparkles className="h-10 w-10" stroke={2} />
                <div className="xs-mx:hidden text-3xl font-semibold">TalentTrace</div>
            </Link>
            <NavLinks />
            <div className="flex gap-4 items-center">
               {user?<ProfileMenu/>:<Link to="/login">
                    <Button variant="subtle" color="bright-sun.4">Login</Button>
               </Link>}
                {/* <div className="bg-mine-shaft-900 rounded-full p-1.5">
                    <IconSettings stroke={1.5}/>
                </div> */}
                {user?<NotificationMenu/>:<></>}
                <Burger className="lg:hidden" opened={opened} onClick={open} aria-label="Toggle navigation" />
                <Drawer opened={opened} onClose={close}  overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} closeButtonProps={{icon: <IconX size={30} stroke={1.5} />}} position="right" size={"xs"}>
                    <div className="flex flex-col gap-8 items-center">
                    {
                    mobileLinks.map((link, index)=>
                    <div className="h-full flex items-center" key={index}>
                    <Link className="hover:text-bright-sun-400 text-xl" to={link.url}>{link.name}</Link>
                    </div>
                    )
                    }
                    </div>
                </Drawer>
            </div>
        </div>
    );
}

export default Header;
