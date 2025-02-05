import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import JobSidebar from './JobSidebar'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

const SavedJobs = () => {

  const[saved, setSaved] = useState()

  const toggleSaved = () =>{
    setSaved(!saved)
  }
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
              <h1 className='job_head'>Jobs saved by you (3)</h1>

             <div className="no_saved_jobs d-none mb-4">
             <div className="card mt-4 border-0 shadow">
                <div className="card-body text-center">
                  <img className='job_search' src="/public/images/job_search.png"  alt="job_search" />
                  <h4>No saved jobs !</h4>
                  <p>No saved jobs! Tap on save icon on a job to save it.</p>
                  <div className=" btn btn-register">Search jobs</div>
                </div>
              </div>
             </div>

             <div className="saved_jobs_list mb-3">
                <div className="card border ">
                  <div className="card-body">
                    <h5><Link>Php/ Laravel Developer Requirement </Link></h5>
                    <h6 className='text-secondary'><Link>Infosys Pvt. Ltd</Link></h6>
                    <ul className="d-flex flex-wrap position-relative text-secondary p-0 m-0 saved_job_desc">
                      <li className='border-end pe-3 me-3 mb-2'><i className="fa-solid fa-briefcase me-2"></i><span>0-4 Years</span></li>
                      <li className='border-end pe-3 me-3 mb-2'><i className="fa-solid fa-dollar me-2"></i><span>2-4 LPA</span></li>
                      <li className='border-end pe-3 me-3 mb-2'><i className="fa-solid fa-location-dot me-2"></i><span>Chandigarh</span></li>
                    </ul>
                    <div className='text-secondary mb-2 job_note'>
                    <i className="fa-regular fa-clipboard me-2"></i> <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, saepe.</span>
                    </div>

                      <ul className="d-flex  p-0 skills_list">
                        <li>Php</li><li>Laravel</li><li>Database</li><li>Backend</li>
                      </ul>

                    <div className="d-flex justify-content-between">
                      <p className="m-0 text-capitalize text-muted"><small>Posted 3 days ago</small></p>
                      <p className="m-0" onClick={toggleSaved}>
                        <i className={`${!saved ? 'fa-solid' : 'fa-regular'} fa-bookmark me-2`}></i><span>Saved</span>
                        </p>
                    </div>
                  </div>
                </div>
             </div>
             <div className="saved_jobs_list mb-3">
                <div className="card border ">
                  <div className="card-body">
                    <h5><Link>Front End Web Developer </Link></h5>
                    <h6 className='text-secondary'><Link>Infosys Pvt. Ltd</Link></h6>
                    <ul className="d-flex flex-wrap position-relative text-secondary p-0 m-0 saved_job_desc">
                      <li className='border-end pe-3 me-3 mb-2'><i className="fa-solid fa-briefcase me-2"></i><span>0-4 Years</span></li>
                      <li className='border-end pe-3 me-3 mb-2'><i className="fa-solid fa-dollar me-2"></i><span>2-4 LPA</span></li>
                      <li className='border-end pe-3 me-3 mb-2'><i className="fa-solid fa-location-dot me-2"></i><span>Mohali</span></li>
                    </ul>
                    <div className='text-secondary mb-2 job_note'>
                    <i className="fa-regular fa-clipboard me-2"></i> <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, saepe.</span>
                    </div>

                      <ul className="d-flex  p-0 skills_list">
                        <li>Html</li><li>Css</li><li>React</li><li>Wordpress</li>
                      </ul>

                    <div className="d-flex justify-content-between">
                      <p className="m-0 text-capitalize text-muted"><small>Posted 1 day ago</small></p>
                      <p className="m-0" onClick={toggleSaved}>
                        <i className={`${!saved ? 'fa-solid' : 'fa-regular'} fa-bookmark me-2`}></i><span>Saved</span>
                        </p>
                    </div>
                  </div>
                </div>
             </div>
             <div className="saved_jobs_list mb-3">
                <div className="card border ">
                  <div className="card-body">
                    <h5><Link>Work from Home Delhi, Noida and Mumbai </Link></h5>
                    <h6 className='text-secondary'><Link>Teleperformance (TP)</Link></h6>
                    <ul className="d-flex flex-wrap position-relative text-secondary p-0 m-0 saved_job_desc">
                      <li className='border-end pe-3 me-3 mb-2'><i className="fa-solid fa-briefcase me-2"></i><span>0-4 Years</span></li>
                      <li className='border-end pe-3 me-3 mb-2'><i className="fa-solid fa-dollar me-2"></i><span>2-4 LPA</span></li>
                      <li className='border-end pe-3 me-3 mb-2'><i className="fa-solid fa-location-dot me-2"></i><span> Delhi, Noida and Mumbai </span></li>
                    </ul>
                    <div className='text-secondary mb-2 job_note'>
                    <i className="fa-regular fa-clipboard me-2"></i> <span className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, saepe.</span>
                    </div>

                      <ul className="d-flex  p-0 skills_list">
                        <li>Languages</li><li>Literature</li><li>English</li><li>ICSE</li>
                      </ul>

                    <div className="d-flex justify-content-between">
                      <p className="m-0 text-capitalize text-muted"><small>Posted 4 days ago</small></p>
                      <p className="m-0" onClick={toggleSaved}>
                        <i className={`${!saved ? 'fa-solid' : 'fa-regular'} fa-bookmark me-2`}></i><span>Saved</span>
                        </p>
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

export default SavedJobs