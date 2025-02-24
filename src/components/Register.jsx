import React, { useState, useEffect} from "react";
import ReactFlagsSelect from "react-flags-select";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";

const bearerKey = import.meta.env.VITE_BEARER_KEY;
const API_URL = import.meta.env.VITE_API_URL;
const EmpLogin = import.meta.env.VITE_EMP_URL;

const Register = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState("");
  const [formData, setFormData] = useState({
    name: "",
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
  
      if (roleParam && (roleParam === "recruiter" || roleParam === "job_seeker")) {
        setFormData((prevData) => ({
          ...prevData,
          role: roleParam,
        }));
      }
    }, []);

  // Mapping countries to their phone codes
  const customLabels = {
    AF: "+93",
    AL: "+355",
    DZ: "+213",
    AS: "+1-684",
    AD: "+376",
    AO: "+244",
    AI: "+1-264",
    AG: "+1-268",
    AR: "+54",
    AM: "+374",
    AW: "+297",
    AU: "+61",
    AT: "+43",
    AZ: "+994",
    BS: "+1-242",
    BH: "+973",
    BD: "+880",
    BB: "+1-246",
    BY: "+375",
    BE: "+32",
    BZ: "+501",
    BJ: "+229",
    BM: "+1-441",
    BT: "+975",
    BO: "+591",
    BA: "+387",
    BW: "+267",
    BR: "+55",
    BN: "+673",
    BG: "+359",
    BF: "+226",
    BI: "+257",
    KH: "+855",
    CM: "+237",
    CA: "+1",
    CV: "+238",
    KY: "+1-345",
    CF: "+236",
    TD: "+235",
    CL: "+56",
    CN: "+86",
    CO: "+57",
    KM: "+269",
    CG: "+242",
    CD: "+243",
    CR: "+506",
    CI: "+225",
    HR: "+385",
    CU: "+53",
    CY: "+357",
    CZ: "+420",
    DK: "+45",
    DJ: "+253",
    DM: "+1-767",
    DO: "+1-809",
    EC: "+593",
    EG: "+20",
    SV: "+503",
    GQ: "+240",
    ER: "+291",
    EE: "+372",
    ET: "+251",
    FJ: "+679",
    FI: "+358",
    FR: "+33",
    GA: "+241",
    GM: "+220",
    GE: "+995",
    DE: "+49",
    GH: "+233",
    GR: "+30",
    GD: "+1-473",
    GT: "+502",
    GN: "+224",
    GW: "+245",
    GY: "+592",
    HT: "+509",
    HN: "+504",
    HK: "+852",
    HU: "+36",
    IS: "+354",
    IN: "+91",
    ID: "+62",
    IR: "+98",
    IQ: "+964",
    IE: "+353",
    IL: "+972",
    IT: "+39",
    JM: "+1-876",
    JP: "+81",
    JO: "+962",
    KZ: "+7",
    KE: "+254",
    KI: "+686",
    KP: "+850",
    KR: "+82",
    KW: "+965",
    KG: "+996",
    LA: "+856",
    LV: "+371",
    LB: "+961",
    LS: "+266",
    LR: "+231",
    LY: "+218",
    LI: "+423",
    LT: "+370",
    LU: "+352",
    MO: "+853",
    MK: "+389",
    MG: "+261",
    MW: "+265",
    MY: "+60",
    MV: "+960",
    ML: "+223",
    MT: "+356",
    MH: "+692",
    MR: "+222",
    MU: "+230",
    MX: "+52",
    FM: "+691",
    MD: "+373",
    MC: "+377",
    MN: "+976",
    ME: "+382",
    MA: "+212",
    MZ: "+258",
    MM: "+95",
    NA: "+264",
    NR: "+674",
    NP: "+977",
    NL: "+31",
    NZ: "+64",
    NI: "+505",
    NE: "+227",
    NG: "+234",
    NO: "+47",
    OM: "+968",
    PK: "+92",
    PW: "+680",
    PS: "+970",
    PA: "+507",
    PG: "+675",
    PY: "+595",
    PE: "+51",
    PH: "+63",
    PL: "+48",
    PT: "+351",
    PR: "+1-787",
    QA: "+974",
    RO: "+40",
    RU: "+7",
    RW: "+250",
    KN: "+1-869",
    LC: "+1-758",
    VC: "+1-784",
    WS: "+685",
    SM: "+378",
    ST: "+239",
    SA: "+966",
    SN: "+221",
    RS: "+381",
    SC: "+248",
    SL: "+232",
    SG: "+65",
    SK: "+421",
    SI: "+386",
    SB: "+677",
    SO: "+252",
    ZA: "+27",
    ES: "+34",
    LK: "+94",
    SD: "+249",
    SR: "+597",
    SZ: "+268",
    SE: "+46",
    CH: "+41",
    SY: "+963",
    TW: "+886",
    TJ: "+992",
    TZ: "+255",
    TH: "+66",
    TL: "+670",
    TG: "+228",
    TO: "+676",
    TT: "+1-868",
    TN: "+216",
    TR: "+90",
    TM: "+993",
    TV: "+688",
    UG: "+256",
    UA: "+380",
    AE: "+971",
    GB: "+44",
    US: "+1",
    UY: "+598",
    UZ: "+998",
    VU: "+678",
    VA: "+39",
    VE: "+58",
    VN: "+84",
    YE: "+967",
    ZM: "+260",
    ZW: "+263",
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && value.length > 10) {
        return;
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
    if (!formData.name || !formData.email ) {
      setAlert({ type: "error", message: "Please fill the form!" });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      return;
    }
   
    if (!selected || !formData.phone) {
      setAlert({ type: "error", message: "Please select a country code and enter a phone number!" });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      return;
    }
  
    const phoneRegex = /^[0-9]{6,14}$/; // Optional: Phone number validation
    if (!phoneRegex.test(formData.phone)) {
      setAlert({ type: "error", message: "Please enter a valid phone number!" });
      setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      return;
    }
  
    // Create FormData object and append data
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", `${customLabels[selected]}${formData.phone}`); 
    formDataToSend.append("password", formData.password);
    formDataToSend.append("role", formData.role);
  
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
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          role: "job_seeker",
        });
        setSelected(""); // Reset selected country code
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
                        {t("Full_Name")} <span>*</span>
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
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="phone" className="mb-2">
                        {t("Phone")} <span>*</span>
                      </label>
                      <div className="row">
                        <div className="col-sm-4 mb-4 mb-sm-0">
                        <ReactFlagsSelect
                        selected={selected}
                        onSelect={(code) => setSelected(code)}
                        searchable
                        placeholder={t("Select")}
                        customLabels={customLabels}
                        className="w-100"
                      />

                        </div>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            maxLength="10"
                            pattern="\d*"
                            placeholder={t("Phone_placeholder")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="password" className="mb-2">
                        {t("Password")} <span>*</span>
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder={t("Pass_placeholder")}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="confirmPassword" className="mb-2">
                        {t("Confirm_Password")} <span>*</span>
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder={t("ConfirmPass_placeholder")}
                      />
                    </div>
                    <p className="mb-3 text-center">
                      {t("BySigning")}
                      <Link className="text-theme mx-1" to="/terms-and-conditions">
                        {t("Terms")}
                      </Link>
                      and
                      <Link className="text-theme mx-1" to="/privacy-policy">
                        {t("Privacy")}
                      </Link>
                    </p>

                    {/* <p className={`text-center text-${alert.type === 'success' ? 'success' : 'danger'}`}>{alert.message}</p> */}
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
                      <Link to="/login" className="text-theme mx-1">{t("Login")}</Link>
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
