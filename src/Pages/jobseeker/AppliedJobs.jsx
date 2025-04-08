import React, { useEffect, useState } from "react";
import Navbar from '../../components/Navbar'
import JobSidebar from './JobSidebar'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { useAuthContext } from "../../store/authContext";
import axios from 'axios';

const Appliedjobs = () => {

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const { user } = useAuthContext();
  const userId = user ? user.id : null;

  const [appliedJobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [selectedJobIndex, setSelectedJobIndex] = useState(0);
  const [similarJobs, setSimilarJobs] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          setError(null);
  
          const response = await fetch(`${API_URL}/job-applications.php?user_id=${userId}`, {
            headers: {
              Authorization: `Bearer ${bearerKey}`,
              "Content-Type": "multipart/form-data",
            },
          });
  
          const result = await response.json();

          // console.log('job count: ' + result.applications_count);
          if (result.type === "success") {
            setJobs(result.data);
            setApplicationsCount(result.applications_count);
          } else {
            setError(result.message || "Failed to fetch company data");
          }
        } catch (err) {
          setError("An error occurred while fetching company data.");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [userId]);


    useEffect(() => {
      const fetchSimilarJobs = async () => {
        const selectedJob = appliedJobs[selectedJobIndex];
        const slug = selectedJob ? selectedJob.job_slug : "";
        
        try {
          const response = await axios.get(`${API_URL}/similar-jobs.php?slug=${slug}`, {
            headers: {
              Authorization: `Bearer ${bearerKey}`,
              'Content-Type': 'application/json',
            },
          });
          console.log('selectedJobIndex :' + selectedJobIndex);
      
          if (response.data.type === 'success') {
            setSimilarJobs(response.data.similar_jobs || []);
          }
        } catch (error) {
          console.error('Error fetching similar jobs:', error);
        }
      };
      
      if (appliedJobs.length > 0) {
        fetchSimilarJobs();
      }
    }, [selectedJobIndex, appliedJobs]);


    const calculatePostedTime = (date) => {
      // Convert the input date to the correct UTC format (ISO string)
      const utcZero = date.replace(" ", "T") + "Z"; // Ensure it's in ISO format with a 'Z' for UTC
      
      // Create Date object from the UTC date and convert it to the local time zone
      const localDate = new Date(utcZero);
      const now = new Date();
      
      const diffTime = now - localDate;
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      
      if (diffHours < 24) {
        return `Application sent today`;
      } else if (diffHours < 48) {
        return `Application sent yesterday`;
      } else {
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return `Application sent ${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
      }
    };

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
    

    // if (isLoading) {
    //   return (
    //     <div className="loading-screen d-flex flex-column justify-content-center align-items-center">
    //       <div className="spinner-grow text-primary" role="status">
    //         <span className="visually-hidden">Loading...</span>
    //       </div>
    //       <p className="mt-2">Fetching data...</p>
    //     </div>
    //   );
    // }


  return (
    <>
      <Navbar />
      <div className='top_pad'>
        <div className="container pb-5">
          <div className="row mt-4">
            <div className="col-md-3 mb-4 mb-md-0">
              <JobSidebar />
            </div>
            <div className="col-md-9">
            {isLoading ? (
              <div className="loading-screen d-flex flex-column justify-content-center align-items-center">
                <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className='mt-2'>Fetching data...</p>
              </div>
            ) : error ? (
              // <p className="text-center text-theme">{error}</p>
              <div className="card  border-0 shadow">
              <div className="card-body text-center">
                <img className='job_search' src="/public/images/job_search.png" alt="job_search" style={{ width: '100px' }}  />
                {/* <h4>No jobs applied yet!</h4> */}
                <p className="text-center text-theme">{error}</p>
               
              </div>
            </div>
            ) : appliedJobs.length > 0 ? (
              <div className="jobs_applied">
              {appliedJobs.length > 0 ? (
                <>
                  <h1 className="job_head">Total Applies({applicationsCount})</h1>
                  <div className="card border-0 shadow">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-4 border-end p-0">
                          <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <ul className="p-0">
                              {appliedJobs.map((job, index) => (
                                <button
                                  key={index}
                                  className={`nav-link border-bottom ${selectedJobIndex === index ? 'active' : ''}`}
                                  onClick={() => setSelectedJobIndex(index)}
                                  type="button"
                                >
                                  <li className="text-start py-3">
                                    <div className="company_card">
                                      <h6>{job.job_title}</h6>
                                      <p className="text-secondary fw-semibold">{job.company_name}</p>
                                      <span className="border bg-white rounded-pill d-inline-flex align-items-center py-1 px-2">
                                        <i className="fa-solid fa-check-circle me-1"></i>
                                        <small>{calculatePostedTime(job.application_date)}</small>
                                      </span>
                                    </div>
                                  </li>
                                </button>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="col-lg-8">
                          <div className="tab-content" id="v-pills-tabContent">
                            {appliedJobs[selectedJobIndex] && (
                              <div className="tab-pane fade show active" id={`v-pills-${selectedJobIndex}`} role="tabpanel" aria-labelledby={`v-pills-${selectedJobIndex}-tab`} tabIndex="0">
                                <div className="card-body">
                                  <div className="border-bottom pb-3">
                                    <h5 className="text-dark">{appliedJobs[selectedJobIndex].job_title}</h5>
                                    <h6 className="text-secondary m-0">{appliedJobs[selectedJobIndex].company_name}</h6>
                                  </div>
                                  <div className="border-bottom py-3">
                                    <h5 className="text-dark">Application Status</h5>
                                    <ul className="job_status p-0">
                                      <li>
                                        <span className="me-2">Applied</span> <i className="fa-solid fa-check"></i>
                                      </li>
                                      <li>
                                        <span className="me-2">Application sent</span>
                                        <i className="fa-solid fa-check"></i>
                                      </li>

                                      <li>
                                        {appliedJobs[selectedJobIndex].status === "Applied" ? (
                                          <>
                                            <span className="me-2">Awaiting Recruiter Action</span>
                                            <i className="fa-solid fa-hourglass-start"></i>
                                          </>
                                        ) : (
                                          <>
                                            {appliedJobs[selectedJobIndex].status === "Viewed" && (
                                              <span className="text-success">
                                                We wanted to inform you that your job application has been viewed by <strong>{appliedJobs[selectedJobIndex].company_name}</strong>. Stay tuned for further updates.
                                              </span>
                                            )}
                                            {appliedJobs[selectedJobIndex].status === "Shortlisted" && (
                                              <span className="text-success">
                                                Congratulations! Your application has been shortlisted by <strong>{appliedJobs[selectedJobIndex].company_name}</strong>. Our team will contact you for the next steps.
                                              </span>
                                            )}
                                            {appliedJobs[selectedJobIndex].status === "Selected" && (
                                              <span className="text-success">
                                                Great news! You have been selected for the position at <strong>{appliedJobs[selectedJobIndex].job_title}</strong>. Please check your email for further instructions.
                                              </span>
                                            )}
                                            {appliedJobs[selectedJobIndex].status === "Rejected" && (
                                              <span className="text-danger">
                                                We appreciate your interest in <strong>{appliedJobs[selectedJobIndex].company_name}</strong>. Unfortunately, we have decided to move forward with other candidates. We encourage you to apply for future opportunities.
                                              </span>
                                            )}
                                            {appliedJobs[selectedJobIndex].status === "Cancelled" && (
                                              <span className="text-danger">
                                                Your job application at <strong>{appliedJobs[selectedJobIndex].company_name}</strong> has been cancelled as per your request. If this was an error, please contact us immediately.
                                              </span>
                                            )}
                                          </>
                                        )}
                                      </li>
                                    </ul>
                                  </div>

                                  <div className="border-bottom py-3">
                                    <h5 className='text-dark'>Activity on this job</h5>
                                    <div className="d-inline-flex border rounded-2 card-body">
                                      <div className='d-flex border-end px-3'>
                                        <h4 className='m-0 me-2'>{appliedJobs[selectedJobIndex].job_count}</h4>
                                        <p className='m-0'>Total <br />applications</p>
                                      </div>
                                      {appliedJobs[selectedJobIndex].status === "Applied" ? (
                                        <div className='d-flex px-3'>
                                          <h4 className='m-0 me-2'>0</h4>
                                          <p className='m-0'>Applications <br />viewed by recruiter</p>
                                        </div>
                                      ) : (
                                        <div className='d-flex px-3'>
                                          <h4 className='m-0 me-2'>1</h4>
                                          <p className='m-0'>Applications <br />viewed by recruiter</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="py-3">
                                    <h5 className='text-dark'>Similar Jobs</h5>
                                    <div className="row">
                                      {similarJobs.length > 0 ? (
                                        similarJobs.map((job) => (
                                          <div className="col-md-6 col-sm-6 mb-4" key={job.id}>
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
                                                    <h6 className="m-0">{job.title}</h6>
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
                                                      <span>Salary -</span> {job.salary_range} {job.salary_currency}
                                                    </div>
                                                  </li>
                                                  <li>
                                                    <div className="btn btn-sm btn-green me-2 mb-2 text-capitalize">
                                                      <span>Experience -</span> {job.experience_required}
                                                    </div>
                                                  </li>
                                                  {job.job_location && (
                                                    <li>
                                                      <div className="btn btn-sm btn-green me-2 mb-2 text-start text-capitalize">
                                                        <i className="fa-solid fa-location-dot"></i> {job.job_location}
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
                                        <p>No similar jobs found.</p>
                                      )}
                                    </div>
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
                <div className="card  border-0 shadow">
                  <div className="card-body text-center">
                    <img className='job_search' src="/public/images/job_search.png" alt="job_search" style={{ width: '200px' }}  />
                    <h4>No jobs applied yet!</h4>
                    <p>Tap on apply button on a job detail page to apply on it.</p>
                    <Link to='/jobs'>
                      <div className="btn btn-register">Search jobs</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            ) : (
              <p>No application found</p>
            ) }
          

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Appliedjobs