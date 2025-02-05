import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'

const JobDetail = () => {
const [saved, setsaved] = useState();

const toggleSaved = () => {
    setsaved(!saved)
}

  return (
    <>
        <div className="job_details">
            <Navbar />
          

            <div className="container top_pad">
                <div className="row py-5">
                    <div className="col-lg-4 mb-4 mb-lg-0">
                    <div className='card_sticky'>
                    <div className="card company_list_card mb-4">
                            <div className="card-body px-4 py-4">
                                <div className="">
                                <div className="logo_div"> <img src="/images/company3.gif" alt="" /></div>
                                        <div className="d-flex align-items-center justify-content-between py-2">
                                            <Link to='/companies/capgemini'>
                                            <h4 className="job_title">Mobilution IT</h4>
                                            </Link>
                                        </div>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni ad assumenda nulla dolore quae optio voluptatem esse libero ut rem.</p>
                                            <div className="d-flex align-items-center text-muted mt-3">
                                            <i className="fa-solid fa-location-dot me-1"></i>
                                            <span>Vienna Australia</span>
                                            </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-8 mx-auto">
                        <div className="card company_list_card mb-4">
                            <div className="card-body">
                              <div className="">
                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                                <div>
                                                <h5 className="job_title">Back End Developer</h5>
                                                <h6 className="job_company">Mobilution IT</h6>
                                                </div>
                                            {/* <div className="logo_div"> <img src="/images/company3.gif" alt="" /></div> */}
                                        </div>
                                            <div className="job_details  mt-2">
                                            <ul className="p-0 d-flex align-items-center">
                                                <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                                    <span><i className="fa-solid fa-briefcase me-1"></i></span>
                                                    <span>3-5 Yrs</span>
                                                </li>
                                                <li className="d-flex align-items-center pe-2 me-2 border-end" >
                                                    <span><i className="fa-solid fa-indian-rupee-sign me-1"></i></span>
                                                    <span>15k - 18k</span>
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
                                        
                                            <div className="d-flex justify-content-between align-items-center  mt-3 ">
                                                <span className="days">1 day ago</span>
                                                <div>
                                                    <button onClick={toggleSaved} className="btn btn-light btn-sm me-2">
                                                        <i className={`fa-bookmark me-1 ${saved ? 'fa-solid' :'fa-regular'}`}></i>
                                                        Save 
                                                        </button>
                                                    <button className="btn btn-light btn-sm me-2"><i className="fa-solid fa-share me-1"></i>Share</button>
                                            
                                                </div>
                                            </div>
                                            <button className="btn btn-register mt-3 ">Quick Apply</button>
                                    </div>

                             <div className='mt-4 job_response'>
                                        <h4>Job Details</h4>
                                        <h6 className='mb-3'>Role: Jack Henry Back-end Developer</h6>
                                        <p><strong>Key Responsibilities:</strong><br /></p>
                                        <ul className=''>
                                            <li><strong>Design and Development:</strong> Develop, test, and maintain server-side applications and services using best practices in software engineering. Ensure the reliability, scalability, and performance of back-end systems.</li><li><strong>Integration:</strong> Collaborate with front-end developers, data engineers, and product managers to integrate user-facing elements with server-side logic and ensure seamless end-to-end functionality.</li><li><strong>Banking Solutions:</strong> Utilize your commercial banking expertise to design and implement features and services that address the specific needs and challenges of financial institutions.</li><li><strong>Security and Compliance:</strong> Implement security measures and comply with regulatory requirements to safeguard sensitive financial data and ensure system integrity.</li><li><strong>Performance Optimization:</strong> Monitor and optimize application performance, identify bottlenecks, and troubleshoot issues to maintain high availability and efficiency.</li><li><strong>Documentation:</strong> Create and maintain technical documentation, including system architecture, design specifications, and API documentation.</li><li><strong>Collaboration:</strong> Participate in code reviews, contribute to team knowledge sharing, and collaborate with cross-functional teams to drive project success.</li>
                                        </ul>
                                        <p><strong>Qualifications:</strong><br /></p>
                                        <ul className=''>
                                            <li><strong><strong>Experience:</strong></strong>Minimum of 3-5 years of experience in back-end development with a strong focus on commercial banking or financial services applications.</li>
                                            <li><strong><strong>Technical Skills:</strong></strong>Proficiency in server-side languages and frameworks such as Java, C#, Python, Node.js, or similar. Experience with database systems (SQL and NoSQL), RESTful APIs, and microservices architecture.</li>
                                        </ul>

                                        <p><strong>Industry Type: </strong> IT Services & Consulting</p>
                                        <p><strong>Department: </strong> Engineering - Software & QA</p>
                                        <p><strong>Employment Type: </strong>Full Time, Temporary/Contractual</p>
                                        <p><strong>Role Category: </strong>Software Development</p>

                                    </div>
                            </div>
                        </div>
                        <div className="card company_list_card mb-4">
                        <div className="card-body key_skills">
                        <h4>Key Skills</h4>
                        <ul className="d-flex flex-wrap mb-2 p-0 ps-sm-4">
                            <li>Computer Science</li><li>React Js</li> <li>Javascript</li><li>Bootstrap</li><li>Figma</li><li>Digital Marketing</li><li>Figma</li>
                        </ul>
                        </div>
                        </div>
                        <div className="card company_list_card">
                            <div className="card-body">
                                <h4 className='mb-4'>Company Details</h4>
                                <h6>Impact IT PVT LTD</h6>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem dolor nam quod mollitia deleniti architecto assumenda sequi vero. Obcaecati, laborum.
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, atque veritatis. Aut dolore numquam sed?
                                </p>


                                {/* <p className='m-0'>email_id</p>
                                <p className='m-0'>mobile_number</p> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row all_job_posts py-5">
                    <h4 className='mb-3'>Related Jobs</h4>
                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4 ">
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
                                        <Link to='/job-detail'> <h6 className=''>Back End Developer</h6></Link>
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
                </div>
            </div>

            <Footer />

        </div>
    </>
  )
}

export default JobDetail