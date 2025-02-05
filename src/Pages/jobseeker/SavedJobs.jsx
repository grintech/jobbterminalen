import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import JobSidebar from './JobSidebar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../store/authContext';
import { ToastContainer, toast } from 'react-toastify';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const [saved, setSaved] = useState(false);  

  const { user } = useAuthContext();
  const userId = user ? user.id : null;

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

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
        setError('Jobs not found');
      }
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      setError('Error fetching saved jobs:');
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

  const calculateTimeAgo = (date) => {
    // Convert the input date to the correct UTC format (ISO string)
    const utcZero = date.replace(" ", "T") + "Z"; // Ensure it's in ISO format with a 'Z' for UTC
    
    // Create Date object from the UTC date and convert it to the local time zone
    const localDate = new Date(utcZero);

    const now = new Date();

    const diffTime = now - localDate;

    const diffHours = Math.floor(diffTime / (1000 * 60 * 60)); 

    if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    }

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  };


  const isJobSaved = (jobId) => {
    return Array.isArray(savedJobs) && savedJobs.some((savedJob) => savedJob.id === jobId);
  };

  return (
    <>
      <Navbar />
      <div className="top_pad">
        <div className="container py-5">
            <div className="row mt-4">
            <div className="col-md-3 mb-4 mb-md-0">
              <JobSidebar />
            </div>
            <div className="col-md-9">
            {loading ? (
             <div className="loading-screen d-flex justify-content-center align-items-center flex-column ">
             <div className="spinner-grow text-primary" role="status">
               <span className="visually-hidden">Loading...</span>
             </div>
             <p className="mt-2">Fetching data...</p>
           </div>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : savedJobs ? (
            <div className='row'>
                <h1 className="job_head">Jobs saved by you ({savedJobs.length})</h1>
                {savedJobs.length === 0 ? (
                  <div className="no_saved_jobs mb-4">
                    <div className="card mt-4 border-0 shadow">
                      <div className="card-body text-center">
                        <img
                          className="job_search"
                          src="/images/job_search.png"
                          alt="job_search"  
                        />
                        <h4>No saved jobs!</h4>
                        <p>No saved jobs! Tap on save icon on a job to save it.</p>
                        <div className="btn btn-register">Search jobs</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  savedJobs.map((job) => (
                    <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={job.id}>
                      <div className="card company_list_card h-100">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <Link to={`/companies/${job.company_slug}`}>
                              <div className="logo_div border-0 shadow">
                                <img
                                  src={`${IMG_URL}/${job.company_profile}`}
                                  alt="company_logo"
                                />
                              </div>
                            </Link>
                            <div className="d-flex align-items-center">
                            <button
                                className={`btn-light border-0 shadow me-2 ${
                                  isJobSaved(job.id) ? "btn-primary" : ""
                                }`}
                                onClick={() => toggleSavedJob(job.id)}
                              >
                                <i
                                  className={`fa-bookmark  ${
                                    isJobSaved(job.id) ? "fa-solid" : "fa-regular"
                                  }`}
                                ></i>
                                {/* {isJobSaved(job.id) ? "Saved" : "Save"} */}
                              </button>
                              <Link className="btn-light shadow me-2">
                                <i className="fa-solid fa-share"></i>
                              </Link>
                            </div>
                          </div>
                          <div className="py-2">
                            <Link to={`/companies/${job.company_slug}`}>
                              <h5 className="py-2 m-0">{job.company_name}</h5>
                            </Link>
                            <Link to={`/jobs/${job.slug}`}>
                              <h6 className=" m-0">{job.title}</h6>
                            </Link>
                          </div>
                          <p className="main_desc">{job.company_tagline}</p>
                          <ul className="p-0 d-flex flex-wrap">
                            {job.job_type && (
                              <li>
                                <div className="btn btn-sm btn-green me-2 mb-2 text-capitalize">
                                  {job.job_type}
                                </div>
                              </li>
                            )}
                            <li>
                              <div className="btn btn-sm btn-green me-2 mb-2 text-capitalize">
                                <span>Salary -</span> {job.salary_range}{" "}
                                {job.salary_currency}
                              </div>
                            </li>
                            <li>
                              <div className="btn btn-sm btn-green me-2 mb-2 text-capitalize">
                                <span>Experience -</span>&nbsp;&nbsp; {job.experience_required}
                                {/* {typeof job.experience_required === "string"
                                  ? job.experience_required.toLowerCase() ===
                                    "fresher"
                                    ? "Fresher"
                                    : parseInt(job.experience_required) === 1
                                    ? `${job.experience_required} year`
                                    : parseInt(job.experience_required) === 0
                                    ? ""
                                    : `${job.experience_required} years`
                                  : job.experience_required} */}
                              </div>
                            </li>
                            {job.job_location && (
                              <li>
                                <div className="btn btn-sm btn-green me-2 mb-2 text-start text-capitalize">
                                  <i className="fa-solid fa-location-dot "></i>
                                  &nbsp;&nbsp;{job.job_location}
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
                  ))
                )}
            </div>
            ) : (
              <p>No jobs found</p>
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
    </>
  );
};

export default SavedJobs;
