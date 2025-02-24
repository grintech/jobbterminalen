import React from "react";
import { Link } from "react-router-dom";
import { Navigation, A11y, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

const PopularJob = () => {
  return (
    <>
      <div  className="container py-5">
        <div className="popular_jobs">
          <div className="row">
          
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="pop_right position-relative">
                <div className="card main-card border-0 ">
                  <Swiper
                    className="p-0 w-100"
                    modules={[Navigation, A11y, Pagination]}
                    spaceBetween={40}
                    slidesPerView={1}
                    navigation
                    pagination={{
                      type: "bullets",
                      clickable: true,
                    }}
                  >
                    <SwiperSlide >
                      <div className="card-body py-5 px-4 px-md-5">
                        <div className="row">
                          <div className=" col-sm-6 mb-4">
                            <div className="card">
                              <Link to='/job/category/remote' className="card-body d-flex justify-content-between align-items-baseline">
                               <div>
                               <h6>Software Development</h6>
                                <p className="m-0 text-muted"><span>1.5k Jobs</span> </p>
                               </div>
                                <i className="ms-2 fa-solid fa-chevron-right text-muted"></i>
                              </Link>
                            </div>
                          </div>
                          <div className=" col-sm-6 mb-4">
                            <div className="card">
                            <Link to='/job/category/remote' className="card-body d-flex justify-content-between align-items-baseline">
                               <div>
                               <h6>Data Analyst</h6>
                                <p className="m-0 text-muted"><span>1.5k Jobs</span> </p>
                               </div>
                                <i className="ms-2 fa-solid fa-chevron-right text-muted"></i>
                              </Link>
                            </div>
                          </div>
                          <div className=" col-sm-6 mb-4">
                            <div className="card">
                            <Link to='/job/category/remote' className="card-body d-flex justify-content-between align-items-baseline">
                               <div>
                               <h6>IT Industry</h6>
                                <p className="m-0 text-muted"><span>1.5k Jobs</span> </p>
                               </div>
                                <i className="ms-2 fa-solid fa-chevron-right text-muted"></i>
                              </Link>
                            </div>
                          </div>
                          <div className=" col-sm-6 mb-4">
                            <div className="card">
                            <Link to='/job/category/remote' className="card-body d-flex justify-content-between align-items-baseline">
                               <div>
                               <h6>Automation Engineer</h6>
                                <p className="m-0 text-muted"><span>1.5k Jobs</span> </p>
                               </div>
                                <i className="ms-2 fa-solid fa-chevron-right text-muted"></i>
                              </Link>
                            </div>
                          </div>
                          <div className=" col-sm-6 mb-4 mb-sm-0 ">
                            <div className="card">
                            <Link to='/job/category/remote' className="card-body d-flex justify-content-between align-items-baseline">
                               <div>
                               <h6>Fresher Jobs</h6>
                                <p className="m-0 text-muted"><span>1.5k Jobs</span> </p>
                               </div>
                                <i className="ms-2 fa-solid fa-chevron-right text-muted"></i>
                              </Link>
                            </div>
                          </div>
                          <div className=" col-sm-6 ">
                            <div className="card">
                            <Link to='/job/category/remote' className="card-body d-flex justify-content-between align-items-baseline">
                               <div>
                               <h6>Digital Marketing</h6>
                                <p className="m-0 text-muted"><span>1.5k Jobs</span> </p>
                               </div>
                                <i className="ms-2 fa-solid fa-chevron-right text-muted"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide >
                      <div className="card-body py-5 px-4 px-md-5">
                        <div className="row">
                          <div className=" col-sm-6 mb-4">
                            <div className="card">
                              <Link to='/job/category/remote' className="card-body d-flex justify-content-between align-items-baseline">
                               <div>
                               <h6>Software Development</h6>
                                <p className="m-0 text-muted"><span>1.5k Jobs</span> </p>
                               </div>
                                <i className="ms-2 fa-solid fa-chevron-right text-muted"></i>
                              </Link>
                            </div>
                          </div>
                          <div className=" col-sm-6 mb-4">
                            <div className="card">
                            <Link to='/job/category/remote' className="card-body d-flex justify-content-between align-items-baseline">
                               <div>
                               <h6>Data Analyst</h6>
                                <p className="m-0 text-muted"><span>1.5k Jobs</span> </p>
                               </div>
                                <i className="ms-2 fa-solid fa-chevron-right text-muted"></i>
                              </Link>
                            </div>
                          </div>
                          <div className=" col-sm-6 mb-4">
                            <div className="card">
                            <Link to='/job/category/remote' className="card-body d-flex justify-content-between align-items-baseline">
                               <div>
                               <h6>IT Industry</h6>
                                <p className="m-0 text-muted"><span>1.5k Jobs</span> </p>
                               </div>
                                <i className="ms-2 fa-solid fa-chevron-right text-muted"></i>
                              </Link>
                            </div>
                          </div>
                          <div className=" col-sm-6 mb-4">
                            <div className="card">
                            <Link to='/job/category/remote' className="card-body d-flex justify-content-between align-items-baseline">
                               <div>
                               <h6>Automation Engineer</h6>
                                <p className="m-0 text-muted"><span>1.5k Jobs</span> </p>
                               </div>
                                <i className="ms-2 fa-solid fa-chevron-right text-muted"></i>
                              </Link>
                            </div>
                          </div>
                          <div className=" col-sm-6 mb-4 mb-sm-0 ">
                            <div className="card">
                            <Link to='/job/category/remote' className="card-body d-flex justify-content-between align-items-baseline">
                               <div>
                               <h6>Fresher Jobs</h6>
                                <p className="m-0 text-muted"><span>1.5k Jobs</span> </p>
                               </div>
                                <i className="ms-2 fa-solid fa-chevron-right text-muted"></i>
                              </Link>
                            </div>
                          </div>
                          <div className=" col-sm-6 ">
                            <div className="card">
                            <Link to='/job/category/remote' className="card-body d-flex justify-content-between align-items-baseline">
                               <div>
                               <h6>Digital Marketing</h6>
                                <p className="m-0 text-muted"><span>1.5k Jobs</span> </p>
                               </div>
                                <i className="ms-2 fa-solid fa-chevron-right text-muted"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  
                  </Swiper>
                </div>
              </div>
            </div>
            <div className="offset-lg-2 col-lg-4 text-center">
              <img src="/images/popular1.png" className="pop_img" alt="job" />
              <p className="m-0 text-center text-white" style={{fontWeight:"500"}}>Discover jobs across popular roles</p>
              <p className=" m-0 text-center text-light">
               <small> Select a role and we'll show you all the related jobs !</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularJob;
