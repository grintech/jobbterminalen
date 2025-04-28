import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuthContext } from "../store/authContext";
import HomeBanners from "./HomeBanners";
// import ApplyPopup from './ApplyPopup';
import { ToastContainer, toast } from "react-toastify";

const JobDetail = () => {
  const { slug } = useParams(); // Capture the slug from the URL
  const [jobDetails, setJobDetails] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const text = jobDetails?.description || "";

  const navigate = useNavigate();
  // Check if the text is long enough to require the "Read more" button
  const isLongText = text.length > 120;

  const { user } = useAuthContext();
  const userId = user ? user.id : null;

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const getPlainText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const decodedHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const cleanHtml = (html) => {
    return html
    // Remove empty <p> tags (even if they have attributes) with &nbsp; or spaces
    .replace(/<p[^>]*>(&nbsp;|\s)*<\/p>/gi, "")
    // Remove empty <div> tags (even if they have attributes) with &nbsp; or spaces
    .replace(/<div[^>]*>(&nbsp;|\s)*<\/div>/gi, "");
  };
  

  const handleApplyClick = (jobId) => {
    if (!userId) {
      toast.error("You must be logged in to apply.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }
  };

  // Check if the job is saved
  useEffect(() => {
    const fetchSavedStatus = async () => {
      if (userId && jobDetails?.id) {
        try {
          const response = await axios.get(
            `${API_URL}/bookmarked-job-single.php?user_id=${userId}&job_id=${jobDetails.id}`,
            {
              headers: {
                Authorization: `Bearer ${bearerKey}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.data.type === "success" && response.data.data) {
            setSaved(response.data.data.status === "active");
          } else {
            console.error(
              "Failed to fetch saved status:",
              response.data.message
            );
          }
        } catch (err) {
          console.error("Error fetching saved status:", err);
        }
      }
    };

    fetchSavedStatus();
  }, [userId, jobDetails?.id]);

  const toggleSaved = async () => {
    if (!userId || !jobDetails?.id) {
      toast.error("Please login to save a job.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("job_id", jobDetails.id);

      // Optimistically update UI
      const newSavedState = !saved;
      setSaved(newSavedState);

      const response = await axios.post(
        `${API_URL}/bookmark-jobs.php`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.type === "success") {
        toast.success(newSavedState ? "Job Saved" : "Job Unsaved");

        // Update global savedJobs list
        setSavedJobs((prevJobs) => {
          return newSavedState
            ? [...prevJobs, jobDetails] // Add job if saving
            : prevJobs.filter((job) => job.id !== jobDetails.id); // Remove job if unsaving
        });
      } else {
        toast.error(response.data.message);
        setSaved(!newSavedState); // Revert UI state if API fails
      }
    } catch (err) {
      console.error("Error while toggling saved job:", err);
      toast.error("Error while saving job.");
      setSaved(!saved); // Revert UI state on error
    }
  };

  // const calculateTimeAgo = (date) => {

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


  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/job_single.php`, {
          params: { slug },
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.type === "success") {
          setJobDetails(response.data.data);
          console.log(response.data.data);
          // setDecodedHtml = decodeHtml(response.data.data.description);
        } else {
          setError("Job details not found. Please try later");
        }
      } catch (err) {
        setError("An error occurred while fetching the job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [slug]);

  const [bannerPlace, setBannerPlace] = useState("");

  useEffect(() => {
    const fetchBannerPlace = async () => {
      try {
        const response = await axios.get(`${API_URL}/banner-ads.php`, {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        });

        // console.log("Raw Banner Response:", response.data);

        // If response is a string, try parsing it correctly
        let parsedData;
        try {
          parsedData = JSON.parse(response.data);
        } catch (error) {
          const splitResponse = response.data
            .split("}{")
            .map((item, index, array) => {
              if (index === 0) return item + "}";
              if (index === array.length - 1) return "{" + item;
              return "{" + item + "}";
            });

          parsedData = splitResponse.map((item) => JSON.parse(item));
        }

        // Ensure we have an array of banners
        const formattedArray = Array.isArray(parsedData)
          ? parsedData
          : [parsedData];

        if (formattedArray.length > 0 && formattedArray[0].data) {
          setBannerPlace(formattedArray[0].data.placement);
          // console.log("Banner Placement:", formattedArray[0].data.placement);
        } else {
          console.warn("No valid banner data received.");
        }
      } catch (error) {
        console.error("Error fetching HomeBanners data:", error);
      }
    };

    fetchBannerPlace();
  }, []);

  useEffect(() => {
    const fetchSimilarJobs = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/similar-jobs.php?slug=${slug}`,
          {
            headers: {
              Authorization: `Bearer ${bearerKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        // console.log("API Response:", response.data);

        if (response.data.type === "success") {
          setSimilarJobs(response.data.similar_jobs || []);
          console.log(
            "First Similar Job ID:",
            response.data.similar_jobs[0]?.status
          );
        }
      } catch (error) {
        console.error("Error fetching similar jobs:", error);
      }
    };

    fetchSimilarJobs();
  }, [slug]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `${API_URL}/bookmarked-jobs-list.php?user_id=${userId}`,
            {
              headers: {
                Authorization: `Bearer ${bearerKey}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (
            response.data.type === "success" &&
            Array.isArray(response.data.saved_jobs)
          ) {
            setSavedJobs(response.data.saved_jobs); // List of saved jobs
          } else {
            console.error(
              "Failed to fetch saved jobs or invalid data:",
              response.data.message
            );
            setSavedJobs([]); // Set to empty array if the data is invalid
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
    return (
      Array.isArray(savedJobs) &&
      savedJobs.some((savedJob) => savedJob.id === jobId)
    );
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

      const response = await axios.post(
        `${API_URL}/bookmark-jobs.php`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
      <div className="job_details">
        <Navbar />
        {loading ? (
          <div className="container top_pad d-flex flex-column justify-content-center align-items-center">
            <div className="loading-screen d-flex flex-column justify-content-center align-items-center ">
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Fetching details...</p>
            </div>
          </div>
        ) : error ? (
          <div className="container top_pad">
            <div className="msg_card  mb-4">
              <div className="card border-0 shadow">
                <div className="card-body text-center p-4">
                  <img
                    loading="lazy"
                    className="job_search"
                    src="/images/no-job.png"
                    alt="job_search"
                  />
                  <h6 className="text-theme">{error}</h6>
                </div>
              </div>
            </div>
          </div>
        ) : jobDetails ? (
          <>
            <div className="hero_banner company_banner d-flex flex-column align-items-center justify-content-center position-relative">
              <h1 className="fw-bold position-relative">
                {jobDetails?.company_name || ""}
              </h1>
            </div>

            <div className="container">
              <div className="card company_profile border-0 shadow">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div className="d-flex align-items-center py-2">
                      <div className="logo_div me-3">
                        <Link to={`/companies/${jobDetails?.company_slug}`}>
                          <img
                            loading="lazy"
                            src={`${IMG_URL}/${jobDetails.company_profile}`}
                            alt={jobDetails.company_name}
                            className="rounded"
                          />
                        </Link>
                      </div>
                      <div>
                        <h4 className="job_title text-capitalize">
                          {stripHtml(jobDetails.title)}
                        </h4>
                        <h6 className="job_company">
                          {jobDetails.company_name}
                        </h6>
                      </div>
                    </div>

                    <div className="d-flex py-2">
                      {userId ? (
                        <Link
                          to="/apply-job"
                          state={{ jobId: jobDetails.id }}
                          className="btn btn-primary"
                        >
                          
                          Apply
                        </Link>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleApplyClick(jobDetails.job_id)}
                        >
                          Apply
                        </button>
                      )}
                    </div>

                    {/* <div className="d-flex py-2">
                    {userId ? (
                        <ApplyPopup jobId={jobDetails.id}>
                          Apply
                        </ApplyPopup>
                      ) : (
                        <button className="btn btn-primary" onClick={() => handleApplyClick(jobDetails.job_id)}>
                          Apply
                        </button>
                      )}
                    </div> */}
                  </div>

                  <div className="job_details mt-2">
                    <ul className="p-0 d-flex flex-wrap align-items-center m-0">
                      {/* <li className="d-flex align-items-center pe-2 me-2 border-end mb-2">
                        <span className="fw-bold me-1">Experience : </span>
                        <span>{jobDetails.experience_required} Yrs</span>
                      </li> */}

                      { jobDetails.experience_required === "0" ? (
                         <li className="d-flex align-items-center pe-2 me-2 border-end mb-2">
                         <span className="fw-bold me-1">Experience : </span>
                         <span>Fresher</span>
                        </li>
                      ) : (
                        <li className="d-flex align-items-center pe-2 me-2 border-end mb-2">
                        <span className="fw-bold me-1">Experience : </span>
                        <span>{jobDetails.experience_required} Yrs</span>
                        </li>
                       )}

                      <li className="d-flex align-items-baseline pe-2 me-2 mb-2">
                        <span className="fw-bold me-1">
                          {jobDetails.salary_currency || "Not Specified"} :
                        </span>
                        <span>
                          {jobDetails.salary_range || "Not Specified"}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="job_details mt-2">
                    <ul className="p-0 d-flex flex-wrap align-items-center m-0">
                      <li className="d-flex align-items-baseline pe-2 me-2 mb-2">
                        {/* <i className="fa-solid fa-location-dot me-1"></i> */}
                        <span className="text-capitalize">
                          <b className="me-1" >Location :</b> {jobDetails.job_location || "Not Specified"}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <hr />

                  <div className="d-flex flex-wrap justify-content-between align-items-center">
                   <div className="py-1" >
                    <span className="days border-end me-2 pe-2 d-inline-flex">
                      <b className="me-1">Posted :</b>  {calculateTimeAgo(jobDetails.created_at)}
                      </span>
                      <span className="days ">
                      <b className="me-1">Openings :</b>  {jobDetails.total_vacancies}
                      </span>
                   </div>
                    <div className="py-1">
                      <button
                        onClick={toggleSaved}
                        className={`btn btn-light btn-sm me-2 ${
                          saved ? "btn-primary" : ""
                        }`}
                        title={saved ? "Click to unsave" : "Click to save"}
                      >
                        <i
                          className={`fa-bookmark me-1 ${
                            saved ? "fa-solid" : "fa-regular"
                          }`}
                        ></i>
                        {saved ? "Saved" : "Save"}
                      </button>
                      <button className="btn btn-light btn-sm me-2">
                        <i className="fa-solid fa-share me-1"></i>Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container pt-5">
              <div className="row py-3">
               {/*Hidden Section */}
                <div className="col-lg-4 mb-4 mb-lg-0 d-none">
                  <div className="card_sticky">
                    <div className="card company_list_card mb-4">
                      <div className="card-body px-4 py-4">
                        <div className="logo_div">
                          <Link to={`/companies/${jobDetails?.company_slug}`}>
                            <img
                              loading="lazy"
                              src={`${IMG_URL}/${jobDetails.company_profile}`}
                              alt="Company Logo"
                            />
                          </Link>
                        </div>
                        <div className="d-flex align-items-center justify-content-between py-2">
                          <Link to={`/companies/${jobDetails.companies_slug}`}>
                            <h4 className="job_title">
                              {jobDetails.company_name}
                            </h4>
                          </Link>
                        </div>
                        <p
                          className="company_about"
                          dangerouslySetInnerHTML={{
                            __html: jobDetails.company_about,
                          }}
                        ></p>
                        <div className="d-flex align-items-center text-muted mt-3">
                          <i className="fa-solid fa-location-dot me-1"></i>
                          <span>{jobDetails.company_address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="jobs_sidebar">
                    {bannerPlace === "jobs_sidebar" && <HomeBanners />}
                  </div>
                </div>

                {/* Job Details Section */}
                <div className="col-lg-8 mb-4 mb-lg-0">
                  <div className="card job_list_card mb-4">
                    <div className="card-body">
                      <div className="container job-description">
                        <h5 className="job_company">Job Description:</h5>
                        {/* <div>
                          <p
                            className={`job-description-text ${
                              expanded ? "expanded" : ""
                            }`}
                            dangerouslySetInnerHTML={{
                              __html: getPlainText(stripHtml(text)),
                            }}
                          ></p>

                          {isLongText && (
                            <button
                              onClick={() => setExpanded(!expanded)}
                              className="read-more-btn"
                            >
                              {expanded ? "Read less" : "Read more"}
                            </button>
                          )}
                        </div> */}

                        <div 
                          className="job-requirements mt-3"
                          dangerouslySetInnerHTML={{ __html: cleanHtml(decodedHtml(text))}}
                        />
                       </div>

                      <div className="card-body key_skills m-0">
                        {jobDetails.skills ? (
                          <>
                           <h5> Skills</h5>
                           <ul className="d-flex flex-wrap p-0 m-0">
                            {jobDetails.skills
                              .split(",")
                              .map((skill, index) => (
                                <li
                                  className="mb-2 text-capitalize"
                                  key={index}
                                >
                                  {skill.trim()}
                                </li>
                              ))}
                           </ul>
                          </>
                        ) : (
                        <p className="m-0"><b className="me-1">Skills :</b>No skills are listed for this job.</p>

                        )}
                      
                         <div className=" job-details mt-3">
                          <p className="text-capitalize">
                            <b className="me-1">Role:</b>{ stripHtml(jobDetails.title)}
                          </p>
                          <p className="text-capitalize">
                          <b className="me-1">Industry Type:</b>{stripHtml(jobDetails.company_industry)}
                          </p>

                          <p className="text-capitalize">
                            <b className="me-1">Employment Type:</b>{stripHtml(jobDetails.job_type)}
                          </p>

                          {jobDetails.parent_category_name && (                      
                            <p>
                              <b className="me-1">
                                Category:</b>{jobDetails.parent_category_name} 
                            </p>
                          )}
                         </div>                  

                      </div>
                    </div>
                  </div>

                  {/* <div className="card job_list_card mb-4">
                    <div className="card-body">
                      <div className="container job-details">
                        <strong>Role: </strong>
                        <p>{jobDetails.title}</p>
                        <strong>Industry Type: </strong>
                        <p className="text-capitalize">
                          {jobDetails.company_industry}
                        </p>
                        <strong>Employment Type: </strong>
                        <p className="text-capitalize">{jobDetails.job_type}</p>
                        {jobDetails.parent_category_name && (
                          <div>
                            <strong>Category: </strong>
                            <p>{jobDetails.parent_category_name}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="card job_list_card mb-4">
                    <div className="card-body key_skills">
                      <h4>Key Skills</h4>
                      {jobDetails.skills ? (
                        <ul className="d-flex flex-wrap">
                          {jobDetails.skills.split(',').map((skill, index) => (
                            <li className="mb-2 text-capitalize" key={index}>
                              {skill.trim()}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No key skills listed for this job.</p>
                      )}
                    </div>
                  </div> */}

                  <div className="card job_list_card mb-4">
                    <div className="card-body">
                      <div className="container job-details">
                        {/* <p>Please share your details in the form below.</p> */}
                        <h5 className="fw-semibold">Contact Details:</h5>

                        {jobDetails.job_email && (
                          <p className="mb-2">
                            <Link
                              className="text-theme"
                              to={`mailto:${jobDetails.job_email}`}
                              rel="noopener noreferrer"
                            >
                              <i className="fa-regular fa-envelope me-2"></i>
                              {jobDetails.job_email}
                            </Link>
                          </p>
                        )}

                        {jobDetails.whatsapp && (
                          <p className="mb-2">
                            <Link
                              className="text-theme"
                              to={`https://wa.me/${jobDetails.whatsapp}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa-brands fa-whatsapp me-2"></i>
                              {jobDetails.whatsapp}
                            </Link>
                          </p>
                        )}

                        <p className="mb-2">
                          <strong>Thanks & Regards,</strong>
                        </p>

                        {jobDetails.username && (
                          <p className="m-0">
                            <strong>{jobDetails.username}</strong>
                          </p>
                        )}

                      </div>
                    </div>
                  </div>
                           
                </div>
                
                 {/* Sidebar Section */}
                <div className="col-lg-4 mb-4">
                  <div className="card_sticky">
                   <h4 className="mb-3 text-start">Similar jobs</h4>
                   <div className="row">
                    {similarJobs.length > 0 ? (
                      similarJobs.map((job) => (
                        <div
                          className="col-sm-6 col-lg-12 mb-4"
                          key={job.id}
                        >
                          <div className="card company_list_card h-100">
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <Link to={`/companies/${job.company_slug}`}>
                                  <div className="logo_div border-0 shadow">
                                    <img
                                      loading="lazy"
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
                                      className={`fa-bookmark ${
                                        isJobSaved(job.id)
                                          ? "fa-solid"
                                          : "fa-regular"
                                      }`}
                                    ></i>
                                  </button>
                                  <Link className="btn-light shadow me-2">
                                    <i className="fa-solid fa-share"></i>
                                  </Link>
                                </div>
                              </div>

                              <div className="py-2">
                                <Link to={`/companies/${job.company_slug}`}>
                                  <h5 className="py-2 m-0">
                                    {stripHtml(job.company_name)}
                                  </h5>
                                </Link>
                                <Link to={`/jobs/${job.slug}`}>
                                  <h6 className="m-0">
                                    {stripHtml(job.title)}
                                  </h6>
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
                                    <span>Salary -</span> {job.salary_range}
                                    {job.salary_currency}
                                  </div>
                                </li>
                                <li>
                                  <div className="btn btn-sm btn-green me-2 mb-2 text-capitalize">
                                    <span>Experience -</span>
                                    {job.experience_required}
                                  </div>
                                </li>
                                {job.city && (
                                  <li>
                                    <div className="btn btn-sm btn-green me-2 mb-2 text-start text-capitalize">
                                      <i className="fa-solid fa-location-dot"></i>
                                      {job.city}
                                    </div>
                                  </li>
                                )}
                              </ul>

                              <p className="text-muted m-0">
                                <small className="badge text-bg-light">
                                  {calculateTimeAgo(job.created_at)}
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="msg_card">
                        <div className="card shadow">
                          <div className="card-body text-center p-4">
                            <img
                              className="job_search"
                              src="/images/no-job.png"
                              alt="job_search"
                            />
                            <h6 className="text-theme m-0">
                              No similar jobs found.
                            </h6>
                          </div>
                        </div>
                      </div>
                    )}
                   </div>
                  </div>
                </div>

              </div>
            </div>
          </>
        ) : (
          <div className="container top_pad">
            <div className="msg_card  mb-4">
              <div className="card border-0 shadow">
                <div className="card-body text-center p-4">
                  <img
                    loading="lazy"
                    className="job_search"
                    src="/images/no-job.png"
                    alt="job_search"
                  />
                  <h6 className="text-theme m-0">
                    No details found. Please try later
                  </h6>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* {!loading && <Footer />} */}
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

export default JobDetail;