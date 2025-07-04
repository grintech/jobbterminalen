import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroBannerJobs from "../components/HeroBannerJobs";
// import { Helmet } from "react-helmet-async";
import { useAuthContext } from "../store/authContext";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "react-avatar";
import { JobCardSkeleton } from "../components/skeleton/JobCardSkeleton";
import { useTranslation } from "react-i18next";

const AllJobPost = () => {
  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const { user } = useAuthContext();
  const userId = user ? user.id : null;
  const navigate = useNavigate();
  const {t} = useTranslation();

  const [filters, setFilters] = useState({});
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [saved, setSaved] = useState(false);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filter specific states
  const [categories, setCategories] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [localFilters, setLocalFilters] = useState({
    job_type: [],
    salary_min: "",
    salary_max: "",
    experience: [],
    location: [],
    category: [],
  });
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileFilter, setActiveMobileFilter] = useState("");

  const jobTypeMap = {
    "Work From Office": "work-from-office",
    Remote: "remote",
    Hybrid: "hybrid",
  };
  const experienceMap = {
    Fresher: "0",
    "1 Year": "1",
    "2 Years": "2",
    "3+ Years": "3",
    "5+ Years": "5",
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/get_main_categories.php`, {
          headers: { Authorization: `Bearer ${bearerKey}` },
        });
        if (res.data.type === "success") {
          setCategories(res.data.categories || []);
        }
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    const fetchLocations = async () => {
      try {
        const res = await axios.get(`${API_URL}/job-location.php`, {
          headers: { Authorization: `Bearer ${bearerKey}` },
        });
        if (res.data.type === "success") {
          const locations = (res.data.data || []).map((name) => ({
            name,
            slug: name.toLowerCase().replace(/\s+/g, "-"),
          }));
          setAllLocations(locations);
        }
      } catch (err) {
        console.error("Error fetching locations", err);
      }
    };

    fetchCategories();
    fetchLocations();
  }, []);

    useEffect(() => {
        fetchJobs(filters);
      }, [filters]);


  const fetchJobs = async (filterObj = {}) => {
    setLoading(true);
    setError(""); // Clear error before fetching new data
    try {
      const query = new URLSearchParams(filterObj).toString();
      const response = await fetch(`${API_URL}/job-list.php?${query}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const result = await response.json();
      if (result.type === "success") {
        setJobs(result.data);
        setPagination(result.pagination);
      } else {
        setJobs([]);
        setError(result.message || t("NoJobFound"));
      }
    } catch (err) {
      setJobs([]);
      setError(t("FailedToFetchJobs"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (category, value) => {
    setLocalFilters((prev) => {
      let mappedValue = value;
      if (category === "experience") mappedValue = experienceMap[value];
      else if (category === "job_type") mappedValue = jobTypeMap[value];

      return {
        ...prev,
        [category]: prev[category].includes(mappedValue)
          ? prev[category].filter((item) => item !== mappedValue)
          : [...prev[category], mappedValue],
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    const cleaned = Object.entries(localFilters)
      .filter(([_, val]) => (Array.isArray(val) ? val.length : val !== ""))
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
    setFilters(cleaned);
    setActiveMobileFilter("");
  };

const handleResetFilters = () => {
  const empty = {
    job_type: [],
    salary_min: "",
    salary_max: "",
    experience: [],
    location: [],
    category: [],
  };
  setLocalFilters(empty);
  setFilters({});
  fetchJobs({}); // Directly trigger a fresh API call
};



  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const fetchSavedJobs = async () => {
    try {
      const response = await axios.get(`${API_URL}/bookmarked-jobs-list.php?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
        },
      });
      if (response.data.type === "success") {
        setSavedJobs(response.data.saved_jobs || []);
        setSaved(response.data.data?.status === "active");
      }
    } catch (err) {
      console.error("Error fetching saved jobs", err);
    }
  };

  const toggleSavedJob = async (jobId) => {
    if (!userId) {
      toast.error(t("PleaseLoginSave"));
      return setTimeout(() => navigate("/login"), 2000);
    }
    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("job_id", jobId);

      const res = await axios.post(`${API_URL}/bookmark-jobs.php`, formData, {
        headers: { Authorization: `Bearer ${bearerKey}` },
      });
      if (res.data.type === "success") {
        toast.success(isJobSaved(jobId) ? t("JobUnsaved") : t("JobSaved"));
        fetchSavedJobs();
        setSaved(!saved);
      }
    } catch (err) {
      console.error("Error saving job", err);
      toast.error(t("ErrorSavingJob"));
    }
  };

  const isJobSaved = (jobId) => {
    return Array.isArray(savedJobs) && savedJobs.some((job) => job.id === jobId);
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  return (
    <>
      {/* <Helmet>
        <title>All Job Posts</title>
      </Helmet> */}
      
      <div className="all_jobs_page">
        <Navbar />
        <HeroBannerJobs />

        {/* Main layout with Filter + Job List */}
        <div className="container d-flex flex-column py-5 all_job_posts">
          <div className="row pb-5">
            <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
                {isMobile ? (
        <>
          <div className="d-flex align-items-center mb-3">
            <h5 className="m-0">{t("AddFilter")}</h5>
            <i className="fa-solid fa-filter"></i>
          </div>
          <div className="mobile-filter-list">
            {[
              { label: "Category", key: "category" },
              { label: "Job Type", key: "job_type" },
              { label: "Experience", key: "experience" },
              { label: "Location", key: "location" },
              { label: "Salary", key: "salary" },
            ].map((filter) => (
              <div
                key={filter.key}
                className="mobile-filter-tab rounded-pill"
                onClick={() => setActiveMobileFilter(filter.key)}
                style={{ cursor: "pointer" }}
              >
                <span>{filter.label}</span>
              </div>
            ))}
          </div>
        </>
                ) : (
                  <div className="card_sticky">
                    <div className="card all_cat_filters">
                      <div className="card-body">
                        <h5 className="">{t("AllFilters")}</h5>
                        <div className="d-flex justify-content-between">
                          <button
                            className="btn btn-sm btn-secondary me-2 px-2 border-0 rounded-1"
                            onClick={handleResetFilters}
                          >
                            {t("Reset")} <i className="ms-1 fa-solid fa-rotate"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-dark px-2 border-0 rounded-1"
                            onClick={handleApplyFilters}
                          >
                            {t("ApplyFilter")} <i className="ms-1 fa-solid fa-filter"></i>
                          </button>
                        </div>
                        <hr />

                        <div className="accordion border-0" id="accordionExample1">
                          {/* Category Filter */}
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCategory">
                                <b>{t("SimpleCategory")}</b>
                              </button>
                            </h2>
                            <div id="collapseCategory" className="accordion-collapse collapse show">
                              <div className="accordion-body">
                                <input
                                  type="search"
                                  className="form-control mb-3"
                                  placeholder={t("SearchCategories")}
                                  value={categorySearch}
                                  onChange={(e) => setCategorySearch(e.target.value)}
                                />
                                {(() => {
                                  const filteredCategories = categories
                                    .filter((cat) =>
                                      cat.name.toLowerCase().includes(categorySearch.toLowerCase())
                                    )
                                    .slice(0, 10);

                                  if (filteredCategories.length === 0) {
                                    return <p className="text-theme m-0 text-center">{t("NoCatFound")}</p>;
                                  }

                                  return filteredCategories.map((cat) => (
                                    <div className="form-check" key={cat.id}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={localFilters.category.includes(cat.slug)}
                                        onChange={() => handleCheckboxChange("category", cat.slug)}
                                      />
                                      <label className="form-check-label text-capitalize">{cat.name}</label>
                                    </div>
                                  ));
                                })()}
                              </div>
                            </div>
                          </div>

                          {/* Job Type Filter */}
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseJobType">
                                <b>{t("JobType")}</b>
                              </button>
                            </h2>
                            <div id="collapseJobType" className="accordion-collapse collapse show">
                              <div className="accordion-body">
                                {Object.keys(jobTypeMap).map((type) => (
                                  <div className="form-check" key={type}>
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={localFilters.job_type.includes(jobTypeMap[type])}
                                      onChange={() => handleCheckboxChange("job_type", type)}
                                    />
                                    <label className="form-check-label text-capitalize">{type}</label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Experience Filter */}
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExperience">
                                <b>{t("SimpleExperience")}</b>
                              </button>
                            </h2>
                            <div id="collapseExperience" className="accordion-collapse collapse show">
                              <div className="accordion-body">
                                {Object.keys(experienceMap).map((exp) => (
                                  <div className="form-check" key={exp}>
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={localFilters.experience.includes(experienceMap[exp])}
                                      onChange={() => handleCheckboxChange("experience", exp)}
                                    />
                                    <label className="form-check-label text-capitalize">{exp}</label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Location Filter */}
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLocation">
                                <b>{t("SimpleLocation")}</b>
                              </button>
                            </h2>
                            <div id="collapseLocation" className="accordion-collapse collapse show">
                              <div className="accordion-body">
                                <input
                                  type="search"
                                  className="form-control mb-3"
                                  placeholder={t("SearchLocations")}
                                  value={locationSearch}
                                  onChange={(e) => setLocationSearch(e.target.value)}
                                />
                                {allLocations
                                  // .filter((loc) =>
                                  //   loc.name.toLowerCase().includes(locationSearch.toLowerCase())
                                  // )
                                  .filter((loc) =>
                                    loc.name && loc.name.toLowerCase().includes(locationSearch.toLowerCase())
                                    )
                                  .slice(0, 10)
                                  .map((loc) => (
                                    <div className="form-check" key={loc.id}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={localFilters.location.includes(loc.slug)}
                                        onChange={() => handleCheckboxChange("location", loc.slug)}
                                      /> 
                                      <label className="form-check-label text-capitalize">{loc.name}</label>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>

                          {/* Salary Filter */}
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSalary">
                                <b>{t("SalaryRange")}</b>
                              </button>
                            </h2>
                            <div id="collapseSalary" className="accordion-collapse collapse show">
                              <div className="accordion-body">
                                <input type="number" name="salary_min" className="form-control mb-2" placeholder={t("MinSalary")} value={localFilters.salary_min} onChange={handleInputChange} />
                                <input type="number" name="salary_max" className="form-control" placeholder={t("MaxSalary")} value={localFilters.salary_max} onChange={handleInputChange} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Modal Filter UI */}
                {activeMobileFilter && (
                  <div className="modal show d-block mobile_filter_modal" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">{t("FilterJobs")}</h5>
                          <button type="button" className="btn-close" onClick={() => setActiveMobileFilter("")}></button>
                        </div>
                        <div className="modal-body d-flex" style={{ height: "250px" }}>
                          <div className="w-50 border-end">
                            <ul className="list-group list-group-flush">
                              {[("category"), "job_type", "experience", "location", "salary"].map((key) => (
                                <li key={key} className={`list-group-item ${activeMobileFilter === key ? "active" : ""}`} onClick={() => setActiveMobileFilter(key)}>
                                  {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
                                </li>
                              ))}
                               {/* {[t("SimpleCategory"), t("JobType"), t("SimpleExperience"), t("SimpleLocation"), t("SalaryRange")].map((key) => (
                                <li key={key} className={`list-group-item ${activeMobileFilter === key ? "active" : ""}`} onClick={() => setActiveMobileFilter(key)}>
                                  {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
                                </li>
                              ))} */}
                            </ul>
                          </div>
                          <div className="w-50 ps-3 overflow-auto">
                          {activeMobileFilter === "category" && (
                              <>
                                <input
                                  type="search"
                                  className="form-control mb-2"
                                  placeholder={t("SearchCategories")}
                                  value={categorySearch}
                                  onChange={(e) => setCategorySearch(e.target.value)}
                                />
                                {categories
                                  .filter((cat) =>
                                    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
                                  )
                                  // .slice(0, 10)
                                  .map((cat) => (
                                    <div className="form-check" key={cat.id}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={localFilters.category.includes(cat.slug)}
                                        onChange={() => handleCheckboxChange("category", cat.slug)}
                                      />
                                      <label className="form-check-label text-capitalize">{cat.name}</label>
                                    </div>
                                  ))}
                              </>
                            )}

                            {activeMobileFilter === "job_type" &&
                              Object.keys(jobTypeMap).map((type) => (
                                <div className="form-check" key={type}>
                                  <input className="form-check-input" type="checkbox" checked={localFilters.job_type.includes(jobTypeMap[type])} onChange={() => handleCheckboxChange("job_type", type)} />
                                  <label className="form-check-label text-capitalize">{type}</label>
                                </div>
                              ))}

                            {activeMobileFilter === "experience" &&
                              Object.keys(experienceMap).map((exp) => (
                                <div className="form-check" key={exp}>
                                  <input className="form-check-input" type="checkbox" checked={localFilters.experience.includes(experienceMap[exp])} onChange={() => handleCheckboxChange("experience", exp)} />
                                  <label className="form-check-label text-capitalize">{exp}</label>
                                </div>
                              ))}

                            {activeMobileFilter === "location" && (
                              <>
                                <input
                                  type="search"
                                  className="form-control mb-2"
                                  placeholder="Search locations..."
                                  value={locationSearch}
                                  onChange={(e) => setLocationSearch(e.target.value)}
                                />
                                {allLocations
                                  .filter((loc) =>
                                    loc.name.toLowerCase().includes(locationSearch.toLowerCase())
                                  )
                                  .map((loc) => (
                                    <div className="form-check" key={loc.id}>
                                      <input className="form-check-input" type="checkbox" checked={localFilters.location.includes(loc.slug)} onChange={() => handleCheckboxChange("location", loc.slug)} />
                                      <label className="form-check-label text-capitalize">{loc.name}</label>
                                    </div>
                                  ))}
                              </>
                            )}

                            {activeMobileFilter === "salary" && (
                              <>
                                <input type="number" name="salary_min" className="form-control mb-2" placeholder="Min Salary" value={localFilters.salary_min} onChange={handleInputChange} />
                                <input type="number" name="salary_max" className="form-control" placeholder="Max Salary" value={localFilters.salary_max} onChange={handleInputChange} />
                              </>
                            )}

                          </div>
                        </div>
                        <div className="modal-footer">
                          <button className="btn btn-sm btn-secondary" onClick={handleResetFilters}>{t("Reset")}</button>
                          <button className="btn btn-sm btn-primary" onClick={handleApplyFilters}>{t("Apply")}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
            <div className="col-lg-9 col-md-8">

                 {loading ? (
                // <div className="loading-screen d-flex flex-column justify-content-center align-items-center">
                //   <div className="spinner-grow text-primary" role="status">
                //     <span className="visually-hidden">Loading...</span>
                //   </div>
                //   <p className='mt-2'>Fetching jobs...</p>
                // </div>

                      <div className="row">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={i}>
                            <JobCardSkeleton />
                          </div>
                        ))}
                      </div>


              ) : error ? (
              <>
                <div className="msg_card">
                  <div className="card border-0 shadow">
                    <div className="card-body text-center p-4">
                    <img className="job_search" src="/images/no-job.png" alt="job_search" />
                    <h6 className="text-theme">{error}</h6>
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
                         {job.is_featured === "1" && <div className="fea_tag">Featured</div>}
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
                                    isJobSaved(job.id) ? t("ClickToUnsave") : t("ClickToSave")}

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
                          <p className="main_desc">{job.company_tagline}</p>
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
                    <h6 className="text-theme">{error }</h6>
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
        <ToastContainer />
      </div>
    </>
  );
};

export default AllJobPost;