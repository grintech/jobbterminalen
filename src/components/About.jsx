import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import Footer from './Footer'
const About = () => {
  return (
    <>
        <div className="about_page">
            <Navbar />
            <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
                <h1 className='fw-bold position-relative'>About Us</h1>
             </div>
             {/* <div className="position-relative"><div className="shape overflow-hidden text-white"><svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path></svg></div></div> */}

            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-lg-5 mb-4 mb-lg-0">
                       <div className="row ">
                        <div className="col-7 ">
                        <img src="/images/bg1.png" className='w-100 h-100' alt="about1" />
                        </div>
                        <div className="col-5 h-100">
                         <img src="/images/about1.jpg" className='w-100 mb-3' alt="about2" />
                         <img src="/images/about2.jpg" className='w-100' alt="about3" />
                        </div>
                       </div>
                    </div>
                    <div className="col-lg-6 offset-lg-1 about_right">
                        <h4 className=''>Millions of jobs. <br />
                        Find the one that's right for you.</h4>
                        <p className="text-muted">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit hic iusto commodi quo praesentium adipisci rem perspiciatis nesciunt, recusandae excepturi autem! Odit exercitationem voluptates est non ab sint laboriosam in!</p>
                        <ul className="list-unstyled text-muted mb-0 mt-3"><li className="mb-1"><span className="text-primary h5 me-2"><i className="fa-solid fa-check-circle"></i></span>Digital Marketing Solutions for Tomorrow</li><li className="mb-1"><span className="text-primary h5 me-2"><i className="fa-solid fa-check-circle"></i></span>Our Talented &amp; Experienced Marketing Agency</li><li className="mb-1"><span className="text-primary h5 me-2"><i className="fa-solid fa-check-circle"></i></span>Create your own skin to match your brand</li></ul>
                    </div>
                </div>
                <div className="mt-5 py-4">
                 <div className="col-lg-7 col-md-9 col-12 text-center mx-auto">
                 <h4 className='text-center'>Here's why you'll love our platform</h4>
                 <p className="text-muted ">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>
                 </div>

                 <div className="row  contact_us_details mt-4">
                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body rounded-3 text-center ">
                              <div className="contact_icon shadow rounded-2 mb-3">
                              <i className="fa-solid fa-phone"></i>
                              </div>
                                <h5>24/7 Support</h5>
                                <p className="text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, non.</p>
                                <Link className='text-primary'>Read more <i className="fa-solid fa-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body rounded-3 text-center ">
                              <div className="contact_icon shadow rounded-2 mb-3">
                              <i className="fa-solid fa-microchip"></i>
                              </div>
                                <h5>Tech & Startup Jobs</h5>
                                <p className="text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, non.</p>
                                <Link className='text-primary'>Read more <i className="fa-solid fa-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body rounded-3 text-center ">
                              <div className="contact_icon shadow rounded-2 mb-3">
                              <i className="fa-solid fa-chart-line"></i>
                              </div>
                                <h5>Quick & Easy</h5>
                                <p className="text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, non.</p>
                                <Link className='text-primary'>Read more <i className="fa-solid fa-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body rounded-3 text-center ">
                              <div className="contact_icon shadow rounded-2 mb-3">
                              <i className="fa-regular fa-clock"></i>
                              </div>
                                <h5>Save Time</h5>
                                <p className="text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, non.</p>
                                <Link className='text-primary'>Read more <i className="fa-solid fa-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                  
                </div>
                </div>
                <div className="mt-5 py-4">
                 <div className="col-lg-7 col-md-9 col-12 text-center mx-auto">
                 <h4 className='text-center'>Have Question ? Get in touch!</h4>
                 <p className="text-muted ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio aspernatur blanditiis libero dolorem, delectus obcaecati.</p>
                 <Link to='/contact' className='btn btn-register fs-6 px-4 py-2 '>Contact Us</Link>
                 </div>
                 </div>
            </div>

          <Footer />

        </div>
    </>
  )
}

export default About