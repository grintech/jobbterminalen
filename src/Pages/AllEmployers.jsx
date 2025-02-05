import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

const AllEmployers = () => {
  const [companies, setCompanies] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [pagination, setPagination] = useState({
    total_records: 0,
    total_pages: 0,
    current_page: 1,
    per_page: 12,
  }); // Pagination state

  const bearerKey = import.meta.env.VITE_BEARER_KEY; // Make sure this contains the correct token
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  // Function to fetch companies data
  const fetchCompanies = (page) => {
    setLoading(true);
    axios.get(`${API_URL}/company_list.php?page=${page}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Fetched Data:", response.data); 
        if (response.data.type === "success") {
          setCompanies(response.data.data); 
          setPagination({
            total_records: response.data.pagination.total_records,
            total_pages: response.data.pagination.total_pages,
            current_page: response.data.pagination.current_page,
            per_page: response.data.pagination.per_page,
          });
        }
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        setError("Failed to load companies"); 
        setLoading(false); 
      });
  };

  // Fetch companies on initial render and when current_page changes
  useEffect(() => {
    fetchCompanies(pagination.current_page);
  }, [pagination.current_page]);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= pagination.total_pages) {
      setPagination((prevState) => ({
        ...prevState,
        current_page: pageNumber,
      }));
    }
  };

  return (
    <>
      <div className="all_employers_page">
        <Navbar />
        <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
          <h1 className="fw-bold position-relative">Companies</h1>
        </div>

        <div className="container py-5">
          <h3 className=" mb-5">Here is the list of all the companies!</h3>

          {/* Loading and Error States */}
          {loading ? (
              <>
              <div className="loading-screen d-flex flex-column justify-content-center align-items-center">
                <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              <p className='mt-2'>Fetching data...</p>
              </div>
            </>
          ) : error ? (
            <div className="text-center text-danger">
              <p>{error}</p>
            </div>
          ) : (
            <div className="row">
              {companies.length === 0 ? (
                <p className="text-danger"> No companies found.</p>
              ) : (
                companies.map((company) => (
                  <div className="col-lg-3 col-md-4 col-sm-6 mb-5" key={company.id}>
                    <div className="card company_list_card border-0 shadow h-100">
                      <div className="card-body">
                        <div className="logo_div me-3 mb-3 shadow ">
                          <Link  to={`/companies/${company.slug}`}>
                            <img
                              className=""
                              src={`${IMG_URL}/${company.company_profile}`}
                              alt={company.company_name}
                            />
                          </Link>
                        </div>
                        <div className="pt-5 pb-3">
                          <Link to={`/companies/${company.slug}`}>
                            <h5>{company.company_name}</h5>
                          </Link>
                          <p className=" m-0">{company.company_tagline}</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-top pt-3">
                          <div className="text-muted me-2">
                            <i className="fa-solid fa-location-dot me-1 "></i>
                            {company.company_address}
                          </div>
                          <p className="text_blue text-center m-0">{company.job_count} Jobs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Pagination */}

          
          <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation example" className="mt-3">
              <ul className="pagination">
                <li
                  className={`page-item ${pagination.current_page === 1 ? "disabled" : ""}`}
                >
                  <Link
                    className="page-link"
                    aria-label="Previous"
                    onClick={() => paginate(pagination.current_page - 1)}
                  >
                    <span aria-hidden="true"><i className="fa-solid fa-arrow-left"></i></span>
                  </Link>
                </li>
                {[...Array(pagination.total_pages)].map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      pagination.current_page === index + 1 ? "active" : ""
                    }`}
                  >
                    <Link
                      className="page-link"
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </Link>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    pagination.current_page === pagination.total_pages ? "disabled" : ""
                  }`}
                >
                  <Link
                    className="page-link"
                    aria-label="Next"
                    onClick={() => paginate(pagination.current_page + 1)}
                  >
                    <span aria-hidden="true"><i className="fa-solid fa-arrow-right"></i></span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>


        </div>

        <Footer />
      </div>
    </>
  );
};

export default AllEmployers;
