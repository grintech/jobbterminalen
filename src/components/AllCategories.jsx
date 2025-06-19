import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import HomeBanners from "./HomeBanners";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import HomepageJobs from "./HomepageJobs";

const bearerKey = import.meta.env.VITE_BEARER_KEY;
const API_URL = import.meta.env.VITE_API_URL;
const IMG_URL = import.meta.env.VITE_IMG_URL;

const AllCategories = () => {
  const [bannerPlace, setBannerPlace] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  
  const startIndex = currentPage * itemsPerPage;
  const visibleCategories = categories.slice(startIndex, startIndex + itemsPerPage);
  


   const { t } = useTranslation();

    // fetchBannerPlace Api
    useEffect(() => {
        const fetchBannerPlace = async () => {
        try {
            const response = await axios.get(`${API_URL}/banner-ads.php`, {
            headers: {
                Authorization: `Bearer ${bearerKey}`,
                "Content-Type": "application/json",
            },
            });

            // console.log("Raw Banner Response:", response.data); 

            setBannerPlace(data.placement);

       } catch (error) {
            console.error("Error fetching HomeBanners data:", error);
        }
        };

        fetchBannerPlace();
    }, []);

  // fetchCategories Api
   useEffect(() => {
      // Load cached data from localStorage first (if available)
      const storedCategories = localStorage.getItem('categories');
      
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
        setLoading(false); // Show cached data immediately
      }
    
      const fetchCategories = async () => {
        try {
          const response = await axios.get(`${API_URL}/get_main_categories.php`, {
            headers: { Authorization: `Bearer ${bearerKey}` },
          });
    
          if (response.data.type === 'success' && Array.isArray(response.data.categories)) {
            setCategories(response.data.categories);
            
            // ✅ Save fresh data to localStorage
            localStorage.setItem('categories', JSON.stringify(response.data.categories));
          } else {
            setError('Unexpected API response');
          }
        } catch (err) {
          console.error('Error fetching categories:', err.response || err.message);
          setError('No categories available!');
        }
        setLoading(false);
      };
    
      fetchCategories();
    }, []);

  return (
    <>
       <Helmet>
          {/* <title>Explore Job Categories in Sweden - JobbTerminalen</title>
          <meta name="description" content="Browse through various job categories in Sweden on JobbTerminalen. Find the right job that matches your skills and interests." />
          <meta name="keywords" content="job categories, Sweden jobs, career opportunities, employment sectors, JobbTerminalen" />
          <meta property="og:title" content="Explore Job Categories in Sweden - JobbTerminalen" />
          <meta property="og:description" content="Browse through various job categories in Sweden on JobbTerminalen. Find the right job that matches your skills and interests." /> */}
       </Helmet>

       <div className="all_categories_page">
        <Navbar />
        <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
        <h1 className="fw-bold position-relative">{t("JobCategories")}</h1>
        </div>

        <div className="container">
            <div className="popular_categories pt-5">
                <h4 className='mb-3 text-center mb-4'>{t("AllCategories")}</h4>
                <div className='row justify-content-center flex-wrap d-none'>
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                        <Link to='/job/category/remote' className='cat_card'>
                            <div className="card ">
                                <div className="card-body ">
                                <i className="fa-solid fa-home "></i>
                                <h5 className='mt-3'>Remote</h5>
                                <p className='text-muted'>120 vacancy</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                        <Link to='/job/category/remote' className='cat_card'>
                            <div className="card ">
                                <div className="card-body ">
                                <i className="fa-solid fa-building "></i>
                                <h5 className='mt-3'>MNC</h5>
                                <p className='text-muted'>120 vacancy</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                        <Link to='/job/category/remote' className='cat_card'>
                            <div className="card ">
                                <div className="card-body ">
                                <i className="fa-solid fa-users "></i>
                                <h5 className='mt-3'>HR</h5>
                                <p className='text-muted'>120 vacancy</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                        <Link to='/job/category/remote' className='cat_card'>
                            <div className="card ">
                                <div className="card-body ">
                                <i className="fa-solid fa-gear "></i>
                                <h5 className='mt-3'>Engineering</h5>
                                <p className='text-muted'>120 vacancy</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                        <Link to='/job/category/remote' className='cat_card'>
                            <div className="card ">
                                <div className="card-body ">
                                <i className="fa-solid fa-dollar "></i>
                                <h5 className='mt-3'>Banking</h5>
                                <p className='text-muted'>120 vacancy</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                        <Link to='/job/category/remote' className='cat_card'>
                            <div className="card ">
                                <div className="card-body ">
                                <i className="fa-solid fa-chart-simple "></i>
                                <h5 className='mt-3'>Marketing</h5>
                                <p className='text-muted'>120 vacancy</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                        <Link to='/job/category/remote' className='cat_card'>
                            <div className="card ">
                                <div className="card-body ">
                                <i className="fa-solid fa-calculator "></i>
                                <h5 className='mt-3'>Accounting</h5>
                                <p className='text-muted'>120 vacancy</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                        <Link to='/job/category/remote' className='cat_card'>
                            <div className="card ">
                                <div className="card-body ">
                                <i className="fa-solid fa-globe "></i>
                                <h5 className='mt-3'>IT Service</h5>
                                <p className='text-muted'>120 vacancy</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                        <Link to='/job/category/remote' className='cat_card'>
                            <div className="card ">
                                <div className="card-body ">
                                <i className="fa-solid fa-graduation-cap "></i>
                                <h5 className='mt-3'>Fresher</h5>
                                <p className='text-muted'>120 vacancy</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                        <Link to='/job/category/remote' className='cat_card'>
                            <div className="card ">
                                <div className="card-body ">
                                <i className="fa-solid fa-handshake-angle"></i>
                                <h5 className='mt-3'>Sales</h5>
                                <p className='text-muted'>120 vacancy</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                    <Link to='/job/category/remote' className='cat_card'>
                        <div className="card ">
                            <div className="card-body ">
                            <i className="fa-solid fa-rocket"></i>
                            <h5 className='mt-3'>Startup</h5>
                            <p className='text-muted'>120 vacancy</p>
                            </div>
                        </div>
                    </Link>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                        <Link to='/job/category/remote' className='cat_card'>
                            <div className="card ">
                                <div className="card-body ">
                                <i className="fa-solid fa-robot "></i>
                                <h5 className='mt-3'>Data Science</h5>
                                <p className='text-muted'>120 vacancy</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>

                {loading ? (
                  <div className="loading-screen d-flex flex-column justify-content-center align-items-center">
                    <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className='mt-2'>Fetching data...</p>
                  </div>
                ) : error ? (
                    <div className='text-center text-theme'>
                     <img src="/images/no-data.webp" className='no_data' alt='No category' /> 
                     <p>{error}</p>
                    </div>
                ) : categories.length > 0 ? (

                    <div className="row justify-content-center flex-wrap">
                        {visibleCategories.map((category) => (
                            <div key={category.id} className="col-lg-2 col-md-3 col-sm-4 col-4 mb-4">
                            <Link  
                                to={`/job/category/${category.name.trim().toLowerCase().replace(/\s+/g, '-')}`} 
                                className="cat_card"
                            >
                                <div className="card h-100">
                                <div className="card-body text-center">    
                                    {category.image ?                 
                                    <img src={`${IMG_URL}/${category.image}`} alt={category.name} /> :
                                    <img src={`/images/cat-icon.png`} alt={category.name} /> }
                                    <h5 className="mt-3 mb-0">{category.name}</h5>
                                </div>
                                </div>
                            </Link>
                            </div>
                        ))}

                        <div className="d-flex justify-content-center align-items-center mt-3 ">
                        <button 
                          className="btn btn-sm btn-register mx-1" 
                          disabled={currentPage === 0}
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                          title="Previous"
                        >
                           <i className="fa-solid fa-chevron-left"></i>
                        </button>

                        <button 
                            className="btn btn-sm btn-register mx-1" 
                            disabled={currentPage >= totalPages - 1}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                            title="Next"
                        >
                             <i className="fa-solid fa-chevron-right"></i>
                        </button>
                        </div>

                    </div>

                ) : (
                    <div className='text-center text-theme'>
                    <img src="/images/no-data.webp" className='no_data' alt='No category' /> 
                    <p>No categories available at the moment.</p>
                    </div>
                ) } 


            </div>

            {/* <div className="category_side pb-4">
                {bannerPlace === "category_side" && <HomeBanners />}
                {bannerPlace === "home_top" && <HomeBanners />}
            </div> */}

            <HomepageJobs />

            <div className="row align-items-center pt-0 py-5">
                <div className="col-md-5">
                    <img src="/images/category.jpg" className='w-100 rounded-4' alt="about_img" />
                </div>
                <div className="col-md-7 mt-4 mt-md-0">
                    <h1 className='fw-bold'>{t("CategoryMainHead")}</h1>
                    <p className=''>{t("CategoryText")}</p>
                    <ul className=' m-0'>
                        <li className='d-flex align-items-baseline mb-2'>
                        <i className="fa-solid fa-check me-2"></i><span>{t("CategorySmlText1")}</span>
                        </li>
                        <li className='d-flex align-items-baseline mb-2'>
                        <i className="fa-solid fa-check me-2"></i><span>{t("CategorySmlText2")}</span>
                        </li>
                        <li className='d-flex align-items-baseline mb-2'>
                        <i className="fa-solid fa-check me-2"></i><span>{t("CategorySmlText3")}</span>
                        </li>
                    </ul>
                    <p>{t("CategoryFootText")}</p>
                </div>
            </div>
        </div>

        <Footer />

       </div>

    </>
  );
};

export default AllCategories