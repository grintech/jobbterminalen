import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  // State for filters
  const [filters, setFilters] = useState({
    skills: "",
    location: "",
    experience_required: "",
    jobType: "",
  });

  // Navigate hook to redirect to search page with query params
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = () => {
 
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ""))
    ).toString(); // Convert filters to query string excluding empty values
  
    navigate(`/search-job?${query}`); // Redirect to search page with filters as query params
    console.log(filters); // Log filters for debugging
  };

  return (
    <div className="hero_banner d-flex flex-column align-items-center justify-content-center">
      <h1 className="fw-bold position-relative">Find your dream job now</h1>
      <h5 className="position-relative">Over 7,00,000+ jobs to explore</h5>

      <div className="banner_search container d-flex align-items-center justify-content-center mt-4 shadow">
        <i className="fa-solid fa-magnifying-glass search_icon"></i>
        <div className="row align-items-center justify-content-center w-100">
          {/* Skills Input */}
          <div className="col-lg-3 border-end mb-2 mb-lg-0">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-magnifying-glass d-block d-lg-none"></i>
              <input
                className="w-100"
                type="text"
                placeholder="Enter Skills / Designation"
                name="skills"
                value={filters.skills}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Location Input */}
          <div className="col-lg-2 border-end mb-2 mb-lg-0">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-location-dot"></i>
              <input
                className="w-100"
                type="text"
                placeholder="Location"
                name="location"
                value={filters.location}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Experience Select */}
          <div className="col-lg-3 border-end mb-2 mb-lg-0">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-briefcase"></i>
              <select
                className="form-select"
                name="experience_required"
                value={filters.experience_required}
                onChange={handleInputChange}
              >
                <option value="">Experience</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3+ years</option>
                <option value="4">5+ years</option>
              </select>
            </div>
          </div>

          {/* Job Type Select */}
          <div className="col-lg-2 border-end mb-2 mb-lg-0">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-magnifying-glass"></i>
              <select
                className="form-select"
                name="jobType"
                value={filters.jobType}
                onChange={handleInputChange}
              >
                <option value="">Job Type</option>
                <option value="remote">Remote</option>
                <option value="work-from-office">WFO</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="col-lg-2">
            <button
              type="button"
              className="btn-register w-100"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HeroBanner;
