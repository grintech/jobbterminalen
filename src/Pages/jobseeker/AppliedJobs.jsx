import React from 'react'
import Navbar from '../../components/Navbar'
import JobSidebar from './JobSidebar'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

const Appliedjobs = () => {

  const IMG_URL = import.meta.env.VITE_IMG_URL;

  return (
    <>
      <Navbar />
      <div className='top_pad'>
        <div className="container py-4">
          <div className="row">
            <div className="col-md-3 mb-4 mb-md-0">
              <JobSidebar />
            </div>
            <div className="col-md-9">
              <div className="no_saved_jobs d-none mb-4">
             <div className="card mt-4 border-0 shadow">
                <div className="card-body text-center">
                  <img className='job_search' src="/public/images/job_search.png"  alt="job_search" />
                  <h4>No applied jobs !</h4>
                  <p>Tap on apply button on a job detail page to apply on it.</p>
                  <Link to='/jobs'>
                  <div className=" btn btn-register">Search jobs</div>
                  </Link>
                </div>
              </div>
             </div>

             <div className="jobs_applied">
                  <h1 className='job_head'>Total Applies(2)</h1>
                  <div className="card border-0 shadow">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-4 border-end p-0">
                        <div className="nav flex-column nav-pills " id="v-pills-tab" role="tablist" aria-orientation="vertical">
                          <button className="nav-link active border-bottom" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">
                          <li className=' text-start py-3'>
                            <div className="company_card">
                                  <h6>Flipkart- Chat Support Executive- Work from Home after 6 months</h6>
                                  <p className=' text-secondary fw-semibold'>Credible Consultancy</p>
                                  <span className="border bg-white rounded-pill d-inline-flex align-items-center py-1 px-2">
                                    <i className="fa-solid fa-check-circle me-1"></i>
                                    <small>Application sent today</small>
                                  </span>
                            </div>
                          </li>
                          </button>
                          <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                          <li className=' text-start py-3'>
                            <div className="company_card">
                                  <h6>Frontend Web Developer Urgent Requirement</h6>
                                  <p className=' text-secondary fw-semibold'>Infosys Consultancy</p>
                                  <span className="border bg-white rounded-pill d-inline-flex align-items-center py-1 px-2">
                                    <i className="fa-solid fa-check-circle me-1"></i>
                                    <small>Application sent today</small>
                                  </span>
                            </div>
                          </li>
                          </button>
                        
                        </div>
                        </div>
                        <div className="col-lg-8">
                          <div className="tab-content" id="v-pills-tabContent">
                          <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">
                            <div className='card-body'>
                              <div className="border-bottom pb-3">
                                <h5 className='text-dark'>Flipkart- Chat Support Executive- Work from Home after 6 months</h5>
                                <h6 className='text-secondary m-0'>Credible Consultancy</h6>
                              </div>
                             <div className="border-bottom py-3">
                              <h5 className='text-dark'>Application Status</h5>
                              <ul className='job_status p-0'>
                                <li><span className='me-2'>Applied</span> <i className="fa-solid fa-check"></i> </li>
                                <li><span className='me-2'>Application sent</span><i className="fa-solid fa-check"></i></li>
                                <li><span className='me-2'>Awaiting Recruiter Action</span><i className="fa-solid fa-hourglass-start"></i></li>
                              </ul>
                             </div>
                             <div className="border-bottom py-3">
                              <h5 className='text-dark'>Activity on this job</h5>
                                <div className="d-inline-flex border rounded-2 card-body">
                                    <div className='d-flex border-end px-3'>
                                      <h4 className='m-0 me-2'>40</h4>
                                      <p className='m-0'>Total <br />applications</p>
                                    </div>
                                    <div className='d-flex px-3'>
                                      <h4 className='m-0 me-2'>00</h4>
                                      <p className='m-0'>Applications <br />viewed by recruiter</p>
                                    </div>
                                </div>
                             </div>
                             <div className=" py-3">
                              <h5 className='text-dark'>Similar Jobs</h5>
                              <div className="row">
                              <div className=" col-md-6 col-sm-6 mb-4">
                                <div className="card company_list_card h-100"><div className="card-body ">
                                  <div className="d-flex justify-content-between">
                                    <Link to="/companies/capgemini"><div className="logo_div border-0 shadow"><img src={`${IMG_URL}/1735535240_67722a885a29b.png`} alt="" /></div></Link>
                                    <div className="d-flex align-items-center"><Link className="btn-light shadow me-2" to="/jobs"><i className="fa-regular fa-bookmark"></i></Link><Link className="btn-light shadow me-2" to="/jobs"><i className="fa-solid fa-share"></i></Link></div>
                                    </div>
                                    <div className="py-2 "><Link to="/companies/capgemini"><h5 className="py-2 ">Grintech Web Agency</h5></Link><p className="m-0 d-flex sml_text"><span className="border-end d-inline-flex align-items-center me-2 pe-2"><i className="fa-solid fa-star me-1"></i> 3.7</span><span>3.3K+ reviews</span></p><Link to="/job-detail"><h6 className="mt-2">Senior Software Developer</h6></Link></div>
                                    <p className="main_desc">Trusted global solutions company.</p>
                                    <ul className="p-0 d-flex flex-wrap">
                                      <li>
                                      <div className="btn btn-sm btn-green me-2 mb-2">EUR 50000-70000</div>
                                      </li>
                                       <li>
                                        <div className="btn btn-sm btn-green me-2 mb-2"><i className="fa-solid fa-briefcase"></i>&nbsp;&nbsp;Fresher</div>
                                        </li>
                                        <li>
                                          <div className="btn btn-sm btn-green me-2 mb-2 text-start"><i className="fa-solid fa-location-dot me-1"></i>Mohali</div>
                                        </li>
                                     </ul>
                                    </div>
                                </div>
                               </div>

                               <div className=" col-md-6 col-sm-6 mb-4">
                                <div className="card company_list_card h-100"><div className="card-body ">
                                  <div className="d-flex justify-content-between">
                                    <Link to="/companies/capgemini"><div className="logo_div border-0 shadow"><img src={`${IMG_URL}/1735535240_67722a885a29b.png`} alt="" /></div></Link>
                                    <div className="d-flex align-items-center"><Link className="btn-light shadow me-2" to="/jobs"><i className="fa-regular fa-bookmark"></i></Link><Link className="btn-light shadow me-2" to="/jobs"><i className="fa-solid fa-share"></i></Link></div>
                                    </div>
                                    <div className="py-2 "><Link to="/companies/capgemini"><h5 className="py-2 ">Grintech Web Agency</h5></Link><p className="m-0 d-flex sml_text"><span className="border-end d-inline-flex align-items-center me-2 pe-2"><i className="fa-solid fa-star me-1"></i> 3.7</span><span>3.3K+ reviews</span></p><Link to="/job-detail"><h6 className="mt-2">Senior Software Developer</h6></Link></div>
                                    <p className="main_desc">Trusted global solutions company.</p>
                                    <ul className="p-0 d-flex flex-wrap">
                                      <li>
                                      <div className="btn btn-sm btn-green me-2 mb-2">EUR 50000-70000</div>
                                      </li>
                                       <li>
                                        <div className="btn btn-sm btn-green me-2 mb-2"><i className="fa-solid fa-briefcase"></i>&nbsp;&nbsp;Fresher</div>
                                        </li>
                                        <li>
                                          <div className="btn btn-sm btn-green me-2 mb-2 text-start"><i className="fa-solid fa-location-dot me-1"></i>Mohali</div>
                                        </li>
                                     </ul>
                                    </div>
                                </div>
                               </div>
                               </div>
                             </div>
                            </div>
                          </div>
                          <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0">
                          <div className='card-body'>
                              <div className="border-bottom pb-3">
                                <h5 className='text-dark'>Frontend Web Developer Urgent Requirement</h5>
                                <h6 className='text-secondary m-0'>Infosys Consultancy</h6>
                              </div>
                             <div className="border-bottom py-3">
                              <h5 className='text-dark'>Application Status</h5>
                              <ul className='job_status p-0'>
                                <li><span className='me-2'>Applied</span> <i className="fa-solid fa-check"></i> </li>
                                <li><span className='me-2'>Application sent</span><i className="fa-solid fa-check"></i></li>
                                <li><span className='me-2'>Awaiting Recruiter Action</span><i className="fa-solid fa-hourglass-start"></i></li>
                              </ul>
                             </div>
                             <div className="border-bottom py-3">
                              <h5 className='text-dark'>Activity on this job</h5>
                                <div className="d-inline-flex border rounded-2 card-body">
                                    <div className='d-flex border-end px-3'>
                                      <h4 className='m-0 me-2'>40</h4>
                                      <p className='m-0'>Total <br />applications</p>
                                    </div>
                                    <div className='d-flex px-3'>
                                      <h4 className='m-0 me-2'>00</h4>
                                      <p className='m-0'>Applications <br />viewed by recruiter</p>
                                    </div>
                                </div>
                             </div>
                             <div className=" py-3">
                              <h5 className='text-dark'>Similar Jobs</h5>
                              <div className="row">
                              <div className=" col-md-6 col-sm-6 mb-4">
                                <div className="card company_list_card h-100"><div className="card-body ">
                                  <div className="d-flex justify-content-between">
                                    <Link to="/companies/capgemini"><div className="logo_div border-0 shadow"><img src={`${IMG_URL}/1735535240_67722a885a29b.png`} alt="" /></div></Link>
                                    <div className="d-flex align-items-center"><Link className="btn-light shadow me-2" to="/jobs"><i className="fa-regular fa-bookmark"></i></Link><Link className="btn-light shadow me-2" to="/jobs"><i className="fa-solid fa-share"></i></Link></div>
                                    </div>
                                    <div className="py-2 "><Link to="/companies/capgemini"><h5 className="py-2 ">Grintech Web Agency</h5></Link><p className="m-0 d-flex sml_text"><span className="border-end d-inline-flex align-items-center me-2 pe-2"><i className="fa-solid fa-star me-1"></i> 3.7</span><span>3.3K+ reviews</span></p><Link to="/job-detail"><h6 className="mt-2">Senior Software Developer</h6></Link></div>
                                    <p className="main_desc">Trusted global solutions company.</p>
                                    <ul className="p-0 d-flex flex-wrap">
                                      <li>
                                      <div className="btn btn-sm btn-green me-2 mb-2">EUR 50000-70000</div>
                                      </li>
                                       <li>
                                        <div className="btn btn-sm btn-green me-2 mb-2"><i className="fa-solid fa-briefcase"></i>&nbsp;&nbsp;Fresher</div>
                                        </li>
                                        <li>
                                          <div className="btn btn-sm btn-green me-2 mb-2 text-start"><i className="fa-solid fa-location-dot me-1"></i>Mohali</div>
                                        </li>
                                     </ul>
                                    </div>
                                </div>
                               </div>

                               <div className=" col-md-6 col-sm-6 mb-4">
                                <div className="card company_list_card h-100"><div className="card-body ">
                                  <div className="d-flex justify-content-between">
                                    <Link to="/companies/capgemini"><div className="logo_div border-0 shadow"><img src={`${IMG_URL}/1735535240_67722a885a29b.png`} alt="" /></div></Link>
                                    <div className="d-flex align-items-center"><Link className="btn-light shadow me-2" to="/jobs"><i className="fa-regular fa-bookmark"></i></Link><Link className="btn-light shadow me-2" to="/jobs"><i className="fa-solid fa-share"></i></Link></div>
                                    </div>
                                    <div className="py-2 "><Link to="/companies/capgemini"><h5 className="py-2 ">Grintech Web Agency</h5></Link><p className="m-0 d-flex sml_text"><span className="border-end d-inline-flex align-items-center me-2 pe-2"><i className="fa-solid fa-star me-1"></i> 3.7</span><span>3.3K+ reviews</span></p><Link to="/job-detail"><h6 className="mt-2">Senior Software Developer</h6></Link></div>
                                    <p className="main_desc">Trusted global solutions company.</p>
                                    <ul className="p-0 d-flex flex-wrap">
                                      <li>
                                      <div className="btn btn-sm btn-green me-2 mb-2">EUR 50000-70000</div>
                                      </li>
                                       <li>
                                        <div className="btn btn-sm btn-green me-2 mb-2"><i className="fa-solid fa-briefcase"></i>&nbsp;&nbsp;Fresher</div>
                                        </li>
                                        <li>
                                          <div className="btn btn-sm btn-green me-2 mb-2 text-start"><i className="fa-solid fa-location-dot me-1"></i>Mohali</div>
                                        </li>
                                     </ul>
                                    </div>
                                </div>
                               </div>
                               </div>
                             </div>
                            </div>
                            </div>
                        
                          </div>
                        </div>
                      </div>
                
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

export default Appliedjobs