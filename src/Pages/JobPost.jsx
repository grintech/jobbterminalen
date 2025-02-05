import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const JobPost = () => {
  return (
    <>
        <div className="jobpost_page">
          <Navbar />
            <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
              <h1 className="fw-bold position-relative">Create a Job Post</h1>
             </div>

             <div className="job_post_section py-5">
               <div className="container">
                <form action="">
                <div className="row">
                <h3 className='mb-3'>Post A Job</h3>
                <div className="col-lg-8">
                    <div className="card">
                       <div className="card-body">
                       <h4>Job Details :</h4>
                        <div className="row ">
                          <div className='col-12 mb-3'>
                            <label htmlFor="">Job Title</label>
                            <input type="text" className='form-control' placeholder='Title' />
                            </div>
                          <div className='col-12 mb-3'>
                            <label htmlFor="">Job Description</label>
                            <textarea className='form-control' rows={4} name="" id=""></textarea>
                            </div>
                            <div className='col-lg-6 mb-3'>
                                <label htmlFor="">Job Category</label>
                                <select className="form-select" aria-label="Default select example">
                                <option selected>Select</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                </select>
                            </div>
                            <div className='col-lg-6 mb-3'>
                                <label htmlFor="">Job Type</label>
                                <select className="form-select" aria-label="Default select example">
                                <option selected>Select</option>
                                <option value="1">Full Time</option>
                                <option value="2">Half Time</option>
                                <option value="3">Remote</option>
                                </select>
                            </div>
                            <div className='col-lg-6 mb-3'>
                                <label htmlFor="">Salary</label>
                                <select className="form-select" aria-label="Default select example">
                                <option selected>Select</option>
                                <option value="1">Monthly</option>
                                <option value="2">Hourly</option>
                                </select>
                            </div>
                            <div className='col-lg-6 d-flex align-items-end mb-3'>
                                <div className="row ">
                                    <div className="col-6 ">
                                    <div className="input-group">
                                    <span className="input-group-text" id="min1">$</span>
                                    <input type="number" placeholder='Min' className="form-control" aria-describedby="min1" />
                                    </div>
                                    </div>
                                    <div className="col-6 ">
                                    <div className="input-group">
                                    <span className="input-group-text" id="max1">$</span>
                                    <input type="number" placeholder='Max' className="form-control" aria-describedby="max1" />
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4>Skills & Experience :</h4>
                        <div className="row ">
                          <div className='col-12 mb-3'>
                                <label htmlFor="">Skills</label>
                                <input type="text" className='form-control' placeholder='Web Developer' />
                            </div>
                          <div className='col-12 mb-3'>
                                <label htmlFor="">Qualifications</label>
                                <input type="text" className='form-control' placeholder='Qualifications' />
                            </div>
                            <div className='col-lg-6 mb-3'>
                                <label htmlFor="">Experience</label>
                                <select className="form-select" aria-label="Default select example">
                                <option selected>Select</option>
                                <option value="1">0-1 years</option>
                                <option value="2">1-2 years</option>
                                <option value="3">3-5 years</option>
                                </select>
                            </div>
                           
                        </div>
                        <h4>Address :</h4>
                        <div className="row ">
                          <div className='col-12 mb-3'>
                                <label htmlFor="">Location</label>
                                <input type="text" className='form-control' placeholder='e.g Delhi' />
                            </div>
                          <div className='col-12 mb-3'>
                          <label htmlFor="">City</label>
                                <select className="form-select" aria-label="Default select example">
                                <option selected>Select</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                </select>
                            </div>
                            
                           
                        </div>
                        </div> 
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card">
                       <div className="card-body">
                       <h4>Company Details :</h4>
                        <div className="row">
                          <div className='col-12 mb-3'>
                            <label htmlFor="">Company name</label>
                            <input type="text" className='form-control' placeholder='Title' />
                          </div>
                          <div className='col-12 mb-3'>
                            <label htmlFor="">Tagline (Optional)</label>
                            <input type="text" className='form-control' placeholder='Title' />
                          </div>
                          <div className='col-12 mb-3'>
                            <label htmlFor="">Company Description</label>
                            <textarea className='form-control' rows={4} name="" id=""></textarea>
                          </div>
                          <div className='col-12 mb-3'>
                            <label htmlFor="">Website (Optional)</label>
                            <input type="url" className='form-control' placeholder='https://' />
                          </div>
                          <div className='col-12 mb-3'>
                            <label htmlFor="">Facebook Url (Optional)</label>
                            <input type="url" className='form-control' placeholder='companyname' />
                          </div>
                          <div className='col-12 mb-3'>
                            <label htmlFor="">LinkedIn Url (Optional)</label>
                            <input type="url" className='form-control' placeholder='companyname' />
                          </div>
                          <div className='col-12   mb-3'>
                            <label htmlFor='upload_logo' className='d-block'>Upload Logo</label>
                            <input id='upload_logo'type="file" className='form-control'  />
                          </div>
                        
                        </div>
                         <div className='text-end'>
                          <button type='submit' className="btn btn-register px-4">Submit</button>
                         </div>
                        </div> 
                    </div>
                </div>
                </div>
                </form>
               </div>

             </div>

            <Footer />
        </div>
    </>
  )
}

export default JobPost