import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useAuthContext } from "../store/authContext"; // Assuming you have authContext for user

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
                    <p className="mt-2">Fetching data...</p>
                  </div>
                ) : error ? (
                  <div className="text-center text-danger">
                    <p>{error}</p>
                  </div>
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
                            <li>
                              <div className="btn btn-sm btn-green me-2 mb-2 text-capitalize">
                                <span>Experience -</span>&nbsp;&nbsp; {job.experience_required}
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
    </>
  );
};

export default CategoryList;
