import Navbar from './Navbar'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../store/authContext'

const FindCV = () => {
    const {user} = useAuthContext();
    const EMP_URL = import.meta.env.VITE_EMP_URL;
    // console.log(user);
  return (
    <>
        <Navbar />
            <div className="find_cv">
                <div className="container top_pad">
                    <div class="alert alert-light " role="alert">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-baseline">
                                <i className="fa-solid fa-info-circle text-theme me-2"></i>
                                <div>
                                    <p className='mb-0 fw-semibold'>Search for your desired candidate</p>
                                    <p className='mb-0 text-muted'>Want to view candidates cv? Please purchase <Link to='#' className='text-theme'>subscription</Link>.  </p>
                                    <p className='mb-0 text-muted'>Create your account or login to start your search.</p>
                                </div>
                            </div>
                            {!user ? <Link to="/register?role=recruiter" className='btn btn-register'>Register</Link>: '' }
                        </div>
                    </div>

                    <div className="col-12 filter_section mt-4">
                        <div className="row align-items-end">
                            <div className="col">
                                <label className='fw-semibold' htmlFor="">Location</label>
                                <input className='form-control' type="search" placeholder='City, State' />
                            </div>
                            <div className="col">
                                <label className='fw-semibold' htmlFor="">Keywords</label>
                                <input className='form-control' type="search" placeholder='Skills,  job-title' />
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-register w-100">Search</button>
                            </div>
                        </div>
                    </div>

                    <div className="candidate_cards my-4">
                        <div className="row">
                            <div className="col-lg-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className='m-0'>Curriculam Developer</h5>
                                        <div className="d-flex">
                                            <p className="text-muted m-0 me-2">2022-Present</p>
                                            <p className="text-muted m-0">(Delhi)</p>
                                        </div>
                                        <div className='mt-2'>
                                            <h6 className='m-0'>Education</h6>
                                            <small>BCA, Punjab University</small>
                                        </div>
                                        <div className='mt-2'>
                                            <h6 className='m-0'>Skills</h6>
                                            <small>Front-end-developer, react, javascript</small>
                                        </div>
                                        <Link className='btn btn-register mt-2'>View Pofile</Link>
                                    </div>
                                </div>
                            </div>
                                <div className="col-lg-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className='m-0'>Content Writer</h5>
                                        <div className="d-flex">
                                            <p className="text-muted m-0 me-2">2020-2024</p>
                                            <p className="text-muted m-0">(Hyderabad)</p>
                                        </div>
                                        <div className='mt-2'>
                                            <h6 className='m-0'>Education</h6>
                                            <small>BA, Kurukshetra University</small>
                                        </div>
                                        <div className='mt-2'>
                                            <h6 className='m-0'>Skills</h6>
                                            <small>Communication skills, writer , editor</small>
                                        </div>
                                        <Link className='btn btn-register mt-2'>View Pofile</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className='m-0'>Laravel Developer</h5>
                                        <div className="d-flex">
                                            <p className="text-muted m-0 me-2">2022-Present</p>
                                            <p className="text-muted m-0">(Chandigarh)</p>
                                        </div>
                                        <div className='mt-2'>
                                            <h6 className='m-0'>Education</h6>
                                            <small>Btech, Delhi University</small>
                                        </div>
                                        <div className='mt-2'>
                                            <h6 className='m-0'>Skills</h6>
                                            <small>Communication skills, react , laravel</small>
                                        </div>
                                        <Link className='btn btn-register mt-2'>View Pofile</Link>
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

export default FindCV