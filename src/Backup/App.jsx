import React from 'react'
import Homepage from './Pages/Homepage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
// import SignUp from './Pages/recruiter/SignUp'
// import RecLogin from './Pages/recruiter/RecLogin'
import CategoryList from './components/CategoryList'
import JobDetail from './components/JobDetail'
import ProfilePage from './Pages/recruiter/ProfilePage'
import Contact from './components/Contact'
import About from './components/About'
import AllJobPost from './Pages/AllJobPost'
import EmployerJobs from './Pages/EmployerJobs'
import ScrollToTop from './components/ScrollToTop'
import BackToTop from './components/BackToTop'
import AllEmployers from './Pages/AllEmployers'
import AllCategories from './components/AllCategories'
import JobPost from './Pages/JobPost'
import Faq from './Pages/Faq'
import CreateJob from './Dashboard/Recruiter/RecPages/CreateJob'
import JobListing from './Dashboard/Recruiter/RecPages/JobListing'
import EditJob from './Dashboard/Recruiter/RecPages/EditJob'
import RecruiterDashboard from './Dashboard/Recruiter/RecruiterDashboard'
import TermsAndConditions from './Pages/TermsAndConditions'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import FeaturedEmployers from './Pages/FeaturedEmployers'
import PageNotFound from './components/PageNotFound'
import LocationPopup from './components/LocationPopup'
import ForgetPassword from './components/ForgotPassword'
import VerifyOtp from './components/VerifyOtp'
import ResetPassword from './components/ResetPassword'
import ProjectBasis from './Pages/ProjectBasis'
// import RecRegister from './Pages/recruiter/RecRegister'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <ScrollToTop />
    <BackToTop />
    {/* <LocationPopup /> */}
      <Routes >
        <Route path='/' element={ <Homepage />} />
        <Route path='/register' element={ <Register />} />
        <Route path='/login' element={ <Login />} />
        <Route path='/forgot-password' element={ <ForgetPassword />} />
        <Route path='/verify-otp' element={ <VerifyOtp />} />
        <Route path='/reset-password' element={ <ResetPassword />} />
        <Route path='/about' element={ <About />} />
        <Route path='/contact' element={ <Contact />} />
        <Route path='/faqs' element={ <Faq />} />
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/jobs' element={ <AllJobPost />} />
        <Route path='/companies' element={ <AllEmployers />} />
        <Route path='/companies/featured' element={ <FeaturedEmployers />} />
        <Route path='/jobs/category' element={ <AllCategories />} />
        <Route path='/companies/capgemini' element={ <EmployerJobs />} />
        <Route path='/job-post' element={ <JobPost />} />
        <Route path='*' element={ <PageNotFound />} />
        <Route path='/work-type' element={ <ProjectBasis />} />

        {/* <Route path='/rec-register' element={ <RecRegister />} /> */}
        {/* <Route path='/create-profile' element={ <SignUp />} /> */}
        {/* <Route path='/rec-login' element={ <RecLogin />} /> */}
        <Route path='/rec-profile' element={ <ProfilePage />} />
        <Route path='/job/category/remote' element={ <CategoryList />} />
        <Route path='/job-detail' element={ <JobDetail />} />


        {/* Dashboard Pages */}
        <Route path='/dashboard/recruiter' element={ <RecruiterDashboard />} />
        <Route  path='/dashboard/job-listing' element={ <JobListing />} />
        <Route  path='/dashboard/create-job' element={ <CreateJob />} />
        <Route  path='/dashboard/edit-job/:slug' element={ <EditJob />} />
        
      </Routes>
    </BrowserRouter>
     
    </>
   
  )
}

export default App