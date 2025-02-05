import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const CategoryList = () => {

  const [experience, setExperience] = useState(0);

  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };
  return (
    <>
       <Navbar />
        <div className="category_listing py-5">
        <div className="container top_pad">
          <div className="row">
            <div className="col-lg-3 mb-5 mb-lg-0 ">
              <div className="card_sticky">
               <div className="card  all_cat_filters">
                <div className="card-body">
                  <h5>All Filters</h5>
                  <hr />
                  <div>
                    <div className="accordion border-0" id="accordionExample1">
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                         <b>Job Type</b>
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse show "
                          data-bs-parent="#accordionExample1"
                        >
                          <div className="accordion-body">
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="check1" />
                            <label className="form-check-label" for="check1">
                               Work from office
                            </label>
                            </div>
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="check2" />
                            <label className="form-check-label" for="check2">
                               Hybrid
                            </label>
                            </div>
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="check3" />
                            <label className="form-check-label" for="check3">
                               Remote
                            </label>
                            </div>
                            {/* <div className="text-primary pt-2"><small className="fw-bold mt-3">View more</small></div> */}
                          </div>
                        </div>
                      </div>
                     
                    </div>

                    <div className="accordion border-0" id="accordionExample2">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="true"
                            aria-controls="collapseTwo"
                          >
                           <b>Salary</b>
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse show"
                          data-bs-parent="#accordionExample2"
                        >
                          <div className="accordion-body">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="Salarycheck1" />
                            <label className="form-check-label" for="Salarycheck1">
                              0-3 Lakhs
                            </label>
                         </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="Salarycheck2" />
                            <label className="form-check-label" for="Salarycheck2">
                              3-6 Lakhs
                            </label>
                         </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="Salarycheck3" />
                            <label className="form-check-label" for="Salarycheck3">
                              6-9 Lakhs
                            </label>
                         </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="Salarycheck4" />
                            <label className="form-check-label" for="Salarycheck4">
                              9-12 Lakhs
                            </label>
                         </div>
                         <div className="text-primary pt-2"><small className="fw-bold mt-3">View more</small></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="accordion border-0" id="accordionExample3">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="true"
                            aria-controls="collapseThree"
                          >
                           <b>Experience</b>
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse show"
                          data-bs-parent="#accordionExample3"
                        >
                          <div className="accordion-body">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="exp1" />
                            <label className="form-check-label" for="exp1">
                             0-1 Years
                            </label>
                         </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="exp2" />
                            <label className="form-check-label" for="exp2">
                              1-2 Years
                            </label>
                         </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="exp3" />
                            <label className="form-check-label" for="exp3">
                            3-5 Years
                            </label>
                         </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="Salarycheck4" />
                            <label className="form-check-label" for="Salarycheck4">
                             More than 5 Years
                            </label>
                         </div>
                          <div className="text-primary pt-2"><small className="fw-bold mt-3">View more</small></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="accordion border-0" id="accordionExample4">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFour"
                            aria-expanded="true"
                            aria-controls="collapseFour"
                          >
                           <b>Location</b>
                          </button>
                        </h2>
                        <div
                          id="collapseFour"
                          className="accordion-collapse collapse show"
                          data-bs-parent="#accordionExample4"
                        >
                          <div className="accordion-body">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="location1" />
                                <label className="form-check-label" for="location1">
                                Bengaluru
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="location2" />
                                <label className="form-check-label" for="location2">
                                Delhi/NCR
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="location3" />
                                <label className="form-check-label" for="location3">
                                Chennai
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="location4" />
                                <label className="form-check-label" for="location4">
                                Mumbai
                                </label>
                            </div>
                            <div className="text-primary pt-2"><small className="fw-bold mt-3">View more</small></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion border-0" id="accordionExample5">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFive"
                            aria-expanded="false"
                            aria-controls="collapseFive"
                          >
                           <b>Company Type</b>
                          </button>
                        </h2>
                        <div
                          id="collapseFive"
                          className="accordion-collapse collapse show"
                          data-bs-parent="#accordionExample5"
                        >
                          <div className="accordion-body">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="com_type1" />
                                <label className="form-check-label" for="com_type1">
                                Corporate
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="com_type2" />
                                <label className="form-check-label" for="com_type2">
                                Foreign MNC
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="com_type3" />
                                <label className="form-check-label" for="com_type3">
                                Indian MNC
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="com_type4" />
                                <label className="form-check-label" for="com_type4">
                                Startup
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="com_type5" />
                                <label className="form-check-label" for="com_type5">
                                Others
                                </label>
                            </div>
                            <div className="text-primary pt-2"><small className="fw-bold mt-3">View more</small></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion border-0" id="accordionExample6">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseSix"
                            aria-expanded="true"
                            aria-controls="collapseSix"
                          >
                         <b>Industry</b>
                          </button>
                        </h2>
                        <div
                          id="collapseSix"
                          className="accordion-collapse collapse show "
                          data-bs-parent="#accordionExample6"
                        >
                          <div className="accordion-body">
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="industry1" />
                            <label className="form-check-label" for="industry1">
                            IT Services & Consultancy
                            </label>
                            </div>
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="industry2" />
                            <label className="form-check-label" for="industry2">
                            BPO / Call Centre
                            </label>
                            </div>
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="industry3" />
                            <label className="form-check-label" for="industry3">
                            Education / Training
                            </label>
                            </div>
                            <div className="text-primary pt-2"><small className="fw-bold mt-3">View more</small></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    
                     
                      
                    
                      



                  </div>
                </div>
               </div>
              </div>
            </div>
            <div className="col-lg-9">
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card company_list_card">
                           <Link to='/job-detail'>
                           <div className="card-body">
                               <div className="d-flex justify-content-between">
                                    <div>
                                    <h5 className="job_title">Back End Developer</h5>
                                    <h6 className="job_company">Mobilution IT</h6>
                                    </div>
                                   <div className="logo_div"> <img src="/images/company3.gif" alt="" /></div>
                               </div>
                                <div className="job_details  mt-2">
                                  <ul className="p-0 d-flex align-items-center">
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-briefcase me-1"></i></span>
                                        <span>3-5 Yrs</span>
                                    </li>
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-indian-rupee-sign me-1"></i></span>
                                        <span>3-5 Yrs</span>
                                    </li>
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-location-dot me-1"></i></span>
                                        <span>Remote</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="job_description">
                                    <p className="m-0">
                                        <i className="fa-regular fa-clipboard me-1"></i>
                                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, porro.</span>    
                                    </p>
                                </div>
                                <div className="tags mt-2">
                                    <ul className="p-0 d-flex justify-content-between m-0">
                                        <li>Node.js</li>
                                        <li>HTML</li>
                                        <li>React.js</li>
                                        <li>Backend</li>
                                    </ul>
                                </div>
                                <div className="d-flex justify-content-between bookmarks mt-3">
                                    <span className="days">1 day ago</span>
                                    <span className="save"><i className="fa-regular fa-bookmark me-1"></i> Save</span>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card company_list_card">
                           <Link to='/job-detail'>
                           <div className="card-body">
                               <div className="d-flex justify-content-between">
                                    <div>
                                    <h5 className="job_title">Business Development Executive</h5>
                                    <h6 className="job_company">Bebo Technology</h6>
                                    </div>
                                   <div className="logo_div"> <img src="/images/company4.gif" alt="" /></div>
                               </div>
                                <div className="job_details  mt-2">
                                  <ul className="p-0 d-flex align-items-center">
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-briefcase me-1"></i></span>
                                        <span>1-2 Yrs</span>
                                    </li>
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-indian-rupee-sign me-1"></i></span>
                                        <span>3-5 Yrs</span>
                                    </li>
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-location-dot me-1"></i></span>
                                        <span>Kolkata</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="job_description">
                                    <p className="m-0">
                                        <i className="fa-regular fa-clipboard me-1"></i>
                                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, porro.</span>    
                                    </p>
                                </div>
                                <div className="tags mt-2">
                                    <ul className="p-0 d-flex justify-content-between m-0">
                                        <li>Node.js</li>
                                        <li>HTML</li>
                                        <li>React.js</li>
                                        <li>Backend</li>
                                    </ul>
                                </div>
                                <div className="d-flex justify-content-between bookmarks mt-3">
                                    <span className="days">1 day ago</span>
                                    <span className="save"><i className="fa-regular fa-bookmark me-1"></i> Save</span>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card company_list_card">
                           <Link to='/job-detail'>
                           <div className="card-body">
                               <div className="d-flex justify-content-between">
                                    <div>
                                    <h5 className="job_title">Back End Developer</h5>
                                    <h6 className="job_company">Mobilution IT</h6>
                                    </div>
                                   <div className="logo_div"> <img src="/images/company5.gif" alt="" /></div>
                               </div>
                                <div className="job_details  mt-2">
                                  <ul className="p-0 d-flex align-items-center">
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-briefcase me-1"></i></span>
                                        <span>3-5 Yrs</span>
                                    </li>
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-indian-rupee-sign me-1"></i></span>
                                        <span>3-5 Yrs</span>
                                    </li>
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-location-dot me-1"></i></span>
                                        <span>Remote</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="job_description">
                                    <p className="m-0">
                                        <i className="fa-regular fa-clipboard me-1"></i>
                                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, porro.</span>    
                                    </p>
                                </div>
                                <div className="tags mt-2">
                                    <ul className="p-0 d-flex justify-content-between m-0">
                                        <li>Node.js</li>
                                        <li>HTML</li>
                                        <li>React.js</li>
                                        <li>Backend</li>
                                    </ul>
                                </div>
                                <div className="d-flex justify-content-between bookmarks mt-3">
                                    <span className="days">1 day ago</span>
                                    <span className="save"><i className="fa-regular fa-bookmark me-1"></i> Save</span>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card company_list_card">
                           <Link to='/job-detail'>
                           <div className="card-body">
                               <div className="d-flex justify-content-between">
                                    <div>
                                    <h5 className="job_title">Business Development Executive</h5>
                                    <h6 className="job_company">Bebo Technology</h6>
                                    </div>
                                   <div className="logo_div"> <img src="/images/company6.gif" alt="" /></div>
                               </div>
                                <div className="job_details  mt-2">
                                  <ul className="p-0 d-flex align-items-center">
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-briefcase me-1"></i></span>
                                        <span>1-2 Yrs</span>
                                    </li>
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-indian-rupee-sign me-1"></i></span>
                                        <span>3-5 Yrs</span>
                                    </li>
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-location-dot me-1"></i></span>
                                        <span>Kolkata</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="job_description">
                                    <p className="m-0">
                                        <i className="fa-regular fa-clipboard me-1"></i>
                                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, porro.</span>    
                                    </p>
                                </div>
                                <div className="tags mt-2">
                                    <ul className="p-0 d-flex justify-content-between m-0">
                                        <li>Node.js</li>
                                        <li>HTML</li>
                                        <li>React.js</li>
                                        <li>Backend</li>
                                    </ul>
                                </div>
                                <div className="d-flex justify-content-between bookmarks mt-3">
                                    <span className="days">1 day ago</span>
                                    <span className="save"><i className="fa-regular fa-bookmark me-1"></i> Save</span>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card company_list_card">
                           <Link to='/job-detail'>
                           <div className="card-body">
                               <div className="d-flex justify-content-between">
                                    <div>
                                    <h5 className="job_title">Back End Developer</h5>
                                    <h6 className="job_company">Mobilution IT</h6>
                                    </div>
                                   <div className="logo_div"> <img src="/images/company5.gif" alt="" /></div>
                               </div>
                                <div className="job_details  mt-2">
                                  <ul className="p-0 d-flex align-items-center">
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-briefcase me-1"></i></span>
                                        <span>3-5 Yrs</span>
                                    </li>
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-indian-rupee-sign me-1"></i></span>
                                        <span>3-5 Yrs</span>
                                    </li>
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-location-dot me-1"></i></span>
                                        <span>Remote</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="job_description">
                                    <p className="m-0">
                                        <i className="fa-regular fa-clipboard me-1"></i>
                                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, porro.</span>    
                                    </p>
                                </div>
                                <div className="tags mt-2">
                                    <ul className="p-0 d-flex justify-content-between m-0">
                                        <li>Node.js</li>
                                        <li>HTML</li>
                                        <li>React.js</li>
                                        <li>Backend</li>
                                    </ul>
                                </div>
                                <div className="d-flex justify-content-between bookmarks mt-3">
                                    <span className="days">1 day ago</span>
                                    <span className="save"><i className="fa-regular fa-bookmark me-1"></i> Save</span>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card company_list_card">
                           <Link to='/job-detail'>
                           <div className="card-body">
                               <div className="d-flex justify-content-between">
                                    <div>
                                    <h5 className="job_title">Business Development Executive</h5>
                                    <h6 className="job_company">Bebo Technology</h6>
                                    </div>
                                   <div className="logo_div"> <img src="/images/company6.gif" alt="" /></div>
                               </div>
                                <div className="job_details  mt-2">
                                  <ul className="p-0 d-flex align-items-center">
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-briefcase me-1"></i></span>
                                        <span>1-2 Yrs</span>
                                    </li>
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-indian-rupee-sign me-1"></i></span>
                                        <span>3-5 Yrs</span>
                                    </li>
                                    <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                        <span><i className="fa-solid fa-location-dot me-1"></i></span>
                                        <span>Kolkata</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="job_description">
                                    <p className="m-0">
                                        <i className="fa-regular fa-clipboard me-1"></i>
                                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, porro.</span>    
                                    </p>
                                </div>
                                <div className="tags mt-2">
                                    <ul className="p-0 d-flex justify-content-between m-0">
                                        <li>Node.js</li>
                                        <li>HTML</li>
                                        <li>React.js</li>
                                        <li>Backend</li>
                                    </ul>
                                </div>
                                <div className="d-flex justify-content-between bookmarks mt-3">
                                    <span className="days">1 day ago</span>
                                    <span className="save"><i className="fa-regular fa-bookmark me-1"></i> Save</span>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
       </div>
       <Footer />
    </>
  );
};

export default CategoryList;
