import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const HeroBanner = () => {
  const { t } = useTranslation();

    const INITIAL_COUNT = 1000;

    const getInitialCount = () => {
      const saved = localStorage.getItem("jobCount");
      return saved ? parseInt(saved, 10) : INITIAL_COUNT;
    };

  const [jobCount, setJobCount] = useState(getInitialCount);
  const intervalRef = useRef(null);

  const [formData, setFormData] = useState({
    skills: "",
    location: "",
    experience: "",
    job_type: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const navigate = useNavigate();
  const suggestionRef = useRef(null); // Reference for detecting outside clicks

  const API_URL = import.meta.env.VITE_API_URL;
  const bearerKey = import.meta.env.VITE_BEARER_KEY;

  // Handle input change and fetch suggestions
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "skills" && e.target.value) {
      fetchSkillSuggestions(e.target.value);
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  // Fetch skill suggestions from API
  const fetchSkillSuggestions = async (query) => {
    setLoadingSuggestions(true);
    try {
      const response = await axios.get(
        `${API_URL}/auto-suggestions.php?suggestion=${query}`,
        {
          headers: { Authorization: `Bearer ${bearerKey}` },
        }
      );
      if (response.data.type === "success" && response.data.data) {
        const skillSuggestions = response.data.data
          .filter((item) => item.skills)
          .map((item) => item.skills);

        setSuggestions(skillSuggestions);
      }
    } catch (err) {
      console.error("Error fetching skill suggestions:", err);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setFormData({ ...formData, skills: suggestion });
    setSuggestions([]); // Hide suggestions after selection
  };

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search and prevent empty params in the URL
  const handleSearch = () => {
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value.trim() !== "")
    );

    const query = new URLSearchParams(filteredData).toString();

    if (query) {
      navigate(`/job-search?${query}`);
    }
  };

  // Job count update function
   useEffect(() => {
    // Save immediately in case count is from initial value
    localStorage.setItem("jobCount", jobCount);

    // Clear any existing interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setJobCount((prev) => {
        const updated = prev + 1;
        localStorage.setItem("jobCount", updated);
        return updated;
      });
    }, 180000); // Every 3 minutes

    return () => clearInterval(intervalRef.current);
  }, []); // Run only once

  const formatNumber = (x) => {
    // return x.toLocaleString("en-IN");
     return x.toLocaleString("sv-SE");
  };
  

  return (
    <div className="hero_banner d-flex flex-column align-items-center justify-content-center">
      <h1 className="fw-bold position-relative text-center">{t("HeroTitle")}</h1>
       <h2 className="position-relative herotext text-center">
        {t("HeroText")} <span className="fs-3 fw-bold">{formatNumber(jobCount)}</span>+ {t("HeroText1")}
      </h2>

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
                placeholder={t("EnterSkill")}
                name="skills"
                value={formData.skills}
                onChange={handleChange}
              />
              {/* Render Suggestions */}
              {suggestions.length > 0 && (
                <div className="suggestions-list" ref={suggestionRef}>
                  {loadingSuggestions ? (
                    <p className="p-2">Loading...</p>
                  ) : (
                    suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="suggestion-item"
                        onClick={() => handleSuggestionClick(suggestion)}
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
                placeholder={t("EnterLocation")}
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

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
                <option value="">{t("JobType")}</option>
                <option value="remote">{t("Remote")}</option>
                <option value="work-from-office">{t("WorkFromOffice")}</option>
                <option value="hybrid">{t("Hybrid")}</option>
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
              {t("Search")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
