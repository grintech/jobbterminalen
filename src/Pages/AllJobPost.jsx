import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../components/Filter";
import { Link, useNavigate } from "react-router-dom";
import { useFilterContext } from "../store/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroBannerJobs from "../components/HeroBannerJobs";
import { Helmet } from "react-helmet-async";
import { useAuthContext } from "../store/authContext";
import { ToastContainer,toast } from "react-toastify";
import Avatar from "react-avatar";

const AllJobPost = () => {
  const { filters, setFilter } = useFilterContext();
  const [jobs, setJobs] = useState([]);
 
   const [savedJobs, setSavedJobs] = useState([]);
   const [saved, setSaved] = useState(false);
    
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const { user } = useAuthContext();
  const userId = user ? user.id : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        // console.log("Current Filters State:", filters); // Debug current filters
        const query = new URLSearchParams(filters).toString();
        // console.log("Generated Query String:", query); // Debug query string

        const response = await fetch(`${API_URL}/job-list.php?${query}`, {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "multipart/form-data",
          }
        });
        const result = await response.json();

        if (result.type === "success") {
          setJobs(result.data);
          setPagination(result.pagination);
        } else {
          setJobs([]);
          setError(result.message || "Failed to fetch job posts");
        }
      } catch (error) {
        setJobs([]);
        setError("An error occurred while fetching jobs.");
        console.error("Error fetching job posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);


  const handlePageChange = (page) => {
    setFilter({ page }); // Update the page in filters
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
     if (!userId) {
      toast.error("Please login to save job.");
      setTimeout(() => {
        navigate('/login');
      }, 2000);      
      return;
      }

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

  const isJobSaved = (jobId) => {
    return Array.isArray(savedJobs) && savedJobs.some((savedJob) => savedJob.id === jobId);
  };

  return (
    <>
        <Helmet>
          
        {/* <title>Browse Jobs in Sweden - Find Your Dream Job | JobbTerminalen</title>
        <meta name="description" content="Explore the latest job openings in Sweden. Find full-time, part-time, and remote job opportunities across various industries on JobbTerminalen." />
        <meta name="keywords" content="jobs in Sweden, job openings, Sweden careers, job portal, employment opportunities, remote jobs, full-time jobs, part-time jobs" /> */}
  
      </Helmet>

      <div className="all_jobs_page">
        <Navbar />
        {/* <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
          <h1 className="fw-bold position-relative">Job Vacancies</h1>
          <div className="banner_search container d-flex align-items-center justify-content-center mt-4">
            <i className="fa-solid fa-magnifying-glass search_icon"></i>
            <div className="row align-items-center justify-content-center w-100">
              <div className="col-lg-3 border-end">
                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-magnifying-glass d-block d-lg-none"></i>
                  <input className="w-100" type="text" placeholder="Enter Skills / designation"
                    onChange={(e) => setFilter({ skills: e.target.value })}
                  />
                </div>
              </div>
              <div className="col-lg-2 border-end">
                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-location-dot"></i>
                  <input className="w-100" type="text" placeholder="Location"
                    onChange={(e) => setFilter({ location: e.target.value })}
                  />
                </div>
              </div>
              <div className="col-lg-3 border-end">
                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-briefcase"></i>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setFilter({ experience: e.target.value })}
                  >
                    <option default>Experience</option>
                    <option value="fresher">Fresher</option>
                    <option value="1">1 Year</option>
                    <option value="2">2 years</option>
                    <option value="3">3+ Years</option>
                    <option value="5">5+ Years</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-2 border-end mb-2 mb-lg-0">
                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <select className="form-select" aria-label="Default select example"
                    onChange={(e) => setFilter({ job_type: e.target.value })}
                  >
                    <option default>JobType</option>
                    <option value="remote">Remote</option>
                    <option value="work-from-office">WFO</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-2 ">
                <button type="submit" className="btn-register w-100">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div> */}
        <HeroBannerJobs />

        <div className="container d-flex flex-column py-5 all_job_posts">
          {/* <h4 className="mb-4">All Jobs</h4> */}
          <div className="row pb-5">
            <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
              <Filter />
            </div>
            <div className="col-lg-9 col-md-8 d-flex flex-column position-relative align-items-center-justify-content-center">
              {loading ? (
                <div className="loading-screen d-flex flex-column justify-content-center align-items-center">
                  <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className='mt-2'>Fetching jobs...</p>
                </div>
              ) : error ? (
              <>
                <div className="msg_card">
                  <div className="card border-0 shadow">
                    <div className="card-body text-center p-4">
                    <img className="job_search" src="/images/no-job.png" alt="job_search" />
                    <h6 className="text-theme">{error === "No data found" ? "No jobs found at the moment.." : "No data found"}</h6>
                </div>
                  </div>
                </div>
              </>
              ) : jobs.length > 0 ? (
                <div className="row">
                  {jobs.map((job) => (
                    <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={job.id}>
                      <div className="card company_list_card h-100">
                        <div className="card-body ">
                          <div className="d-flex justify-content-between align-items-start">
                            <Link to={`/companies/${job.companies_slug}`}>
                              <div className="logo_div border-0 shadow">
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
                              <Link className="save_post me-2">
                                <i 
                                className={`fa-heart  ${
                                  isJobSaved(job.id) ? "fa-solid" : "fa-regular"
                                }`}
                                onClick={() => toggleSavedJob(job.id)}
                                  title={
                                    isJobSaved(job.id) ? "Click to unsave" : "Click to save"}

                                ></i>
                              </Link>
                              {/* <Link className="btn-light shadow me-2">
                                <i className="fa-solid fa-share"></i>
                              </Link> */}
                            </div>
                          </div>
                          <div className="py-2 ">
                            <h5 className=" text-capitalize" >{job.company_name}</h5>
                            {/* <Link to="/job-detail"> */}
                            <Link to={`/jobs/${job.slug}`}>
                              <h6 className="m-0 text-capitalize" dangerouslySetInnerHTML={{ __html: job.title }}></h6>
                            </Link>
                          </div>
                          <p className="main_desc">Trusted global solutions company.</p>
                          <ul className="p-0 d-flex flex-wrap m-0">
                            {job.job_type && (
                              <li>
                                <div className="btn btn-sm btn-green me-2 mb-2 text-capitalize">
                                  {job.job_type.replace(/-/g, ' ')}</div>
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

                            {job.city && (
                              <li>
                                <div className="btn btn-sm btn-green me-2 mb-2 text-start text-capitalize">
                                  <i className="fa-solid fa-location-dot"></i>&nbsp;&nbsp;{job.city}
                                </div>
                              </li>
                            )}
                            {job.salary_currency && job.salary_range && (
                              <li>
                                <div className="btn btn-sm btn-green me-2 mb-2">
                                  {job.salary_currency} {job.salary_range} <small>/ {job.hourly_rate}</small>
                                </div>
                              </li>
                            )}


                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                <div className="msg_card">
                  <div className="card  border-0 shadow">
                    <div className="card-body text-center p-4">
                    <img className="job_search" src="/images/no-job.png" alt="job_search" />
                    <h6 className="text-theme">{error === "No data found" ? "No jobs found at the moment.." : "No jobs found at the moment.."}</h6>
                  </div>
                  </div>
                </div>
              </>
              )}

              {/* Pagination */}
              <div className="d-flex justify-content-center mt-4">
                {pagination.total_pages > 1 && (
                  <nav>
                    <ul className="pagination">
                      {/* Previous Button */}
                      <li className={`page-item ${Number(pagination.current_page) === 1 ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => {
                            if (Number(pagination.current_page) > 1) {
                              handlePageChange(Number(pagination.current_page) - 1);
                            }
                          }}
                        >
                          <i className="fa-solid fa-arrow-left"></i>
                        </button>
                      </li>

                      {/* Page Numbers */}
                      {Array.from({ length: pagination.total_pages }, (_, index) => (
                        <li
                          key={index + 1}
                          className={`page-item ${Number(pagination.current_page) === index + 1 ? "active" : ""
                            }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => {
                              handlePageChange(index + 1);
                            }}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}

                      {/* Next Button */}
                      <li
                        className={`page-item ${Number(pagination.current_page) === pagination.total_pages ? "disabled" : ""
                          }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => {
                            if (Number(pagination.current_page) < pagination.total_pages) {
                              handlePageChange(Number(pagination.current_page) + 1);
                            }
                          }}
                        >
                          <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>



            </div>
          </div>
        </div>

        <Footer />
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
      </div>
    </>
  );
};

export default AllJobPost;
