import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { Link } from "react-router-dom";
import { useFilterContext } from "../store/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SearchPage = () => {
  const { filters, setFilter } = useFilterContext();
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        // console.log("Current Filters State:", filters); // Debug current filters
        const query = new URLSearchParams(filters).toString();
        // console.log("Generated Query String:", query); // Debug query string
  
        const response = await fetch(`${API_URL}/job_list.php?${query}`, 
          {
            headers:{
              Authorization: `Bearer ${bearerKey}`,
              "Content-Type": "multipart/form-data",
            }
         }
      );
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

  return (
    <>
      <Navbar />
    

      <div className="container d-flex flex-column py-5 all_job_posts">
        <h4 className="mb-4">All Jobs</h4>
        <div className="row pb-5">
          <div className="col-md-3 mb-4 mb-md-0">
            <Filter />
          </div>
          <div className="col-md-9 pt-4 d-flex flex-column position-relative align-items-center-justify-content-center">
            {loading ? (
              <p style={{}}>Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : jobs.length > 0 ? (
              <div className="row">
                {jobs.map((job) => (
                  <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={job.id}>
                    <div className="card company_list_card h-100">
                      <div className="card-body ">
                        <div className="d-flex justify-content-between">
                          {/* <Link to="/companies/capgemini"> */}
                            <div className="logo_div border-0 shadow">
                              <img
                                src={`${IMG_URL}/${job.company_profile}`}
                                alt="company_logo"
                              />
                            </div>
                          {/* </Link> */}
                          <div className="d-flex align-items-center">
                            <Link className="btn-light shadow me-2">
                              <i className="fa-regular fa-bookmark"></i>
                            </Link>
                            <Link className="btn-light shadow me-2">
                              <i className="fa-solid fa-share"></i>
                            </Link>
                          </div>
                        </div>
                        <div className="py-2 ">
                          {/* <Link to="/companies/capgemini"> */}
                            <h5 className="py-2 ">{job.company_name}</h5>
                          {/* </Link> */}
                          <p className="m-0 d-flex sml_text">
                            <span className="border-end d-inline-flex align-items-center me-2 pe-2">
                              <i className="fa-solid fa-star me-1"></i> 3.7
                            </span>
                            <span>3.3K+ reviews</span>
                          </p>
                          <Link to="/job-detail">
                            <h6 className="mt-2">{job.title}</h6>
                          </Link>
                        </div>
                        <p className="main_desc">Trusted global solutions company.</p>
                        <ul className="p-0 d-flex flex-wrap">
                          {job.job_type && (
                            <li>
                              <div className="btn btn-sm btn-green me-2 mb-2">{job.job_type}</div>
                            </li>
                          )}
                          <li>
                            <div className="btn btn-sm btn-green me-2 mb-2">
                              {job.salary_currency} {job.salary_range}
                            </div>
                          </li>
                          <li>
                            <div className="btn btn-sm btn-green me-2 mb-2"><i className="fa-solid fa-briefcase"></i>&nbsp;&nbsp;{job.experience_required}</div>
                          </li>
                          {job.job_location && (
                            <li>
                              <div className="btn btn-sm btn-green me-2 mb-2 text-start">
                                <i className="fa-solid fa-location-dot"></i>&nbsp;&nbsp;{job.job_location}
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
              <p>No jobs found</p>
            )}

            {/* Pagination */}
            <div className="d-flex justify-content-center">
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
                      className={`page-item ${
                        Number(pagination.current_page) === index + 1 ? "active" : ""
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
                    className={`page-item ${
                      Number(pagination.current_page) === pagination.total_pages ? "disabled" : ""
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
    </>
  );
};

export default SearchPage;
