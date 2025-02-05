import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select"; 

const Register = () => {
  const [selected, setSelected] = useState("");
  const [isChecked, setIsChecked] = useState(false); 

  return (
    <>
      <section className="register_page">
        <div className=" new_navbar ">
          <div className="container d-flex justify-content-between align-items-center">
            <Link to="/" className="navbar-brand p-0">
            <img src="/images/job_logo.png" alt="logo" />
            </Link>
            <Link to="/login" className="btn btn-login mx-2" type="submit">
              <i className="fa-solid fa-user me-1"></i>Login
            </Link>
          </div>
        </div>

        <div className="container py-5">
          <div className="row align-items-center ">
            <div className="col-lg-6 col-md-9 col-12 mx-auto">
              <div className="">
                <ul className="nav nav-pills mb-3 d-flex justify-content-center select_tab mb-4"
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

                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="jobseeker-tab"
                    tabIndex="0"
                  >
                    <div className=" card rounded-4 jobseeker_card">
                      <div className="card-body  py-4">
                        <h4 className="fw-bold  pb-3">Jobseeker Registration</h4>

                        <form
                          id="signup_form"
                          className="mt-4 register_form jobseeker_form row"
                          action=""
                        >
                          <div className="col-12 mb-4">
                            <div className="col-12">
                              <label htmlFor="">
                                Full Name <span>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter full name"
                              />
                            </div>
                          </div>
                          <div className="col-12 mb-4">
                            <label htmlFor="">
                              Mobile Number <span>*</span>
                            </label>
                            <div className="row">
                              <div className="col-sm-4 mb-4 mb-sm-0 mobileNumberISD">
                              <ReactFlagsSelect
                                selected={selected}
                                onSelect={(code) => setSelected(code)}
                                searchable
                                placeholder="Select"
                                className="w-100"
                              />
                              </div>
                              <div className="col-sm-8">
                                <input
                                  placeholder="Enter your mobile number"
                                  type="text"
                                  className="w-100 form-control"
                                  name=""
                                  id=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-12 mb-4">
                            <label htmlFor="">
                              Email ID <span>*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Enter Email ID"
                            />
                          </div>
                          <div className="col-md-6 mb-4">
                            <label htmlFor="">
                              Password <span>*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Minimum 6 characters"
                            />
                          </div>
                          <div className="col-md-6 mb-4">
                            <label htmlFor="">
                            Confirm Password <span>*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                               placeholder="Confirm Password"
                            />
                          </div>
                         
                          <div className="termsAndCondition d-flex align-items-start">
                            <input type="checkbox" 
                             onChange={(e) => setIsChecked(e.target.checked)} 
                            className="me-2" name="terms_check" />
                           <p>
                            By clicking on 'Continue' I agree to our website's
                              <Link >Terms and Conditions </Link>,
                              <Link > Privacy Policy</Link>
                              and default mailer and communications settings
                              governing the use of
                              <Link > our website</Link>.
                           </p>
                          </div>
                    
                          <div className="text-center">
                            <button className="btn btn-register mt-4"
                             disabled={!isChecked}
                            >
                              Create Account
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="recruiter-tab"
                    tabIndex="0"
                  >
                    <div className=" card rounded-4 recruiter_card">
                      <div className="card-body  py-4">
                        <h4 className="fw-bold  pb-3">Recruiter Registration</h4>
                        <form
                          id="signup_form1"
                          className="mt-4 register_form recruiter_form row"
                          action=""
                        >
                          <div className="col-md-6 mb-4">
                              <label htmlFor="">
                                Company Name <span>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter company name"
                              />
                          </div>
                          <div className="col-md-6 mb-4">
                              <label htmlFor="">
                                Owner Name <span>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter owner name"
                              />
                          </div>
                          <div className="col-12 mb-4">
                            <label htmlFor="">
                              Mobile Number <span>*</span>
                            </label>
                            <div className="row">
                              <div className="col-sm-4 mb-4 mb-sm-0 mobileNumberISD">
                              <ReactFlagsSelect
                                selected={selected}
                                onSelect={(code) => setSelected(code)}
                                searchable
                                placeholder="Select"
                                className="w-100"
                              />
                              </div>
                              <div className="col-sm-8">
                                <input
                                  placeholder="Enter your mobile number"
                                  type="text"
                                  className="w-100 form-control"
                                  name=""
                                  id=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-12 mb-4">
                            <label htmlFor="">
                              Work Email ID <span>*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Enter Email ID"
                            />
                          </div>
                          <div className="col-md-6 mb-4">
                            <label htmlFor="">
                              Password <span>*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Minimum 6 characters"
                            />
                          </div>
                          <div className="col-md-6 mb-4">
                            <label htmlFor="">
                            Confirm Password <span>*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                               placeholder="Confirm Password"
                            />
                          </div>
                          <div className="col-12 mb-4">
                            <label htmlFor="">
                              Company Logo <span>*</span>
                            </label>
                            <input
                              type="file"
                              className="form-control"
                            />
                          </div>

                          <div className="termsAndCondition d-flex align-items-start">
                            <input type="checkbox" 
                             onChange={(e) => setIsChecked(e.target.checked)}
                            className="me-2" name="terms_check" />
                           <p>
                           By clicking on 'Continue' I agree to our website's
                            <Link >Terms and Conditions </Link>,
                            <Link > Privacy Policy</Link>
                            and default mailer and communications settings
                            governing the use of
                            <Link > our website</Link>.
                           </p>
                          </div>

                          <div className="text-center">
                            <button className="btn btn-register mt-4" disabled={!isChecked}>
                              Create Account
                            </button>
                          </div>
                        </form>
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

export default Register;
