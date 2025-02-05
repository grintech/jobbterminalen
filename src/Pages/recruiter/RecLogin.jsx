import React from 'react'
import { Link } from 'react-router-dom'

const RecLogin = () => {
  return (
    <>
    <section className="login_page">
        <div className=" new_navbar ">
            <div className="container d-flex justify-content-between align-items-center">
                <Link className="navbar-brand p-0">
                    <img src="/images/logo1.png" alt="" />
                </Link>
                <Link to='/rec-register' className="btn btn-login mx-2" type="submit"><i className="fa-solid fa-user-pen me-1"></i>Register</Link>
            </div>
        </div>

        <div className="container">
            <div className="row py-5">
                {/* <div className="col-lg-6"><img src="/images/login.avif" className='w-100' alt="" /></div> */}
                <div className="col-lg-5 col-md-8 col-12 mx-auto">
                    <div className="card rounded-4 border">
                    <div className='card-body' >
                       
                        <h4 className='fw-bold py-3'>Login</h4>
                        <form id="login_form" action="">
                            <div className="">
                                <label htmlFor="">
                                    Username
                                </label>
                                <input type="text" className="form-control" placeholder="Enter Username" />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="">
                                    Password 
                                </label>
                                <input type="email" className="form-control" placeholder="Enter your password" />
                            </div>
                            <div className="text-end mt-2">
                                <Link className=" text-primary w-100"><small>Forgot Password?</small></Link>
                            </div>
                            <button type='submit'className=' login_page_btn'>Login</button>
                        </form>
                        <div className="or_circle mt-4 position-relative">
                    <div className="border-top"></div>
                    <span>OR</span>
                  </div>

                  <div className="socialLogin mt-4">
                    <div className="row">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <Link id="googleLogin">
                          <img
                            className="me-2"
                            src="/images/google.svg"
                            alt=""
                          />
                          <span>Google</span>
                        </Link>
                      </div>
                      <div className="col-md-6 mb-3 mb-md-0">
                        <Link id="facebookLogin">
                          <img
                            className="me-2"
                            src="/images/facebook.svg"
                            alt=""
                          />
                          <span>Facebook</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                        <div className="text-center pb-3 mt-3 " style={{ fontSize: "15px", fontWeight: "500" }}>New to our website? <Link to='/rec-register' className='text-underline text-primary'>Sign Up</Link></div>

                       
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</>
  )
}

export default RecLogin