import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeroBanner = () => {
  const [formData, setFormData] = useState({
    skills: "",
    location: "",
    experience: "",
    job_type: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const navigate = useNavigate();

  const bearerKey = import.meta.env.VITE_BEARER_KEY; // Your bearer token

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Trigger autosuggestions for the skills field
    if (e.target.name === "skills" && e.target.value) {
      fetchSkillSuggestions(e.target.value);
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  // Fetch skill suggestions from the API
  const fetchSkillSuggestions = async (query) => {
    setLoadingSuggestions(true);
    try {
      const response = await axios.get(
        `https://jobbterminalen.se/admin/api/auto-suggestions.php?suggestion=${query}`,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
          },
        }
      );
      if (response.data.type === "success" && response.data.data) {
        // Filter to only include 'skills' from the response data
        const skillSuggestions = response.data.data
          .filter(item => item.skills) // Make sure the item has 'skills'
          .map(item => item.skills); // Extract the 'skills' value

        setSuggestions(skillSuggestions); // Set the suggestions
      }
    } catch (err) {
      console.error("Error fetching skill suggestions:", err);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // Handle search
  const handleSearch = () => {
    // Filter out empty form data keys
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value.trim() !== "")
    );

    // Convert filtered form data into query string
    const query = new URLSearchParams(filteredData).toString();

    // Navigate to the job search page with the query parameters
    navigate(`/job-search?${query}`);
  };

  return (
    <div className="hero_banner d-flex flex-column align-items-center justify-content-center">
      <h1 className="fw-bold position-relative">Find your dream job now</h1>
      <h5 className="position-relative">Over 7,00,000+ jobs to explore</h5>

      <div className="banner_search container d-flex align-items-center justify-content-center mt-4 shadow">
        <i className="fa-solid fa-magnifying-glass search_icon"></i>
        <div className="row align-items-center justify-content-center w-100">
          {/* Skills Input */}
          <div className="col-lg-3 border-end mb-2 mb-lg-0 position-relative">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-magnifying-glass d-block d-lg-none"></i>
              <input
                className="w-100"
                type="text"
                placeholder="Enter Skills / Designation"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
              />
              {/* Render suggestions */}
              {suggestions.length > 0 && (
                <div className="suggestions-list">
                  {loadingSuggestions ? (
                    <p className="p-2">Loading...</p>
                  ) : (
                    suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="suggestion-item"
                        onClick={() => setFormData({ ...formData, skills: suggestion })}
                      >
                        {suggestion}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Location Input */}
          <div className="col-lg-4 border-end mb-2 mb-lg-0">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-location-dot"></i>
              <input
                className="w-100"
                type="text"
                placeholder="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Experience Select */}
          {/* <div className="col-lg-3 border-end mb-2 mb-lg-0">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-briefcase"></i>
              <select
                className="form-select"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              >
                <option value="">Experience </option>
                <option value="fresher">Fresher</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="4">4 years</option>
                <option value="5">5 years</option>
              </select>
            </div>
          </div> */}

          {/* Job Type Select */}
          <div className="col-lg-3 border-end mb-2 mb-lg-0">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-briefcase"></i>
              <select
                className="form-select"
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
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
