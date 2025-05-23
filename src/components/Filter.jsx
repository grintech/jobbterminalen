import React, { useState } from "react";
import { useFilterContext } from "../store/context";
import axios from "axios";

const bearerKey = import.meta.env.VITE_BEARER_KEY;
const API_URL = import.meta.env.VITE_API_URL;

const Filter = () => {
  const { setFilter, resetFilters } = useFilterContext();

  const [localFilters, setLocalFilters] = useState({
    job_type: [],
    salary_min: "",
    salary_max: "",
    experience: [],
    location: [],
    category: [],
  });

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
  

  const categoryMap = {
    IT: "it",
    MNC: "mnc",
    Startup: "startup",
    Marketing: "marketing",
  };

  const locationMap = {
    Mohali: "mohali",
    Chandigarh: "chandigarh",
    Delhi: "delhi",
    "New York": "new york",
  };

  const handleCheckboxChange = (category, value) => {
    setLocalFilters((prev) => {
      let mappedValue = value;

      if (category === "experience") mappedValue = experienceMap[value];
      else if (category === "job_type") mappedValue = jobTypeMap[value];
      else if (category === "category") mappedValue = categoryMap[value];
      else if (category === "location") mappedValue = locationMap[value];

      return {
        ...prev,
        [category]: prev[category].includes(mappedValue)
          ? prev[category].filter((item) => item !== mappedValue)
          : [...prev[category], mappedValue],
      };
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    const cleanedFilters = Object.entries(localFilters)
      .filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : value !== ""))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    setFilter(cleanedFilters);
    fetchJobs(cleanedFilters);
  };


  const handleResetFilters = () => {
    const emptyFilters = {
      job_type: [],
      salary_min: "",
      salary_max: "",
      experience: [],
      location: [],
      category: [],
    };
  
    setLocalFilters(emptyFilters); // Reset local state
    resetFilters();                // Reset global context state
    fetchJobs({});                 // Fetch all jobs with no filters
  };
  

  const fetchJobs = async (filters) => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) params.append(key, value.join(","));
        else params.append(key, value);
      });

      const response = await axios.get(`${API_URL}/job-list.php?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Fetched jobs:", response.data.jobs);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  return (
    <div className="card_sticky">
      <div className="card all_cat_filters">
        <div className="card-body">
          <h5 className="">All Filters</h5>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-sm btn-secondary me-2 px-2 border-0 rounded-1"
              onClick={handleResetFilters}
            > Reset </button>
            <button className="btn btn-sm btn-dark px-2 border-0 rounded-1" onClick={handleApplyFilters}> Apply Filter </button>
          </div>
          <hr />
          
          <div className="accordion border-0" id="accordionExample1">
            
            {/* Category Filter */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCategory">
                  <b>Category</b>
                </button>
              </h2>
              <div id="collapseCategory" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  {Object.keys(categoryMap).map((category) => (
                    <div className="form-check" key={category}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={localFilters.category.includes(categoryMap[category])}
                        onChange={() => handleCheckboxChange("category", category)}
                      />
                      <label className="form-check-label">{category}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Job Type Filter */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseJobType">
                  <b>Job Type</b>
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
                      <label className="form-check-label">{type}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience Filter */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExperience">
                  <b>Experience</b>
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
                      <label className="form-check-label">{exp}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Location Filter */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLocation">
                  <b>Location</b>
                </button>
              </h2>
              <div id="collapseLocation" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  {Object.keys(locationMap).map((location) => (
                    <div className="form-check" key={location}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={localFilters.location.includes(locationMap[location])}
                        onChange={() => handleCheckboxChange("location", location)}
                      />
                      <label className="form-check-label">{location}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Salary Range Filter */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSalary">
                  <b>Salary Range</b>
                </button>
              </h2>
              <div id="collapseSalary" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <input type="number" name="salary_min" className="form-control mb-2" placeholder="Min Salary" value={localFilters.salary_min} onChange={handleInputChange} />
                  <input type="number" name="salary_max" className="form-control" placeholder="Max Salary" value={localFilters.salary_max} onChange={handleInputChange} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
