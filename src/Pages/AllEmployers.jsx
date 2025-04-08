import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useAuthContext } from "../store/authContext";
import { toast, ToastContainer } from "react-toastify";

const AllEmployers = () => {

  const { t } = useTranslation();

  const [companies, setCompanies] = useState([]); 
  const [loading, setLoading] = useState(true); 
   const [likedCards, setLikedCards] = useState({}); // State to track liked companies
  const [error, setError] = useState(null); 
  const [pagination, setPagination] = useState({
    total_records: 0,
    total_pages: 0,
    current_page: 1,
    per_page: 12,
  }); // Pagination state

  const [cities, setCities] = useState({}); // Store city names for companies

  const bearerKey = import.meta.env.VITE_BEARER_KEY; 
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const { user } = useAuthContext();
    const userId = user ? user.id : null;

  // Function to fetch companies data
  const fetchCompanies = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/company_list.php?page=${page}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
        },
      });

      // console.log("Fetched Data:", response.data);
      
      if (response.data.type === "success") {
        const companyList = response.data.data || [];
        setCompanies(companyList);
        
        // Fetch city names for each company
        const cityPromises = companyList.map(async (company) => {
          if (company.latitude && company.longitude) {
            return getCityName(company.latitude, company.longitude);
          }
          return "City not found";
        });

        const cityNames = await Promise.all(cityPromises);

        // Convert cityNames array into an object {companyId: cityName}
        const cityMap = companyList.reduce((acc, company, index) => {
          acc[company.id] = cityNames[index];
          return acc;
        }, {});

        setCities(cityMap);

        setPagination({
          total_records: response.data.pagination.total_records,
          total_pages: response.data.pagination.total_pages,
          current_page: response.data.pagination.current_page,
          per_page: response.data.pagination.per_page,
        });
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
      setError("Failed to load companies"); 
    } finally {
      setLoading(false);
    }
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

  // Function to fetch city name using latitude and longitude
  async function getCityName(latitude, longitude) {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        for (let result of data.results) {
          for (let component of result.address_components) {
            if (component.types.includes("locality")) {
              return component.long_name;
            }
          }
        }
        return "City not found";
      } else {
        throw new Error("Geocoding API error: " + data.status);
      }
    } catch (error) {
      console.error("Error fetching city name:", error);
      return "City not found";
    }
  }


   // Fetch saved (bookmarked) companies for the user after page refresh
    useEffect(() => {
      if (userId) {
        axios
          .get(`${API_URL}/bookmarked-companies-list.php?user_id=${userId}`, {
            headers: {
              Authorization: `Bearer ${bearerKey}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.type === "success") {
              const savedCompanyIds = response.data.data.map(
                (company) => company.company_id
              );
              setLikedCards(
                savedCompanyIds.reduce((acc, id) => ({ ...acc, [id]: true }), {})
              );
            }
          })
          .catch((error) => {
            console.error("Error fetching saved companies:", error);
          });
      }
    }, [userId]);
  
    // Toggle like/unlike company
    const toggleLike = async (companyId) => {
      if (!userId) {
        toast.error("Please login to like companies.");
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append("user_id", userId);
        formData.append("company_id", companyId);
  
        const response = await axios.post(
          `${API_URL}/bookmark-companies.php`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${bearerKey}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        if (response.data.type === "success") {
          setLikedCards((prevState) => ({
            ...prevState,
            [companyId]: !prevState[companyId],
          }));
  
          // Show a toast message based on whether the company is saved or unsaved
          const actionMessage = likedCards[companyId]
            ? "Company Unsaved"
            : "Company Saved";
          toast.success(actionMessage);
        } else {
          toast.error("Failed to toggle like.");
        }
      } catch (error) {
        console.error("Error while toggling like:", error);
        toast.error("Error while saving company. Please try again.");
      }
    };


  return (
    <>
      <Helmet>
        <title>Top Companies Hiring in Sweden - JobbTerminalen</title>
        <meta name="description" content="Discover top companies hiring in Sweden. Browse company profiles, job openings, and find the best workplace for your career growth on JobbTerminalen." />
        <meta name="keywords" content="companies in Sweden, top employers, hiring companies, job portal Sweden, company profiles, career opportunities, best workplaces" />
        
      </Helmet>

      <div className="all_employers_page">
        <Navbar />
        <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
          <h1 className="fw-bold position-relative">{t("Companies")}</h1>
        </div>

        <div className="container py-5">
          <h3 className="mb-5">{t("CompanySmlHead1")}</h3>

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
            <div className="text-center text-theme " >
              <div className='text-center text-theme'>
                <img src="/images/no-data1.png" className='no_company' alt='' /> 
                <h6>{ error === "Failed to fetch" ? (
                <p className="text-center text-theme">Failed to fetch companies.Please try later!</p>
                  ) : (
                    <p className="text-center text-theme" >
                      {error}
                    </p>
                  )}
              </h6>
                </div>
              </div>
          ) : (
            <div className="row">
              {companies.length === 0 ? (
                <div className="text-center text-theme " >
                <div className='text-center text-theme'>
                  <img src="/images/no-data1.png" className='no_company' alt='' /> 
                  <h6>No companies found at the moment.Please try later.</h6>
                  </div>
                </div>
              ) : (
                companies.map((company) => (
                  <div className="col-lg-3 col-md-4 col-sm-6 mb-5" key={company.id}>
                    <div className="card company_list_card border-0 shadow h-100">
                      <div className="card-body">
                         <div className="text-end">
                         <i
                              className={`fa-heart ${
                                likedCards[company.id]
                                  ? "fa-solid"
                                  : "fa-regular"
                              }`}
                              onClick={() => toggleLike(company.id)}
                              style={{ cursor: "pointer",fontSize:"20px" }}
                            ></i>
                          </div>
                        <div className="logo_div me-3 mb-3 shadow ">
                          <Link  to={`/companies/${company.slug}`}>
                            <img
                              
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
                            {cities[company.id] ? `${cities[company.id]}` : ""}
                          </div>
                          <Link to={`/companies/${company.slug}`}>
                              <p className="text_blue text-center m-0">{company.job_count} Jobs</p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Pagination */}

          {
            pagination.total_pages > 1 && (
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
            )

          }


        </div>

        <Footer />
      </div>

       <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </>
  );
};

export default AllEmployers;
