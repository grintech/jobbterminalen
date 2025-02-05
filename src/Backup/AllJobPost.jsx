import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Filter from '../components/Filter'

const AllJobPost = () => {
    return (
        <>
            <Navbar />
            <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
                <h1 className='fw-bold position-relative'>Job Vacancies</h1>
                <div className="banner_search container d-flex align-items-center justify-content-center mt-4">
                    <i className="fa-solid fa-magnifying-glass search_icon"></i>
                    <div className="row align-items-center justify-content-center w-100">
                        <div className="col-lg-4 border-end">
                            <div className="d-flex align-items-center">
                                <i className="fa-solid fa-magnifying-glass d-block d-lg-none"></i>
                                <input className='w-100' type="text" placeholder='Enter Skills / designation/ companies' />
                            </div>
                        </div>
                        <div className="col-lg-3 border-end">
                            <div className="d-flex align-items-center">
                                <i className="fa-solid fa-location-dot"></i>
                                <input className='w-100' type="text" placeholder='Location' />
                            </div>
                        </div>
                        <div className="col-lg-3 border-end">
                            <div className="d-flex align-items-center">
                                <i className="fa-solid fa-briefcase"></i>
                                <select className="form-select" aria-label="Default select example">
                                    <option default>Experience</option>
                                    <option value="1">One year</option>
                                    <option value="2">Two years</option>
                                    <option value="3">Three years</option>
                                    <option value="4">Four years</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-2 ">
                            <button type='submit' className="btn-register w-100">Search</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container d-flex flex-column align-items-center justify-content-center py-5 all_job_posts">
                <h4 className='mb-4'>All Jobs</h4>
                <div className="row">
                <div className="col-lg-3 mb-5 mb-lg-0">
                   <Filter />
                </div>
                <div className="col-lg-9">
                     <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="card company_list_card h-100">
                                <div className="card-body ">
                                    <div className="d-flex justify-content-between">
                                        <Link to='/companies/capgemini'>
                                            <div className="logo_div border-0 shadow">
                                                <img src="/images/company3.gif" alt="" />
                                            </div>
                                        </Link>
                                        <div className="d-flex align-items-center">
                                            <Link className=" btn-light shadow me-2"><i className="fa-regular fa-bookmark"></i></Link>
                                            <Link className=" btn-light shadow me-2"><i className="fa-solid fa-share"></i></Link>
                                        </div>
                                    </div>
                                    <div className="py-2 ">
                                        <Link to='/companies/capgemini'> <h5 className="py-2 ">Persistent</h5></Link>
                                        {/* <p className="m-0 d-flex sml_text">
                                            <span className="border-end d-inline-flex align-items-center me-2 pe-2">
                                                <i className="fa-solid fa-star me-1"></i> 3.7
                                            </span>
                                            <span>3.3K+ reviews</span>
                                        </p> */}
                                        <Link to='/job-detail'> <h6 className=''>Web Designer / Developer</h6></Link>
                                    </div>
                                    <p className="main_desc">Trusted global solutions company.</p>
                                    <ul className='p-0 d-flex flex-wrap'>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">Full Time</div></li>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">$4000 - $4500</div></li>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">Hyderabad</div></li>
                                    </ul>
                                    {/* <div className="d-flex justify-content-center align-items-center  ">
                                        <Link to='/job-detail' className="btn btn-login mx-2">Apply Now</Link>
                                        <div className="save_post mx-2"><i className="fa-regular fa-heart"></i></div>
                                    </div> */}
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="card company_list_card h-100">
                                <div className="card-body ">
                                    <div className="d-flex justify-content-between">
                                        <Link to='/companies/capgemini'>
                                            <div className="logo_div border-0 shadow">
                                                <img src="/images/company2.gif" alt="" />
                                            </div>
                                        </Link>
                                        <div className="d-flex align-items-center">
                                            <Link className=" btn-light shadow me-2"><i className="fa-regular fa-bookmark"></i></Link>
                                            <Link className=" btn-light shadow me-2"><i className="fa-solid fa-share"></i></Link>
                                        </div>
                                    </div>
                                    <div className="py-2 ">
                                        <Link to='/companies/capgemini'><h5 className="py-2 ">Capemini</h5></Link>
                                        <Link to='/job-detail'>
                                            <h6 className=''>Back End Developer</h6>
                                        </Link>
                                    </div>
                                    <p className="main_desc">Trusted global solutions company.</p>
                                    <ul className='p-0 d-flex flex-wrap'>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">Part Time</div></li>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">$4000 - $4500</div></li>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">Delhi</div></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="card company_list_card h-100">
                                <div className="card-body ">
                                    <div className="d-flex justify-content-between">
                                        <Link to='/companies/capgemini'>
                                            <div className="logo_div border-0 shadow">
                                                <img src="/images/company4.gif" alt="" />
                                            </div>
                                        </Link>
                                        <div className="d-flex align-items-center">
                                            <Link className=" btn-light shadow me-2"><i className="fa-regular fa-bookmark"></i></Link>
                                            <Link className=" btn-light shadow me-2"><i className="fa-solid fa-share"></i></Link>
                                        </div>
                                    </div>
                                    <div className="py-2 ">
                                        <Link to='/companies/capgemini'><h5 className="py-2 ">ICICI Bank</h5></Link>
                                        <Link to='/job-detail'>
                                            <h6 className=''>Finance Executive</h6>
                                        </Link>
                                    </div>
                                    <p className="main_desc">Trusted global solutions company.</p>
                                    <ul className='p-0 d-flex flex-wrap'>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">Full Time</div></li>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">$4000 - $4500</div></li>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">Hyderabad</div></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="card company_list_card h-100">
                                <div className="card-body ">
                                    <div className="d-flex justify-content-between">
                                        <Link to='/companies/capgemini'>
                                            <div className="logo_div border-0 shadow">
                                                <img src="/images/company5.gif" alt="" />
                                            </div>
                                        </Link>
                                        <div className="d-flex align-items-center">
                                            <Link className=" btn-light shadow me-2"><i className="fa-regular fa-bookmark"></i></Link>
                                            <Link className=" btn-light shadow me-2"><i className="fa-solid fa-share"></i></Link>
                                        </div>
                                    </div>
                                    <div className="py-2 ">
                                        <h5 className="py-2 ">ICICI Bank</h5>
                                        <h6 className=''>Web Designer / Developer</h6>
                                    </div>
                                    <p className="main_desc">Trusted global solutions company.</p>
                                    <ul className='p-0 d-flex flex-wrap'>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">Full Time</div></li>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">$4000 - $4500</div></li>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">Hyderabad</div></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="card company_list_card h-100">
                                <div className="card-body ">
                                    <div className="d-flex justify-content-between">
                                        <Link to='/companies/capgemini'>
                                            <div className="logo_div border-0 shadow">
                                                <img src="/images/company6.gif" alt="" />
                                            </div>
                                        </Link>
                                        <div className="d-flex align-items-center">
                                            <Link className=" btn-light shadow me-2"><i className="fa-regular fa-bookmark"></i></Link>
                                            <Link className=" btn-light shadow me-2"><i className="fa-solid fa-share"></i></Link>
                                        </div>
                                    </div>
                                    <div className="py-2 ">
                                        <h5 className="py-2 ">Optum</h5>
                                        <h6 className=''>Web Designer / Developer</h6>
                                    </div>
                                    <p className="main_desc">Trusted global solutions company.</p>
                                    <ul className='p-0 d-flex flex-wrap'>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">Full Time</div></li>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">$4000 - $4500</div></li>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">Hyderabad</div></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div className="card company_list_card h-100">
                                <div className="card-body ">
                                    <div className="d-flex justify-content-between">
                                        <Link to='/companies/capgemini'>
                                            <div className="logo_div border-0 shadow">
                                                <img src="/images/company7.gif" alt="" />
                                            </div>
                                        </Link>
                                        <div className="d-flex align-items-center">
                                            <Link className=" btn-light shadow me-2"><i className="fa-regular fa-bookmark"></i></Link>
                                            <Link className=" btn-light shadow me-2"><i className="fa-solid fa-share"></i></Link>
                                        </div>
                                    </div>
                                    <div className="py-2 ">
                                        <h5 className="py-2 ">JP Morgan</h5>
                                        <h6 className=''>Web Designer / Developer</h6>
                                    </div>
                                    <p className="main_desc">Trusted global solutions company.</p>
                                    <ul className='p-0 d-flex flex-wrap'>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">Full Time</div></li>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">$4000 - $4500</div></li>
                                        <li><div className="btn btn-sm btn-green me-2 mb-2">Hyderabad</div></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                     </div>
                      <div className="d-flex justify-content-center">
                      <nav aria-label="Page navigation example" className='mt-3'>
                        <ul className="pagination">
                            <li className="page-item">
                                <Link className="page-link" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </Link>
                            </li>
                            <li className="page-item"><Link className="page-link " >1</Link></li>
                            <li className="page-item"><Link className="page-link active">2</Link></li>
                            <li className="page-item"><Link className="page-link">3</Link></li>
                            <li className="page-item"><Link className="page-link">4</Link></li>
                            <li className="page-item">
                                <Link className="page-link" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </Link>
                            </li>
                        </ul>
                       </nav>
                      </div>
                 </div>
                </div>
               

                
            </div>

            <Footer />
        </>
    )
}

export default AllJobPost