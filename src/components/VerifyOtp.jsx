import React, { useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";

const bearerKey = import.meta.env.VITE_BEARER_KEY;
const API_URL = import.meta.env.VITE_API_URL;


const VerifyOtp = () => {
  const { t } = useTranslation();

  const inputsRef = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { email } = location.state || {}; // Access email from location state
  const [otp, setOtp] = useState(""); 
  const [alert, setAlert] = useState({ type: "", message: "" }); // Alert state
  const [loading, setLoading] = useState(false);

  // Handle OTP input
  const handleInputChange = (e, index) => {
    const { value } = e.target;

    // Restrict input to numbers only
    if (!/^\d$/.test(value)) {
      e.target.value = ""; // Clear invalid input
      return;
    }

    // Update OTP state
    const updatedOtp = otp.split("");
    updatedOtp[index] = value;
    setOtp(updatedOtp.join(""));

    // Move to the next input field if valid
    if (index < inputsRef.current.length - 1 && value) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      // Move to the previous input field on backspace
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6); // Extract first 6 digits
    const digits = pasteData.split("").filter((char) => /\d/.test(char)); // Keep only digits

    digits.forEach((digit, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = digit;
        inputsRef.current[i].focus();
      }
    });

    setOtp(digits.join("")); // Update OTP state
    e.preventDefault(); // Prevent default paste behavior
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setAlert({ type: "error", message: "Please enter a valid 6-digit OTP." });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      return;
    }

    try {
      setLoading(true);

      // Prepare form data
      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", otp);

      // Send OTP verification request
      const response = await axios.post(`${API_URL}/verify-otp.php`,formData,
        {
          headers:{
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "multipart/form-data",
          }
         }
      );

      const { type, message,session_token } = response.data;

      // Show alert based on response
      setAlert({ type, message });
      setLoading(false);

      if (type === "success") {
        // Navigate to the reset password page on success
        setTimeout(() => {
          navigate("/reset-password", { state: { email, session_token } }); // Pass email to the next page
        }, 2000);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setAlert({
        type: "error",
        message: "An error occurred while verifying OTP. Please try again.",
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
            <div className="col-md-11 col-11 mx-auto">
            <form
              className="register_form d-flex flex-column justify-content-center align-items-center"
              onSubmit={handleSubmit}
              onPaste={handlePaste}
            >
              <div >
               
                <h1>{t("Otp_title")}</h1>
                <p>{t("Otp_text")}</p>

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

                <div id="otp-form" className="d-flex flex-column align-items-center mt-4">

                 <div>
                 {Array.from({ length: 6 }, (_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="otp-input"
                      autoFocus={index === 0}
                      onChange={(e) => handleInputChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => (inputsRef.current[index] = el)}
                    />
                  ))}
                 </div>

                  <div className="col-12 py-4 px-0">
                    <button
                      type="submit"
                      className="btn btn-register w-100"
                      disabled={loading}
                    >
                      {loading ? t("Verifying") : t("Submit")}
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

        {/* <div className="col-lg-6 d-none d-lg-block ">
          <img
            className="w-100 h-100"
            src="https://img.freepik.com/premium-vector/otp-onetime-password-2step-authentication-data-protection-internet-security-concept_100456-10200.jpg?semt=ais_hybrid"
            alt="Login Illustration"
          />
        </div> */}
      </div>
    </div>

    <Footer />
    </>
    
  );
};

export default VerifyOtp;
