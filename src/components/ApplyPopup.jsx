import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import { useAuthContext } from "../store/authContext";

import { toast } from 'react-toastify';

const ApplyPopup = ({ jobId }) => {
  const { user } = useAuthContext();
  const userId = user ? user.id : null;
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const [jobTitle, setJobTitle] = useState("");

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const [formData, setFormData] = useState({
    job_id: jobId,
    user_id: userId,
    name: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    resume: null,
  });

  // Update formData when jIobId or userd changes
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      job_id: jobId,
      user_id: userId,
    }));
  }, [jobId, userId]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!jobId && !userId) return; // Ensure userId exists before fetching data

      try {
        const response = await axios.get(`${API_URL}/job-seeker-details.php?user_id=${userId}&job_id=${jobId}`, {

          headers: {
            Authorization: `Bearer ${bearerKey}`,
          },
        });

        if (response.data.type === "success") {
          const userData = response.data.data;
          setJobTitle(userData.job_title || ""); 
          
          setFormData((prevData) => ({
            ...prevData,
            name: userData.name || "",
            gender: userData.gender || "",
            dob: userData.dob || "",
            email: userData.email || "",
            phone: userData.phone || "",
            resume: userData.resume || null,
            job_title: userData.job_title || "",
            recruiter_id: userData.recruiter_id || "",
          }));

          // Extract file name from URL if a resume exists
          if (userData.resume) {
            const extractedFileName = userData.resume.split("/").pop();
            setFileName(extractedFileName);
          }
        } else {
          console.error("Failed to fetch user data:", response.data.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
      }
    };

    fetchUserData();
  }, [jobId, userId]);

  // Handle file selection
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFileName(selectedFile.name); // Store file name
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

  // Handle form submission
  const handleFormSubmit = async (e, close) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post(`${API_URL}/apply-job.php`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.type === "success") {
        toast.success(response.data.message);
        close();
      } else {
        return toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <Popup trigger={<button className="btn btn-primary"> Apply </button>} modal>
      {(close) => (
        <div className="popup-container p-4">
          <div className="d-flex justify-content-between align-items-center">
            <h3>Apply for {jobTitle}</h3>
            <button type="button" onClick={close} className="btn-close" aria-label="Close"></button>
          </div>

          <p className="text-muted text-start">Please complete the form below to apply for a position with us.</p>

          <form className="form-container" onSubmit={(e) => handleFormSubmit(e, close)}>
            <input type="hidden" name="job_id" value={formData.job_id} />
            <input type="hidden" name="job_title" value={formData.job_title} />
            <input type="hidden" name="user_id" value={formData.user_id} />
            <input type="hidden" name="recruiter_id" value={formData.recruiter_id} />

            <div className="mb-3">
              <label className="form-label" htmlFor="name">Username:</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Your Username"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label" htmlFor="gender">Gender:</label>
                <select
                  className="form-select"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="" disabled>Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender</option>
                </select>
              </div>

              <div className="col">
                <label className="form-label" htmlFor="dob">Date of Birth:</label>
                <input
                  className="form-control"
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label" htmlFor="email">Email Address:</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter Your Email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="col">
                <label className="form-label" htmlFor="phone">Phone Number:</label>
                <input
                  className="form-control"
                  type="tel"
                  placeholder="(000) 000-0000"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="resume">Resume:</label>
              <p className="text-muted text-start">75% of recruiters discover candidates through their resume.</p>
              
              <div className="file-input">
                <div className="input-box" onClick={() => fileInputRef.current.click()}>
                  <h4>
                    <i className="fa-solid fa-upload"></i> Choose File to Upload
                  </h4>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="form-control d-none"
                  accept=".doc,.docx,.rtf,.pdf"
                  onChange={handleFileChange}
                />
              </div>

              {/* Show Existing Resume with Link */}
              {formData.resume && (
                <div className="d-flex justify-content-center">
                  <h6 className="mt-2 text-success mb-0">
                    Selected file: 
                    <a 
                      href={`${formData.resume}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ms-2 text-primary"
                    >
                      {fileName} (Click to open)
                    </a>
                  </h6>
                  <div className="ms-2 mt-1 text-danger">
                    <i class="fa-solid fa-trash" onClick={handleRemoveResume}></i>
                  </div>
                </div>
              )}

              <small className="text-muted text-start">Supported Formats: doc, docx, rtf, pdf, up to 2 MB</small>
            </div>

            <button className="btn btn-primary w-100 mt-3" type="submit">Apply</button>
          </form>
        </div>
      )}
    </Popup>
  );
};

export default ApplyPopup;
