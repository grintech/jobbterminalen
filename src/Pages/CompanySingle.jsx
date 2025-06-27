import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
// import ApplyPopup from "../components/ApplyPopup";
import { useAuthContext } from "../store/authContext";
import { toast, ToastContainer } from "react-toastify";
// import HomeBanners from "../components/HomeBanners";

import Lightbox from "yet-another-react-lightbox";
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Avatar from 'react-avatar';
import { useTranslation } from "react-i18next";

const CompanySingle = () => {

  const {t} = useTranslation();
  const [companyData, setCompanyData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const { slug } = useParams();

  const [bannerPlace, setBannerPlace] = useState("");


  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const { user } = useAuthContext();
  const userId = user ? user.id : null;

  const vacanciesRef = useRef(null);

  const handleScrollToVacancies = () => {
    if (vacanciesRef.current) {
      const topOffset = 110; // Height accoding to header 
      const elementPosition = vacanciesRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

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
          // console.log(result.data);
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
    const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`;

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

  const calculateTimeAgo = (timestamp) => {
    if (!timestamp) return "";
  
    const now = new Date();
    const past = new Date(timestamp.replace(" ", "T"));
    const secondsPast = Math.floor((now - past) / 1000);
  
    const years = Math.floor(secondsPast / 31536000); // 60 * 60 * 24 * 365
    const months = Math.floor((secondsPast % 31536000) / 2592000); // 60 * 60 * 24 * 30
    const days = Math.floor((secondsPast % 2592000) / 86400); // 60 * 60 * 24
    const hours = Math.floor((secondsPast % 86400) / 3600); // 60 * 60
    const minutes = Math.floor((secondsPast % 3600) / 60);
  
    // Display logic based on time difference
    if (secondsPast < 60) {
      return `${secondsPast} sec${secondsPast !== 1 ? "s" : ""} ago`;
    }
  
    if (secondsPast < 3600) {
      return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
    }
  
    if (secondsPast < 86400) {
      return `${hours} hr${hours !== 1 ? "s" : ""} ago`;
    }
  
    if (secondsPast < 2592000) {  // 30 days
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  
    if (years > 0) {
      return `${years} year${years !== 1 ? "s" : ""} ${months > 0 ? `${months} month${months !== 1 ? "s" : ""}` : ""} ${days > 0 ? `${days} day${days !== 1 ? "s" : ""}` : ""} ago`;
    }
  
    if (months > 0) {
      return `${months} month${months !== 1 ? "s" : ""} ${days > 0 ? `${days} day${days !== 1 ? "s" : ""}` : ""} ago`;
    }
  
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }
  
  // const handleApplyClick = (jobId) => {
  //   if (!userId) {
  //     return toast.error("You must be logged in to apply.");
  //   }
  // };

  useEffect(() => {
    const fetchBannerPlace = async () => {
      try {
        const response = await axios.get(`${API_URL}/banner-ads.php`, {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        });

        // console.log("Raw Banner Response:", response.data.data);
        setBannerPlace(response.data.data); 

      } catch (error) {
        console.error("Error fetching HomeBanners data:", error);
      }
    };

    fetchBannerPlace();
  }, []);


 

  // if (!companyData || !companyData.company_gallery) {
  if (!companyData ) {
     return (
     <div className="loading-screen d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className='mt-2'>Please wait...</p>
      </div>
     ) 
  }

  const galleryImages = companyData.company_gallery
    .split(",")
    .filter(Boolean)
    .map((img) => ({ src: `${IMG_URL}/${img}` }));

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };


  return (
    < div className="company_single_page" >
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
          <div className="msg_card my-5">
            <div className="card border-0 shadow">
              <div className="card-body text-center p-4">
                <img loading="lazy" className="job_search" src="/images/no-data1.png" alt="job_search" />
                <h6 className="text-theme">{error == "No data found" ? "No details found at the moment.Please try later" : error}</h6>
              </div>
            </div>
          </div>
        ) : (

          <div className="col-md-12 mx-auto">
            <div className="card company_profile border-0 shadow">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <div className="d-flex align-items-center  py-2">
                    <div className="logo_div me-3">
                      {/* <img
                        loading="lazy"
                        src={`${IMG_URL}/${companyData.company_profile}`}
                        alt={companyData.company_name}
                        className="rounded"
                      /> */}
                      {!companyData.company_profile ? (
                        <Avatar
                          name={companyData.company_name}
                          size="80"
                          round="8px"
                          fgColor="#fff"
                          textSizeRatio={2}
                        />
                      ) : (
                        <img
                          src={`${IMG_URL}/${companyData.company_profile}`}
                          alt={companyData.company_name}
                          
                        />
                      )}
                    </div>
                    <div>
                      <h5>{companyData.company_name}</h5>
                      <div className="d-flex align-items-baseline">
                        <i className="fa-solid fa-location-dot me-1"></i>
                        {/* {city ? `${city} ` : ""} */}
                        <span className="company_address text-capitalize">
                          {companyData.company_address || 'Location not provided'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex py-2">
                    {/* <button className="btn-register mx-2 fs-6">Follow</button> */}
                    <button className="btn-login mx-2 fs-6" onClick={handleScrollToVacancies}>
                      {t("SeeJobs")}
                    </button>
                  </div>
                </div>
              </div>
            </div>

             {/* {bannerPlace && bannerPlace.placement === "home_top" && (
                <div className="col-lg-12 col-md-12 mt-4  banner_sideImage">
                  <Link to={bannerPlace.redirect_url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`${IMG_URL}/${bannerPlace.image_url}`}
                      className="img-fluid w-100 rounded-4"
                      alt={bannerPlace.title}
                    />
                  </Link>
                </div>
              )} */}

            <div id="company_details" className="company_details py-5">
              <div className="col-md-12 mx-auto">
                <div className="row">
                <div className="col-lg-8 mb-5 mb-lg-0">
                  <div className="card border-0 shadow">
                    <div className="card-body py-4 px-4">
                      <h4 className="mb-3">{t("AboutCompany")}</h4>
                      <div
                        id="about_company"
                        dangerouslySetInnerHTML={{ __html: companyData.company_about }}
                      />

                      {galleryImages.length > 0 && (
                        <>
                          <h6 className="mt-4">{t("ViewPhotos")}</h6>
                          <div className="row company_gallery_images">
                            {galleryImages.map((image, index) => (
                              <div className="col-6 col-sm-4 col-xl-3 mb-3 " key={index}>
                                <div className="card shadow-sm rounded-3 p-1">
                                  <img
                                    src={image.src}
                                    alt={`company-gallery-${index}`}
                                    className="w-100  rounded-3 p-2"
                                    style={{ cursor: "pointer", objectFit:"contain" }}
                                    onClick={() => handleImageClick(index)}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {open && (
                        <Lightbox
                          open={open}
                          close={() => setOpen(false)}
                          slides={galleryImages}
                          index={currentIndex}
                        />
                      )}
                    </div>
                  </div>
                </div>
                  
                  <div className="col-lg-4 company_info_card">
                    <div className="card_sticky">
                      <div className="card shadow border-0">
                        <div className="card-body">
                          <iframe
                            height="150px"
                            src={`https://www.google.com/maps?q=${companyData.latitude},${companyData.longitude}&hl=en&z=14&output=embed`}
                            className="rounded w-100"
                            allowFullScreen=""
                          >    
                          </iframe>
                          <div className="mt-3">
                            <div className="d-flex align-items-baseline justify-content-between mt-2">
                              <span className="text-muted fw-medium">{t("Industry")}</span>
                              <span className='text-end text-capitalize'>{companyData.company_industry.replace(/-/g, ' ')}</span>
                            </div>
                            <div className="d-flex align-items-baseline justify-content-between mt-2">
                              <span className="text-muted fw-medium">{t("Tagline")}</span>
                              <span className='text-end text-capitalize'>{companyData.company_tagline}</span>
                            </div>
                            <div className="d-flex align-items-baseline justify-content-between mt-2">
                              <span className="text-muted fw-medium">{t("Website")}</span>
                              <Link className='text-end' style={{ wordBreak: "break-all" }} to={companyData.company_website} target="_blank">
                                {companyData.company_website}
                              </Link>
                            </div>
                            <div className="d-flex align-items-baseline justify-content-between mt-2">
                              <span className="text-muted fw-medium">{t("Location")}</span>
                              <span className='text-end text-capitalize'>{companyData.company_address}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                       {jobs.length > 0 && (
                        <div id="vacancies_section" ref={vacanciesRef}
                          className="row mt-4">
                            <h5 className="mb-3">{t("Vacancies")}</h5>
                              <div className="col-12 mb-4" >
                                <div className="card company_list_card border-0 shadow">
                                  <div className="card-body">
                                    {jobs.slice(0,4).map((job) => (
                                      <div key={job.id}>
                                        <Link className="d-flex justify-content-between " to={`/jobs/${job.slug}`}>
                                          <h6 className="mb-2 text-capitalize" dangerouslySetInnerHTML={{ __html: job.title }}></h6>
                                          <i className="fa-solid fa-chevron-right"></i>
                                        </Link>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                          </div>
                          ) }
                      
                      {/* {bannerPlace && bannerPlace.placement === "home_top" && (
                          <div className="col-lg-12 col-md-12 mt-4  banner_sideImage">
                            <Link to={bannerPlace.redirect_url} target="_blank" rel="noopener noreferrer">
                              <img
                                src={`${IMG_URL}/${bannerPlace.image_url}`}
                                className="img-fluid w-100 rounded-4"
                                alt={bannerPlace.title}
                              />
                            </Link>    

                          </div>
                      )} */}

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {!isLoading && <Footer />}
      {/* <Footer /> */}

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

    </ div>
  );
};

export default CompanySingle;
