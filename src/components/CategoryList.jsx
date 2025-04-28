import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useAuthContext } from "../store/authContext"; // Assuming you have authContext for user
import { Helmet } from "react-helmet-async";

const CategoryList = () => {
  const { slug } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]); // Track saved jobs
  const [loginAlert, setLoginAlert]= useState('')
  const { user } = useAuthContext();
  const userId = user ? user.id : null;

  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  // const calculateTimeAgo = (date) => {
  //   // Convert the input date to the correct UTC format (ISO string)
  //   const utcZero = date.replace(" ", "T") + "Z"; // Ensure it's in ISO format with a 'Z' for UTC
    
  //   const localDate = new Date(utcZero);

  //   const now = new Date();

  //   const diffTime = now - localDate;

  //   const diffHours = Math.floor(diffTime / (1000 * 60 * 60)); 

  //   if (diffHours < 24) {
  //     return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  //   }

  //   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  //   return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  // };

  // const calculateTimeAgo = (timestamp) => {
  //   if (!timestamp) return "";
  
  //   const now = new Date();
  //   const past = new Date(timestamp.replace(" ", "T"));
  //   const secondsPast = Math.floor((now - past) / 1000);
  
  //   if (secondsPast < 60) return `${secondsPast} sec${secondsPast !== 1 ? "s" : ""} ago`;
  //   if (secondsPast < 3600) return `${Math.floor(secondsPast / 60)} min${secondsPast / 60 !== 1 ? "s" : ""} ago`;
  //   if (secondsPast < 86400) return `${Math.floor(secondsPast / 3600)} hr${secondsPast / 3600 !== 1 ? "s" : ""} ago`;
  //   if (secondsPast < 2592000) return `${Math.floor(secondsPast / 86400)} day${secondsPast / 86400 !== 1 ? "s" : ""} ago`;
  //   if (secondsPast < 31536000) return `${Math.floor(secondsPast / 2592000)} month${secondsPast / 2592000 !== 1 ? "s" : ""} ago`;
  
  //   return `${Math.floor(secondsPast / 31536000)} year${secondsPast / 31536000 !== 1 ? "s" : ""} ago`;
  // }

  const calculateTimeAgo = (timestamp) => {
    if (!timestamp) return "";
  
    const now = new Date();
    const past = new Date(timestamp.replace(" ", "T"));
    const secondsPast = Math.floor((now - past) / 1000);
  
    const years = Math.floor(secondsPast / 31536000); // 60 * 60 * 24 * 365
    const months = Math.floor((secondsPast % 31536000) / 2592000); // 60 * 60 * 24 * 30
    const days = Math.floor((secondsPast % 2592000) / 86400); // 60 * 60 * 24
    const hours = Math.floor((secondsPast % 86400) / 3600); // 60 * 60
    const minutes = Math.floor((secondsPast % 3600) / 60);
  
    // Display logic based on time difference
    if (secondsPast < 60) {
      return `${secondsPast} sec${secondsPast !== 1 ? "s" : ""} ago`;
    }
  
    if (secondsPast < 3600) {
      return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
    }
  
    if (secondsPast < 86400) {
      return `${hours} hr${hours !== 1 ? "s" : ""} ago`;
    }
  
    if (secondsPast < 2592000) {  // 30 days
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  
    if (years > 0) {
      return `${years} year${years !== 1 ? "s" : ""} ${months > 0 ? `${months} month${months !== 1 ? "s" : ""}` : ""} ${days > 0 ? `${days} day${days !== 1 ? "s" : ""}` : ""} ago`;
    }
  
    if (months > 0) {
      return `${months} month${months !== 1 ? "s" : ""} ${days > 0 ? `${days} day${days !== 1 ? "s" : ""}` : ""} ago`;
    }
  
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  // Fetch category data
  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`${API_URL}/get_categories.php?slug=${slug}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
        },
      })
      .then((response) => {
        if (response.data.type === "success") {
          setCategoryData(response.data.jobs);
        } else {
          setError("No categories found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching category data:", err);
        setError("Failed to load categories.");
        setLoading(false);
      });
  }, [slug]);

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
            setSavedJobs(response.data.saved_jobs); // List of saved jobs
          } else {
            console.error("Failed to fetch saved jobs or invalid data:", response.data.message);
            setSavedJobs([]);  // Set to empty array if the data is invalid
          }
        } catch (err) {
          console.error("Error fetching saved jobs:", err);
          setSavedJobs([]); // In case of error, ensure it's an empty array
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
            return prevSavedJobs.filter((job) => job.id !== jobId); // Remove the job if already saved
          } else {
            return [...prevSavedJobs, { id: jobId }]; // Add the job if not saved
          }
        });
      } else {
        console.error("Failed to toggle saved job:", response.data.message);
        toast.error(`${response.data.message}`);
      }
    } catch (err) {
      console.error("Error while toggling saved job:", err);
      toast.error("Error while saving job.", err);
    }
  };
  

  return (
    <>
      <Helmet>
        
      </Helmet>
      <div>
        <Navbar />
        
        <div className="category_listing py-5">
          <div className="container top_pad">
              {loginAlert && (
              <div className="d-flex">
                  <div className="alert alert-danger alert-dismissible fade show w-25" role="alert">
                  Please login to save jobs.
                </div>
              </div>
              )}
            <div className="row">
              <div className="col-lg-3 mb-5 mb-lg-0">
                <div className="card_sticky">
                  <div className="card all_cat_filters">
                    <div className="card-body">
                      <h5>All Filters</h5>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-9">
                <div className="row">
                  {loading ? (
                    <div className="loading-screen d-flex flex-column justify-content-center align-items-center">
                      <div className="spinner-grow text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-2">Fetching categories...</p>
                    </div>
                  ) : error ? (
                    <>
                    <div className="msg_card">
                    <div className="card border-0 shadow">
                      <div className="card-body text-center p-4">
                      <img className="job_search" src="/images/no-job.png" alt="job_search" />
                      <h6 className="text-theme">No categories found at the moment. Please try later.</h6>
                    </div>
                    </div>
                    </div>
                </>
                  ) : (
                    categoryData.map((job) => (
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

                              {/* <li>
                                <div className="btn btn-sm btn-green me-2 mb-2 text-capitalize">
                                  <span>Experience -</span>&nbsp;&nbsp; {job.experience_required}
                                </div>
                              </li> */}

                              {job.experience_required && (
                                <li>
                                  <div className="btn btn-sm btn-green me-2 mb-2 text-capitalize">
                                    {job.experience_required === "0" ? (
                                       job.experience_required === "0" ? "Fresher" : job.experience_required
                                    ) : (
                                      <>
                                       <span>Experience -</span>&nbsp;&nbsp;
                                       {job.experience_required }
                                      </>
                                    ) }
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
                    ))
                  )}
                </div>
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

export default CategoryList;
