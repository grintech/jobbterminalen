import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuthContext } from "../store/authContext";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getGoogleTranslateLang } from "../utils/getLang";
import { useTranslation } from "react-i18next";

const ApplyJob = () => {
  const location = useLocation();
  const jobId = location.state?.jobId || null;
  // {console.log("MyId : " , jobId)};
  const { user } = useAuthContext();
  const userId = user ? user.id : null;
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const {t} = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
  if (!jobId) {
    navigate("/jobs", { replace: true });
  }
 }, [jobId, navigate]);


  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  
  // LinkedIn Profile

  const [linkedInUrl, setLinkedInUrl] = useState("");
   const [error, setError] = useState("");

  const handleLinkedInChange = (e) => {
    const value = e.target.value.trim();
    setLinkedInUrl(value);

    const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_]+\/?$/;

    if (value === "" || linkedinRegex.test(value)) {
      setError("");
    } else {
      setError("Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/yourname)");
    }
  };



  //   const validateUrl = () => {
  //   if (linkedInUrl.trim() === "") {
  //     setError("LinkedIn username cannot be empty.");
  //     return false;
  //   }
  //   setError("");
  //   return true;
  // };

  const decodeHTMLEntities = (str) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};

  // Coverletter start
  const [coverLetter, setCoverLetter] = useState("");

  const handleChange = (e) => {
    const inputText = e.target.value;
    const wordCount = inputText.trim().split(/\s+/).length;

    // Allow if word count is 500 or less
    if (wordCount <= 500) {
      setCoverLetter(inputText);
    }
  };

  const getWordCount = () => {
    return coverLetter.trim() === "" ? 0 : coverLetter.trim().split(/\s+/).length;
  };

  // Coverletter end

  // Multiple certificate upload start
  const [certificates, setCertificates] = useState([]);
  const fileInputRef1 = useRef(null);

  const allowedTypes = [
    "application/pdf", // Only allow PDF
  ];

  const handleCertificatesChange = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter((file) =>
      allowedTypes.includes(file.type)
    );

    if (validFiles.length !== files.length) {
      // toast.error("Only PDF, DOC, and DOCX files are allowed.");
      toast.error("Only PDF files are allowed.");
    }

    setCertificates((prev) => {
      const existingNames = new Set(prev.map((file) => file.name));
      const newUniqueFiles = validFiles.filter((file) => !existingNames.has(file.name));

      if (newUniqueFiles.length < validFiles.length) {
        toast.info("Some duplicate files were ignored.");
      }

      return [...prev, ...newUniqueFiles];
    });

    // Reset input value so the same file can be selected again
    if (fileInputRef1.current) {
      fileInputRef1.current.value = "";
    }
  };

  const handleRemoveFile = (index) => {
    const newFiles = certificates.filter((_, i) => i !== index);
    setCertificates(newFiles);

    // Reset input value when list becomes empty
    if (newFiles.length === 0 && fileInputRef1.current) {
      fileInputRef1.current.value = "";
    }
  };

  // Multiple certificate upload end


  const [formData, setFormData] = useState({
    // job_id: jobId,
    // user_id: userId,
    job_id: jobId || "",
    user_id: userId || "",
    name: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    resume: null,
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      job_id: jobId,
      user_id: userId,
    }));
  }, [jobId, userId]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!jobId || !userId) return;

      try {
        const response = await axios.get(
          `${API_URL}/job-seeker-details.php?user_id=${userId}&job_id=${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${bearerKey}`,
            },
          }
        );

        if (response.data.type === "success") {
          const userData = response.data.data;
          setJobTitle(userData.job_title || "");

          // setFormData((prevData) => ({
          //   ...prevData,
          //   name: userData.name || "",
          //   gender: userData.gender || "",
          //   dob: userData.dob || "",
          //   email: userData.email || "",
          //   phone: userData.phone || "",
          //   resume: userData.resume || null,
          //   job_title: userData.job_title || "",
          //   recruiter_id: userData.recruiter_id || "",
          // }));

          setFormData((prevData) => ({
            ...prevData,
            name: userData.name ?? "",
            gender: userData.gender ?? "",
            dob: userData.dob ?? "",
            email: userData.email ?? "",
            phone: userData.phone ?? "",
            resume: userData.resume ?? null,
            job_title: userData.job_title ?? "",
            recruiter_id: userData.recruiter_id ?? "",
          }));
          

          if (userData.resume) {
            const extractedFileName = userData.resume.split("/").pop();
            setFileName(extractedFileName);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [jobId, userId]);

  // const handleFileChange = (event) => {
  //   if (event.target.files.length > 0) {
  //     const selectedFile = event.target.files[0];
  //     setFileName(selectedFile.name);
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       resume: selectedFile,
  //     }));
  //   }
  // };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
  
      if (selectedFile.type !== "application/pdf") {
        toast.error("Only PDF files are allowed.");
        return;
      }
  
      setFileName(selectedFile.name);
      setFormData((prevData) => ({
        ...prevData,
        resume: selectedFile,
      }));
    }
  };

  
  const handleRemoveResume = () => {
    setFileName("");
    setFormData((prevData) => ({ ...prevData, resume: null }));
    fileInputRef.current.value = "";
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const selectedLang = getGoogleTranslateLang(); 
  
    // Check if user is logged in
    if (!userId || !bearerKey) {
      toast.error(" You must be logged in to apply.");
      return; 
    }

    if (!formData.gender) {
      toast.error("Please complete your profile first before applying!");
      setTimeout(() => {
        navigate("/my-account");
      }, 3000);
      return;
    }

    if (!formData.dob) {
      toast.error("Please complete your profile first before applying!");
      setTimeout(() => {
        navigate("/my-account");
      },3000);
      return;
    }

    if(formData.resume === null){
      toast.error("Please complete your profile first before applying!");
      setTimeout(() => {
        navigate("/my-account");
      }, 3000);
      return;
    }


    try {
      setIsSubmitting(true);
      const formDataToSend = new FormData();

      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
     
      // Append cover letter

      // formDataToSend.append("cover_letter", coverLetter);
      {coverLetter &&  formDataToSend.append("cover_letter", coverLetter);}
      {linkedInUrl &&  formDataToSend.append("linkedin_Url", `https://www.linkedin.com/in/${linkedInUrl}`);}

      formDataToSend.append("lang", selectedLang);


      // Append certificates
      certificates.forEach((file, index) => {
        formDataToSend.append(`certificates[${index}]`, file);
      });
  

      const response = await axios.post(`${API_URL}/apply-job.php`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.type === "success") {

        // toast.success(response.data.message);
        setIsSubmitting(false);
        setCoverLetter(""); // Reset fields
        setCertificates([]); // Reset fields
        setLinkedInUrl(""); // Reset fields

       navigate('/thank-you', { state: { from: 'apply' } });

        // setTimeout(() => {
        //   navigate('/jobs');
        // },2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Submission failed.");
    }finally{
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
       <div className="apply_job_page ">
        <div className="container py-4">
          <div className="col-xxl-6 col-lg-7 col-md-9 mx-auto">
          <div className="card">
            <div className="card-body p-4 p-md-5">
            <h1 className="text-start fs-4 mb-3">
           {userId ? `Apply for ${decodeHTMLEntities(jobTitle).replace(/-/g, ' ')}` : t("Apply")}
          </h1>
            <p className="text-muted text-start">{t("JobText")}</p>

            <form className="form-container" onSubmit={handleFormSubmit}>
              <input type="hidden" name="job_id" value={formData.job_id || ''} />
              <input type="hidden" name="job_title" value={formData.job_title || ''} />
              <input type="hidden" name="user_id" value={formData.user_id || ''} />
              <input type="hidden" name="recruiter_id" value={formData.recruiter_id || ''} />

              <div className="mb-3">
                <label className="form-label" htmlFor="name">{t("Name")} <span className="text-danger">*</span></label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  readOnly
                />
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label className="form-label" htmlFor="gender">{t("Gender")} <span className="text-danger">*</span></label>
                  <select
                    className="form-select "
                    id="gender"
                    value={formData.gender || ''}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    
                  >
                    <option value="" disabled>{t("SelectGender")}</option>
                    <option value="Male">{t("Male")}</option>
                    <option value="Female">{t("Female")}</option>
                    <option value="Transgender">{t("Transgender")}</option>
                  </select>
                </div>

                <div className="col">
                  <label className="form-label" htmlFor="dob">{t("DOB")} <span className="text-danger">*</span></label>
                  <input
                    className="form-control"
                    type="date"
                    id="dob"
                    value={formData.dob || ''}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    readOnly
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <label className="form-label" htmlFor="email">{t("EmailAddress")} <span className="text-danger">*</span></label>
                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="col-sm-6">
                  <label className="form-label" htmlFor="phone">{t("PhoneNumber")} <span className="text-danger">*</span></label>
                  <input
                    className="form-control"
                    type="tel"
                    id="phone"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    readOnly
                  />
                </div>
              </div>

              <div className="mb-3">
                 <label className="form-label" htmlFor="linkedin">
                  {t("LinkedInProfile")}
                 </label>
                
                <div className="input-group">
                  <input
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    type="text"
                    id="linkedin"
                    value={linkedInUrl}
                    onChange={handleLinkedInChange}
                    placeholder="https://www.linkedin.com/in/yourname"
                  />
                  {error && <div className="invalid-feedback d-block">{error}</div>}
                </div>

             </div>

              <div className="mb-4">
                <label className="form-label">{t("CoverLetter")}</label>
                <textarea
                  rows={5}
                  className="form-control"
                  value={coverLetter}
                  onChange={handleChange}
                  placeholder={t("CoverLetterPlaceholder")}
                />
                <div className="text-end text-muted mt-1">
                  {t("WordCount")} {getWordCount()}/ 500
                </div>
              </div>



              <div className="row">
                <div className="col-md-6 mb-4">
                  <label className="form-label" htmlFor="resume">{t("Resume")} <span className="text-danger">*</span></label>
                  {/* <p className="text-muted text-start">75% of recruiters discover candidates through their resume.</p> */}

                  <div className="file-input mb-2">
                    <div className="input-box" onClick={() => fileInputRef.current.click()}>
                      <h6 className="m-0">
                        <i className="fa-solid fa-upload me-2"></i>
                        {formData.resume ? (t("UploadNewResume")) : (t("ChooseFile"))}
                        </h6>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="form-control d-none"
                      accept=".pdf"
                      onChange={handleFileChange}
                      
                    />
                  </div>

                  {formData.resume && (
                    <div className=" mb-2 d-flex flex-column align-items-baseline select_file">
                      <h6 className="m-0 text-center w-100">Or </h6>
                      <div className="d-flex">
                        <h6 className="mt-2 text-success me-3 mb-0">
                       {t("SelectedFile")} {fileName}
                      </h6>
                      <div className=" mt-2 ">
                        <i className="fa-solid fa-trash" onClick={handleRemoveResume}></i>
                      </div>
                      </div>
                    </div>
                  )}

                  {!formData.resume && <small className="text-muted text-start">{t("SupportedFormats")}</small>}
                </div>
          
                <div className=" col-md-6 mb-3">
                  <label className="form-label">{t("UploadCertificate")}</label>
                  <div className="d-flex align-items-center gap-2">
                    {/* <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      className="form-control"
                      onChange={handleCertificatesChange}
                      ref={fileInputRef1}
                    /> */}
                  
                  </div>
                  <div className="file-input mb-2">
                    <div className="input-box" onClick={() => fileInputRef1.current.click()}>
                      <h6 className="m-0">
                        <i className="fa-solid fa-upload me-2"></i>
                         {t("UploadCertificatePlace")}
                        </h6>
                    </div>
                  
                    <input
                      type="file"
                      multiple
                      accept=".pdf"
                      className="form-control d-none"
                      onChange={handleCertificatesChange}
                      ref={fileInputRef1}
                    />
                  </div>

                  {certificates.length > 0 && <span className="badge bg-theme">
                    {certificates.length} file{certificates.length !== 1 ? "s" : ""} {t("Selected")}
                  </span>
                  }

                  {certificates.length > 0 && (
                    <div className="mt-4 preview_certificates">
                      <h6>{t("SelectedCertificates")}</h6>
                      <ul className="list-group">
                        {certificates.map((file, index) => (
                          <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-start"
                          >
                            <span className="me-2">{file.name}</span>
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => handleRemoveFile(index)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                   {certificates.length == 0 && <small className="text-muted text-start">{t("SupportedFormats")}</small>}
                </div>
             </div>

             
              <button className="btn btn-register rounded-2 py-3 fs-6 w-100 mt-3 "
               type="submit"
               disabled={isSubmitting}
               >
                 {isSubmitting ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : null}
                    {isSubmitting ? (t("Submitting")) : (t("Submit"))}
                    {/* Submit */}
              </button>
            </form>
            </div>
          </div>
          </div>
     

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar pauseOnHover />
        </div>
       </div>
      <Footer />
    
    </>
  );
};

export default ApplyJob;
 