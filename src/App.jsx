import Homepage from './Pages/Homepage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import CategoryList from './components/CategoryList'
import JobDetail from './components/JobDetail'
import Contact from './components/Contact'
import About from './components/About'
import AllJobPost from './Pages/AllJobPost'
import ScrollToTop from './components/ScrollToTop'
import BackToTop from './components/BackToTop'
import AllEmployers from './Pages/AllEmployers'
import AllCategories from './components/AllCategories'
import JobPost from './Pages/JobPost'
import Faq from './Pages/Faq'
import TermsAndConditions from './Pages/TermsAndConditions'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import FeaturedEmployers from './Pages/FeaturedEmployers'
import PageNotFound from './components/PageNotFound'
import ForgetPassword from './components/ForgotPassword'
import VerifyOtp from './components/VerifyOtp'
import ResetPassword from './components/ResetPassword'
import ProjectBasis from './Pages/ProjectBasis'
// import SearchPage from './components/SearchPage'
import MyAccount from './Pages/jobseeker/MyAccount'
import ProtectedRoute from './routes/ProtectedRoute'
import SavedJobs from './Pages/jobseeker/SavedJobs'
import AppliedJobs from './Pages/jobseeker/AppliedJobs'
// import JobseekerProfile from './Pages/jobseeker/JobseekerProfile'
import CompanySingle from './Pages/CompanySingle'
import SavedCompanies from './Pages/jobseeker/SavedCompanies'
import GeoLocation from './components/GeoLocation'
import SearchJobs from './Pages/SearchJobs'
// import { ToastContainer } from "react-toastify";
// import HomeBanners from './components/HomeBanners'
import FraudAlert from './Pages/FraudAlert'
import Sitemap from './Pages/Sitemap'
import Feedback from './Pages/Feedback'
import HelpCenter from './Pages/HelpCenter'
import ApplyJob from './components/ApplyJob'
import Maintenance from './Pages/Maintenance'
import PublicRoute from './routes/PublicRoute'
// import TranslateWidget from './components/TranslateWidget'


const App = () => {
  return (
    <>
    <BrowserRouter>
    <ScrollToTop />
    <BackToTop />
    <GeoLocation />

        {/* <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999 }}>
          <TranslateWidget />
        </div> */}

        {/* <div id="google_translate_element"></div> */}


      {/* <HomeBanners /> */}

      <Routes >
        <Route path='/' element={ <Maintenance />} />
        <Route path='/home' element={ <Homepage />} />
        <Route path='/register' element={ <PublicRoute> <Register /> </PublicRoute> } />
        <Route path='/login' element={<PublicRoute> <Login /> </PublicRoute> } />
        <Route path='/forgot-password' element={<PublicRoute> <ForgetPassword /> </PublicRoute> } />
        <Route path='/verify-otp' element={<PublicRoute> <VerifyOtp /> </PublicRoute> } />
        <Route path='/reset-password' element={<PublicRoute> <ResetPassword /> </PublicRoute> } />

        {/* <Route path='/register' element={ <Register />} />
        <Route path='/login' element={ <Login />} />
        <Route path='/forgot-password' element={ <ForgetPassword />} />
        <Route path='/verify-otp' element={ <VerifyOtp />} />
        <Route path='/reset-password' element={ <ResetPassword />} /> */}

        <Route path='/about' element={ <About />} />
        <Route path='/contact' element={ <Contact />} />
        <Route path='/faqs' element={ <Faq />} />
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/jobs' element={ <AllJobPost />} />
        <Route path='/companies' element={ <AllEmployers />} />
        <Route path='/companies/featured' element={ <FeaturedEmployers />} />
        <Route path='/jobs/category' element={ <AllCategories />} />
        <Route path='/companies/:slug' element={ <CompanySingle />} />
        <Route path='/job-post' element={ <JobPost />} />
      
        <Route path='/work-type' element={ <ProjectBasis />} />

        <Route path='/fraud-alert' element={ <FraudAlert />} />
        <Route path='/sitemap' element={ <Sitemap />} />
        <Route path='/feedback' element={ <Feedback />} />
        <Route path='/help' element={ <HelpCenter />} />
        <Route path='*' element={ <PageNotFound />} />

      
        <Route path='/job/category/:slug' element={ <CategoryList />} />
        {/* <Route path='/job-detail' element={ <JobDetail />} /> */}
        <Route path='/jobs/:slug' element={ <JobDetail />} />

        <Route path='/apply-job'  element={ <ProtectedRoute allowedRoles={["job_seeker"]}> <ApplyJob /> </ProtectedRoute> } />

        {/* <Route path='/apply-job' element={ <ApplyJob />} /> */}

        {/* <Route path='/search-job' element={ <SearchPage />} /> */}
        <Route path='/job-search' element={ <SearchJobs />} />


       {/* Jobseeker Pages */}
       <Route path="/my-account" 
        element={ <ProtectedRoute allowedRoles={["job_seeker"]}> <MyAccount /> </ProtectedRoute> }
        />

       <Route path="/saved-jobs"
         element={ <ProtectedRoute allowedRoles={["job_seeker"]}> <SavedJobs /> </ProtectedRoute> }
        />

       <Route path="/applied-jobs" 
          element={ <ProtectedRoute allowedRoles={["job_seeker"]}> <AppliedJobs /> </ProtectedRoute> }
        />

       <Route path="/saved-companies"
         element={ <ProtectedRoute allowedRoles={["job_seeker"]}> <SavedCompanies /> </ProtectedRoute> }
        />

       {/* <Route path="/my-profile" 
          element={ <ProtectedRoute allowedRoles={["job_seeker"]}> <JobseekerProfile /> </ProtectedRoute>  }
        /> */}

      </Routes>
    </BrowserRouter>
     
    </>
   
  )
}

export default App