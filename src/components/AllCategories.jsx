import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import HomeBanners from "./HomeBanners";
import { Helmet } from "react-helmet-async";

const bearerKey = import.meta.env.VITE_BEARER_KEY;
const API_URL = import.meta.env.VITE_API_URL;
const IMG_URL = import.meta.env.VITE_IMG_URL;

const AllCategories = () => {
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
       <Helmet>
          <title>Explore Job Categories in Sweden - JobbTerminalen</title>
          <meta name="description" content="Browse through various job categories in Sweden on JobbTerminalen. Find the right job that matches your skills and interests." />
          <meta name="keywords" content="job categories, Sweden jobs, career opportunities, employment sectors, JobbTerminalen" />
          <meta property="og:title" content="Explore Job Categories in Sweden - JobbTerminalen" />
          <meta property="og:description" content="Browse through various job categories in Sweden on JobbTerminalen. Find the right job that matches your skills and interests." />
       </Helmet>

       <div className="all_categories_page">
        <Navbar />
        <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
        <h1 className="fw-bold position-relative">Job Categories</h1>
        </div>

        <div className="container">
            <div className="popular_categories py-5">
                <h4 className='mb-3 text-center mb-4'>All Categories</h4>
                <div className='row justify-content-center flex-wrap '>
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
            </div>
            <div className="category_side pb-4">
                {bannerPlace === "category_side" && <HomeBanners />}
            </div>

            <div className="row align-items-center pt-0 py-5">
                <div className="col-md-5">
                    <img src="/images/about2.jpg" className='w-100 rounded-4' alt="about_img" />
                </div>
                <div className="col-md-7 mt-4 mt-md-0">
                    <h1 className='fw-bold'>We Help To Get The Best Job And Find A Talent</h1>
                    <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde itaque inventore qui earum consequuntur voluptate sunt doloremque, nesciunt necessitatibus! Delectus similique omnis dolore fugiat? Omnis eveniet id est quasi quae minus quas autem dolores a laboriosam neque, numquam cumque quam consequatur voluptates dicta laudantium laborum totam nisi quaerat. Ipsa, labore.</p>
                    <ul className='p-0 m-0'>
                        <li className='d-flex align-items-center mb-2'>
                        <i className="fa-solid fa-check me-2"></i><span>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
                        </li>
                        <li className='d-flex align-items-center mb-2'>
                        <i className="fa-solid fa-check me-2"></i><span>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
                        </li>
                        <li className='d-flex align-items-center mb-2'>
                        <i className="fa-solid fa-check me-2"></i><span>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <Footer />

       </div>

    </>
  );
};

export default AllCategories