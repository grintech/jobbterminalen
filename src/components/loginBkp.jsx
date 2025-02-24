import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <section className="login_page">
                <div className=" new_navbar ">
                    <div className="container d-flex justify-content-between align-items-center">
                        <Link to="/" className="navbar-brand p-0">
                        <img src="/images/job_logo.png" alt="logo" />
                        </Link>
                        <Link to="/register" className="btn btn-login mx-2" type="submit">
                            <i className="fa-solid fa-user-pen me-1"></i>Register
                        </Link>
                    </div>
                </div>

                <div className="container">
                    <div className="row py-5">
                        <div className="col-lg-5 col-md-9 mx-auto  ">
                            <div >
                                <ul
                                    className="nav nav-pills mb-3 d-flex justify-content-center select_tab mb-4"
                                    id="pills-tab"
                                    role="tablist"
                                >
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link active mx-3"
                                            id="jobseeker-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-home"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-home"
                                            aria-selected="true"
                                        >
                                            Jobseeker
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link mx-3"
                                            id="recruiter-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-profile"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-profile"
                                            aria-selected="false"
                                        >
                                            Recruiter
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active"
                                        id="pills-home" role="tabpanel" aria-labelledby="jobseeker-tab" tabIndex="0">
                                        <div className="card jobseeker_card rounded-4">
                                            <div className="card-body">
                                                <h4 className="fw-bold py-3">Login</h4>
                                                <form id="login_form" action="">
                                                    <div >
                                                        <label htmlFor="">Email ID</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="Enter email "
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <label htmlFor="">Password</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="Enter your password"
                                                        />
                                                    </div>
                                                    <div className="text-end mt-2">
                                                        <Link className=" text-primary w-100">
                                                            <small>Forgot Password?</small>
                                                        </Link>
                                                    </div>
                                                    <button type="submit" className=" login_page_btn">
                                                        Login
                                                    </button>
                                                </form>
                                                <div
                                                    className="text-center mt-3 pb-3 "
                                                    style={{ fontSize: "15px", fontWeight: "500" }}
                                                >
                                                    New to our website?
                                                    <Link to='/register' className="ms-1 text-underline text-primary">
                                                        Register
                                                    </Link>
                                                </div>

                                                {/* <div className="or_circle mt-4 position-relative">
                                                    <div className="border-top"></div>
                                                    <span>OR</span>
                                                </div>
                                                <div className="socialLoginTab d-flex justify-content-around mt-4">
                                                    <Link className="d-flex align-items-center">
                                                        <img src="/images/google.svg" alt="" className="me-1" />
                                                        <span>Google</span>
                                                    </Link>
                                                    <Link className="d-flex align-items-center">
                                                        <img src="/images/linkedin.svg" alt="" className="me-1" />
                                                        <span>Linkedin</span>
                                                    </Link>
                                                    <Link className="d-flex align-items-center">
                                                        <img src="/images/facebook.svg" alt="" className="me-1" />
                                                        <span>Facebook</span>
                                                    </Link>
                                                </div> */}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="recruiter-tab" tabIndex="0" >
                                        <div className="card recruiter_card rounded-4">
                                            <div className="card-body">
                                                <h4 className="fw-bold py-3">Login</h4>
                                                <form id="login_form" action="">
                                                    <div >
                                                        <label htmlFor="">Email ID</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="Enter email    "
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <label htmlFor="">Password</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="Enter your password"
                                                        />
                                                    </div>
                                                    <div className="text-end mt-2">
                                                        <Link className=" text-primary w-100">
                                                            <small>Forgot Password?</small>
                                                        </Link>
                                                    </div>
                                                    <button type="submit" className=" login_page_btn">
                                                        Login
                                                    </button>
                                                </form>
                                                <div
                                                    className="text-center mt-3 pb-3 "
                                                    style={{ fontSize: "15px", fontWeight: "500" }}
                                                >
                                                    New to our website?
                                                    <Link to='/register' className="ms-1 text-underline text-primary">
                                                        Register
                                                    </Link>
                                                </div>

                                                {/* <div className="or_circle mt-4 position-relative">
                                                    <div className="border-top"></div>
                                                    <span>OR</span>
                                                </div>
                                                <div className="socialLoginTab d-flex justify-content-around mt-4">
                                                    <Link className="d-flex align-items-center">
                                                        <img src="/images/google.svg" alt="" className="me-1" />
                                                        <span>Google</span>
                                                    </Link>
                                                    <Link className="d-flex align-items-center">
                                                        <img src="/images/linkedin.svg" alt="" className="me-1" />
                                                        <span>Linkedin</span>
                                                    </Link>
                                                    <Link className="d-flex align-items-center">
                                                        <img src="/images/facebook.svg" alt="" className="me-1" />
                                                        <span>Facebook</span>
                                                    </Link>
                                                </div> */}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
