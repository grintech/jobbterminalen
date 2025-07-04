import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, A11y, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAuthContext } from "../store/authContext";
import axios from "axios";
import { useTranslation } from "react-i18next";

const PopularJob = () => {
  const [jobs, setJobsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const { t, i18n } = useTranslation();
 
  const { user } = useAuthContext();
  const userId = user?.id || null;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true);
  //       setError(null);

  //       const response = await fetch(`${API_URL}/popular-category.php`, {
  //         headers: {
  //           Authorization: `Bearer ${bearerKey}`,
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch jobs data");
  //       }

  //       const result = await response.json();
  //       if (result.type === "success") {
  //         setJobsData(result.data);
  //       } else {
  //         throw new Error(result.message || "Failed to fetch jobs data");
  //       }
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [API_URL, bearerKey]);

  useEffect(() => {
  const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(`${API_URL}/popular-category.php`, {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        });

        const result = response.data;

        if (result.type === "success") {
          setJobsData(result.data);
        } else {
          throw new Error(result.message || t("FailedToFetchJobs"));
        }
      } catch (err) {
        setError(err.message || t("FailedToFetchJobs"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_URL, bearerKey, i18n.language]);


  // Define how many jobs per slide
  const jobsPerSlide = 6;

  // Split jobs into chunks based on jobsPerSlide
  const slides = [];
  for (let i = 0; i < jobs.length; i += jobsPerSlide) {
    slides.push(jobs.slice(i, i + jobsPerSlide));
  }

  return (
    <>
      {isLoading ? (
         <div className="loading-screen d-flex flex-column justify-content-center align-items-center">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">{t("Loading")}</span>
          </div>
          <p className="mt-2">{t("FetchingData")}</p>
        </div>
      ) : error ? (
        error === "Failed to fetch" ? (
          <p className="text-center text-theme">{t("FailedToFetchJobs")}</p>
        ) : (
          <p className="text-center text-theme" >
            {error}
          </p>
        )
      ) : (
        <div className="container py-5">
          <div className="popular_jobs">
            <div className="row">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <div className="pop_right position-relative">
                  <div className="card main-card border-0">
                    <Swiper
                      className="p-0 w-100"
                      modules={[Navigation, A11y, Pagination]}
                      spaceBetween={40}
                      slidesPerView={1}
                      navigation
                      // pagination={{
                      //   type: "bullets",
                      //   clickable: true,
                      // }}
                    >
                      {slides.map((jobGroup, index) => (
                        <SwiperSlide key={index}>
                          <div className="card-body py-5 px-4 px-md-5">
                            <div className="row">
                              {jobGroup.map((job) => (
                                <div
                                  className="col-sm-6 mb-4"
                                  key={job.category_name}
                                >
                                  <div className="card">
                                    <Link
                                      to={`/job/category/${job.category_slug.trim().toLowerCase().replace(/\s+/g, '-')}`}
                                      className="card-body d-flex justify-content-between align-items-baseline"
                                    >
                                      <div>
                                        <h6
                                          dangerouslySetInnerHTML={{
                                            __html: job.category_name,
                                          }}
                                        ></h6>
                                        <p className="m-0 text-muted">
                                          <span>
                                            {job.job_count}{" "}
                                            {job.job_count === 1
                                              ? t("Job")
                                              : t("Jobs")}
                                          </span>
                                        </p>
                                      </div>
                                      <i className="ms-2 fa-solid fa-chevron-right text-muted"></i>
                                    </Link>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>

              <div className="offset-lg-1 col-lg-5 text-center">
                {/* <img src="/images/popular1.png" className="pop_img" alt="job" /> */}
                    
                <Swiper
                  className="p-0 w-100"
                  modules={[Navigation, A11y , Autoplay]}
                  loop={true}
                  slidesPerView={1}
                  spaceBetween={20}
                  autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                  }}
                  speed={2500}
                  breakpoints={{
                    576: {
                      slidesPerView: 2,
                    },
                    992: {
                      slidesPerView: 1,
                    },
                  }}
                              
                 >
                    <SwiperSlide>
                        <img src="/images/popular1.png" className="pop_img mb-3" alt="job" />
                         <p className="m-0 text-center text-white" style={{ fontWeight: "500" }} >
                          Discover jobs across popular roles
                        </p>
                        <p className="m-0 text-center text-light">
                          <small>
                            Select a role and we'll show you all the related jobs!
                          </small>
                        </p>
                    </SwiperSlide>  
                    <SwiperSlide>
                       <Link target="_blank" to='https://tumbablomstercity.com/'>
                         <img src="/images/tumba.webp" className="pop_img mb-3" alt="job" />
                         <p className="m-0 text-center text-white" style={{ fontWeight: "500" }} >
                         Tumba Blomstercity
                        </p>
                        <p className="m-0 text-center text-light">
                          <small>
                            Vad du än vill säga
                          </small>
                        </p>
                       </Link>
                    </SwiperSlide>  
                    <SwiperSlide>
                        <img src="/images/2.jpg" className="pop_img mb-3" alt="job" />
                         <p className="m-0 text-center text-white" style={{ fontWeight: "500" }} >
                          Discover jobs across popular roles
                        </p>
                        <p className="m-0 text-center text-light">
                          <small>
                            Select a role and we'll show you all the related jobs!
                          </small>
                        </p>
                    </SwiperSlide>  

                </Swiper>

                 {/* <p className="m-0 text-center text-white" style={{ fontWeight: "500" }} >
                   Discover jobs across popular roles
                 </p>
                 <p className="m-0 text-center text-light">
                  <small>
                    Select a role and we'll show you all the related jobs!
                  </small>
                 </p> */}
                 
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopularJob;