import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const ProjectBasis = () => {
  return (
   <>
      <Navbar />
      <div className="project_basis top_pad">
      <div className="container mt-2 py-5">
      <div className="row  mb-1">
            <div className="col-md-8 mx-auto order-2 order-md-1 ">
                <h5 className='mb-3'>Jobs Feed</h5>
                <div className="card all_cat_filters mb-4">
                <div className="card-body">
                    <h5>Apply Filter <i className="bi bi-filter"></i></h5>
                    <hr />
                    <div className='d-flex flex-wrap'>
                    <div className="form-check  me-5">
                        <input className="form-check-input" name='jobtype' type="radio"  id="check1" />
                        <label className="form-check-label" htmlFor="check1">
                            Fixed
                        </label>
                    </div>
                    <div className="form-check ">
                    <input className="form-check-input" name='jobtype' type="radio" id="check2" />
                    <label className="form-check-label" htmlFor="check2">
                        Hourly
                    </label>
                    </div>

                    </div>
                </div>
                </div>
                <div className='project_type_cards'>
                 <div className="card mb-3">
                    <div className="card-body">
                    <div className="d-flex justify-content-between align-items-baseline flex-wrap">
                        <div>
                            <span><small>Posted 1 day ago</small></span>
                            <Link to='/job-detail'><h5>Facebook Ads Designer needed</h5></Link>
                        </div>
                        <div className="d-flex">
                            <i className="fa-regular fa-thumbs-down me-3"></i>
                            <i className="fa-regular fa-heart"></i>
                        </div>
                    </div>
                    <div className="d-flex flex-wrap">
                        <span className='me-2'><small>Type: Fixed </small></span>
                        <span><small>Est. Budget: $80</small></span>
                    </div>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus laudantium culpa non possimus odit ab laboriosam dolorum natus, officia iste accusamus itaque maiores aliquam magni quae, cum magnam, sequi dicta...</p>

                        <div className="job_basis_skills">
                        <ul className='d-flex align-items-center flex-wrap p-0 '>
                            <li className="btn btn-sm btn-green rounded-pill me-1 mb-1">Facebook</li>
                            <li className="btn btn-sm btn-green rounded-pill me-1 mb-1">Photoshop</li>
                            <li className="btn btn-sm btn-green rounded-pill me-1 mb-1">Social Media </li>
                            <li className="btn btn-sm btn-green rounded-pill me-1 mb-1">Instagram </li>
                        </ul>
                        </div>
                        <div className="d-flex flex-wrap">
                            <span className='me-3 text-dark'><small><i className="fa-solid fa-building"></i> Glamlooks</small></span>
                            <span className='me-3 text-dark'><small><i className="fa-solid fa-location-dot"></i> Delhi</small></span>
                            <span className='me-3 text-dark'><small><i className="fa-solid fa-briefcase"></i> 3+ Years</small></span>
                        </div>
                    </div>
                 </div>
                 <div className="card mb-3">
                    <div className="card-body">
                    <div className="d-flex justify-content-between align-items-baseline flex-wrap">
                        <div>
                            <span><small>Posted 2 day ago</small></span>
                            <Link to='/job-detail'><h5>Laravel Developer Needed</h5></Link>
                        </div>
                        <div className="d-flex">
                            <i className="fa-regular fa-thumbs-down me-3"></i>
                            <i className="fa-regular fa-heart"></i>
                        </div>
                    </div>
                    <div className="d-flex flex-wrap">
                        <span className='me-2'><small>Type: Hourly $20-25 </small></span>
                        <span><small>Time: More than 3 months</small></span>
                    </div>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus laudantium culpa non possimus odit ab laboriosam dolorum natus, officia iste accusamus itaque maiores aliquam magni quae, cum magnam, sequi dicta...</p>

                        <div className="job_basis_skills">
                        <ul className='d-flex align-items-center flex-wrap p-0 '>
                            <li className="btn btn-sm btn-green rounded-pill me-1 mb-1">Php</li>
                            <li className="btn btn-sm btn-green rounded-pill me-1 mb-1">Laravel</li>
                            <li className="btn btn-sm btn-green rounded-pill me-1 mb-1">database </li>
                            <li className="btn btn-sm btn-green rounded-pill me-1 mb-1">backend </li>
                        </ul>
                        </div>
                        <div className="d-flex flex-wrap">
                            <span className='me-3 text-dark'><small><i className="fa-solid fa-building"></i> Grintech Web Agency</small></span>
                            <span className='me-3 text-dark'><small><i className="fa-solid fa-location-dot"></i> Changidarh</small></span>
                            <span className='me-3 text-dark'><small><i className="fa-solid fa-briefcase"></i> 3+ Years</small></span>
                        </div>
                    </div>
                 </div>
                 <div className="card mb-3">
                    <div className="card-body">
                    <div className="d-flex justify-content-between align-items-baseline flex-wrap">
                        <div>
                            <span><small>Posted 1 day ago</small></span>
                            <Link to='/job-detail'><h5>Website Designer Needed</h5></Link>
                        </div>
                        <div className="d-flex">
                            <i className="fa-regular fa-thumbs-down me-3"></i>
                            <i className="fa-regular fa-heart"></i>
                        </div>
                    </div>
                    <div className="d-flex flex-wrap">
                        <span className='me-2'><small>Type: Fixed </small></span>
                        <span><small>Est. Budget: $50</small></span>
                    </div>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus laudantium culpa non possimus odit ab laboriosam dolorum natus, officia iste accusamus itaque maiores aliquam magni quae, cum magnam, sequi dicta...</p>

                        <div className="job_basis_skills">
                        <ul className='d-flex align-items-center flex-wrap p-0 '>
                            <li className="btn btn-sm btn-green rounded-pill me-1 mb-1">Figma</li>
                            <li className="btn btn-sm btn-green rounded-pill me-1 mb-1">Css 3</li>
                            <li className="btn btn-sm btn-green rounded-pill me-1 mb-1">responsive</li>
                            <li className="btn btn-sm btn-green rounded-pill me-1 mb-1">html5</li>
                            <li className="btn btn-sm btn-green rounded-pill me-1 mb-1">Javascript</li>
                        </ul>
                        </div>
                        <div className="d-flex flex-wrap">
                            <span className='me-3 text-dark'><small><i className="fa-solid fa-building"></i> Xyz Infotech</small></span>
                            <span className='me-3 text-dark'><small><i className="fa-solid fa-location-dot"></i> Pune</small></span>
                            <span className='me-3 text-dark'><small><i className="fa-solid fa-briefcase"></i> 5+ Years</small></span>
                        </div>
                    </div>
                 </div>
                </div>
            </div>
            <div className="col-md-4 order-1 order-md-2 mb-4 mb-md-0 d-none">
            <div className="card_sticky">
             <div className="card all_cat_filters">
             <div className="card-body">
                <h5>Apply Filter <i className="bi bi-filter"></i></h5>
                <hr />
                <div>
                <div className="accordion border-0" id="accordionExample1">
                    <div className="accordion-item mb-0">
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
                        <label className="form-check-label" htmlFor="check1">
                           Fixed
                        </label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="check2" />
                        <label className="form-check-label" htmlFor="check2">
                           Hourly
                        </label>
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

export default ProjectBasis