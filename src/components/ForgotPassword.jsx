import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";

const bearerKey = import.meta.env.VITE_BEARER_KEY;
const API_URL = import.meta.env.VITE_API_URL;


const ForgetPassword = () => {
   const { t } = useTranslation();

  const [email, setEmail] = useState(""); // State for input email
  const [alert, setAlert] = useState({ type: "", message: "" }); // State for alert
  const navigate = useNavigate(); // For navigation

   const [loading, setLoading] = useState(false);
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setAlert({ type: "error", message: "Email address is required." });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      return;
    }

    // Create FormData and append email
    const formData = new FormData();
    formData.append("email", email);

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/forgot-password.php`, formData,
        {
          headers:{
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "multipart/form-data",
          }
         }
      );

      const { type, message, email: responseEmail } = response.data;

      // Set alert with the response message
      setAlert({ type, message });

      setLoading(false);

      if (type === "success") {
     
        setEmail("");

        // After 3 seconds, navigate to the verify OTP page
        setTimeout(() => {
          setAlert({ type: "", message: "" });
          navigate("/verify-otp", { state: { email: responseEmail } });
        }, 3000);
      }
    } catch (error) {
      console.error("Error sending forgot password request:", error);
      setAlert({
        type: "error",
        message: "An error occurred. Please try again later.",
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
          <div className="col-md-7 col-lg-5 col-xxl-4 col-12 mx-auto">
            <form
              className="register_form d-flex flex-column justify-content-center align-items-center"
              onSubmit={handleSubmit}
            >
              <div >
                <h1>{t("Forget_Password")}</h1>
                <p>{t("Forget_head")}</p>

                {/* Alert Section */}
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
                    <label htmlFor="email" className="mb-2">
                    {t("Email")} <span>*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder={t("Email_placeholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // Update state
                      required
                    />
                  </div>

                  <div className="col-12 py-4">
                    <button type="submit"
                     className="btn btn-register w-100"
                     disabled={loading}
                     >
                     {loading ? t("Submitting") : t("Submit")}
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
            src="/images/frontimg/forget.jpg"
            alt="forget"
          />
        </div> */}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ForgetPassword;
