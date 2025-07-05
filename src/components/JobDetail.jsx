import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuthContext } from "../store/authContext";
import { ToastContainer, toast } from "react-toastify";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Avatar from "react-avatar";
import { useTranslation } from "react-i18next";

const JobDetail = () => {
  const { slug } = useParams(); // Capture the slug from the URL
  const {t} = useTranslation();
  const [jobDetails, setJobDetails] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  const [visible, setVisible] = useState(false);
  const buttonRef = useRef(null);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If clicked outside both button and container
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);

  const text = jobDetails?.description || "";

  const navigate = useNavigate();
  // Check if the text is long enough to require the "Read more" button
  // const isLongText = text.length > 120;

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
  
  const [showToggle, setShowToggle] = useState(false);
  const contentRef = useRef(null);
  const plainText = cleanHtml(decodedHtml(text)).replace(/<[^>]+>/g, '');

  useEffect(() => {
    // Check length of plain text OR use height-based detection
    if (plainText.length > 250) {
      setShowToggle(true);
    }
  }, [plainText]);


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
            // console.error( "Failed to fetch saved status:", response.data.message );
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


  // const calculateTimeAgo = (timestamp) => {
  //   if (!timestamp) return "";
  
  //   const now = new Date();
  //   const past = new Date(timestamp.replace(" ", "T"));
  //   const secondsPast = Math.floor((now - past) / 1000);
  
  //   const years = Math.floor(secondsPast / 31536000); // 60 * 60 * 24 * 365
  //   const months = Math.floor((secondsPast % 31536000) / 2592000); // 60 * 60 * 24 * 30
  //   const days = Math.floor((secondsPast % 2592000) / 86400); // 60 * 60 * 24
  //   const hours = Math.floor((secondsPast % 86400) / 3600); // 60 * 60
  //   const minutes = Math.floor((secondsPast % 3600) / 60);
  
  //   // Display logic based on time difference
  //   if (secondsPast < 60) {
  //     return `${secondsPast} sec${secondsPast !== 1 ? "s" : ""} ago`;
  //   }
  
  //   if (secondsPast < 3600) {
  //     return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
  //   }
  
  //   if (secondsPast < 86400) {
  //     return `${hours} hr${hours !== 1 ? "s" : ""} ago`;
  //   }
  
  //   if (secondsPast < 2592000) {  // 30 days
  //     return `${days} day${days !== 1 ? "s" : ""} ago`;
  //   }
  
  //   if (years > 0) {
  //     return `${years} year${years !== 1 ? "s" : ""} ${months > 0 ? `${months} month${months !== 1 ? "s" : ""}` : ""} ${days > 0 ? `${days} day${days !== 1 ? "s" : ""}` : ""} ago`;
  //   }
  
  //   if (months > 0) {
  //     return `${months} month${months !== 1 ? "s" : ""} ${days > 0 ? `${days} day${days !== 1 ? "s" : ""}` : ""} ago`;
  //   }
  
  //   return `${days} day${days !== 1 ? "s" : ""} ago`;
  // }

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
  

  const shareOnPlatform = (platform) => {
    const jobUrl = window.location.href; // gets current job detail page URL
    let shareUrl = '';
  
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(jobUrl)}&text=Check out this job!`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=Check out this job: ${encodeURIComponent(jobUrl)}`;
        break;
      default:
        break;
    }
  
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Job link copied to clipboard!');
  };
  
  // Fetching job details based on the slug

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
          // console.log(response.data.data);
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

