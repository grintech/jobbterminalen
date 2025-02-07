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

const Homepage = () => {
  const [homeBannerPlace, setHomeBannerPlace] = useState(""); 
  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBannerPlace = async () => {
      try {
        const response = await axios.get(`${API_URL}/banner-ads.php`, {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        });
        
        const rawResponse = response.data;
        const splitResponse = rawResponse.split('}{').map((item, index, array) => {
          if (index === 0) return item + '}';
          if (index === array.length - 1) return '{' + item;
          return '{' + item + '}';
        });
        
        const parsedData = splitResponse.map(item => JSON.parse(item));
        
        const formattedArray = parsedData.map(item => {
            return {
                type: item.type,
                message: item.message,
                data: {
                    id: item.data.id,
                    title: item.data.title,
                    placement: item.data.placement,
                }
            };
        });

        if (formattedArray.length > 0) {
          setHomeBannerPlace(formattedArray[0].data.placement);
          // console.log('Banner Placement:', formattedArray[0].data.placement);
        }

      } catch (error) {
        console.error("Error fetching HomeBanners data:", error);
      }
    };

    fetchBannerPlace();
  }, []);

  return (
    <div className="homepage">
      <Navbar />
      <div>
        <HeroBanner />
        {homeBannerPlace === "home_top" && <HomeBanners />}
      </div>

      <div className="home_job_types pb-5">
        <div className="container">
          <div className="row justify-content-center">
            {/* <div className="inside_card mb-4">
              <Link to='/work-type'>
                <div className="card">
                  <div className="card-body text-center d-flex flex-column align-items-center justify-content-center">
                    <i className="fa-solid fa-diagram-project"></i>
                    <h5 className='text-center mt-2 mb-0'>Project Basis</h5>
                  </div>
                </div>
              </Link>
            </div> */}
            <div className="inside_card mb-4">
              <Link>
                <div className="card">
                  <div className="card-body text-center d-flex flex-column align-items-center justify-content-center">
                    <i className="fa-solid fa-home"></i>
                    <h5 className='text-center mt-2 mb-0'>Remote</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="inside_card mb-4">
              <Link>
                <div className="card">
                  <div className="card-body text-center d-flex flex-column align-items-center justify-content-center">
                    <i className="fa-solid fa-building"></i>
                    <h5 className='text-center mt-2 mb-0'>Work From Office</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="inside_card mb-4">
              <Link>
                <div className="card">
                  <div className="card-body text-center d-flex flex-column align-items-center justify-content-center">
                    <i className="fa-solid fa-briefcase"></i>
                    <h5 className='text-center mt-2 mb-0'>Hybrid</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="inside_card mb-4">
              <Link>
                <div className="card">
                  <div className="card-body text-center d-flex flex-column align-items-center justify-content-center">
                    <i className="fa-solid fa-person"></i>
                    <h5 className='text-center mt-2 mb-0'>Student Jobs</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="inside_card mb-4">
              <Link>
                <div className="card">
                  <div className="card-body text-center d-flex flex-column align-items-center justify-content-center">
                    <i className="fa-solid fa-clock"></i>
                    <h5 className='text-center mt-2 mb-0'>Part Time Jobs</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="inside_card mb-4">
              <Link>
                <div className="card">
                  <div className="card-body text-center d-flex flex-column align-items-center justify-content-center">
                    <i className="fa-solid fa-user-graduate"></i>
                    <h5 className='text-center mt-2 mb-0'>Internship Jobs</h5>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>


        <Categories />

        <SponsorCompanies />

        <PopularJob />


        {homeBannerPlace === "home_sponser" && <h4 className="mb-3 text-center pt-4">Home Sponsers</h4>}
        {homeBannerPlace === "home_sponser" && <HomeBanners />}


        <CompaniesSlider />

      <Footer />
    </div>
  );
};

export default Homepage;
