import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import ApplyJobPage from "./ApplyJobPage"
import CompanyPage from "./CompanyPage"
import FindJobs from "./FindJobs"
import FindTalentPage from "./FindTalentPage"
import HomePage from "./HomePage"
import JobDescPage from "./JobDescPage"
import JobHistoryPage from "./JobHistoryPage"
import PostedJobPage from "./PostedJobPage"
import PostJobPage from "./PostJobPage"
import ProfilePage from "./ProfilePage"
import SignUpPage from "./SignUpPage"
import TalentProfilePage from "./TalentProfilePage"
import AboutUsPage from "./AboutUsPage"
import ContactUsPage from "./ContactUsPage"
import HelpSupport from "./HelpSupport"
import { useSelector } from "react-redux"
import ProtectedRoute from "../services/ProtectedRoute"
import PublicRoute from "../services/PublicRoute"

const AppRoute=()=>{
    const user = useSelector((state)=>state.user);
    return <BrowserRouter>
      <div className='relative'>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/find-jobs" element={<FindJobs/>} />
        <Route path="/find-talent" element={<ProtectedRoute allowedRoles={['EMPLOYER']}><FindTalentPage/></ProtectedRoute>} />
        <Route path="/post-job/:id" element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostJobPage/></ProtectedRoute>} />
        <Route path="/talent-profile/:id" element={<TalentProfilePage/>} />
        <Route path="/jobs/:id" element={<JobDescPage/>} />
        <Route path="/company/:name" element={<CompanyPage/>} />
        <Route path="/apply-job/:id" element={<ApplyJobPage/>} />
        <Route path="/posted-job/:id" element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostedJobPage/></ProtectedRoute>} />
        <Route path="/job-history" element={<ProtectedRoute allowedRoles={['APPLICANT']}><JobHistoryPage/></ProtectedRoute>} />
        <Route path="/sign-up" element={<SignUpPage/>} />
        <Route path="/login" element={<SignUpPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/about-us" element={<AboutUsPage/>} />
        <Route path="/contact-us" element={<ContactUsPage/>} />
        <Route path="/help-support" element={<HelpSupport/>} />
        <Route path="*" element={<HomePage/>}/>
      </Routes>
      <Footer/>
      </div>
     </BrowserRouter>
}

export default AppRoute;