// Apply button functionality

   const handleApplyClick = () => {
    if (!userId) {
      toast.error("You must be logged in to apply.");
      setTimeout(() => {
        navigate("/login", {
          state: { from: location.pathname }, 
        });
      }, 1500);
      return;
    }

    // If user is logged in
    if (jobDetails?.apply_redirect && jobDetails?.show_apply_link == "1") {
      window.open(jobDetails.apply_redirect, "_blank"); // or just `window.location.href = ...` for same tab
    } else {
      navigate("/apply-job", {
        state: { jobId: jobDetails.id },
      });
    }
  };


  // Fetch similar jobs based on the slug
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
          // console.log(
          //   "First Similar Job ID:",
          //   response.data.similar_jobs[0]?.status
          // );
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
      setTimeout(() => {
        navigate("/login");
      }, 2000);
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
             
            </div>
            <div className="container pt-0 pt-lg-2">
              <div className="row py-4">                        
                {/* Job Details Section */}
                <div className="col-lg-8 mb-4 mb-lg-0">
                

                  <div className="card company_profile mt-0 border-0 shadow mb-3">
                    <div className="card-body">
                      <div className="d-flex align-items-start justify-content-between ">
                        <div className="d-flex align-items-center flex-wrap py-2">
                          <div className="logo_div me-3">
                            <Link to={`/companies/${jobDetails?.company_slug}`}>
                              {!jobDetails.company_profile ? (
                                <Avatar
                                  name={jobDetails.company_name}
                                  size="80"
                                  round="8px"
                                  fgColor="#fff"
                                  textSizeRatio={2}
                                />
                                ) : (
                                <img
                                  src={`${IMG_URL}/${jobDetails.company_profile}`}
                                  alt={jobDetails.company_name}
                                  className="rounded"
                                />
                              )}
                            </Link>
                          </div>
                          <div>
                          
                            <h6 className="job_company text-secondary mt-2">
                              <Link to={`/companies/${jobDetails?.company_slug}`}>
                                 {jobDetails.company_name}
                              </Link>
                            </h6>
                            <h4 className="job_title text-capitalize">
                              {stripHtml(jobDetails.title)}
                            </h4>
                          </div>
                        </div>

                        <div className="d-flex py-2">
                          <button className="btn btn-primary" onClick={handleApplyClick}>
                            {t("Apply")}
                          </button>
                        </div>
                        
                      </div>

                      <div className="job_details mt-2">
                        <ul className="p-0 d-flex flex-wrap align-items-center m-0">
                          {/* <li className="d-flex align-items-center pe-2 me-2 border-end mb-2">
                            <span className="fw-bold me-1">Experience : </span>
                            <span>{jobDetails.experience_required} Yrs</span>
                          </li> */}

                          {jobDetails.experience_required !== '' && (
                            jobDetails.experience_required === '0' ? (
                              <li className="d-flex align-items-center pe-2 mb-2">
                                <span className="fw-bold me-1">{t("Experience")}</span>
                                <span>Fresher</span>
                              </li>
                            ) : (
                              <li className="d-flex align-items-center pe-2 mb-2">
                                <span className="fw-bold me-1">{t("Experience")}</span>
                                <span>{jobDetails.experience_required} Yrs</span>
                              </li>
                            )
                          )}


                          {jobDetails.salary_currency && jobDetails.salary_range && jobDetails.hourly_rate && (
                            <li className="d-flex align-items-baseline border-start ps-2 me-2 mb-2">
                              <span className="fw-bold me-1">
                                {jobDetails.salary_currency || "Not Specified"} :
                              </span>
                              <span>
                                {jobDetails.salary_range || "Not Specified"}
                              </span>
                              <small className="ms-1">
                                /{jobDetails.hourly_rate || "Not Specified"}
                              </small>
                            </li>
                          )}

                        </ul>
                      </div>

              <div className="job_details">
              <ul className="p-0 d-flex flex-wrap align-items-center m-0">
                <li className="d-flex align-items-baseline pe-2 me-2 mb-2">
                  <p className="text-capitalize m-0">
                    <i className="fa-solid fa-location-dot me-1"></i>
                    {jobDetails.job_type && (jobDetails.remote_type || jobDetails.city) ? (
                      <>
                        <span>{jobDetails.job_type.replace(/-/g, " ")}</span>
                        <span className="ms-1">
                          (
                          {jobDetails.remote_type === "static Location" ||
                          jobDetails.remote_type === "static location"
                            ? jobDetails.city || "Not Specified"
                            : jobDetails.remote_type?.trim() === "" && jobDetails.city
                            ? jobDetails.city
                            : jobDetails.remote_type || "Not Specified"}
                          )
                        </span>
                      </>
                    ) : (
                      <span>Not Specified</span>
                    )}
                  </p>
                </li>
              </ul>
            </div>


                      <hr className="my-2" />
                    <div className="position-relative">
                      <div className="d-flex flex-wrap justify-content-between align-items-center">
                      <div className="py-1" >
                        <span className="days  pe-2 d-inline-flex align-items-center">
                          <b className="me-1">{t("Posted")}</b>  <span className="badge text-dark btn-light">{calculateTimeAgo(jobDetails.created_at)}</span>
                          </span>
                          { jobDetails.total_vacancies > 0 && (
                            <span className="days border-start ps-2">
                            <b className="me-1">{t("Vacancies")}</b>  <Link to={`/companies/${jobDetails?.company_slug}`}>{jobDetails.total_vacancies}</Link>
                            </span>
                          )}
                      </div>
                        <div className="py-1">
                          <button
                            onClick={toggleSaved}
                            // className={`btn btn-light btn-sm me-2 `}
                            className={`btn btn-light btn-sm me-2 `}
                            title={saved ? "Click to unsave" : "Click to save"}
                          >
                            <i
                              className={`fa-heart me-1 ${
                                saved ? "fa-solid" : "fa-regular"
                              }`}
                            ></i>
                            {saved ? t("Saved") : t("Save")}
                          </button>
                          <button ref={buttonRef} 
                          className="btn btn-light btn-sm " 
                          onClick={() => setVisible((prev) => !prev)}
                          >
                            <i className="fa-solid fa-share me-1"></i>{t("Share")}
                          </button>
                        </div>
                      </div>
                      {visible && (
                        <div ref={containerRef} className="social_icons_container">
                        <div className="modal-body p-3">
                          
                          <div className="d-flex flex-wrap justify-content-between social_links mt-2">
                            <button className="btn btn-sm btn-primary mx-1 mb-2" onClick={() => shareOnPlatform('facebook')}>
                              <i className="fa-brands fa-facebook"></i>
                            </button>
                            <button className="btn btn-sm btn-primary mx-1 mb-2" onClick={() => shareOnPlatform('twitter')}>
                              <i className="fa-brands fa-twitter"></i>
                            </button>
                            <button className="btn btn-sm btn-primary mx-1 mb-2" onClick={() => shareOnPlatform('linkedin')}>
                              <i className="fa-brands fa-linkedin"></i>
                            </button>
                            <button className="btn btn-sm btn-primary mx-1 mb-2" onClick={() => shareOnPlatform('whatsapp')}>
                              <i className="fa-brands fa-whatsapp"></i>
                            </button>
                            <button className="btn btn-sm btn-primary mx-1 mb-2" onClick={() => copyToClipboard()}>
                              <i className="fa-solid fa-link"></i> 
                            </button>
                          </div>
                        </div>
                        </div>
                      )}
                      </div>         
                    </div>
                  </div>

                  <div className="card job_list_card mb-4">
                    <div className="card-body">
                      <div className="container ">
                        <div className="job-description">
                          <div className="d-flex justify-content-between align-items-center">
                           <h5 className="job_company m-0">{t("JobDescription")}</h5>
                          
                          </div>
                        
                         <div>
                            <div
                              ref={contentRef}
                              className={`job-requirements mt-3 ${expanded ? '' : 'clamped'}`}
                              dangerouslySetInnerHTML={{ __html: cleanHtml(decodedHtml(text)) }}
                            />
                            {showToggle && (
                              <Link
                                style={{textDecoration:"underline"}}
                                onClick={() => setExpanded(!expanded)}
                                className="text-theme fw-semibold mt-2 text-underline"
                              >
                                {/* {expanded ? 'Read less' : 'Read more'} */}
                                {expanded ? (
                                   <> 
                                   {t("ReadLess")} <FaChevronUp style={{fontSize:"13px"}} />
                                   </>) : 
                                  (
                                   <>
                                  {t("ReadMore")} <FaChevronDown style={{fontSize:"13px"}} /></>
                                  )}

                              </Link>
                            )}
                          </div>

                        </div>
                       </div>
                                        

                      <div className="card-body key_skills m-0">
                        {jobDetails.skills ? (
                          <>
                           <h5>{t("Skills")}</h5>
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
                        <p className="m-0"><b className="me-1">{t("Skills")} : </b>No skills are listed for this job.</p>

                        )}
                      
                         <div className=" job-details mt-3">
                         {jobDetails.title && (
                          <p className="text-capitalize">
                            <b className="me-1">{t("Role")}</b>{stripHtml(jobDetails.title)}
                          </p>
                         )}
                          {jobDetails.company_industry && (
                            <p className="text-capitalize">
                            <b className="me-1">{t("IndustryType")}</b>{jobDetails.company_industry.replace(/-/g, ' ')}
                            </p>
                          )}

                        {jobDetails.job_type && (
                          <p className="text-capitalize">
                            <b className="me-1">{t("EmploymentType")}</b>{jobDetails.job_type.replace(/-/g, ' ')}
                          </p>
                        )}

                           {jobDetails.parent_category_name && (                      
                            <p>
                              <b className="me-1">
                                {t("Category")}</b>{jobDetails.parent_category_name} 
                            </p>
                          )}


                           {jobDetails.linkedin_Url && (
                           <p className="mb-2">
                             <Link
                               className="text-theme"
                               to={jobDetails.linkedin_Url}
                               target="_blank"
                               rel="noopener noreferrer"
                             >
                               <i className="fa-brands fa-linkedin me-2"></i>
                               {jobDetails.linkedin_Url}
                             </Link>
                           </p>
                         )}

                        {jobDetails.website && (
                           <p className="mb-2">
                             <Link
                               className="text-theme"
                               to={jobDetails.website}
                               target="_blank"
                               rel="noopener noreferrer"
                             >
                               <i className="fa-solid fa-globe me-2"></i>
                               {jobDetails.website}
                             </Link>
                           </p>
                         )}
 

                         
                         </div>                  

                      </div>
                    </div>
                  </div>
              
                  { jobDetails.show_contact_details === 1 && (
                      <div className="card job_list_card mb-4">
                      <div className="card-body">
                        <div className="container job-details">
                          <h5 className="fw-semibold">{t("ContactDetails")}</h5>
  
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

                          
                          {/* <p className="mb-2">
                            <strong>{t("ThanksRegards")}</strong>
                          </p> */}
  
                          {jobDetails.contact_name && (
                            <p className="m-0 text-capitalize">
                              <strong>{jobDetails.contact_name}</strong>
                            </p>
                          )}
  
                        </div>
                      </div>
                      </div>
                  ) }
                 
                           
                </div>
                
                 {/* Sidebar Section */}
                <div className="col-lg-4 mb-4">
                  <div className="card_sticky">
                   <h4 className="mb-3 text-center">{t("SimilarJobs")}</h4>
                   <div className="row">
                    {similarJobs.length > 0 ? (
                      similarJobs.slice(0,3).map((job) => (
                        <div
                          className="col-sm-6 col-lg-12 mb-4"
                          key={job.id}
                        >
                          <div className="card company_list_card h-100">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-start">
                                <Link to={`/companies/${job.company_slug}`}>
                                  <div className="logo_div border-0 shadow">
                                    {/* <img
                                      loading="lazy"
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
                                    // className={`btn-light border-0 shadow me-2 `}
                                    className={`save_post me-2 `}
                                    onClick={() => toggleSavedJob(job.id)}

                                    title={ isJobSaved(job.id) ? "Click to unsave" : "Click to save"}
                                  >
                                    <i
                                      className={`fa-heart ${
                                        isJobSaved(job.id)
                                          ? "fa-solid"
                                          : "fa-regular"
                                      }`}
                                    ></i>
                                  </button>
                                 
                                </div>
                              </div>

                              <div className="">
                                {/* <Link to={`/companies/${job.company_slug}`}>
                                  <h5 className="py-2 m-0">
                                    {stripHtml(job.company_name)}
                                  </h5>
                                </Link> */}
                                <Link to={`/jobs/${job.slug}`}>
                                  <h6 className=" mt-2 m-0 text-capitalize">
                                    {stripHtml(job.title)}
                                  </h6>
                                </Link>
                              </div>

                              {/* <p className="main_desc">{job.company_tagline}</p> */}

                              <ul className="p-0 d-flex flex-wrap mt-2 m-0">
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
                                       {job.salary_currency} {job.salary_range}<small className="ms-1">/ {job.hourly_rate}</small>
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
                        <div className="card ">
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