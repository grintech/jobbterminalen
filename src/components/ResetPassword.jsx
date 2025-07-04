import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const bearerKey = import.meta.env.VITE_BEARER_KEY;
const API_URL = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const { session_token } = location.state || {}; // Access session_token from location state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedLang = i18n.language;

    // Validate passwords
    if (password !== confirmPassword) {
      setAlert({ type: "error", message: t("PasswordNotMatch") });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      return;
    }

    // if (password.length < 6) {
    //   setAlert({
    //     type: "error",
    //     message: "Password must be at least 6 characters long.",
    //   });
    //   setTimeout(() => setAlert({ type: "", message: "" }), 3000);
    //   return;
    // }

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < 8 || !specialCharRegex.test(password)) {
      setAlert({
        type: "error",
        message: t("PasswordCheck"),
      });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("session_token", session_token);
      formData.append("password", password);
      formData.append("lang", selectedLang);

      const response = await axios.post(`${API_URL}/change-password.php`,formData,
          {
            headers:{
              Authorization: `Bearer ${bearerKey}`,
              "Content-Type": "multipart/form-data",
            }
         }
      );

      const { type, message } = response.data;

      setAlert({ type, message });
      setLoading(false);

      if (type === "success") {
        setTimeout(() => {
          navigate("/login"); // Redirect to login page on success
        }, 3000);
      }
      else {
        setTimeout(() => setAlert({ type: "", message: "" }), 3000); 
      }
      
    } 
    catch (error) {
      console.error("Error resetting password:", error);
      setAlert({
        type: "error",
        message: t("ErrorResetingPassword"),
      });
      setLoading(false);
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
    }
  };

  return (

    <>
    <Navbar />
    <div className="register_page">
      <div className="d-flex register_container justify-content-center align-items-center">
        <div >
          <div className="container h-100 py-5">
            <div className="col-md-7 col-lg-5 col-xxl-4 col-11 mx-auto">
            <form
              className="register_form d-flex flex-column justify-content-center align-items-center"
              onSubmit={handleSubmit}
            >
              <div >
                <h1>{t("Reset_title")}</h1>
                <p>{t("Reset_text")}</p>

                {alert.message && (
                  <div
                    className={`alert alert-${
                      alert.type === "success" ? "success" : "danger"
                    } alert-dismissible fade show`}
                    role="alert"
                  >
                    {alert.message}
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => setAlert({ type: "", message: "" })}
                    ></button>
                  </div>
                )}

                <div className="row mt-4">
                  <div className="col-12 mb-3">
                    <label htmlFor="password" className="mb-2">
                    {t("NewPassword")} <span>*</span>
                    </label>
                    <div className="position-relative">
                    <input
                     type={showPassword ? "text" : "password"}
                      className="form-control"
                      name="password"
                      placeholder={t("NewPassPlaceholder")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
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

                  <div className="col-12 mb-3">
                    <label htmlFor="confirmPassword" className="mb-2">
                    {t("Confirm_Password")} <span>*</span>
                    </label>

                    <div className="position-relative">
                    <input
                      type={showPassword1 ? "text" : "password"}
                      className="form-control"
                      name="confirmPassword"
                      placeholder={t("NewConfPassPlaceholder")}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
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

                  <div className="col-12 py-4">
                    <button
                      type="submit"
                      className="btn btn-register w-100"
                      disabled={loading}
                    >
                      {loading ? t("Resetting") : t("Reset")}
                    </button>
                  </div>

                  <p className="mb-3 text-center">
                    {t("New_platform")}
                    <Link to="/register" className="text-theme ms-2">
                    {t("Create_account")}
                    </Link>
                  </p>

                  <p className="text-center m-0">
                  {t("Copyright")}
                  </p>
                </div>
              </div>
            </form>
            </div>
          </div>
        </div>

        {/* <div className="col-lg-6 d-none d-lg-block">
          <img
            className="w-100 h-100"
            src="/images/frontimg/reset_password.webp"
            alt="reset-password"
          />
        </div> */}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ResetPassword;
