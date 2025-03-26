import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigation, A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../store/authContext";

const CompaniesSlider = () => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [likedCards, setLikedCards] = useState({}); // State to track liked companies
  const [error, setError] = useState(null); // Error state

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const { user } = useAuthContext();
  const userId = user ? user.id : null;

  // Fetch companies from API
  useEffect(() => {
    // Load cached data from localStorage first (if available)
    const storedCompanies = localStorage.getItem("companyData");
  
    if (storedCompanies) {
      setCompanyData(JSON.parse(storedCompanies));
      setLoading(false); // Show cached data immediately
    }
  
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${API_URL}/company_list.php`, {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "multipart/form-data",
          },
        });
  
        if (response.data.type === "success" && response.data.data.length === 0) {
          setError("No companies available at the moment.");
        } else if (response.data.type === "success") {
          setCompanyData(response.data.data);
  
          // ✅ Save fresh data to localStorage
          localStorage.setItem("companyData", JSON.stringify(response.data.data));
        } else {
          setError(`API Error: ${response.data.message}`);
        }
      } catch (error) {
        if (error.response) {
          setError(
            `API Error: ${error.response.data.message || "Unknown error from server"}`
          );
        } else if (error.request) {
          setError("Network Error: No response from server");
        } else {
          setError(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchCompanies();
  }, []);
  

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
    <div className="top_companies container py-5">
      <h4 className="mb-3 text-center text-md-start">
        Recently Added Companies
      </h4>

      <div className="row align-items-center">
        <div className="col-md-3 d-none d-md-block">
          <Swiper
            className="p-0 pb-5"
            modules={[Navigation, A11y, Autoplay, Pagination]}
            spaceBetween={40}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              type: "bullets",
              clickable: true,
            }}
          >
            <SwiperSlide>
              <div className="position-relative recent_slider">
                <img src="/images/bg1.png" className="w-100 h-100" alt="" />
                <div className="inside_div">
                  <h5 className="text-center">Latest jobs</h5>
                  <button>
                    <Link>View job</Link>
                  </button>
                </div>
              </div>
            </SwiperSlide>
            {/* Other SwiperSlides go here */}
          </Swiper>
        </div>

        <div className="col-md-9">
          {loading ? (
            <div className="loading-screen d-flex flex-column justify-content-center align-items-center">
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Fetching companies...</p>
            </div>
          ) : error ? (
            <div className="text-center text-theme bg-white p-4 rounded-3">
              <div className="text-center text-theme">
                <img src="/images/no-company.webp" className="no_data" alt="" />
                <p >{error}</p>
              </div>
            </div>
          ) : (
            <>
              <Swiper
                className="pb-4 mt-4"
                modules={[Navigation, A11y]}
                spaceBetween={40}
                slidesPerView={1}
                navigation
                scrollbar={{ draggable: true }}
                breakpoints={{
                  475: { slidesPerView: 2 },
                  768: { slidesPerView: 2 },
                  1200: { slidesPerView: 3 },
                }}
              >
                {companyData.map((company) => (
                  <SwiperSlide key={company.id} className="h-auto">
                    <div className="card h-100">
                      <div className="card-body text-center">
                        <Link to={`/companies/${company.slug}`}>
                          <img
                            src={`${IMG_URL}/${
                              company.company_profile === "null"
                                ? "/public/images/frontimg/blank_logo.jpg"
                                : company.company_profile
                            }`}
                            alt={company.company_name}
                          />
                        </Link>
                        <div className="py-3 my-3 job_desc">
                          <h5 className="mb-2">{company.company_name}</h5>
                        </div>
                        <p className="main_desc">{company.company_tagline}</p>
                        <div className="d-flex justify-content-center align-items-center">
                          <Link
                            to={`/companies/${company.slug}`}
                            className="btn btn-login mx-2"
                          >
                            View More
                          </Link>
                          <div className="save_post mx-2">
                            <i
                              className={`fa-heart ${
                                likedCards[company.id]
                                  ? "fa-solid"
                                  : "fa-regular"
                              }`}
                              onClick={() => toggleLike(company.id)}
                              style={{ cursor: "pointer" }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="d-flex justify-content-center">
                <Link to="/companies" className="btn btn-outline-login">
                  View all companies
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompaniesSlider;
