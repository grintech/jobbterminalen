import React, { useState } from 'react'
// import Swiper core and required modules
import { Navigation, A11y, Autoplay, Pagination} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const CompaniesSlider = () => {

  const [likedCards, setLikedCards] = useState({});

  const toggleLike = (cardId) => {
    setLikedCards((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));
  };


  const cardData = [
    { id: 1, image: '/images/company1.gif', title: 'Persistent', rating: 3.7, reviews: '3.3K+', description: 'Trusted global solutions company.' },
    { id: 2, image: '/images/company2.gif', title: 'Capgemini', rating: 3.7, reviews: '3.3K+', description: 'Trusted global solutions company.' },
    { id: 3, image: '/images/company3.gif', title: 'Cognizant', rating: 3.7, reviews: '3.3K+', description: 'Trusted global solutions company.' },
    { id: 4, image: '/images/company4.gif', title: 'ICICI Bank', rating: 3.7, reviews: '3.3K+', description: 'Trusted global solutions company.' },
    { id: 5, image: '/images/company5.gif', title: 'Accolite Digital', rating: 3.7, reviews: '3.3K+', description: 'Trusted global solutions company.' },
    { id: 6, image: '/images/company6.gif', title: 'Optum', rating: 3.7, reviews: '3.3K+', description: 'Trusted global solutions company.' },
    { id: 7, image: '/images/company7.gif', title: 'J.P Morgan', rating: 3.7, reviews: '3.3K+', description: 'Trusted global solutions company.' },
  ];

  return (
    <>
      <div className="top_companies container py-5">
        <h4 className="mb-3 text-center text-md-start">Recently Added Jobs</h4>
        <div className="row align-items-center">
            <div className="col-md-3 d-none d-md-block">
                {/* <img src="/images/bg1.png" className='w-100 rounded' alt="" /> */}
                <Swiper
                className="p-0 pb-5"
                // install Swiper modules
                modules={[Navigation, A11y,Autoplay,Pagination]}
                spaceBetween={40}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false
                }}
                pagination={{
                  type:"bullets",
                }}
           
        
        >
          <SwiperSlide >
            <div className='position-relative recent_slider'>
             <img src="/images/bg1.png" className='w-100 h-100 ' alt="" />
            <div className="inside_div">
              <h5 className='text-center'>Latest jobs</h5>
            <button className=''><Link>View job</Link></button>
            </div>
           </div>
          </SwiperSlide>
          <SwiperSlide >
          <div className='position-relative recent_slider'>
             <img src="/images/contact1.avif" className='w-100 h-100 ' alt="" />
             <div className="inside_div">
              <h5 className='text-center'>Featured jobs</h5>
            <button className=''><Link>View job</Link></button>
            </div>
           </div>
           
          </SwiperSlide>
          <SwiperSlide >
          <div className='position-relative recent_slider'>
          <img src="/images/contact.avif" className='w-100 h-100 ' alt="" />
          <div className="inside_div">
             <h5 className='text-center'>Recommended jobs</h5>
            <button className=''><Link>View job</Link></button>
            </div>
           </div>
           
          </SwiperSlide>
         
        </Swiper>
                

            </div>
            <div className="col-md-9">
            <Swiper
            className="pb-4 mt-4"
            modules={[Navigation, A11y]}
            spaceBetween={40}
            slidesPerView={1}
            navigation
            scrollbar={{ draggable: true }}
            breakpoints={{
              475: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            >
            {cardData.map((card) => (
              <SwiperSlide key={card.id}>
                <div className="card">
                  <div className="card-body text-center">
                    <img src={card.image} alt="" />
                    <div className="py-3 my-3 job_desc">
                      <h5 className="mb-2">{card.title}</h5>
                      <p className="m-0 d-flex align-items-center justify-content-center sml_text">
                        <span className="border-end d-inline-flex align-items-center me-2 pe-2">
                          <i className="fa-solid fa-star me-1"></i> {card.rating}
                        </span>
                        <span>{card.reviews} reviews</span>
                      </p>
                    </div>
                    <p className="main_desc">{card.description}</p>
                    <div className="d-flex justify-content-center align-items-center">
                      <Link to="/job-detail" className="btn btn-login mx-2">
                        View More
                      </Link>
                      <div
                        className="save_post mx-2"
                        onClick={() => toggleLike(card.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <i
                          className={`fa-heart ${
                            likedCards[card.id] ? 'fa-solid' : 'fa-regular'
                          }`}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
              <div className="d-flex justify-content-center ">
              <Link to='/companies' className='btn btn-outline-login'>View all companies</Link>
              </div>
            </div>
        </div>
      
      </div>
    </>

  );
};

export default CompaniesSlider;
