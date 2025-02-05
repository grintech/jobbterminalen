import React from "react";
import { useFilterContext } from "../store/context";

const Filter = () => {
  const { filters, toggleFilter } = useFilterContext();

  const filterCategories = [
    {
      title: "Job Type",
      id: "jobType",
      options: ["Work from office", "Hybrid", "Remote"],
    },
    {
      title: "Salary",
      id: "salary",
      options: ["0-3 Lakhs", "3-6 Lakhs", "6-9 Lakhs", "9-12 Lakhs"],
    },
    {
      title: "Experience",
      id: "experience",
      options: ["1+ Years", "2+ Years", "3+ Years", "More than 5 Years"],
    },
    {
      title: "Location",
      id: "location",
      options: ["Bengaluru", "Delhi/NCR", "Chennai", "Mumbai"],
    },
    {
      title: "Company Type",
      id: "companyType",
      options: ["Corporate", "Foreign MNC", "Indian MNC", "Startup", "Others"],
    },
    {
      title: "Industry",
      id: "industry",
      options: ["IT Services & Consultancy", "BPO / Call Centre", "Education / Training"],
    },
  ];

  return (
    <div className="card_sticky">
      <div className="card all_cat_filters">
        <div className="card-body">
          <h5>All Filters</h5>
          <hr />
          {filterCategories.map((category, index) => (
            <div key={index} className="accordion border-0" id={`accordionExample${index}`}>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse${index}`}
                  >
                    <b>{category.title}</b>
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent={`#accordionExample${index}`}
                >
                  <div className="accordion-body">
                    {category.options.map((option, i) => (
                      <div className="form-check" key={i}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`${category.id}_${i}`}
                          checked={filters[category.id]?.includes(option)}
                          onChange={() => toggleFilter(category.id, option)}
                        />
                        <label className="form-check-label" htmlFor={`${category.id}_${i}`}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
