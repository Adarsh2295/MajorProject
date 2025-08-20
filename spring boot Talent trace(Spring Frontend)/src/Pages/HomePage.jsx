import Companies from "../Components/LandingPage/Companies";
import DreamJob from "../Components/LandingPage/DreamJob";
import JobCategory from "../Components/LandingPage/JobCategory";
import Subscribe from "../Components/LandingPage/Subscribe";
import Testimonials from "../Components/LandingPage/testimonials";
import Working from "../Components/LandingPage/Working";

const HomePage = ()=>{
    return (
        <div className="min-h-[100vh] bg-gray-50 dark:bg-mine-shaft-950 font-['poppins']">
            <DreamJob/>
            <Companies/>
            <JobCategory/>
            <Working/>
            <Testimonials/>
            <Subscribe/>
        </div>
        
    )
}

export default HomePage;