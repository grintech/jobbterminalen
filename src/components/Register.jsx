import React, { useState, useEffect} from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { getGoogleTranslateLang } from "../utils/getLang";

const bearerKey = import.meta.env.VITE_BEARER_KEY;
const API_URL = import.meta.env.VITE_API_URL;
const EmpLogin = import.meta.env.VITE_EMP_URL;

const Register = () => {
  const { t } = useTranslation();
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [phone, setPhone] = useState('');

  const [getRoleParam, SetRoleParam] = useState('');

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "job_seeker",
  });
  const [alert, setAlert] = useState({ type: "", message: "" });

  const navigate = useNavigate();

    // Check for the 'role' URL parameter on component mount
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const roleParam = urlParams.get("role");
      SetRoleParam(roleParam);
  
      if (roleParam && (roleParam === "recruiter" || roleParam === "job_seeker")) {
        setFormData((prevData) => ({
          ...prevData,
          role: roleParam,
        }));
      }
    }, []);

 
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && value.length > 10) {
        return;
    }

    if (name === "designation") {
     const alphabetOnly = /^[A-Za-z\s]*$/; 
      if (!alphabetOnly.test(value)) {
        return; 
      }
    }

    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form fields
    if (formData.password !== formData.confirmPassword) {
      setAlert({ type: "error", message: "Passwords do not match!" });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      return;
    }

    // ✅ Password complexity validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.{8,})/;
    if (!passwordRegex.test(formData.password)) {
      setAlert({
        type: "error",
        message:
          "Password must be at least 8 characters long, include one uppercase letter, and one special character.",
      });
      setTimeout(() => setAlert({ type: "", message: "" }), 4000);
      return;
    }


    if (!formData.name || !formData.email || (formData.role === "recruiter" && !formData.designation)) {
      setAlert({ type: "error", message: "Please fill the form!" });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      return;
    }

    if (!formData.phone) {
      setAlert({ type: "error", message: "Please enter a phone number!" });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      return;
    }

    if (!formData.phone || formData.phone.replace(/\D/g, "").length < 8) {
      setAlert({ type: "error", message: "Phone number must be at least 8 digits!" });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      return;
    }

    const emailDomain = formData.email.split('@')[1]?.toLowerCase();

    // if (emailDomain === 'yopmail.com') {
    //   setAlert({
    //     type: "error",
    //     message: "Yopmail addresses are not allowed. Please use a valid email address.",
    //   });
    //   setTimeout(() => setAlert({ type: "", message: "" }), 4000);
    //   return;
    // }

   // Only recruiters must use business email domains (no Gmail, Yahoo, etc.)
  if (formData.role === 'recruiter') {
    const publicDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    if (publicDomains.includes(emailDomain)) {
      setEmailError("Recruiters must use a domain email.");
      setTimeout(() => setEmailError(''), 4000);
      return;
    }
  }
      
   const selectedLang = getGoogleTranslateLang(); 
  

    // Create FormData object and append data
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone); 
    formDataToSend.append("password", formData.password);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("designation", formData.designation);

    formDataToSend.append("lang", selectedLang);
  
    try {
      setLoading(true); // Start loading
      const response = await axios.post(`${API_URL}/register_api.php`, formDataToSend,
        {
          headers:{
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "multipart/form-data",
          }
         }
      );
      
      const { type, message, role } = response.data;
      
      // Set alert based on the response
      setAlert({ type, message });
      
      setLoading(false); // End loading

      // Clear form data and navigate on success
      if (type === "success") {
        setFormData({
          name: "",
          designation: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          role: "job_seeker",
        });
        setTimeout(() => {
        setAlert({ type: "", message: "" });
        if(role === "recruiter"){
          window.location.href = `${EmpLogin}`; 
        }else if (role === "job_seeker"){
          navigate("/login"); 
        }
        }, 4000);
      } else {
        setTimeout(() => setAlert({ type: "", message: "" }), 3000); // Clear alert for non-success responses
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setLoading(false); // End loading
      setAlert({ type: "error", message: "An error occurred. Please try again later." });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000); // Clear alert after 2 seconds
    }
  };
  
  
  return (
    <>
      <Navbar />
      <div className="register_page">
        <div className="d-flex register_container">
          <div className="col-12">
            <div className="container h-100 py-5">
              <div className="col-md-8 col-lg-6 col-xl-5 mx-auto">
              <form onSubmit={handleSubmit} className="register_form  ">
                <div className="d-flex flex-column ">
                  <h1>{t("Register")}</h1>
                  <p>"{t("Register_Text")}"</p>

                  <div className="row">
                    <div className="col-12 d-flex job_role mb-5"> 
                                        
                      { getRoleParam !== "recruiter" && (     
                      <div className="col-6  col-lg-6">
                        <div className="form-check me-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="job_seeker"
                            id="flexRadioDefault1"
                            checked={formData.role === "job_seeker"}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label" htmlFor="flexRadioDefault1">
                            {t("JobSeeker")}
                          </label>
                        </div>
                      </div>
                      )}
                      <div className="col-6  col-lg-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="recruiter"
                            id="flexRadioDefault2"
                            checked={formData.role === "recruiter"}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label" htmlFor="flexRadioDefault2">
                            {t("Recruiter")}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="name" className="mb-2">
                        {/* {t("Full_Name")} <span>*</span> */}
                         {formData.role === "recruiter" ? t("PersonName") : t("Full_Name")} <span>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t("Name_placeholder")}
                      />
                    </div>
                    {formData.role === "recruiter" && (
                      <div className="col-12 mb-3">
                        <label htmlFor="designation" className="mb-2">
                          {t("Designation")} <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="designation"
                          value={formData.designation}
                          onChange={handleInputChange}
                          placeholder={t("Design_placeholder")}
                          
                        />
                      </div>
                    )} 

                    <div className="col-12 mb-3">
                      <label htmlFor="email" className="mb-2">
                        {t("Email")} <span>*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t("Email_placeholder")}
                      />
                       {emailError && <label style={{ color: 'red' }}>{emailError}</label>}
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="phone" className="mb-2">
                        {t("Phone")} <span>*</span>
                      </label>
                      
                      <PhoneInput
                        country={'se'}
                        value={phone}
                        onChange={(value) => {
                          const formattedPhone = `+${value}`;
                          setPhone(formattedPhone);
                          setFormData((prevData) => ({
                            ...prevData,
                            phone: formattedPhone,
                          }));
                        }}
                        inputStyle={{ width: "100%" }}
                        enableSearch
                      />


                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="password" className="mb-2">
                        {t("Password")} <span>*</span>
                      </label>
                      <div className="position-relative">
                        <input
                          className="form-control"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder={t("Pass_placeholder")}
                        />
                        <span
                          onClick={() => setShowPassword((prev) => !prev)}
                          style={{
                            position: "absolute",
                            top: "45%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#6c757d",
                          }}
                        >
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                      </div>    
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="confirmPassword" className="mb-2">
                        {t("Confirm_Password")} <span>*</span>
                      </label>
                      <div className="position-relative">
                      <input
                        className="form-control"
                        type={showPassword1 ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder={t("ConfirmPass_placeholder")}
                      />
                      <span
                          onClick={() => setShowPassword1((prev) => !prev)}
                          style={{
                            position: "absolute",
                            top: "45%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#6c757d",
                          }}
                        >
                           {showPassword1 ? <FaEye /> : <FaEyeSlash />}
                        </span>
                        </div>
                    </div>
                    <div className="col-12 d-flex checkbox_div">
                      <input type="checkbox" className="me-2 " required />
                      <p className="mb-3 text-start ">
                        {t("BySigning")}
                        <Link className="text-theme mx-1" to="/terms-and-conditions">
                          {t("Terms")}
                        </Link>
                        and
                        <Link className="text-theme mx-1" to="/privacy-policy">
                          {t("Privacy")}
                        </Link>
                      </p>
                    </div>

                    <div className="col-12 py-4">
                      <button type="submit" 
                      className="btn btn-register w-100"
                      disabled={loading}
                      >
                        {loading ? t("Registering") : t("Register")}
                      </button>
                    </div>

                    {alert.message && (
                      <div
                        className={`alert alert-${alert.type === "success" ? "success" : "danger"} alert-dismissible fade show`}
                        role="alert"
                      >
                        {alert.message}
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                          onClick={() => setAlert({ type: "", message: "" })}
                        ></button>
                      </div>
                    )}

                    <p className="mb-3 text-center">
                      {t("Already-account")}
                      { getRoleParam == "recruiter" ? (<Link to="https://jobbterminalen.se/admin/login.php" className="text-theme mx-1">{t("Login")}</Link>) : 
                      ( <Link to="/login" className="text-theme mx-1">{t("Login")}</Link>)
                        }
                    </p>
                     <p className="text-center m-0">{t("Copyright")}</p>
                  </div>
                </div>
              </form>
            
              </div>
            </div>
          </div>
         
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
