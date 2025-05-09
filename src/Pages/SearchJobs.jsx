import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import { useAuthContext } from "../store/authContext"; // Assuming you have authContext for user
import HeroBanner from "../components/HeroBanner";
import Filter from "../components/Filter";

const SearchJobs = () => {
  const { search } = useLocation(); // Get the search string from the URL
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]); // Track saved jobs
  const { user } = useAuthContext();
  const userId = user ? user.id : null;

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Fetch saved job status
  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `${API_URL}/bookmarked-jobs-list.php?user_id=${userId}`,
            {
              headers: {
                Authorization: `Bearer ${bearerKey}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          if (response.data.type === "success" && Array.isArray(response.data.saved_jobs)) {
            setSavedJobs(response.data.saved_jobs);
          } else {
            setSavedJobs([]); // In case of error, set to empty array
          }
        } catch (err) {
          console.error("Error fetching saved jobs:", err);
          setSavedJobs([]);
        }
      }
    };

    fetchSavedJobs();
  }, [userId]);

  // Check if the job is saved
  const isJobSaved = (jobId) => {
    return Array.isArray(savedJobs) && savedJobs.some((savedJob) => savedJob.id === jobId);
  };

  // Toggle saved/unsaved job
  const toggleSavedJob = async (jobId) => {
    if (!userId) {
      console.log("Please login to save jobs.");
      toast.error("Please login to save jobs.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("job_id", jobId);

      const response = await axios.post(`${API_URL}/bookmark-jobs.php`, formData, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.type === "success") {
        const actionMessage = isJobSaved(jobId) ? "Job Unsaved" : "Job Saved";
        toast.success(actionMessage);
        setSavedJobs((prevSavedJobs) => {
          if (isJobSaved(jobId)) {
            return prevSavedJobs.filter((job) => job.id !== jobId); // Remove job if already saved
          } else {
            return [...prevSavedJobs, { id: jobId }]; // Add job if not saved
          }
        });
      } else {
        toast.error(`${response.data.message}`);
      }
    } catch (err) {
      console.error("Error while toggling saved job:", err);
      toast.error("Error while saving job.");
    }
  };

  // Fetch jobs based on search query
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams(search);
        const queryParams = {};
        params.forEach((value, key) => {
          queryParams[key] = value;
        });

        const apiUrl = `${API_URL}/advance-search.php?${new URLSearchParams(queryParams).toString()}`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
          },
        });

        if (response.data.type === "success") {
          setJobs(response.data.data);
        } else {
          setJobs([]);
          setError(response.data.message || "No jobs found for the given search.");
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (search) fetchJobs();
  }, [search]);

  return (
    <div className="search_jobs_page">
      <Navbar />
      <div className="top_pad2">
        <HeroBanner />
        <div className="container job_search_page py-4">
          <div className="row">
            {/* <div className="col-lg-3">
              <Filter />
            </div> */}
            <div className="col-lg-11 mx-auto">
            <h1 className="job_head">Job Search Results</h1>
              {loading ? (
              <div className="loading-screen d-flex justify-content-center align-items-center flex-column ">
                <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Fetching data...</p>
              </div>
                ) : error ? (
                  <div className="msg_card  mb-4">
                  <div className="card border-0 shadow">
                   <div className="card-body text-center p-4">
                   <img className="job_search" src="/images/no-job.png" alt="job_search" />
                   <h6 className="text-theme">{error == "No data found" ? "No matched result available." :error}</h6>
                 </div>
                 </div>
                 </div>
                ) : jobs.length > 0 ? (
                  <div className="row">
                    {jobs.map((job) => (
                      <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={job.job_id}>
                        <div className="card company_list_card h-100">
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <div className="logo_div border-0 shadow">
                                <Link to={`/companies/${job.company_slug}`}>
                                  <img
                                    src={`${IMG_URL}/${job.company_profile}`}
                                    alt={job.company_name}
                                  />
                                </Link>
                              </div>
                              <div className="d-flex align-items-center">
                                <button
                                  className={`btn-light border-0 shadow me-2 ${isJobSaved(job.job_id) ? "btn-primary" : ""}`}
                                  onClick={() => toggleSavedJob(job.job_id)}
                                >
                                  <i
                                    className={`fa-bookmark ${isJobSaved(job.job_id) ? "fa-solid" : "fa-regular"}`}
                                  ></i>
                                </button>
                                <Link className="btn-light shadow me-2">
                                  <i className="fa-solid fa-share"></i>
                                </Link>
                              </div>
                            </div>
                            <div className="py-2">
                              <h5 className="py-2">{job.company_name}</h5>
                              <Link to={`/jobs/${job.job_slug}`}>
                                <h6>{stripHtml(job.job_title)}</h6>
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

                              {job.city && (
                                <li>
                                  <div className="btn btn-sm btn-green me-2 mb-2 text-start text-capitalize">
                                    <i className="fa-solid fa-location-dot "></i>
                                    &nbsp;&nbsp;{job.city}
                                  </div>
                                </li>
                              )}
                             
                              {/* <li>
                                <div className="btn btn-sm btn-green me-2 mb-2 text-capitalize"><i className="fa-solid fa-location-dot me-1"></i>{job.job_location}</div>
                              </li> */}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="msg_card  mb-4">
                  <div className="card border-0 shadow">
                   <div className="card-body text-center p-4">
                   <img className="job_search" src="/images/no-job.png" alt="job_search" />
                   <h6 className="text-theme">No data found at the moment.Please try later</h6>
                   </div>
                  </div>
                 </div>
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
  );
};

export default SearchJobs;
