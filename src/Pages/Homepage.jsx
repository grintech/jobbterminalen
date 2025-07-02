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
import AdvertisementBanner from "../components/AdvertisementBanner";
import EmploymentTypes from "../components/EmploymentTypes";

const Homepage = () => {
  const { t } = useTranslation();
  // const [homeBannerPlace, setHomeBannerPlace] = useState("");
  const EMP_URL = import.meta.env.VITE_EMP_URL;

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
        <div className="row mt-5">
          <div className="col-md-9">
            <div className="card border-0" style={{background:"unset"}}>
              <AdvertisementBanner />
            </div>
          </div>

          <div className="col-md-3 d-none d-md-block text-center">
            <Link target="_blank" to={EMP_URL} >
              <div className="card create_free_job border-0 rounded-4 h-100" >
                  <div className="create_btn ">
                    <h3 className="blinking-text">{t("PostFreeJob")}</h3>
                  </div>
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* <Categories /> */}

      <EmploymentTypes />

      <HomepageJobs />

      <SponsorCompanies />

      <PopularJob />

      {/* {homeBannerPlace === "home_sponser" && (
        <h4 className="mb-3 text-center pt-4">Home Sponsers</h4>
      )}
      {homeBannerPlace === "home_sponser" && <HomeBanners />} */}

      <CompaniesSlider />

      <Footer />
    </div>
    </>
  );
};

export default Homepage;
