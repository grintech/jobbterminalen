import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import CompaniesSlider from "../components/CompaniesSlider";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import SponsorCompanies from "../components/SponsorCompanies";
import { Link } from "react-router-dom";
import PopularJob from "../components/PopularJob";
import HomeBanners from "../components/HomeBanners";
import axios from "axios";
import "./homepage.css";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import HomepageJobs from "../components/HomepageJobs";

const Homepage = () => {
  const { t } = useTranslation();
  const [homeBannerPlace, setHomeBannerPlace] = useState("");
  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const [bannerPlace, setBannerPlace] = useState("");

  useEffect(() => {

     // Load cached data from localStorage first (if available)
    const storedBanner = localStorage.getItem('savedBanner');
     if (storedBanner) {
      setBannerPlace(JSON.parse(storedBanner));
    }

    const fetchBannerPlace = async () => {
      try {
        const response = await axios.get(`${API_URL}/banner-ads.php`, {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        });

         if (response.data.type === 'success' ) {
          setBannerPlace(response.data.data);      
          // Saving data to localStorage
          localStorage.setItem('savedBanner', JSON.stringify(response.data.data));
        } else {
          console.log('Unexpected API response');
        }

        

        // const rawResponse = response.data;
        // const splitResponse = rawResponse
        //   .split("}{")
        //   .map((item, index, array) => {
        //     if (index === 0) return item + "}";
        //     if (index === array.length - 1) return "{" + item;
        //     return "{" + item + "}";
        //   });

        // const parsedData = splitResponse.map((item) => JSON.parse(item));

        // const formattedArray = parsedData.map((item) => {
        //   return {
        //     type: item.type,
        //     message: item.message,
        //     data: {
        //       id: item.data.id,
        //       title: item.data.title,
        //       placement: item.data.placement,
        //     },
        //   };
        // });

        // if (formattedArray.length > 0) {
        //   setHomeBannerPlace(formattedArray[0].data.placement);
        //   // console.log('Banner Placement:', formattedArray[0].data.placement);
        // }
      } catch (error) {
        console.error("Error fetching HomeBanners data:", error);
      }
    };

    fetchBannerPlace();
  }, []);

  return (
    <>  
       <Helmet>
        {/* <title>JobbTerminalen - Find Your Dream Job in Sweden | Job Listings & Careers</title>
        <meta name="description" content="Looking for jobs in Sweden? JobbTerminalen connects job seekers with top employers. Explore thousands of job listings in various industries and apply today!" />
        <meta name="keywords" content="jobs in Sweden, Swedish job portal, job search Sweden, job vacancies, careers in Sweden, job listings, employment opportunities, find jobs, hiring in Sweden, remote jobs Sweden, full-time jobs, part-time jobs, IT jobs Sweden, healthcare jobs Sweden, marketing jobs Sweden" />
        <meta property="og:title" content="JobbTerminalen - Find Your Dream Job in Sweden | Job Listings & Careers" />
        <meta property="og:description" content="Looking for jobs in Sweden? JobbTerminalen connects job seekers with top employers. Explore thousands of job listings in various industries and apply today!" /> */}
      </Helmet>


    <div className="homepage">
      <Navbar />
      <div>
        <HeroBanner />
        {/* {homeBannerPlace === "home_top" && <HomeBanners />} */}
        
      </div>

      <div className="container">
          {bannerPlace && bannerPlace.placement === "home_top" && (
            <div className="col-lg-12 col-md-12 mt-5  banner_sideImage">
              <Link to={bannerPlace.redirect_url} target="_blank" rel="noopener noreferrer">
                <img
                  src={`${IMG_URL}/${bannerPlace.image_url}`}
                  className="img-fluid w-100 rounded-4"
                  alt={bannerPlace.title}
                />
              </Link>
            </div>
          )}
      </div>

      <Categories />

      <HomepageJobs />

      <SponsorCompanies />

      <PopularJob />

      {homeBannerPlace === "home_sponser" && (
        <h4 className="mb-3 text-center pt-4">Home Sponsers</h4>
      )}
      {homeBannerPlace === "home_sponser" && <HomeBanners />}

      <CompaniesSlider />

      <Footer />
    </div>
    </>
  );
};

export default Homepage;
