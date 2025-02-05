import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const CompanySingle = () => {
  return (
    <>
      <Navbar />
       <div className="hero_banner company_banner d-flex flex-column align-items-center justify-content-center   position-relative">
        {/* <h1 className='fw-bold position-relative'></h1> */}
        </div>
        <div className="container">
        <div className="col-md-12  mx-auto">
          <div className="card company_profile border-0 shadow">
            <div className="card-body">
              <div className=" d-flex align-items-center justify-content-between flex-wrap">
                <div className='d-flex align-items-center py-2'>
                  <div className="logo_div me-3"> <img src="/images/company3.gif" alt="" /></div>
                  <div className=''>
                    <h5>Capgemini</h5>
                    <div className=" d-flex align-items-center"><i className="fa-solid fa-location-dot me-1"></i>Canberra, Australia</div>
                    </div>
                </div>
                <div className='d-flex py-2'>
                  <div className="d-flex"><button className="btn-register mx-2 fs-6">Follow</button></div>
                  <div className="d-flex"><button className="btn-login mx-2 fs-6">See Jobs</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="company_details py-5 mt-4">
          <div className="col-md-12 mx-auto">
            <div className="row">
              <div className="col-lg-8">
              <div className="card border-0 shadow">
            <div className="card-body py-4 px-4">
            <h4 className='mb-3'>About Company :</h4>
            <p className=''>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia nam deserunt voluptatum rerum adipisci laboriosam numquam doloremque iste tenetur ullam, porro illum ipsa. Minima, natus. Esse in at minima nostrum.</p>
            <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi eligendi aliquid, veniam nesciunt voluptates sed odit explicabo consequuntur itaque culpa minima cumque repellendus possimus molestiae optio illo sit? Quo placeat velit, minima, possimus, illo in dolores alias facere sequi numquam illum! Eius aliquid itaque eveniet nobis architecto nihil dolor. Quaerat.</p>
            <div className="row">
              <div className="col-7">
                <img src="/images/comp_img1.jpg " className='w-100 rounded shadow h-100' alt="" />
              </div>
              <div className="col-5">
                <img src="/images/comp_img2.jpg" className='w-100 rounded shadow mb-4' alt="" />
                <img src="/images/comp_img3.jpg" className='w-100 rounded shadow' alt="" />
              </div>
            </div>

            <div className="row mt-4">
              <h4 className="mb-3">Vacancies :</h4>
              <div className="col-md-6 mb-4">
                <div className="card company_list_card border-0 shadow">
                  <div className="card-body">
                  <div className="logo_div me-3 mb-3"> <img src="/images/company3.gif" alt="" /></div>
                    <Link to='/job-detail'><h5>Web Designer / Developer</h5></Link>
                    <p className="text-muted d-flex align-items-center"><i className="fa-solid fa-clock me-2"></i>Posted 2 days ago</p>
                    <div className="d-flex justify-content-between">
                    <div className=" btn-sm btn-green me-2 mb-2">Full Time</div>
                    <div className='text-muted'><span className='text_blue fw-bold'>$</span> 2500- 3000/month</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card company_list_card border-0 shadow">
                  <div className="card-body">
                  <div className="logo_div me-3 mb-3"> <img src="/images/company3.gif" alt="" /></div>
                    <Link to='/job-detail'><h5>Head Department Manager </h5></Link>
                    <p className="text-muted d-flex align-items-center"><i className="fa-solid fa-clock me-2"></i>Posted 2 days ago</p>
                    <div className="d-flex justify-content-between">
                    <div className=" btn-sm btn-green me-2 mb-2">Remote</div>
                    <div className='text-muted'><span className='text_blue fw-bold'>$</span> 2500- 3000/month</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card company_list_card border-0 shadow">
                  <div className="card-body">
                  <div className="logo_div me-3 mb-3"> <img src="/images/company3.gif" alt="" /></div>
                    <Link to='/job-detail'><h5>Web Designer / Developer</h5></Link>
                    <p className="text-muted d-flex align-items-center"><i className="fa-solid fa-clock me-2"></i>Posted 2 days ago</p>
                    <div className="d-flex justify-content-between">
                    <div className=" btn-sm btn-green me-2 mb-2">Remote</div>
                    <div className='text-muted'><span className='text_blue fw-bold'>$</span> 2500- 3000/month</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card company_list_card border-0 shadow">
                  <div className="card-body">
                  <div className="logo_div me-3 mb-3"> <img src="/images/company3.gif" alt="" /></div>
                    <Link to='/job-detail'><h5>Head Department Manager </h5></Link>
                    <p className="text-muted d-flex align-items-center"><i className="fa-solid fa-clock me-2"></i>Posted 2 days ago</p>
                    <div className="d-flex justify-content-between">
                    <div className=" btn-sm btn-green me-2 mb-2">Remote</div>
                    <div className='text-muted'><span className='text_blue fw-bold'>$</span> 2500- 3000/month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
           </div>
              </div>
              <div className="col-lg-4 company_info_card">
                <div className=" card_sticky">
                  <div className="card shadow border-0">
                    <div className="card-body">
                    <iframe height="200px" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin" className="rounded w-100"  allowFullScreen="">
                    </iframe>
                    <div className="mt-3"><div className="d-flex align-items-center justify-content-between mt-2"><span className="text-muted fw-medium">Founded:</span><span>1984</span></div><div className="d-flex align-items-center justify-content-between mt-2"><span className="text-muted fw-medium">Founder:</span><span>Liu Chuanzhi</span></div><div className="d-flex align-items-center justify-content-between mt-2"><span className="text-muted fw-medium">Headquarters:</span><span>Hong Kong</span></div><div className="d-flex align-items-center justify-content-between mt-2"><span className="text-muted fw-medium">Number of employees:</span><span>+ 7500</span></div>
                    <div className="d-flex align-items-center justify-content-between mt-2"><span className="text-muted fw-medium">Website:</span><span>www.example.com</span>
                    </div>
                    {/* <div className="d-flex align-items-center justify-content-between mt-2">
                      <span className="text-muted fw-medium">Social:</span>
                       <div className="d-flex company_social_links"> 
                      <Link><i className="fa-brands fa-facebook shadow mx-1"></i></Link>
                      <Link><i className="fa-brands fa-instagram shadow mx-1"></i></Link>
                      <Link><i className="fa-brands fa-twitter shadow mx-1"></i></Link>
                      <Link><i className="fa-brands fa-youtube shadow mx-1"></i></Link>
                      <Link><i className="fa-brands fa-linkedin shadow mx-1"></i></Link>
                      </div>
                    </div> */}
                    
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="related_companies py-5  ">
          <div className="col-lg-7 col-md-9 mx-auto text-center">
            <h4 className=''>Related Companies</h4>
            <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio sit ad deserunt dolorem architecto repellat delectus distinctio quasi, amet ipsum.</p>
          </div>
          <div className="row mt-5">
            <div className="col-lg-3 col-md-4 mb-4">
            <div className="card company_list_card border-0 shadow">
                  <div className="card-body">
                  <div className="logo_div me-3 mb-3 shadow-sm "> <img className='' src="/images/company5.gif" alt="" /></div>
                  <Link><h5>Company Name</h5></Link>
                    <p className='text-muted'>Digital Marketing Solutions for Tomorrow</p>
                    <div className="d-flex justify-content-between align-items-center border-top pt-3">
                    <div className="btn btn-sm btn-green me-2 mb-2">
                      <i className="fa-solid fa-location-dot me-1 "></i>Hyderabad</div>
                    <p className='text_blue m-0'>40 Jobs</p>
                    </div>
                  </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 mb-4">
            <div className="card company_list_card border-0 shadow">
                  <div className="card-body">
                  <div className="logo_div me-3 mb-3 shadow-sm "> <img className='' src="/images/company6.gif" alt="" /></div>
                  <Link><h5>Company Name</h5></Link>
                    <p className='text-muted'>Digital Marketing Solutions for Tomorrow</p>
                    <div className="d-flex justify-content-between align-items-center border-top pt-3">
                    <div className="btn btn-sm btn-green me-2 mb-2">
                      <i className="fa-solid fa-location-dot me-1 "></i>Mumbai</div>
                    <p className='text_blue m-0'>40 Jobs</p>
                    </div>
                  </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 mb-4">
            <div className="card company_list_card border-0 shadow">
                  <div className="card-body">
                  <div className="logo_div me-3 mb-3 shadow-sm "> <img className='' src="/images/company7.gif" alt="" /></div>
                  <Link><h5>Company Name</h5></Link>
                    <p className='text-muted'>Digital Marketing Solutions for Tomorrow</p>
                    <div className="d-flex justify-content-between align-items-center border-top pt-3">
                    <div className="btn btn-sm btn-green me-2 mb-2">
                      <i className="fa-solid fa-location-dot me-1 "></i>Chennai</div>
                    <p className='text_blue m-0'>40 Jobs</p>
                    </div>
                  </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 mb-4">
            <div className="card company_list_card border-0 shadow">
                  <div className="card-body">
                  <div className="logo_div me-3 mb-3 shadow-sm "> <img className='' src="/images/company2.gif" alt="" /></div>
                  <Link><h5>Company Name</h5></Link>
                    <p className='text-muted'>Digital Marketing Solutions for Tomorrow</p>
                    <div className="d-flex justify-content-between align-items-center border-top pt-3">
                    <div className="btn btn-sm btn-green me-2 mb-2">
                      <i className="fa-solid fa-location-dot me-1 "></i>Delhi</div>
                    <p className='text_blue m-0'>40 Jobs</p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        </div>

        <Footer />
        
    </>
  )
}

export default CompanySingle