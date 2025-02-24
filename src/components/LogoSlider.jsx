import React from "react";

import { A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/autoplay';

const LogoSlider = () => {
  return (
    <>
      <div className="companies_logo py-5">
        <div className="container border-top border-bottom bg-white">
          <div className=" d-flex py-3">
            <h6 
            style={{fontWeight:"600"}}
            className="border-end pe-3 me-2 mb-0">
              Featured <br /> Companies
            </h6>
            <Swiper
              
              // install Swiper modules
              modules={[A11y, Autoplay]}
              loop={true}
              autoplay={{
                  delay: 2000,
                  disableOnInteraction: false
              }}
              spaceBetween={40}
              slidesPerView={1}
              breakpoints={{
                375: {
                  slidesPerView: 2,
                },
                475: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                1200: {
                  slidesPerView: 6,
                },
              }}
              scrollbar={{ draggable: true }}
            >
              <SwiperSlide>
                <Link>
                  <img src="/images/company1.gif" alt="" />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link>
                  <img src="/images/company2.gif" alt="" />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link>
                  <img src="/images/company3.gif" alt="" />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link>
                  <img src="/images/company4.gif" alt="" />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link>
                  <img src="/images/company5.gif" alt="" />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link>
                  <img src="/images/company6.gif" alt="" />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link>
                  <img src="/images/company7.gif" alt="" />
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoSlider;
