import React from 'react'
// import Swiper core and required modules
import { Navigation, Pagination, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomeSlider = () => {
    return (
        <>
            <div className="home_slider container py-5">
                <div className="col-lg-9 mx-auto">
                    <Swiper
                        className='pb-5 px-4'
                        // install Swiper modules
                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                     
                    >
                        <SwiperSlide><img className='w-100' src="/images/slide2.webp" alt="slide1" /></SwiperSlide>
                        <SwiperSlide><img className='w-100' src="/images/slide1.png" alt="slide2" /></SwiperSlide>
                        <SwiperSlide><img className='w-100' src="/images/slide3.webp" alt="slide3" /></SwiperSlide>
                    </Swiper>
                </div>
            </div>

        </>
    )
}

export default HomeSlider