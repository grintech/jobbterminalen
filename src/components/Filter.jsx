import React, { useEffect, useState } from "react";
import { useFilterContext } from "../store/context";
import axios from "axios";

const bearerKey = import.meta.env.VITE_BEARER_KEY;
const API_URL = import.meta.env.VITE_API_URL;

const Filter = () => {
  const { setFilter, resetFilters } = useFilterContext();
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
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/get_main_categories.php`, {
          headers: { Authorization: `Bearer ${bearerKey}` },
        });
        if (res.data.type === "success") {
          setCategories(res.data.categories || []);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

 useEffect(() => {
  const fetchLocation = async () => {
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
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  fetchLocation();
}, []);


  // const handleCheckboxChange = (category, value) => {
  //   setLocalFilters((prev) => {
  //     let mappedValue = value;
  //     if (category === "experience") mappedValue = experienceMap[value];
  //     else if (category === "job_type") mappedValue = jobTypeMap[value];

  //     return {
  //       ...prev,
  //       [category]: prev[category].includes(mappedValue)
  //         ? prev[category].filter((item) => item !== mappedValue)
  //         : [...prev[category], mappedValue],
  //     };
  //   });
  // };


    const handleCheckboxChange = (category, value) => {
      const apiKeyMap = {
        experience: "experience",
        job_type: "job_type",
        category: "category",
        location: "location",
        // Add more if you rename any others in future
      };

      setLocalFilters((prev) => {
        const current = prev[category] || [];

        // Map value only for job_type and experience
        const mappedValue =
          category === "experience"
            ? experienceMap[value]
            : category === "job_type"
            ? jobTypeMap[value]
            : value;

        const exists = current.includes(mappedValue);
        const updatedValues = exists
          ? current.filter((item) => item !== mappedValue)
          : [...current, mappedValue];

        const newLocal = {
          ...prev,
          [category]: updatedValues,
        };

        // Prepare context filters to update
        const newFilter = {};
        Object.keys(newLocal).forEach((key) => {
          if (newLocal[key].length > 0) {
            const apiKey = apiKeyMap[key] || key;
            newFilter[apiKey] = newLocal[key].join(",");
          } else {
            const apiKey = apiKeyMap[key] || key;
            newFilter[apiKey] = undefined;
          }
        });

        setFilter(newFilter); // update global context
        return newLocal;
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
      .filter(([_, value]) =>
        Array.isArray(value) ? value.length > 0 : value !== ""
      )
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    setFilter(cleanedFilters);
    fetchJobs(cleanedFilters);
    setActiveMobileFilter("");
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

    setLocalFilters(emptyFilters);
    resetFilters();
    fetchJobs({});
  };

  const fetchJobs = async (filters) => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) params.append(key, value.join(","));
        else params.append(key, value);
      });

      await axios.get(`${API_URL}/job-list.php?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  // Mobile view handling
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileFilter, setActiveMobileFilter] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          <div className="d-flex align-items-center mb-3">
            <h5 className="m-0">Add Filter</h5>
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
              <h5 className="">All Filters</h5>
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-secondary me-2 px-2 border-0 rounded-1"
                  onClick={handleResetFilters}
                >
                  Reset <i className="ms-1 fa-solid fa-rotate"></i>
                </button>
                <button
                  className="btn btn-sm btn-dark px-2 border-0 rounded-1"
                  onClick={handleApplyFilters}
                >
                  Apply Filter <i className="ms-1 fa-solid fa-filter"></i>
                </button>
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
                      <input
                        type="search"
                        className="form-control mb-3"
                        placeholder="Search categories..."
                        value={categorySearch}
                        onChange={(e) => setCategorySearch(e.target.value)}
                      />
                      {categories
                        .filter((cat) =>
                          cat.name.toLowerCase().includes(categorySearch.toLowerCase())
                        )
                        .slice(0, 10)
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
                      <b>Location</b>
                    </button>
                  </h2>
                  <div id="collapseLocation" className="accordion-collapse collapse show">
                    <div className="accordion-body">
                      <input
                        type="search"
                        className="form-control mb-3"
                        placeholder="Search locations..."
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
      )}

      {/* Mobile Modal Filter UI */}
      {activeMobileFilter && (
        <div className="modal show d-block mobile_filter_modal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Filter Jobs</h5>
                <button type="button" className="btn-close" onClick={() => setActiveMobileFilter("")}></button>
              </div>
              <div className="modal-body d-flex" style={{ height: "250px" }}>
                <div className="w-50 border-end">
                  <ul className="list-group list-group-flush">
                    {["category", "job_type", "experience", "location", "salary"].map((key) => (
                      <li key={key} className={`list-group-item ${activeMobileFilter === key ? "active" : ""}`} onClick={() => setActiveMobileFilter(key)}>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-50 ps-3 overflow-auto">
                 {activeMobileFilter === "category" && (
                    <>
                      <input
                        type="search"
                        className="form-control mb-2"
                        placeholder="Search categories..."
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
                <button className="btn btn-sm btn-secondary" onClick={handleResetFilters}>Reset</button>
                <button className="btn btn-sm btn-primary" onClick={handleApplyFilters}>Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
