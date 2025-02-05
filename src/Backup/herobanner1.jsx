import React, { useState } from "react";

const skillsData = [
  "JavaScript", "React","Node.js","Python","Php","Django","Java","C++","HTML","CSS","Angular","Vue.js","Ruby on Rails","SQL","NoSQL","AWS",
];

const HeroBanner = () => {
  const [skills, setSkills] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setSkills(value);

    if (value) {
      const suggestions = skillsData.filter((skill) =>
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSkills(suggestions);
    } else {
      setFilteredSkills([]);
    }
  };

  const handleSuggestionClick = (skill) => {
    setSkills(skill);
    setFilteredSkills([]); // Hide suggestions once a skill is selected
  };

  return (
    <div  className="hero_banner d-flex flex-column align-items-center justify-content-center">
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
                value={skills}
                onChange={handleSkillsChange}
              />
            </div>
            {/* Suggestions Box */}
            {filteredSkills.length > 0 && (
              <ul className="suggestion-box position-absolute bg-white border rounded mt-2 w-100">
                {filteredSkills.map((skill, index) => (
                  <li
                    key={index}
                    className="suggestion-item p-2"
                    onClick={() => handleSuggestionClick(skill)}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            )}
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
              />
            </div>
          </div>

          {/* Experience Select */}
          <div className="col-lg-3 border-end mb-2 mb-lg-0">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-briefcase"></i>
              <select className="form-select" name="experience_required">
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
              <select className="form-select" name="jobType">
                <option value="">Job Type</option>
                <option value="remote">Remote</option>
                <option value="work-from-office">WFO</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="col-lg-2">
            <button type="submit" className="btn-register w-100">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
