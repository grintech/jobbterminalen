import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { getGoogleTranslateLang } from "../utils/getLang";

// ✅ Import CountrySelect properly
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const bearerKey = import.meta.env.VITE_BEARER_KEY;
const API_URL = import.meta.env.VITE_API_URL;
const EmpLogin = import.meta.env.VITE_EMP_URL;

const Register = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "job_seeker",
  });

  const [selectedCountry, setSelectedCountry] = useState("");
  const [emailError, setEmailError] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [getRoleParam, SetRoleParam] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get("role");
    SetRoleParam(roleParam);
    if (roleParam === "recruiter" || roleParam === "job_seeker") {
      setFormData((prev) => ({ ...prev, role: roleParam }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !selectedCountry) {
      setAlert({ type: "error", message: "Please fill all required fields." });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setAlert({ type: "error", message: "Passwords do not match!" });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      return;
    }

    // const passwordRegex = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.{8,})/;  
    // if (!passwordRegex.test(formData.password)) {
    //   setAlert({
    //     type: "error",
    //     message: "Password must be at least 8 characters long, include one uppercase letter, and one special character.",
    //   });
    //   setTimeout(() => setAlert({ type: "", message: "" }), 4000);
    //   return;
    // }

    const passwordRegex = /^(?=.*[^a-zA-Z0-9])(?=.{8,})/;
    if (!passwordRegex.test(formData.password)) {
      setAlert({
        type: "error",
        message: "Password must be at least 8 characters long and include one special character.",
      });
      setTimeout(() => setAlert({ type: "", message: "" }), 4000);
      return;
    }


    const emailDomain = formData.email.split("@")[1]?.toLowerCase();
    if (formData.role === "recruiter") {
      const publicDomains = ["aol.com"];
      if (publicDomains.includes(emailDomain)) {
        setEmailError("Recruiters must use a domain email.");
        setTimeout(() => setEmailError(""), 4000);
        return;
      }
    }

    // const selectedLang = getGoogleTranslateLang();
    const selectedLang = i18n.language;

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("country", selectedCountry);
    formDataToSend.append("lang", selectedLang);

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/register_api.php`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const { type, message, role } = response.data;
      setAlert({ type, message });
      setLoading(false);

      if (type === "success") {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "job_seeker",
        });
        setTimeout(() => {
          setAlert({ type: "", message: "" });
          if (role === "recruiter") {
            window.location.href = `${EmpLogin}`;
          } else {
            navigate("/login");
          }
        }, 3000);
      } else {
        setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setLoading(false);
      setAlert({ type: "error", message: "Something went wrong. Please try again later." });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register_page">
        <div className="d-flex register_container">
          <div className="col-12">
            <div className="container py-5">
              <div className="col-md-8 col-lg-6 col-xl-5 mx-auto">
                <form onSubmit={handleSubmit} className="register_form">
                  <h1>{t("Register")}</h1>
                  <p>{t("Register_Text")}</p>

                  <div className="row">
                    {/* Role selection */}
                    <div className="col-12 d-flex job_role mb-4">
                      {getRoleParam !== "recruiter" && (
                        <div className="form-check me-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="job_seeker"
                            id="jobSeeker"
                            checked={formData.role === "job_seeker"}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label" htmlFor="jobSeeker">
                            {t("JobSeeker")}
                          </label>
                        </div>
                      )}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="role"
                          value="recruiter"
                          id="recruiter"
                          checked={formData.role === "recruiter"}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="recruiter">
                          {t("Recruiter")}
                        </label>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="col-12 mb-3">
                      <label className="mb-2">{formData.role === "recruiter" ? t("PersonName") : t("Full_Name")} <span>*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t("Name_placeholder")}
                      />
                    </div>

                    {/* Email */}
                    <div className="col-12 mb-3">
                      <label className="mb-2">{t("Email")} <span>*</span></label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t("Email_placeholder")}
                      />
                      {emailError && <div className="text-danger">{emailError}</div>}
                    </div>

                    {/* Country */}
                    <div className="col-12 mb-3">
                      <label className="mb-2">{t("Country")} <span>*</span></label>
                      <CountrySelect
                        className="select_country "
                        placeHolder={t("SelectCountry")}
                        onChange={(country) => setSelectedCountry(country?.name || "")}
                      />
                    </div>

                    {/* Password */}
                    <div className="col-md-6 mb-3">
                      <label className="mb-2">{t("Password")} <span>*</span></label>
                      <div className="position-relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder={t("Pass_placeholder")}
                        />
                        <span
                          className="position-absolute"
                          style={{ top: "20%", right: "10px", cursor: "pointer", color: "#6c757d" }}
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="col-md-6 mb-3">
                      <label className="mb-2">{t("Confirm_Password")} <span>*</span></label>
                      <div className="position-relative">
                        <input
                          type={showPassword1 ? "text" : "password"}
                          className="form-control"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder={t("ConfirmPass_placeholder")}
                        />
                        <span
                          className="position-absolute"
                          style={{ top: "20%", right: "10px", cursor: "pointer", color: "#6c757d" }}
                          onClick={() => setShowPassword1((prev) => !prev)}
                        >
                          {showPassword1 ? <FaEye /> : <FaEyeSlash />}
                        </span>
                      </div>
                    </div>

                    {/* Checkbox */}
                    <div className="col-12 d-flex checkbox_div">
                      <input type="checkbox" className="me-2" required />
                      <p className="mb-3 d-flex flex-wrap">
                        {t("BySigning")}
                        <Link to="/terms-and-conditions" className="text-theme mx-1">{t("Terms")}</Link>
                        and
                        <Link to="/privacy-policy" className="text-theme mx-1">{t("Privacy")}</Link>
                      </p>
                    </div>

                    {/* Submit */}
                    <div className="col-12 py-4">
                      <button type="submit" className="btn btn-register w-100" disabled={loading}>
                        {loading ? t("Registering") : t("Register")}
                      </button>
                    </div>

                    {/* Alert */}
                    {alert.message && (
                      <div className={`alert alert-${alert.type === "success" ? "success" : "danger"} alert-dismissible fade show`} role="alert">
                        {alert.message}
                        <button type="button" className="btn-close" onClick={() => setAlert({ type: "", message: "" })}></button>
                      </div>
                    )}

                    {/* Footer Links */}
                    <p className="mb-3 text-center">
                      {t("Already-account")}
                      {getRoleParam === "recruiter" ? (
                        <Link to="https://jobbterminalen.se/admin/login.php" className="text-theme mx-1">{t("Login")}</Link>
                      ) : (
                        <Link to="/login" className="text-theme mx-1">{t("Login")}</Link>
                      )}
                    </p>
                    <p className="text-theme text-center m-0">{t("Copyright")}</p>
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
