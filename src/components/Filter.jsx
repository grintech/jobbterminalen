import React, { useState } from "react";
import { useFilterContext } from "../store/context";
import axios from "axios";

const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

const Filter = () => {
  const { setFilter } = useFilterContext();
  const [localFilters, setLocalFilters] = useState({
    job_type: [],
    salary_min: "",
    salary_max: "",
    experience_required: [],
    location: [],
    category: [],
    // page: 1,
  });

  const jobTypeMap = {
    "Work From Office": "work-from-office",
    Remote: "remote",
    Hybrid: "hybrid",
  };

  const experienceMap = {
    Fresher: "fresher",
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
      const isChecked = prev[category].includes(value);
  
      let mappedValue = value;
  
      if (category === "experience_required") {
        mappedValue = experienceMap[value]; // Map experience values
      } else if (category === "job_type") {
        mappedValue = jobTypeMap[value]; // Map job type values
      } else if (category === "category") {
        mappedValue = categoryMap[value];
      } else if (category === "location") {
        mappedValue = locationMap[value];
      }
  
      return {
        ...prev,
        [category]: isChecked
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
    // Filter out empty or default values
    const cleanedFilters = Object.entries(localFilters)
      .filter(([key, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0; // Keep only non-empty arrays
        }
        return value !== ""; // Keep non-empty strings
      })
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  
    setFilter(cleanedFilters); // Update filters in context
    fetchJobs(cleanedFilters); // Fetch jobs with the cleaned filters
  };
  
  const fetchJobs = async (filters) => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          params.append(key, value.join(",")); // Join arrays into comma-separated strings
        } else {
          params.append(key, value); // Append other values directly
        }
      });
  
      const response = await axios.get(`${API_URL}/job-list.php?${params.toString()}`, {
        headers:{
          Authorization: `Bearer ${bearerKey}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Fetched jobs:", response.data.jobs); // Replace with state update logic
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };
  

  return (
    <div className="card_sticky">
      <div className="card all_cat_filters">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="m-0">All Filters</h5>
            <button
              className="btn btn-sm btn-dark px-2 border-0 rounded-1"
              onClick={handleApplyFilters}
            >
              Apply Filter
            </button>
          </div>
          <hr />
          <div>
            <div className="accordion border-0" id="accordionExample1">
              {/* Category Filter */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseCategory"
                    aria-expanded="false"
                    aria-controls="collapseCategory"
                  >
                    <b>Category</b>
                  </button>
                </h2>
                <div
                  id="collapseCategory"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample1"
                >
                  <div className="accordion-body">
                    {Object.keys(categoryMap).map((category) => (
                      <div className="form-check" key={category}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={category}
                          onChange={() => handleCheckboxChange("category", category)}
                        />
                        <label className="form-check-label" htmlFor={category}>
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Job Type Filter */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseJobType"
                    aria-expanded="true"
                    aria-controls="collapseJobType"
                  >
                    <b>Job Type</b>
                  </button>
                </h2>
                <div
                  id="collapseJobType"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample1"
                >
                  <div className="accordion-body">
                    {Object.keys(jobTypeMap).map((type) => (
                      <div className="form-check" key={type}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={type}
                          onChange={() => handleCheckboxChange("job_type", type)}
                        />
                        <label className="form-check-label" htmlFor={type}>
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Salary Range Filter */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSalary"
                    aria-expanded="false"
                    aria-controls="collapseSalary"
                  >
                    <b>Salary Range</b>
                  </button>
                </h2>
                <div
                  id="collapseSalary"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample1"
                >
                  <div className="accordion-body">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Min Salary"
                        name="salary_min"
                        value={localFilters.salary_min}
                        onChange={handleInputChange}
                      />
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Max Salary"
                        name="salary_max"
                        value={localFilters.salary_max}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

               {/* Experience Filter  */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExperience"
                    aria-expanded="false"
                    aria-controls="collapseExperience"
                  >
                    <b>Experience</b>
                  </button>
                </h2>
                <div
                  id="collapseExperience"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample1"
                >
                  <div className="accordion-body">
                    {Object.keys(experienceMap).map((exp) => (
                      <div className="form-check" key={exp}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={exp}
                          onChange={() => handleCheckboxChange("experience_required", exp)}
                        />
                        <label className="form-check-label" htmlFor={exp}>
                          {exp}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location Filter */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseLocation"
                    aria-expanded="false"
                    aria-controls="collapseLocation"
                  >
                    <b>Location</b>
                  </button>
                </h2>
                <div
                  id="collapseLocation"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample1"
                >
                  <div className="accordion-body">
                    {Object.keys(locationMap).map((location) => (
                      <div className="form-check" key={location}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={location}
                          onChange={() => handleCheckboxChange("location", location)}
                        />
                        <label className="form-check-label" htmlFor={location}>
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
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