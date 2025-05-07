import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../store/authContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const bearerKey = import.meta.env.VITE_BEARER_KEY;
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(1); // default to 1 (verified)

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);

    try {
      const response = await axios.post(`${API_URL}/login_api.php`, data, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.type === "success") {
        const userData = response.data.data;
        setAlert({ show: true, type: "success", message: response.data.message });

        login(userData);

        setTimeout(() => {
          if (userData.role === "job_seeker") {
            navigate("/");
          }
        }, 2000);

      } else if (response.data.type === "error") {
        setAlert({ show: true, type: "danger", message: response.data.message });

        if (response.data.isVerified === 0) {
          setIsVerified(0);
        } else {
          setIsVerified(1);
        }

        setTimeout(() => setAlert({ show: false, type: "", message: "" }), 3000);
      }
    } catch (error) {
      console.error("Error during API request:", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      setAlert({ show: true, type: "danger", message: errorMessage });
      setTimeout(() => setAlert({ show: false, type: "", message: "" }), 3000);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);

      const response = await axios.post(`${API_URL}/resend_email.php`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.type === "success") {
        setAlert({
          show: true,
          type: "success",
          message: response.data.message,
        });

        if (response.data.isVerified === 1) {
          setIsVerified(1); // hide the button if now verified
        }
      } else {
        setAlert({
          show: true,
          type: "danger",
          message: response.data.message || "Something went wrong!",
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        type: "danger",
        message: "An error occurred while resending the email.",
      });
    }

    setTimeout(() => setAlert({ show: false, type: "", message: "" }), 3000);
  };

  return (
    <>
      <Navbar />
      <div className="register_page">
        <div className="d-flex register_container justify-content-center align-items-center">
          <div className="w-100">
            <div className="container h-100 py-5">
              <div className="col-md-7 col-lg-5 col-xxl-4 col-12 mx-auto">
                <form
                  className="register_form d-flex flex-column justify-content-center align-items-center"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <h1>{t("Login")}</h1>
                    <p>{t("Login-Text")}</p>
                    <div className="row">
                      <div className="col-12 mb-3">
                        <label htmlFor="email" className="mb-2">
                          {t("Username-Email")} <span>*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder={t("User-placeholder")}
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="password" className="mb-2">
                          {t("Password")} <span>*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            name="password"
                            placeholder={t("Password")}
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                          />
                          <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            style={{
                              position: "absolute",
                              top: "45%",
                              right: "15px",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                              color: "#6c757d",
                            }}
                          >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <Link
                          to="/forgot-password"
                          className="d-flex w-100 justify-content-end text-theme m-0"
                        >
                          {t("Forget-Password?")}
                        </Link>
                      </div>
                      <div className="col-12 py-4">
                        <button type="submit" className="btn btn-register w-100">
                          {t("Login")}
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

                      {isVerified === 0 && (
                        <Link
                          style={{ textDecoration: "underline" }}
                          className="text-center fw-semibold text-theme mb-3"
                          onClick={resendVerificationEmail}
                        >
                          {t("ResendLink")}
                        </Link>
                      )}

                      <p className="mb-3 text-center">
                        {t("Already-account")}
                        <Link to="/register" className="text-theme ms-1">
                          {t("Register")}
                        </Link>
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

export default Login;

