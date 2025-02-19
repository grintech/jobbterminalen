import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

import ApplyPopup from "../components/ApplyPopup";
import { useAuthContext } from "../store/authContext";
import { toast } from "react-toastify";
import HomeBanners from "../components/HomeBanners";

const CompanySingle = () => {
  const [companyData, setCompanyData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const { slug } = useParams();

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const { user } = useAuthContext();
  const userId = user ? user.id : null;

useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/company-single.php?slug=${slug}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await response.json();
      if (result.type === "success") {
        setCompanyData(result.data);
        setJobs(result.jobs);
      } else {
        setError(result.message || "Failed to fetch company data");
      }
    } catch (err) {
      setError("An error occurred while fetching company data.");
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, [slug]);

useEffect(() => {
  if (companyData?.latitude && companyData?.longitude) {
    getCityName(companyData.latitude, companyData.longitude)
      .then((cityName) => setCity(cityName))
      .catch((err) => console.error("Error getting city name:", err));
  }
}, [companyData]);



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
      return null;
    }
  }


  const calculateTimeAgo = (date) => {
    // Convert the input date to the correct UTC format (ISO string)
    const utcZero = date.replace(" ", "T") + "Z"; // Ensure it's in ISO format with a 'Z' for UTC
    
    // Create Date object from the UTC date and convert it to the local time zone
    const localDate = new Date(utcZero);

    const now = new Date();

    const diffTime = now - localDate;

    const diffHours = Math.floor(diffTime / (1000 * 60 * 60)); 

    if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    }

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  };

  const handleApplyClick = (jobId) => {
    if (!userId) {
      return toast.error("You must be logged in to apply.");
    }
  };

  const [bannerPlace, setBannerPlace] = useState("");

  useEffect(() => {
    const fetchBannerPlace = async () => {
      try {
        const response = await axios.get(`${API_URL}/banner-ads.php`, {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Raw Banner Response:", response.data); // Debugging

        // If response is a string, try parsing it correctly
        let parsedData;
        try {
          parsedData = JSON.parse(response.data);
        } catch (error) {
          const splitResponse = response.data.split("}{").map((item, index, array) => {
            if (index === 0) return item + "}";
            if (index === array.length - 1) return "{" + item;
            return "{" + item + "}";
          });

          parsedData = splitResponse.map((item) => JSON.parse(item));
        }

        // Ensure we have an array of banners
        const formattedArray = Array.isArray(parsedData) ? parsedData : [parsedData];

        if (formattedArray.length > 0 && formattedArray[0].data) {
          setBannerPlace(formattedArray[0].data.placement);
          console.log("Banner Placement:", formattedArray[0].data.placement);
        } else {
          console.warn("No valid banner data received.");
        }
      } catch (error) {
        console.error("Error fetching HomeBanners data:", error);
      }
    };

    fetchBannerPlace();
  }, []);


  
  return (
    <>
      <Navbar />
      <div className="hero_banner company_banner d-flex flex-column align-items-center justify-content-center position-relative">
        <h1 className="fw-bold position-relative">{companyData?.company_name || ''}</h1>
      </div>


      <div className={`container ${isLoading ? 'py-5' : ''} `}>
        {isLoading ? (
          <>
            <div className="loading-screen d-flex flex-column justify-content-center align-items-center">
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            <p className='mt-2'>Fetching data...</p>
            </div>
          </>
        ) : error ? (
          <div className="alert alert-danger text-center my-5" role="alert">
            {error}
          </div>
        ) : (
          
          <div className="col-md-12 mx-auto">
            <div className="card company_profile border-0 shadow">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <div className="d-flex align-items-center py-2">
                    <div className="logo_div me-3">
                      <img
                        src={`${IMG_URL}/${companyData.company_profile}`}
                        alt={companyData.company_name}
                        className="rounded"
                      />
                    </div>
                    <div>
                      <h5>{companyData.company_name}</h5>
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-location-dot me-1"></i>
                        {/* {city ? `${city} ` : ""} */}
                        {companyData.company_address || 'Location not provided'}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex py-2">
                    <button className="btn-register mx-2 fs-6">Follow</button>
                    <button className="btn-login mx-2 fs-6">See Jobs</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="companies_top container pt-5">
              {bannerPlace === "companies_top" && <HomeBanners />}
            </div>
            <div className="company_details py-5">
                    <div className="col-md-12 mx-auto">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="card border-0 shadow">
                            <div className="card-body py-4 px-4">
                              <h4 className="mb-3">About Company :</h4>
                              <div dangerouslySetInnerHTML={{ __html: companyData.company_about }} />
                                {companyData.company_gallery.length == 1 && (
                                  <div className="row">
                                    <div className="col-12 mt-3">
                                    <img
                                    src={`${IMG_URL}/${companyData.company_gallery.split(',')[0]}`}
                                    className="w-100 rounded shadow h-100"
                                    alt="company-img"
                                    />
                                      </div>
                                  </div>
                                )}

                              {companyData.company_gallery.split(',').length == 2 && (
                              <div className="row">
                                <div className="col-12 mt-3">
                                  <div className="row">
                                    <div className="col-lg-6 mb-4 mb-lg-0">
                                    <img
                                    src={`${IMG_URL}/${companyData.company_gallery.split(',')[0]}`}
                                    className="w-100 rounded shadow h-100"
                                    alt="company-img"
                                    />
                                    </div>
                                    <div className="col-lg-6 mb-4 mb-lg-0">
                                    <img
                                    src={`${IMG_URL}/${companyData.company_gallery.split(',')[1]}`}
                                    className="w-100 rounded shadow h-100"
                                    alt="company-img"
                                    />
                                    </div>
                                  </div>
                                  </div>
                              </div>
                              )}

                            {companyData.company_gallery.split(',').length >= 3 && (
                              <div className="row">
                                <div className="col-md-7 mb-4 mb-md-0">
                                  <img
                                    src={`${IMG_URL}/${companyData.company_gallery.split(',')[2]}`}
                                    className="w-100 rounded shadow h-100"
                                    alt="company-img"
                                  />
                                </div>
                                <div className="col-md-5">
                                  <img
                                    src={`${IMG_URL}/${companyData.company_gallery.split(',')[1]}`}
                                    className="w-100 rounded shadow mb-4"
                                    alt="company-img"
                                  />
                                  <img
                                    src={`${IMG_URL}/${companyData.company_gallery.split(',')[3]}`}
                                    className="w-100 rounded shadow"
                                    alt="company-img"
                                  />
                                </div>
                              </div>
                            )}


                              <div className="row mt-4">
                             { jobs.length >0 && <h4 className="mb-3">Vacancies :</h4>}
                                {jobs.map((job) => (
                                  <div className="col-md-6 mb-4" key={job.id}>
                                    <div className="card company_list_card border-0 shadow">
                                      <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                          <div className="logo_div me-3 mb-3">
                                            <img
                                              src={`${IMG_URL}/${companyData.company_profile}`}
                                              alt={job.title}
                                              className="rounded"
                                            />
                                          </div>
                                          <div className="">
                                          {userId ? (
                                              <ApplyPopup jobId={job.id}>
                                                Apply
                                              </ApplyPopup>
                                            ) : (
                                              <button className="btn btn-sm btn-primary" onClick={() => handleApplyClick(job.id)}>
                                                Apply
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                        <Link to={`/jobs/${job.slug}`}>
                                          <h5>{job.title}</h5>
                                        </Link>
                                        <p className="text-muted d-flex align-items-center">
                                          <i className="fa-regular fa-clock me-2"></i>
                                          Posted {calculateTimeAgo(job.created_at)}
                                        </p>
                                        <div className="d-flex justify-content-between">
                                          <div className="btn-sm btn-green me-2 mb-2">
                                            {job.job_type || 'Not specified'}
                                          </div>
                                          <div className="text-muted">
                                            <span className="text_blue fw-bold me-1">{job.salary_currency || 'N/A'}</span>
                                            {job.salary_range || 'N/A'}
                                          </div>
                                        </div>
                                        
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 company_info_card">
                          <div className="card_sticky">
                            <div className="card shadow border-0">
                              <div className="card-body">
                                <iframe
                                  height="200px"
                                  src={`https://www.google.com/maps?q=${companyData.latitude},${companyData.longitude}&hl=en&z=14&output=embed`}
                                  className="rounded w-100"
                                  allowFullScreen=""
                                ></iframe>
                                <div className="mt-3">
                                  <div className="d-flex align-items-baseline justify-content-between mt-2">
                                    <span className="text-muted fw-medium">Industry:</span>
                                    <span className='text-end'>{companyData.company_industry}</span>
                                  </div>
                                  <div className="d-flex align-items-baseline justify-content-between mt-2">
                                    <span className="text-muted fw-medium">Tagline:</span>
                                    <span className='text-end'>{companyData.company_tagline}</span>
                                  </div>
                                  <div className="d-flex align-items-baseline justify-content-between mt-2">
                                    <span className="text-muted fw-medium">Website:</span>
                                    <Link className='text-end' style={{wordBreak:"break-all"}} to={companyData.company_website} target="_blank">
                                      {companyData.company_website}
                                    </Link>
                                  </div>
                                  <div className="d-flex align-items-baseline justify-content-between mt-2">
                                    <span className="text-muted fw-medium">Location:</span>
                                    <span className='text-end'>{companyData.company_address}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
          </div>
        )}
      </div>
     {!isLoading && <Footer />}
    </>
  );
};

export default CompanySingle;
