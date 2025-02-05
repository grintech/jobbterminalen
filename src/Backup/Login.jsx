import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const bearerKey = import.meta.env.VITE_BEARER_KEY;
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);

    try {
      const response = await axios.post(
        `${API_URL}/login_api.php`, data,{
          headers:{
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "multipart/form-data",
          }
        }
      
      );

      if (response.data.type === "success") {
        setAlert({ show: true, type: "success", message: response.data.message });
        setTimeout(() =>  setAlert({ show: false, type: "", message: "" }), 3000);
        console.log("User Data:", response.data.data);
      } else if (response.data.type === "error") {
        setAlert({ show: true, type: "danger", message: response.data.message });
        setTimeout(() =>  setAlert({ show: false, type: "", message: "" }), 3000);
      }
    } catch (error) {
      console.error("Error during API request:", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      setAlert({ show: true, type: "danger", message: errorMessage });
    }
  };

  return (
    <>
    <Navbar />
    <div className="register_page ">
      <div className="d-flex register_container justify-content-center align-items-center">
        <div className="w-100">
          <div className="container h-100 py-5 ">
    
            <form
              className="register_form d-flex flex-column justify-content-center align-items-center"
              onSubmit={handleSubmit}
            >
    
              <div>
              <h1>Sign In</h1>
              <p>Welcome back! Sign in to access JobbTerminal</p>
              <div className="row">
                <div className="col-12 mb-3">
                  <label htmlFor="email" className="mb-2">
                    Username / Email <span>*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter username or email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="password" className="mb-2">
                    Password <span>*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Link to='/forgot-password' className="text-end text-green m-0">Forget Password ?</Link>
                <div className="col-12 py-4">
                  <button type="submit" className="btn btn-register w-100">
                    Sign In
                  </button>
                </div>

                {alert.show && (
                  <div
                    className={`alert alert-dismissible fade show alert-${alert.type}`}
                    role="alert"
                  >
                    {alert.message}
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                <p className="mb-3 text-center">
                  Already have an account?
                  <Link to="/register" className="text-green ms-1">
                    Signup 
                  </Link>
                </p>
                <p className="text-center m-0">
                  Copyright ©2024 by Jobbterminal All Rights Reserved.
                </p>
              </div>
              </div>

            </form>
          
          </div>
        </div>
       
      </div>
    </div>

    <Footer />

    </>
  );
};

export default Login;
