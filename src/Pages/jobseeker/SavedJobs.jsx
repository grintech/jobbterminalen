import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import JobSidebar from './JobSidebar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../store/authContext';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Avatar from 'react-avatar';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);  

  const { user } = useAuthContext();
  const userId = user ? user.id : null;

  const {t} = useTranslation();

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Fetch saved jobs from the API
  const fetchSavedJobs = async () => {
    try {
      const response = await axios.get(`${API_URL}/bookmarked-jobs-list.php?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
        },
      });
      if (response.data.type === 'success') {
        setSavedJobs(response.data.saved_jobs || []);
        setSaved(response.data.data.status === 'active');
      } else {
        setError('No jobs found at the moment');
      }
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      setError(`No jobs found at the moment`);
    } finally {
      setLoading(false);
    }
  };

  // Toggle save job functionality
  const toggleSavedJob = async (jobId) => {
    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('job_id', jobId);

      const response = await axios.post(`${API_URL}/bookmark-jobs.php`, formData, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
        },
      });

      if (response.data.type === 'success') {
         const actionMessage = isJobSaved(jobId) ? "Job Unsaved" : "Job Saved"; 
        toast.success(actionMessage); 
        fetchSavedJobs(); // Re-fetch saved jobs to update the list
        setSaved(!saved);
      }
    } catch (error) {
      console.error('Error toggling save job:', error);
      toast.error("Error while saving job.", err);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);


  // const calculateTimeAgo = (date) => {
  //   const utcZero = date.replace(" ", "T") + "Z";
  //   const localDate = new Date(utcZero);
  //   const now = new Date();
  //   const diffTime = now - localDate;
  
  //   const diffMinutes = Math.floor(diffTime / (1000 * 60));
  //   if (diffMinutes < 60) {
  //     return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  //   }
  
  //   const diffHours = Math.floor(diffMinutes / 60);
  //   if (diffHours < 24) {
  //     return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  //   }
  
  //   const diffDays = Math.floor(diffHours / 24);
  //   return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  // };


  const calculateTimeAgo = (timestamp) => {
    if (!timestamp) return "";
  
    const now = new Date();
    const past = new Date(timestamp.replace(" ", "T"));
    const secondsPast = Math.floor((now - past) / 1000);
  
    const days = Math.floor(secondsPast / 86400); // 60 * 60 * 24
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (secondsPast < 60) {
      return `${secondsPast} sec${secondsPast !== 1 ? "s" : ""} ago`;
    }
  
    if (secondsPast < 3600) {
      const minutes = Math.floor(secondsPast / 60);
      return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
    }
  
    if (secondsPast < 86400) {
      const hours = Math.floor(secondsPast / 3600);
      return `${hours} hr${hours !== 1 ? "s" : ""} ago`;
    }
  
    // Custom day/month display logic
    if (days < 31) {
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  
    // Show "1 month ago" only on the 31st day
    if (days === 31) {
      return `1 month ago`;
    }
  
    // For days between 32 and 60, show "x days ago"
    if (days > 31 && days < 61) {
      return `${days} days ago`;
    }
  
    // Show months only on exact multiples of 30 (after day 60)
    if (days % 30 === 0) {
      return `${months} month${months !== 1 ? "s" : ""} ago`;
    }
  
    return `${days} days ago`;
  };

  const isJobSaved = (jobId) => {
    return Array.isArray(savedJobs) && savedJobs.some((savedJob) => savedJob.id === jobId);
  };

  return (
    <div className='account_page'>
      <Navbar />
      <div className="top_pad">
        <div className="container pb-5">
            <div className="row mt-4">
            <div className="col-md-3 mb-4 mb-md-0">
              <JobSidebar />
            </div>
            <div className="col-md-9">
            {loading ? (
             <div className="loading-screen d-flex justify-content-center align-items-center flex-column ">
             <div className="spinner-grow text-primary" role="status">
               <span className="visually-hidden">{t("Loading")}</span>
             </div>
             <p className="mt-2">{t("FetchingData")}</p>
           </div>
          ) : error ? (
               <div className="no_saved_jobs mb-4">
                <div className="card  border-0 shadow">
                 <div className="card-body text-center">
                  <img
                    className="job_search"
                    src="/images/job_search.png"
                    alt="job_search"  
                  />
                  <h5 className='text-theme '>{error}</h5>
                 </div>
                </div>
              </div>
          ) : savedJobs ? (
            <div className='row'>   
                {savedJobs.length === 0 ? (
                  <div className="no_saved_jobs mb-4">
                    <div className="card  border-0 shadow">
                      <div className="card-body text-center">
                        <img
                          className="job_search"
                          src="/images/job_search.png"
                          alt="job_search"  
                        />
                        <h4>{t("NoSavedjobs")}</h4>
                        <p>{t("NoSaveText")}</p>
                        <Link to='/jobs' className="btn btn-register">{t("SearchJobs")}</Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                   <h1 className="job_head">{t("SavedJobs")} ({savedJobs.length})</h1>
                    {savedJobs.map((job) => (
                      <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={job.id}>
                        <div className="card company_list_card h-100">
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <Link to={`/companies/${job.company_slug}`}>
                                <div className="logo_div border-0 shadow">
                                  {/* <img
                                    src={`${IMG_URL}/${job.company_profile}`}
                                    alt="company_logo"
                                  /> */}
                                  {!job.company_profile ? (
                                      <Avatar
                                        name={job.company_name}
                                        size="60"
                                        round="8px"
                                        fgColor="#fff"
                                        textSizeRatio={2}
                                      />
                                     ) : (
                                      <img
                                        src={`${IMG_URL}/${job.company_profile}`}
                                        alt={job.company_name}
                                      />
                                    )}
                                </div>
                              </Link>
                              <div className="d-flex align-items-center">
                              <button
                                  className={`btn-light border-0 shadow me-2 `}
                                  onClick={() => toggleSavedJob(job.id)}
                                  title={
                                    isJobSaved(job.id) ? "Click to unsave" : "Click to save"
                                  }
                                >
                                  <i
                                    className={`fa-bookmark  ${
                                      isJobSaved(job.id) ? "fa-solid" : "fa-regular"
                                    }`}
                                   
                                  ></i>
                                  {/* {isJobSaved(job.id) ? "Saved" : "Save"} */}
                                </button>
                               
                              </div>
                            </div>
                            <div className="py-2">
                              <Link to={`/companies/${job.company_slug}`}>
                                <h5 className="py-2 m-0">{stripHtml(job.company_name)}</h5>
                              </Link>
                              <Link to={`/jobs/${job.slug}`}>
                                <h6 className=" m-0">{stripHtml(job.title)}</h6>
                              </Link>
                            </div>
                            <p className="main_desc">{job.company_tagline}</p>
                            <ul className="p-0 d-flex flex-wrap">
                              {job.job_type && (
                                <li>
                                  <div className="btn btn-sm btn-green me-2 mb-2 text-capitalize">
                                    {job.job_type.replace(/-/g, " ")}
                                  </div>
                                </li>
                              )}

                               {job.experience_required && (
                                <li>
                                  <div className="btn btn-sm btn-green me-2 mb-2 text-capitalize">
                                    {job.experience_required === "0" ? (
                                      "Fresher"
                                    ) : job.experience_required === "1" ? (
                                      `Exp - 1 Yr`
                                    ) : (
                                      `Exp - ${job.experience_required} Yrs`
                                    )}
                                  </div>
                                </li>
                              )}

                              {job.salary_range && job.salary_currency && (
                                <li>
                                  <div className="btn btn-sm btn-green me-2 mb-2 text-capitalize">
                                    {job.salary_currency} {job.salary_range} / <small>{job.hourly_rate}</small>
                                    
                                  </div>
                                </li>
                              )}

                             
                              {job.city && (
                                <li>
                                  <div className="btn btn-sm btn-green me-2 mb-2 text-start text-capitalize">
                                    <i className="fa-solid fa-location-dot "></i>
                                    &nbsp;&nbsp;{job.city}
                                  </div>
                                </li>
                              )}
                            </ul>
                            <p className=" text-muted m-0">
                              <small className="badge text-bg-light">
                                {calculateTimeAgo(job.created_at)}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
            </div>
            ) : (
               <div className="no_saved_jobs mb-4">
                <div className="card  border-0 shadow">
                  <div className="card-body text-center">
                    <img
                      className="job_search"
                      src="/images/job_search.png"
                      alt="job_search"  
                    />
                    <h4>{t("NoJobsFound")}</h4>
                  </div>
                </div>
                </div>
            )}
            </div>
            </div>
         
        </div>
      </div>

        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      <Footer />
    </div>
  );
};

export default SavedJobs;
