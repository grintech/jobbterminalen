import React, { useEffect, useState , useRef } from "react";
import Navbar from "../../components/Navbar";
import { useAuthContext } from "../../store/authContext";
import Footer from "../../components/Footer";
import JobSidebar from "./JobSidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import html2pdf from "html2pdf.js"; 

const MyAccount = () => {

  const [isSaving, setIsSaving] = useState(false);

  const resumeRef = useRef()
  const { user } = useAuthContext();
  const userId = user ? user.id : null;
  const [userData, setUserData] = useState({});
  const [profileImage, setProfileImage] = useState("/images/blank_user.png");
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resume, setResume] = useState(null);
  const [resumeError, setResumeError] = useState("");
  const [skills, setSkills] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [education, setEducation] = useState([]);
  // const [selectedEducation, setSelectedEducation] = useState(null);
  const [socialProfiles, setSocialProfiles] = useState([]);
  const [selectedSocialProfile, setSelectedSocialProfile] = useState({});
  const [urlError, setUrlError] = useState('');


  const [isDifferentlyAbled, setIsDifferentlyAbled] = useState(
    userData.differently_abled || null
  );
  const [abledType, setAbledType] = useState(
    userData.differently_abled_type || ""
  );

  const [uploadPercentage, setUploadPercentage] = useState('');

  const getStrokeColor = (percentage) => {
    if (percentage < 25) return "#f44336"; // Red
    if (percentage < 50) return "#ff9800"; // Orange/Yellow
    if (percentage < 75) return "#2196f3"; // Blue
    if (percentage < 90) return "#003479"; // Theme Blue
    return "#4caf50"; // Green
  };

  // Simulate dynamic progress (remove this in real app)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setUploadPercentage(prev => (prev < 25 ? prev + 1 : prev));
  //   }, 100); // increase every 100ms
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     uploadPercentage;
  //   }, 100); // increase every 100ms
  //   return () => clearInterval(interval);
  // }, []);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (uploadPercentage / 100) * circumference;
  

  const [languageToDeleteIndex, setLanguageToDeleteIndex] = useState(null);

  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState({
    certification_name: "",
    certification_url: "",
    certification_validity: "",
    expire_on: "",
    lifetime_validity: false,
  });

  const handleNumericInput = (e, key, maxLength, setData, data) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits

    // Prevent values like "0", "00", "000", etc.
    if (/^0+$/.test(value)) {
      value = ""; // Clear the input if only zeros
    }

    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
    }

    setData({ ...data, [key]: value });
    
  };


  const validateUrl = (value) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)' +               // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain
      '((\\d{1,3}\\.){3}\\d{1,3}))' +    // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' +       // query string
      '(\\#[-a-z\\d_]*)?$', 'i'           // fragment locator
    );

    if (!value) {
      setUrlError('URL is required');
    } else if (!urlPattern.test(value)) {
      setUrlError('Please enter a valid URL');
    } else {
      setUrlError('');
    }
  };



  const defaultEmploymentForm = {
    id: "",
    current_employment: "yes",
    employment_type: "",
    total_experience: "",
    current_company_name: "",
    current_job_title: "",
    joining_date: "",
    worked_till: "",
    current_salary: "",
    job_profile: "",
    notice_period: "",
  };

  const defaultEducationForm = {
    id: "",
    education: "",
    institute: "",
    course: "",
    specialization: "",
    course_type: "",
    course_starting_year: "",
    course_ending_year: "",
    marks: "",
    board: "",
    passing_year: "",
    school_medium: "",
  }
  const [employmentForm, setEmploymentForm] = useState(defaultEmploymentForm);

  const [educationData, setEducationData] = useState(defaultEducationForm);
  const [yearError, setYearError] = useState('');
  const [marksError, setMarksError] = useState('');

  const isSchoolLevel = educationData.education === "4" || educationData.education === "5";


  const handleRadioChange = (event) => {
    const { value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      work_status: value,
    }));
  };

  const handleRadioLocation = (event) => {
    const selectedLocation = event.target.value;
    setUserData((prev) => ({
      ...prev,
      current_location: selectedLocation,
    }));
  };

  const handleDifferentlyAbledChange = (event) => {
    const { value } = event.target;
    setIsDifferentlyAbled(value);
    setUserData((prevData) => ({
      ...prevData,
      differently_abled: value,
    }));
  };

  const handleAbledTypeChange = (event) => {
    const { value } = event.target;
    setAbledType(value);
    setUserData((prevData) => ({
      ...prevData,
      differently_abled_type: value,
    }));
  };

  const handleCertificateChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Block non-alphabetic characters in certification_name field
    if (name === "certification_name" && /[^a-zA-Z\s]/.test(value)) {
      return; // Don't update state if value contains non-alphabetic characters
    }

    // Update state with the correct value
    setSelectedCertificate((prev) => {
      if (name === "lifetime_validity") {
        return {
          ...prev,
          [name]: checked,
          certification_validity: checked ? "Lifetime" : "",
          expire_on: checked ? "" : prev.expire_on,
        };
      } else if (name === "certification_validity" && value === "Lifetime") {
        return {
          ...prev,
          [name]: value,
          lifetime_validity: true,
          expire_on: "",
        };
      }

      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  // URL validation on blur or when trying to save
  const validateCerUrl = (value) => {
    const urlPattern = /^(https?:\/\/)/;
    if (value && !urlPattern.test(value)) {
      setUrlError('URL must start with http:// or https://');
    } else {
      setUrlError('');
    }
  };





  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "application/pdf",
      // "application/msword",
      // "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      // "application/rtf",
    ];
    const maxSize = 2 * 1024 * 1024; // 2 MB in bytes

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setResumeError(
          "Invalid file type. Only PDF is allowed."
        );
        return;
      }

      if (file.size > maxSize) {
        setResumeError("File size exceeds 2 MB.");
        return;
      }

      setResumeError("");
      const fileName = file.name;
      setResume({ file, fileName });

      // Create form data
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("resume", file);


      //  const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
      //   document.getElementById("ajaxModalMessage").textContent =
      //     "Uploading Resume...";
      //   ajaxModal.show();

      setIsSaving(true);
      try {
        const response = await axios.post(
          `${API_URL}/upload-resume.php`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${bearerKey}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.type === "success") {
          toast.success("Resume uploaded successfully!");
          fetchUserData();
          //  ajaxModal.hide();
          var resumeLink = response.data.resume.split("/").pop();
          setResume(resumeLink);
          setUserData((prevData) => ({
            ...prevData,
            resume: response.data.resume,
            resume_uploaded_on: new Date().toISOString(),
          }));
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error uploading resume:", error);
        toast.error("Error uploading resume.");
      } finally {
        setTimeout(() => {
          setIsSaving(false);
        }, 300);
      }
    }
  };

 const handleResumeDownload = async () => {
  if (!userId) {
    toast.error("User ID not available.");
    return;
  }
  try {
    const response = await axios.get(
      `${API_URL}/view-resume.php?user_id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (
      response.data &&
      response.data.data &&
      response.data.data.length > 0
    ) {
      const resumeData = response.data.data[0];
      let resumeUrl = resumeData.resume;

      // If resume is not a full URL, prepend IMG_URL
      if (!resumeUrl.startsWith("http")) {
        resumeUrl = `${IMG_URL}/${resumeUrl}`;
      }

      const fileName = resumeUrl.split("/").pop();
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = fileName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log("No resume found for the user.");
      toast.info("No resume found for this user.");
    }
  } catch (error) {
    console.error("Error while fetching resume:", error);
    toast.error("Failed to get response. Please try again.");
  }
};


  const handleRemoveResume = () => {
    const removeResumeModal = new bootstrap.Modal(
      document.getElementById("removeResumeModal")
    );
    removeResumeModal.show();
  };

  const confirmRemoveResume = async () => {
    if (!userId) return;

    setIsSaving(true);
    try {
      const response = await axios.delete(
        `${API_URL}/remove-resume.php?user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.type === "success") {
        toast.success("Resume removed successfully!");
        fetchUserData();
        setResume(null);
        setUserData((prevData) => ({
          ...prevData,
          resume: null,
          resume_uploaded_on: null,
        }));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error removing resume:", error);
      toast.error("Error removing resume.");
    } finally{
        setTimeout(() => {
          setIsSaving(false);
        }, 300);
    }
  };

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const SITE_URL = import.meta.env.VITE_SITE_URL;

  const fetchUserData = async () => {
    if (userId) {
      fetchEmployment(userId);
      fetchEducation(userId);
      fetchSocialProfiles(userId);
      fetchCertificates(userId);
    } else {
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL}/job-seeker-details.php?user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.type === "success") {
        const userDetails = response.data.data;
        setUploadPercentage(response.data.percentage);
        // console.log(response.data.percentage);

        // Add the provided code snippet here
        if (
          userDetails.total_experience &&
          userDetails.total_experience.includes(" - ")
        ) {
          const experienceParts = userDetails.total_experience.split(" - ");
          const monthsPart = experienceParts[1]
            ? experienceParts[1].split(" ")[0]
            : null;

          userDetails.total_experience_months = monthsPart
            ? `${monthsPart} Month${parseInt(monthsPart, 10) > 1 ? "s" : ""}`
            : "";
        } else {
          userDetails.total_experience_months = "";
        }

        if (userDetails.total_experience) {
          const yearsPart = userDetails.total_experience.split(" ")[0];

          userDetails.total_experience_years = yearsPart
            ? `${yearsPart} Year${parseInt(yearsPart, 10) > 1 ? "s" : ""}`
            : "";
        } else {
          userDetails.total_experience_years = "";
        }

        if (userDetails.language && userDetails.language_proficiency) {
          const languageArray = userDetails.language
            .split(",")
            .map((lang, index) => ({
              language: lang.trim(),
              proficiency: userDetails.language_proficiency
                .split(",")
              [index].trim(),
            }));
          setLanguages(languageArray);
        }

        setUserData(userDetails);

        if (userDetails.image) {
          setProfileImage(`${IMG_URL}/${userDetails.image}`);
        }

        if (userDetails.skills) {
          setSkills(
            userDetails.skills.split(",").map((skill) => skill.trim())
          );
        }
      } else {
        console.error(
          " user data:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Allowed file types
    const allowedExtensions = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedExtensions.includes(file.type)) {
      toast.error(
        "Invalid file type. Only JPG, PNG, WEBP, and GIF are allowed."
      );
      return;
    }

    if (file.size > 500 * 1024) {
      toast.error("File too large. Max size is 500 KB.");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);

    if (!userId || !bearerKey) {
      toast.error("Authentication error. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("profile_img", file);

    try {
      setUploading(true); // Start Uploading

      const ajaxModal = new bootstrap.Modal(
        document.getElementById("ajaxModal")
      );
      document.getElementById("ajaxModalMessage").textContent =
        "Uploading profile image...";
      ajaxModal.show();

      const response = await axios.post(
        `${API_URL}/profile-upload.php?user_id=${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.type === "success") {
        toast.success("Profile image uploaded successfully!");
        setProfileImage(response.data.image || reader.result);

        fetchUserData();
        // ajaxModal.hide();
        // console.log("loader hided 1")

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Error uploading profile image.");
    } finally {
      setUploading(false); // Stop Uploading

      const ajaxModal = bootstrap.Modal.getInstance(
        document.getElementById("ajaxModal")
      );
       setTimeout(() => {
      ajaxModal.hide();
    }, 300);
      //  console.log("loader hided 2")
    }
  };

  const handleRemoveImage = async () => {
    if (!selectedImageId) return;
    // console.log("Image ID:", selectedImageId);

    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent =
      "Removing profile image...";
    //  ajaxModal.show();

    try {
      const response = await axios.delete(
        `${API_URL}/profile-remove.php?id=${selectedImageId}`,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.type === "success") {
        toast.success("Profile image removed successfully!");
        setProfileImage("/images/blank_user.png");
        fetchUserData();
        // ajaxModal.hide();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error removing profile image:", error);
      toast.error("Error removing profile image.");
    } finally {
       setTimeout(() => {
      ajaxModal.hide();
    }, 300);
    }
  };

  const fetchSkillSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setLoadingSuggestions(true);
    try {
      const response = await axios.get(
        `${API_URL}/fetch-skills.php?skill=${query}`,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
          },
        }
      );

      if (response.data.type === "success") {
        setSuggestions(response.data.skills);
      } else {
        console.error(
          "Failed to fetch skill suggestions:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error(
        "Error fetching skill suggestions:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setInput(""); // Clear input after adding skill
      setSuggestions([]); // Clear suggestions after adding skill
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addSkill(input);
      fetchSkillSuggestions(input);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    fetchSkillSuggestions(value);
  };

  const saveSkills = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/update-skills.php?user_id=${userId}`,
        { skills: skills.join(", ") },
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.type === "success") {
        toast.success("Skills updated successfully!");
        fetchUserData();
        setUserData((prevData) => ({
          ...prevData,
          skills: skills.join(", "),
        }));
        const skillModal = bootstrap.Modal.getInstance(
          document.getElementById("skillModal")
        );
        skillModal.hide();
      } else {
        toast.error(response.data.message || "Failed to update skills.");
      }
    } catch (error) {
      console.error("Error updating skills:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  const saveJobSeekerData = async () => {
    // Calculate total experience
    const totalExperience =
      userData.total_experience_years && userData.total_experience_months
        ? userData.total_experience_years +
        " - " +
        userData.total_experience_months
        : userData.total_experience_years
          ? userData.total_experience_years
          : userData.total_experience_months
            ? userData.total_experience_months
            : "";

    // Show ajaxModal with dynamic message
    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent =
      "Saving your details...";
    ajaxModal.show();

    // setUserData();

    try {
      const response = await axios.put(
        `${API_URL}/job-seeker-save-data.php?user_id=${userId}`,
        {
          name: userData.name,
          work_status: userData.work_status,
          total_experience: totalExperience,
          current_salary: userData.current_salary,
          current_location: userData.current_location,
          country_name: userData.country_name,
          notice_period: userData.notice_period,
          bio: userData.bio,
        },
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.type === "success") {
        toast.success("Details updated successfully!");
        setUserData((prevData) => ({
          ...prevData,
          name: userData.name,
          work_status: userData.work_status,
          total_experience: totalExperience,
          current_salary: userData.current_salary,
          current_location: userData.current_location,
          country_name: userData.country_name,
          notice_period: userData.notice_period,
          bio: userData.bio,
        }));
        const editProfileModal = bootstrap.Modal.getInstance(
          document.getElementById("editProfileModal")
        );
        editProfileModal.hide();

        fetchUserData();
        // ajaxModal.hide();

      } else {
        toast.error(response.data.message || "Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
       setTimeout(() => {
      ajaxModal.hide();
    }, 300);
    }
  }

  // Employment Starts -------

  const fetchEmployment = async (userId) => {
    try {
      const response = await axios.get(
        `${API_URL}/employment-details.php?user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
          },
        }
      );

      if (response.data.type === "success") {
        const employmentDetailsArray = response.data.data;

        // Map each employment object
        const updatedEmploymentDetails = employmentDetailsArray.map((employment) => {
          // Convert employment type
          switch (employment.employment_type) {
            case "1":
              employment.employment_type = "Full Time";
              break;
            case "2":
              employment.employment_type = "Part Time";
              break;
            case "3":
              employment.employment_type = "Fixed";
              break;
            case "4":
              employment.employment_type = "Hourly";
              break;
            case "null":
            case null:
            case "":
              employment.employment_type = "Not specified";
              break;
          }

          // Format total experience
          if (
            employment.total_experience &&
            employment.total_experience.includes(" - ")
          ) {
            const experienceParts = employment.total_experience.split(" - ");
            const monthsPart = experienceParts[1]
              ? experienceParts[1].split(" ")[0]
              : null;

            employment.total_experience_months = monthsPart
              ? `${monthsPart} Month${parseInt(monthsPart, 10) > 1 ? "s" : ""}`
              : "";
          } else {
            employment.total_experience_months = "";
          }

          if (employment.total_experience) {
            const yearsPart = employment.total_experience.split(" ")[0];

            employment.total_experience_years = yearsPart
              ? `${yearsPart} Year${parseInt(yearsPart, 10) > 1 ? "s" : ""}`
              : "";
          } else {
            employment.total_experience_years = "";
          }

          return employment;
        });

        setEmployment(updatedEmploymentDetails);
      } else {
        console.error(
          "Failed to fetch seeker employment:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error(
        "Error fetching seeker employment:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const saveNewEmploymentData = async () => {
    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent = "Saving your details...";
    ajaxModal.show();

    try {
      // Prepare payload: remove empty fields
      const payload = Object.fromEntries(
        Object.entries(employmentForm).filter(
          ([key, value]) => value !== "" && value !== null && value !== undefined
        )
      );

      const response = await axios.put(
        `${API_URL}/employment-details-save.php?user_id=${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
          },
        }
      );

      if (response.data.type === "success") {
        toast.success("Employment data saved successfully!");

        const employModal = bootstrap.Modal.getInstance(document.getElementById("AddemployModal"));
        employModal.hide();

        setEmploymentForm(defaultEmploymentForm); // reset form
        fetchEmployment(userId);
        
        fetchUserData();
        // ajaxModal.hide();


      } else {
        toast.error(response.data.message || "Failed to update details.");
      }
    } catch (error) {
      console.error("Save Error:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
       setTimeout(() => {
      ajaxModal.hide();
    }, 300);
    }
  };

  const editEmploymentData = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/employment-edit.php?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
          },
        }
      );
      const data = response.data.data;
      
      // console.log(data);
      if (data) {
        setEmploymentForm({
          id: id,
          current_employment: data.current_employment || "yes",
          employment_type: data.employment_type || "",
          total_experience: data.total_experience || "",
          current_company_name: data.current_company_name || "",
          current_job_title: data.current_job_title || "",
          joining_date: data.joining_date || "",
          worked_till: data.worked_till || "",
          current_salary: data.current_salary || "",
          job_profile: data.job_profile || "",
          notice_period: data.notice_period || "",
        });

      }
    } catch (error) {
      console.error("Error fetching employment data:", error);
      toast.error("Failed to load employment data.");
    }
  };

  const updateEmploymentData = async () => {
    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent = "Updating your details...";
    ajaxModal.show();

    try {
      // Filter out empty or null/undefined fields
      const payload = Object.fromEntries(
        Object.entries(employmentForm).filter(
          ([_, value]) => value !== "" && value !== null && value !== undefined
        )
      );

      const response = await axios.put(
        `${API_URL}/employment-details-save.php?user_id=${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
          },
        }
      );

      if (response.data.type === "success") {
        toast.success("Employment details updated successfully!");

        // Close the modal
        const employModal = bootstrap.Modal.getInstance(document.getElementById("employModal"));
        employModal.hide();

        fetchEmployment(userId);
        
        fetchUserData();
        // ajaxModal.hide();
        // console.log("loader 1 hided")

      } else {
        toast.error(response.data.message || "Failed to update.");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Something went wrong while updating.");
    } finally {
      setTimeout(() => {
      ajaxModal.hide();
    }, 300);
      //  console.log("loader 2 hided")
    }
  };

  const confirmDelete = async (Id) => {
    if (!Id) return;

    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent =
      "Deleting employment data...";
    ajaxModal.show();

    try {
      const response = await axios.patch(
        `${API_URL}/employment-delete.php`,
        { id: Id },
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.type === "success") {
        toast.success(response.data.message);
        // Update the employment state
        setEmployment((prevData) => prevData.filter((emp) => emp.id !== Id));

        fetchUserData();
        // ajaxModal.hide();
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting employment data:", error);
      toast.error("Error deleting employment data.");
    } finally {
       setTimeout(() => {
      ajaxModal.hide();
    }, 300);
    }
  };

  // Employment Ends ---------


  // Education Starts ---------

  // const openEducationModal = (edu) => {
  //   setSelectedEducation(edu);
  // };

  // const saveEducationData = async () => {
  //   if (!selectedEducation) return;

  //   // Calculate course duration
  //   const combinedDuration =
  //     selectedEducation.course_starting_year &&
  //       selectedEducation.course_ending_year
  //       ? selectedEducation.course_starting_year +
  //       " - " +
  //       selectedEducation.course_ending_year
  //       : selectedEducation.course_starting_year
  //         ? selectedEducation.course_starting_year
  //         : selectedEducation.course_ending_year
  //           ? selectedEducation.course_ending_year
  //           : "";

  //   // Show ajaxModal with dynamic message
  //   const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
  //   document.getElementById("ajaxModalMessage").textContent =
  //     "Saving your details...";
    // ajaxModal.show();

  //   try {
  //     const response = await axios.put(
  //       `${API_URL}/education-save.php?user_id=${userId}`,
  //       {
  //         education: selectedEducation.education,
  //         institute: selectedEducation.institute,
  //         course: selectedEducation.course,
  //         specialization: selectedEducation.specialization,
  //         course_type: selectedEducation.course_type,
  //         course_duration: combinedDuration,
  //         grading_system: selectedEducation.grading_system,
  //         marks: selectedEducation.marks,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${bearerKey}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.data.type === "success") {
  //       toast.success("Details updated successfully!");
  //       setEducation((prevData) =>
  //         prevData.map((edu) =>
  //           edu.id === selectedEducation.id
  //             ? { ...selectedEducation, course_duration: combinedDuration }
  //             : edu
  //         )
  //       );

  //       const educationModal = bootstrap.Modal.getInstance(
  //         document.getElementById("educationModal")
  //       );
  //       educationModal.hide();

  //       // Fetch updated education data
  //       fetchEducation(userId);

  //       console.log("Education Data:", response.data.data);
  //     } else {
  //       toast.error(response.data.message || "Failed to update details.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating data:", error);
  //     toast.error(
  //       error.response?.data?.message || "An unexpected error occurred."
  //     );
  //   } finally {
      // ajaxModal.hide();
  //   }
  // };


  const fetchEducation = async (userId) => {
    try {
      const response = await axios.get(
        `${API_URL}/education.php?user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
          },
        }
      );

      if (response.data.type === "success") {
        let educationDetails = response.data.data;

        educationDetails = educationDetails.map((edu) => {
          // Extracting course duration years
          if (edu.course_duration && edu.course_duration.includes(" - ")) {
            const [startYear, endYear] = edu.course_duration
              .split(" - ")
              .map((year) => year.trim());
            edu.course_starting_year = startYear || "";
            edu.course_ending_year = endYear || "";
          } else {
            edu.course_starting_year = "";
            edu.course_ending_year = "";
          }

          return edu;
        });

        setEducation(educationDetails);
        // console.log("Education Details:", education);
      } else {
        console.error(
          "Failed to fetch seeker education:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error(
        "Error fetching seeker education:",
        error.response?.data || error.message
      );
    }
  };

  const AddEducationData = async () => {
    if (!educationData.education) return; // Ensure the education field is selected

    // 🔍 Validate marks before proceeding
    const marks = educationData.marks;

    if (!/^[1-9]\d{0,4}$/.test(marks)) {
      setMarksError("Marks must be a positive number (not 0 or all zeros)");
      toast.error("Marks must be a positive number (not 0 or all zeros)");
      return; // Block form submission
    } else {
      setMarksError(""); // Clear previous error if valid
    }

    // Calculate course duration
    const combinedDuration =
      educationData.course_starting_year && educationData.course_ending_year
        ? educationData.course_starting_year + " - " + educationData.course_ending_year
        : educationData.course_starting_year
          ? educationData.course_starting_year
          : educationData.course_ending_year
            ? educationData.course_ending_year
            : "";

    // Prepare payload with only filled fields
    const rawPayload = {
      education: educationData.education,
      institute: educationData.institute,
      course: educationData.course,
      specialization: educationData.specialization,
      course_type: educationData.course_type,
      course_duration: combinedDuration,
      board: educationData.board,
      passing_year: educationData.passing_year,
      school_medium: educationData.school_medium,
      marks: educationData.marks,
    };

    const payload = Object.fromEntries(
      Object.entries(rawPayload).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
    );

    // Show ajaxModal with dynamic message
    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent = "Saving your details...";
    ajaxModal.show();

    try {
      const response = await axios.put(
        `${API_URL}/education-save.php?user_id=${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.type === "success") {
        toast.success("Education details added successfully!");

        setEducationData({
          id: "",
          education: "",
          institute: "",
          course: "",
          specialization: "",
          course_type: "",
          course_starting_year: "",
          course_ending_year: "",
          marks: "",
          board: "",
          passing_year: "",
          school_medium: "",
        });

        const educationModal = bootstrap.Modal.getInstance(
          document.getElementById("AddEducationModal")
        );
        educationModal.hide();

        fetchEducation(userId);
        // console.log("Added Education Data:", response.data.data);

        fetchUserData();
        // ajaxModal.hide();

      } else {
        toast.error(response.data.message || "Failed to add education details.");
      }
    } catch (error) {
      console.error("Error adding education data:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setTimeout(() => {
      ajaxModal.hide();
    }, 300);
    }
  };

  const editEducationData = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/education-edit.php?id=${id}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
        },
      });

      const data = response.data.data;
      // console.log(data);

      if (data) {
        // Handle course_duration splitting if available
        const [course_starting_year, course_ending_year] = data.course_duration
          ? data.course_duration.split(" - ")
          : ["", ""];

        setEducationData({
          id: data.id || "",
          education: data.education || "",
          institute: data.institute || "",
          course: data.course || "",
          specialization: data.specialization || "",
          course_type: data.course_type || "",
          course_starting_year: course_starting_year || "",
          course_ending_year: course_ending_year || "",
          marks: data.marks || "",
          board: data.board || "",
          passing_year: data.passing_year || "",
          school_medium: data.school_medium || "",
        });
      }
    } catch (error) {
      console.error("Error fetching education data:", error);
      toast.error("Failed to load education data.");
    }
  };

  const UpdateEducationData = async () => {
    if (!educationData.education || !educationData.id) return; // Ensure required fields are present

    //  Validate marks
    const marks = educationData.marks;

    if (!/^[1-9]\d{0,4}$/.test(marks)) {
      setMarksError("Marks must be a positive number (not 0 or all zeros)");
      toast.error("Marks must be a positive number (not 0 or all zeros)");
      return; // Block update
    } else {
      setMarksError(""); // Clear error if valid
    }

    // Validate course duration (years)
    const startYear = parseInt(educationData.course_starting_year, 10);
    const endYear = parseInt(educationData.course_ending_year, 10);

    if (
      educationData.course_starting_year &&
      educationData.course_ending_year &&
      endYear < startYear
    ) {
      setYearError('Ending year should be the same or greater than starting year');
      toast.error('Ending year should be the same or greater than starting year');
      return;
    }

   

    // Calculate course duration
    const combinedDuration =
      educationData.course_starting_year && educationData.course_ending_year
        ? `${educationData.course_starting_year} - ${educationData.course_ending_year}`
        : educationData.course_starting_year
          ? educationData.course_starting_year
          : educationData.course_ending_year
            ? educationData.course_ending_year
            : "";

    // Prepare payload with only filled fields
    const rawPayload = {
      id: educationData.id,
      education: educationData.education,
      institute: educationData.institute,
      course: educationData.course,
      specialization: educationData.specialization,
      course_type: educationData.course_type,
      course_duration: combinedDuration,
      board: educationData.board,
      passing_year: educationData.passing_year,
      school_medium: educationData.school_medium,
      marks: educationData.marks,
    };

    const payload = Object.fromEntries(
      Object.entries(rawPayload).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
    );

    // Show loading modal
    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent = "Updating your details...";
    ajaxModal.show();

    try {
      const response = await axios.put(
        `${API_URL}/education-save.php?user_id=${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.type === "success") {
        toast.success("Education details updated successfully!");

        // Reset the form
        setEducationData({
          id: "",
          education: "",
          institute: "",
          course: "",
          specialization: "",
          course_type: "",
          course_starting_year: "",
          course_ending_year: "",
          marks: "",
          board: "",
          passing_year: "",
          school_medium: "",
        });

        // Hide modal
        const educationModal = bootstrap.Modal.getInstance(
          document.getElementById("EditEducationModal")
        );
        educationModal.hide();

        // Refresh education list
        fetchEducation(userId);
       
        // console.log("Updated Education Data:", response.data.data);
        fetchUserData();
        // ajaxModal.hide();
      } else {
        toast.error(response.data.message || "Failed to update education details.");
      }
    } catch (error) {
      console.error("Error updating education data:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
       setTimeout(() => {
      ajaxModal.hide();
    }, 300);
    }
  };

  const confirmEducationDelete = async (Id) => {
    if (!Id) return;

    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent =
      "Deleting education data...";
    ajaxModal.show();

    try {
      const response = await axios.patch(
        `${API_URL}/education-delete.php`,
        { id: Id },
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.type === "success") {
        toast.success(response.data.message);
        // Update the education state
        setEducation((prevEducation) =>
          prevEducation.filter((edu) => edu.id !== Id)
        );

        fetchUserData();
        // ajaxModal.hide();

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting education data:", error);
      toast.error("Error deleting education data.");
    } finally {
       setTimeout(() => {
      ajaxModal.hide();
    }, 300);
    }
  };

  // Education Ends -----------


  const fetchSocialProfiles = async (userId) => {
    try {
      const response = await axios.get(
        `${API_URL}/social-profiles.php?user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
          },
        }
      );

      if (response.data.type === "success") {
        let social_profile = response.data.data;

        setSocialProfiles(social_profile);
        // console.log("Social Profiles  :", socialProfiles);
      } else {
        console.error(
          "Failed to fetch seeker social profiles:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error(
        "Error fetching seeker social profiles:",
        error.response?.data || error.message
      );
    }
  };

  const openSocialModal = (profile) => {
    setSelectedSocialProfile(profile);
  };

  const saveSocialProfiles = async (Id = null) => {
    if (!selectedSocialProfile || urlError) return;


    // Hide the appropriate modal before showing the ajaxModal
    if (Id) {
      const socialModalElement = document.getElementById(`socialModal-${Id}`);
      if (socialModalElement) {
        const socialModal = bootstrap.Modal.getInstance(socialModalElement);
        if (socialModal) socialModal.hide();
      }
    } else {
      const addSocialModalElement = document.getElementById("addSocialModal");
      if (addSocialModalElement) {
        const addSocialModal = bootstrap.Modal.getInstance(
          addSocialModalElement
        );
        if (addSocialModal) addSocialModal.hide();
      }
    }

    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent =
      "Saving your details...";
    ajaxModal.show();

    try {
      const response = await axios.put(
        `${API_URL}/social-profiles-add.php${Id ? `?id=${Id}` : ""}`,
        {
          user_id: userId,
          social_profile_name: selectedSocialProfile.social_profile_name,
          url: selectedSocialProfile.url,
          description: selectedSocialProfile.description,
        },
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.type === "success") {
        toast.success(response.data.message);
        
        // Update the socialProfiles state
        setSocialProfiles((prevProfiles) => {
          if (Id) {
            return prevProfiles.map((profile) =>
              profile.id === Id
                ? { ...profile, ...selectedSocialProfile }
                : profile
            );
          } else {
            return [
              ...prevProfiles,
              { ...selectedSocialProfile, id: response.data.id },
            ];
          }
        });

        // Clear the selectedSocialProfile state
        setSelectedSocialProfile({});

        fetchUserData();
        // ajaxModal.hide();

      } else {
        toast.error(response.data.message || "Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
       setTimeout(() => {
      ajaxModal.hide();
    }, 300);
    }
  };

  const confirmSocialDelete = async (Id) => {
    if (!Id) return;

    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent =
      "Deleting social profile...";
    ajaxModal.show();

    try {
      const response = await axios.patch(
        `${API_URL}/social-profile-delete.php`,
        { id: Id },
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.type === "success") {
        toast.success(response.data.message);
    
        // Update the socialProfiles state
        setSocialProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile.id !== Id)
        );

        fetchUserData();
        // ajaxModal.hide();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting social profile:", error);
      toast.error("Error deleting social profile.");
    } finally {
       setTimeout(() => {
      ajaxModal.hide();
    }, 300);
    }
  };

  /*------------Language-------------------*/
  const [languages, setLanguages] = useState([]);

  // Add a new row
  const addLanguageRow = () => {
    setLanguages([...languages, { language: "", proficiency: "Beginner" }]);
  };

  const showDeleteLanguageModal = (index) => {
    const PersonalDetailModal = bootstrap.Modal.getInstance(
      document.getElementById("PersonalDetailModal")
    );
    PersonalDetailModal.hide();
    setLanguageToDeleteIndex(index);
    const deleteLanguageModal = new bootstrap.Modal(
      document.getElementById("deleteLanguageModal")
    );
    deleteLanguageModal.show();
  };

  // Delete a specific row
  const deleteLanguageRow = async () => {
    const index = languageToDeleteIndex;
    const languageToDelete = languages[index];

    try {
      const response = await axios.patch(
        `${API_URL}/language-delete.php`,
        {
          user_id: userId,
          language: languageToDelete.language,
          language_proficiency: languageToDelete.proficiency,
        },
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.type === "success") {
        toast.success("Language deleted successfully.");
        setLanguages(languages.filter((_, i) => i !== index));
      } else {
        toast.error(response.data.message || "Failed to delete language.");
      }
    } catch (error) {
      console.error("Error deleting language:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  // Handle changes in language input
  const handleLanguageChange = (index, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].language = value;
    setLanguages(updatedLanguages);
  };

  // Handle changes in proficiency dropdown
  const handleProficiencyChange = (index, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].proficiency = value;
    setLanguages(updatedLanguages);
  };

  const savePersonalDetail = async () => {
    const PersonalDetailModal = bootstrap.Modal.getInstance(
      document.getElementById("PersonalDetailModal")
    );
    if (PersonalDetailModal) {
      PersonalDetailModal.hide();
    }

    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent =
      "Saving your details...";
    ajaxModal.show();

    try {
      const response = await axios.put(
        `${API_URL}/personal-detail-save.php?user_id=${userId}`,
        {
          gender: userData.gender,
          maritial_status: userData.maritial_status,
          dob: userData.dob,
          religion: userData.religion,
          differently_abled: userData.differently_abled,
          differently_abled_type: userData.differently_abled_type,
          differently_abled_condition: userData.differently_abled_condition,
          workplace_assistance: userData.workplace_assistance,
          permanent_address: userData.permanent_address,
          hometown: userData.hometown,
          pincode: userData.pincode,
          city: userData.city,
          state: userData.state,
          country_name: userData.country_name,
          language: languages.map((lang) => lang.language).join(", "),
          language_proficiency: languages
            .map((lang) => lang.proficiency)
            .join(", "),
        },
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.type === "success") {
        toast.success("Personal details updated successfully!");

        fetchUserData();
        // ajaxModal.hide();
      } else {
        toast.error(response.data.message || "Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
       setTimeout(() => {
      ajaxModal.hide();
    }, 300);
    }
  };

  const fetchCertificates = async (userId) => {
    try {
      const response = await axios.get(
        `${API_URL}/certificates.php?user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
          },
        }
      );

      if (response.data.type === "success") {
        let certificates = response.data.data;

        setCertificates(certificates);
        // console.log("Certificates  :", certificates);
      } else {
        console.error(
          "Failed to fetch seeker social profiles:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error(
        "Error fetching seeker social profiles:",
        error.response?.data || error.message
      );
    }
  };

  const openCertificateModal = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const saveCertificate = async (Id = null) => {
    if (!selectedCertificate) return;

    // URL validation before saving
    const urlPattern = /^(https?:\/\/)/;
    if (!urlPattern.test(selectedCertificate.certification_url)) {
      toast.error("Please enter a valid URL ");
      return;
    }

    // Hide the certificate modals before showing the ajaxModal
    if (Id) {
      const showCertificateModalElement = document.getElementById(
        `showCertificateModal-${Id}`
      );
      if (showCertificateModalElement) {
        const showCertificateModal = bootstrap.Modal.getInstance(
          showCertificateModalElement
        );
        if (showCertificateModal) showCertificateModal.hide();
      }
    } else {
      const certificateModalElement =
        document.getElementById("certificateModal");
      if (certificateModalElement) {
        const certificateModal = bootstrap.Modal.getInstance(
          certificateModalElement
        );
        if (certificateModal) certificateModal.hide();
      }
    }

    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent =
      "Saving your details...";
    ajaxModal.show();

    try {
      const response = await axios.put(
        `${API_URL}/certificate-save.php${Id ? `?id=${Id}` : ""}`,
        {
          user_id: userId,
          certification_name: selectedCertificate.certification_name,
          certification_url: selectedCertificate.certification_url,
          certification_validity: selectedCertificate.certification_validity,
          expire_on: selectedCertificate.lifetime_validity
            ? null
            : selectedCertificate.expire_on,
        },
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.type === "success") {
        toast.success(response.data.message);
        
        // Update the certificates state
        setCertificates((prevCertificates) => {
          if (Id) {
            return prevCertificates.map((certificate) =>
              certificate.id === Id
                ? { ...certificate, ...selectedCertificate }
                : certificate
            );
          } else {
            return [
              ...prevCertificates,
              { ...selectedCertificate, id: response.data.id },
            ];
          }
        });

        fetchUserData();
        // ajaxModal.hide();
        // console.log("Certi load 1 hided");


      } else {
        toast.error(response.data.message || "Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
       setTimeout(() => {
      ajaxModal.hide();
    }, 300);
      // console.log("Certi load 2 hided");

    }
  };

  const resetCertificateForm = () => {
    setSelectedCertificate({
      certification_name: "",
      certification_url: "",
      certification_validity: "",
      expire_on: "",
      lifetime_validity: false,
    });
  };

  const confirmCertificateDelete = (Id) => {
    deleteCertificate(Id);
  };

  const deleteCertificate = async (Id) => {
    if (!Id) return;

    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent =
      "Deleting certificate...";
    ajaxModal.show();

    try {
      const response = await axios.patch(
        `${API_URL}/certificate-delete.php`,
        { id: Id },
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.type === "success") {
        toast.success(response.data.message);
        setCertificates((prevCertificates) =>
          prevCertificates.filter((certificate) => certificate.id !== Id)
        );

        fetchUserData();
        // ajaxModal.hide();
        // console.log("Certi load 1 hided");

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
      toast.error("Error deleting certificate.");
    } finally {
       setTimeout(() => {
      ajaxModal.hide();
    }, 300);
      // console.log("Certi load 2 hided");

    }
  };

  // const calculateTimeAgo = (date) => {
  //   if (!date) return "Updating...";

  //   const utcZero = date.replace(" ", "T") + "Z";
  //   const localDate = new Date(utcZero);
  //   if (isNaN(localDate.getTime())) {
  //     return "1 second ago";
  //   }
  //   const now = new Date();
  //   const diffTime = now - localDate;

  //   const diffSeconds = Math.floor(diffTime / 1000);
  //   if (diffSeconds < 60) {
  //     return `${diffSeconds} second${diffSeconds === 1 ? "" : "s"} ago`;
  //   }

  //   const diffMinutes = Math.floor(diffTime / (1000 * 60));
  //   if (diffMinutes < 60) {
  //     return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  //   }

  //   const diffHours = Math.floor(diffMinutes / 60);
  //   if (diffHours < 24) {
  //     return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  //   }

  //   const diffDays = Math.floor(diffHours / 24);
  //   return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  // };

  function TimeAgo({ timestamp }) {
    const [time, setTime] = useState("");

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(getTimeAgo(timestamp));
      }, 1000);
      return () => clearInterval(interval);
    }, [timestamp]);

    return <>{time}</>;
  }

  // function getTimeAgo(timestamp) {
  //   if (!timestamp) return "";

  //   const now = new Date();
  //   const past = new Date(timestamp.replace(" ", "T"));
  //   const secondsPast = Math.floor((now - past) / 1000);

  //   if (secondsPast < 60) return `${secondsPast} sec${secondsPast !== 1 ? "s" : ""} ago`;
  //   if (secondsPast < 3600) return `${Math.floor(secondsPast / 60)} min${secondsPast / 60 !== 1 ? "s" : ""} ago`;
  //   if (secondsPast < 86400) return `${Math.floor(secondsPast / 3600)} hr${secondsPast / 3600 !== 1 ? "s" : ""} ago`;
  //   if (secondsPast < 2592000) return `${Math.floor(secondsPast / 86400)} day${secondsPast / 86400 !== 1 ? "s" : ""} ago`;
  //   if (secondsPast < 31536000) return `${Math.floor(secondsPast / 2592000)} month${secondsPast / 2592000 !== 1 ? "s" : ""} ago`;

  //   return `${Math.floor(secondsPast / 31536000)} year${secondsPast / 31536000 !== 1 ? "s" : ""} ago`;
  // }


  function getTimeAgo(timestamp) {
    if (!timestamp) return "";

    const now = new Date();
    const past = new Date(timestamp.replace(" ", "T"));
    const secondsPast = Math.floor((now - past) / 1000);

    const years = Math.floor(secondsPast / 31536000); // 60 * 60 * 24 * 365
    const months = Math.floor((secondsPast % 31536000) / 2592000); // 60 * 60 * 24 * 30
    const days = Math.floor((secondsPast % 2592000) / 86400); // 60 * 60 * 24
    const hours = Math.floor((secondsPast % 86400) / 3600); // 60 * 60
    const minutes = Math.floor((secondsPast % 3600) / 60);

    // Display logic based on time difference
    if (secondsPast < 60) {
      return `${secondsPast} sec${secondsPast !== 1 ? "s" : ""} ago`;
    }

    if (secondsPast < 3600) {
      return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
    }

    if (secondsPast < 86400) {
      return `${hours} hr${hours !== 1 ? "s" : ""} ago`;
    }

    if (secondsPast < 2592000) {  // 30 days
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }

    if (years > 0) {
      return `${years} year${years !== 1 ? "s" : ""} ${months > 0 ? `${months} month${months !== 1 ? "s" : ""}` : ""} ${days > 0 ? `${days} day${days !== 1 ? "s" : ""}` : ""} ago`;
    }

    if (months > 0) {
      return `${months} month${months !== 1 ? "s" : ""} ${days > 0 ? `${days} day${days !== 1 ? "s" : ""}` : ""} ago`;
    }

    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }


    const handleDownload = () => {
    const element = resumeRef.current;
    const opt = {
      margin:       0.5,
      filename:     `${user.name || "resume"}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };  


  return (
    <>
    <div id="my_account_page" className="my_account_page">
      <Navbar />
      <div className="top_pad">
        <div className="container pb-5">
          <div className="row my_account_page mt-4">
            <div className="col-md-3 mb-4 mb-md-0">
              <JobSidebar />
            </div>
            <div className="col-md-9 profile_details">
              <div className="card border-0 shadow bg_lblue">
                <div className="card-body">
                  <h1 className="job_head">
                    <span>Welcome</span>
                    <span className="text-theme text-capitalize mx-1">
                      "{user?.name}"
                    </span>
                    <span>to your account</span>
                  </h1>
                  <h6>
                    From your account dashboard, you can see your saved jobs,
                    applied jobs, and profile, and edit them as well.
                  </h6>
                </div>
              </div>

              {/* Ajax Loader */}
              <div
                className="modal fade"
                id="ajaxModal"
                tabIndex="-1"
                aria-labelledby="ajaxModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="ajaxModalLabel">
                        Processing...
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div
                        id="loader"
                        className="d-flex justify-content-center"
                      >
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        ></div>
                      </div>
                      <p className="text-center" id="ajaxModalMessage">
                        Please wait...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-end py-3">
                <button className="btn btn-register" data-bs-toggle="modal" data-bs-target="#resumeModal">Preview Resume</button>
              </div>

              <div className="card  shadow border-0 rounded-3">
                <div className="card-body">
                  <div className="d-flex flex-wrap">
                    <div className="col-md-4 col-lg-3 col-xl-2 mb-5 mb-md-0 pe-4">
                      {/* <div className="job_profile_icon position-relative">
                        <img
                          src={profileImage}
                          className="profile_image"
                          alt="Profile"
                        />
                        {!profileImage ||
                          profileImage === "/images/blank_user.png" ? (
                          <>
                            <input
                              type="file"
                              name="profile_img"
                              id="profile_img"
                              onChange={handleImageUpload}
                              disabled={uploading}
                            />

                            <label
                              className="profile_img_label"
                              htmlFor="profile_img"
                            >
                              <span>
                                Upload <i className="fa-solid fa-plus"></i>
                              </span>
                            </label>
                          </>
                        ) : (
                          <i
                            className="fa-solid fa-xmark"
                            onClick={() => setSelectedImageId(userData.id)}
                            data-bs-toggle="modal"
                            data-bs-target="#removeImageModal"
                            title="Remove Image"
                          ></i>
                        )}
                      </div> */}

                      {/* <div className="job_profile_icon position-relative">
                        <div className="progress-circle-wrapper">
                          <svg className="progress-ring" width="120" height="120">
                            <circle
                              className="progress-ring__background"
                              cx="60"
                              cy="60"
                              r={radius}
                            />
                            <circle
                              className="progress-ring__circle"
                              cx="60"
                              cy="60"
                              r={radius}
                              style={{
                                strokeDashoffset: strokeDashoffset,
                                strokeDasharray: circumference,
                              }}
                            />
                          </svg>

                          <div className="profile-image-wrapper">
                            <img
                              src="/images/blank_user.png"
                              className="profile_image"
                              alt="Profile"
                            />
                            <div className="progress-text">{uploadPercentage}%</div>
                          </div>
                        </div>
                      </div> */}

                      <div className="job_profile_icon position-relative">
                        <div className="progress-circle-wrapper">
                          <svg className="progress-ring" width="120" height="120">
                            <circle
                              className="progress-ring__background"
                              cx="60"
                              cy="60"
                              r={radius}
                            />
                           <circle
                            className="progress-ring__circle"
                            cx="60"
                            cy="60"
                            r={radius}
                            style={{
                              strokeDashoffset: strokeDashoffset,
                              strokeDasharray: circumference,
                              stroke: getStrokeColor(uploadPercentage), // ← add this line
                              transition: "stroke 0.3s ease",           // ← optional smooth transition
                            }}
                          />

                          </svg>

                          <div className="profile-image-wrapper">
                            <img
                              src={profileImage}
                              className="profile_image"
                              alt="Profile"
                            />

                            {/* Progress Text */}
                           {uploadPercentage > 0 && <div style={{color:getStrokeColor(uploadPercentage)}} className="progress-text">{uploadPercentage}%</div>}

                            {/* Upload or Remove Logic */}
                            {!profileImage || profileImage === "/images/blank_user.png" ? (
                              <>
                                <input
                                  type="file"
                                  name="profile_img"
                                  id="profile_img"
                                  onChange={handleImageUpload}
                                  disabled={uploading}
                                />
                                <label className="profile_img_label" htmlFor="profile_img">
                                  <span>
                                    Upload <i className="fa-solid fa-plus"></i>
                                  </span>
                                </label>
                              </>
                            ) : (
                              <i
                                className="fa-solid fa-xmark remove-icon"
                                onClick={() => setSelectedImageId(userData.id)}
                                data-bs-toggle="modal"
                                data-bs-target="#removeImageModal"
                                title="Remove Image"
                              ></i>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="col-md-8 col-lg-9 col-xl-10">
                      <div className="border-bottom pb-3">
                        {userData.name &&
                        <div className="d-flex align-items-baseline mb-2">
                          <h5 className="m-0 text-capitalize text-theme">
                            {userData.name}
                          </h5>
                          <Link className="text-theme">
                            <i
                              className="fa-solid fa-pencil ms-2"
                              data-bs-toggle="modal"
                              data-bs-target="#editProfileModal"
                              title="Edit"
                            ></i>
                          </Link>
                        </div>
                        }
                        {userData.updated_at && (
                          <h6 className="text-secondary m-0 fw-light">
                            <b> Profile last updated - </b>
                            <TimeAgo timestamp={userData.updated_at} />
                          </h6>)
                        }
                      </div>

                      <div className="row pb-0 pt-3 jobseeker_details">
                        <div className="col-md-6">
                          <ul className="p-0 m-0">
                            <li>
                              <i className="fa-solid fa-location-dot me-2"></i>
                                {userData.current_location ? (
                                  <span className="text-capitalize">
                                    {userData.current_location}
                                  </span>
                                ) : (
                                  <span>N/A</span>
                                )}
                            </li>

                            <li>
                              <i className="fa-solid fa-briefcase me-2"></i>
                              {userData.work_status ? (
                                <span className="text-capitalize">
                                  {userData.work_status}
                                </span>
                              ) : (
                                <span>N/A</span>
                              )}
                            </li>

                            <li>
                              <i className="fa-regular fa-calendar me-2"></i>
                              {userData.dob ? (
                                <span className="text-capitalize">
                                  {userData.dob}
                                </span>
                              ) : (
                                <span>N/A</span>
                              )}
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <ul className="p-0 m-0">
                            <li>
                              <i className="fa-solid fa-phone me-2"></i>
                              {userData.phone ? (
                                <span>{userData.phone}</span>
                              ) : (
                                <span>N/A</span>
                              )}
                            </li>
                            <li>
                              <i className="fa-regular fa-envelope me-2"></i>
                              {userData.email ? (
                                <span>{userData.email}</span>
                              ) : (
                                <span>N/A</span>
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remove Image  */}
              <div
                className="modal fade"
                id="removeImageModal"
                tabIndex="-1"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Remove Profile Image</h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Are you sure you want to remove your profile image?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleRemoveImage}
                        data-bs-dismiss="modal"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Profile Modal */}
              <div
                className="modal fade basicModal"
                id="editProfileModal"
                tabIndex="-1"
                aria-labelledby="editProfileModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content p-3 p-sm-4">
                    <div className="modal-header border-0">
                      <h1
                        className="modal-title fs-5"
                        id="editProfileModalLabel"
                      >
                        Basic Details
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body ">
                      <form action="" className="">
                        <div className="mb-4">
                          <label htmlFor="">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={userData.name}
                            onChange={(e) =>
                              setUserData({ ...userData, name: e.target.value })
                            }
                            readOnly
                          />
                        </div>
                        {/* <div className="mb-4">
                          {userData.current_employment === "yes" ? (
                            <strong>
                              {userData.current_job_title} at
                              {userData.current_company_name}
                            </strong>
                          ) : (
                            <strong>Unemployed</strong>
                          )}
                        </div> */}
                        <div className="mb-4">
                          <label htmlFor="">Work Status</label>
                          <div className="d-flex">
                            <div className="form-check me-4">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="work_status"
                                id="fresher"
                                value="fresher"
                                checked={userData.work_status === "fresher"}
                                onChange={handleRadioChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="fresher"
                              >
                                Fresher
                              </label>
                            </div>
                            <div className="form-check experience_radio">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="work_status"
                                id="experienced"
                                value="experienced"
                                checked={userData.work_status === "experienced"}
                                onChange={handleRadioChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="experienced"
                              >
                                Experienced
                              </label>
                            </div>
                          </div>
                          {userData.work_status === "experienced" && (
                            <div className="row mt-4 experience">
                              <label htmlFor="">Total experience</label>
                              <div className="col-md-6 mb-2 mb-md-0">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Years"
                                  name="total_experience_years"
                                  value={userData.total_experience_years || ""}
                                  onChange={(e) => {
                                    const input = e.target.value;
                                    if (/^\d*$/.test(input)) {
                                      setUserData({
                                        ...userData,
                                        total_experience_years: input,
                                      });
                                    }
                                  }}

                                  maxLength={2}
                                />
                              </div>
                              <div className="col-md-6 mb-2 mb-md-0">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Months"
                                  name="total_experience_months"
                                  value={userData.total_experience_months || ""}
                                  onChange={(e) => {
                                    const input = e.target.value;
                                    if (/^\d*$/.test(input)) {
                                      setUserData({
                                        ...userData,
                                        total_experience_months: input,
                                      });
                                    }
                                  }}

                                  maxLength={2}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        {userData.work_status === "experienced" && (
                        <div className="mb-4">
                          <label htmlFor="">Current Salary</label>
                          <p>
                            <small>
                              Salary information helps us find relevant jobs for
                              you
                            </small>
                          </p>
                          <div className="row">
                            <div className="col-4 col-md-3 col-lg-2">
                              <select
                                className="form-select"
                                defaultValue="dollar"
                              >
                                <option value="rupees">kr</option>
                                <option value="dollar">$</option>
                              </select>
                            </div>
                            <div className="col-8 col-md-9 col-lg-10">
                              <input
                                type="text"
                                name="current_salary"
                                className="form-control"
                                placeholder="Eg. 4,50,000"
                                value={
                                  userData.current_salary
                                    ? userData.current_salary.split(" ")[0]
                                    : ""
                                }
                                onChange={(e) =>
                                  handleNumericInput(e, "current_salary", 10, setUserData, userData)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        )}
                        <div className="mb-4">
                          <div className="row mt-4">
                            <label htmlFor="">Current Location</label>
                            <div className="d-flex">
                              <div className="form-check me-4">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="RadioLocation"
                                  id="RadioLocation1"
                                  value="Sweden"
                                  checked={
                                    userData.current_location === "Sweden"
                                  }
                                  onChange={handleRadioLocation}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="RadioLocation1"
                                >
                                  Sweden
                                </label>
                              </div>
                              <div className="form-check locationRadio">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="RadioLocation"
                                  id="RadioLocation2"
                                  value="Outside Sweden"
                                  checked={
                                    userData.current_location !== "Sweden"
                                  }
                                  onChange={handleRadioLocation}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="RadioLocation2"
                                >
                                  Outside Sweden
                                </label>
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="col-md-6 mb-2 mb-md-0">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter current location"
                                  value={userData.current_location || ""}
                                  // onChange={(e) =>
                                  //   setUserData((prev) => ({
                                  //     ...prev,
                                  //     current_location: e.target.value,
                                  //   }))
                                  // }
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^[a-zA-Z\s]*$/.test(value)) {
                                      setUserData((prev) => ({
                                        ...prev,
                                        current_location: value,
                                      }));
                                    }
                                  }}

                                />
                              </div>
                              {userData.current_location !== "Sweden" && (
                                <div className="col-md-6 mb-2 mb-md-0 country_input">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter country name"
                                    value={userData.country_name || ""}
                                    // onChange={(e) =>
                                    //   setUserData((prev) => ({
                                    //     ...prev,
                                    //     country_name: e.target.value,
                                    //   }))
                                    // }
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      if (/^[a-zA-Z\s]*$/.test(value)) {
                                        setUserData((prev) => ({
                                          ...prev,
                                          country_name: value,
                                        }));
                                      }
                                    }}

                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="">Notice Period</label>
                          <p>
                            <small>
                              Lets recruiters know your availability to join
                            </small>
                          </p>
                          <div className="mt-3">
                            <select
                              className="form-select"
                              value={
                                userData.notice_period || "15 days or less"
                              }
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  notice_period: e.target.value,
                                })
                              }
                            >
                              <option value="15 days or less">
                                15 Days or less
                              </option>
                              <option value="1 month">1 Month</option>
                              <option value="2 months">2 Months</option>
                              <option value="3 months">3 Months</option>
                              <option value="more than 3 months">
                                More than 3 months
                              </option>
                              <option value="serving notice period">
                                Serving notice period
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="">Profile Summary</label>
                          <textarea className="form-control" value={userData.bio}  name="bio" id="" rows={4}
                           onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  bio: e.target.value,
                                })
                              }
                          ></textarea>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer border-0">
                      <button
                        type="button"
                        className="btn btn-secondary rounded-pill"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary rounded-pill"
                        data-bs-dismiss="modal"
                        onClick={saveJobSeekerData}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Upload Section */}
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                  <h5 className="text-theme">Resume</h5>
                  <p>
                    75% of recruiters discover candidates through their resume
                  </p>

                  <div className="upload_resume">
                    {resume || userData.resume ? (
                      <div className="uploaded_file_details d-flex justify-content-between align-items-baseline">
                        <div>
                          <h6 className="file_name m-0">
                            {userData.resume && (
                              <a
                                href={`${IMG_URL}/${userData.resume}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={`${SITE_URL}/admin/uploads/frontend_image/PDF.png`}
                                  alt="PDF"
                                  style={{ width: "45px" }}
                                />
                              </a>
                            )}
                          </h6>
                          {userData.resume_uploaded_on && (
                            <p className="text-secondary">
                              <small>
                                {/* Uploaded on {timeAgo(userData.resume_uploaded_on)} */}
                                <b>Uploaded -</b> <TimeAgo timestamp={userData.resume_uploaded_on} />
                              </small>
                            </p>

                          )}
                        </div>
                        <div className="d-flex position-relative">
                          <i
                            className="fa-solid fa-download me-3"
                            onClick={handleResumeDownload}
                          >
                          </i>
                          <i
                            className="fa-solid fa-trash"
                            onClick={handleRemoveResume}
                          ></i>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        <input
                          type="file"
                          id="upload_resume_input"
                          onChange={handleResumeUpload}
                        />
                        <label htmlFor="upload_resume_input">
                          Upload resume
                        </label>
                        <p className="m-0 text-center">
                          <small>
                            Supported Format: PDF only, upto 2 MB.
                          </small>
                        </p>
                      </div>
                    )}
                    {resumeError && (
                      <p className="text-danger text-center m-0">{resumeError}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Remove Resume Modal */}
              <div
                className="modal fade"
                id="removeResumeModal"
                tabIndex="-1"
                aria-labelledby="removeResumeModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="removeResumeModalLabel">
                        Remove Resume
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Are you sure you want to remove your resume?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={confirmRemoveResume}
                        data-bs-dismiss="modal"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="m-0 me-3 text-theme">
                      Key Skills
                      {userData.skills && userData.skills.length > 0 && (
                        <Link
                          data-bs-toggle="modal"
                          data-bs-target="#skillModal"
                        >
                          <i className="fa-solid fa-pencil ms-2" title="Edit"></i>
                        </Link>
                      )}
                    </h5>
                    {(!userData.skills || userData.skills.length === 0) && (
                      <Link
                        className="text-theme"
                        data-bs-toggle="modal"
                        data-bs-target="#skillModal"
                      >
                        Add Skills
                      </Link>
                    )}
                  </div>

                  <div className="mt-4 job_skills">
                    {userData.skills && userData.skills.length > 0 ? (
                      <ul className="d-flex flex-wrap p-0">
                        {userData.skills.split(",").map((skill, index) => (
                          <li
                            key={index}
                            className="rounded-pill text-capitalize border px-3 py-1 me-2 mb-2"
                          >
                            {skill.trim()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="m-0 text-muted">No skills added yet</p>
                    )}
                  </div>
                </div>
              </div>

              <div
                className="modal fade skillModal"
                id="skillModal"
                tabIndex="-1"
                aria-labelledby="skillModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content p-3 p-sm-4">
                    <div className="modal-header border-0">
                      <h1 className="modal-title fs-5" id="skillModalLabel">
                        Key Skills
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body ">
                      <form action="" className="">
                        <div className="mb-4">
                          <label htmlFor="">Skills</label>

                          {skills && skills.length >= 1 && (
                            <div className="all_added_skills py-2">
                              <ul className="p-0 d-flex flex-wrap m-0">
                                {skills.map((skill, index) => (
                                  <li
                                    key={index}
                                    className="rounded-pill border me-2 mb-2 py-1 ps-3 pe-4 position-relative"
                                  >
                                    {skill}
                                    <i
                                      className="fa-solid fa-xmark "
                                      onClick={() => removeSkill(index)}
                                    />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <input
                            type="text"
                            placeholder="Add skills"
                            className="add_Skill_input form-control"
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                          />
                          <div className="skill-suggestions">
                            {loadingSuggestions ? (
                              <p className="p-2">Loading...</p>
                            ) : (
                              suggestions.map((suggestion, index) => (
                                <div
                                  key={index}
                                  className="suggestion-item"
                                  onClick={() => addSkill(suggestion)}
                                >
                                  {suggestion}
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer border-0">
                      <button
                        type="button"
                        className="btn btn-secondary rounded-pill"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary rounded-pill"
                        onClick={() => saveSkills()}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employment Section */}
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="text-theme">Employment</h5>
                    <Link
                      className="text-theme"
                      data-bs-toggle="modal"
                      data-bs-target="#AddemployModal"
                      onClick={() => setEmploymentForm(defaultEmploymentForm)}
                    >
                      Add employment
                    </Link>

                  </div>

                  <div className="mt-4 educational_details">
                    <div>

                      {employment && employment.length > 0 ? (
                        employment.map((employ) => (
                          <div className="mb-3" key={employ.id}>
                            <div className="d-flex align-items-baseline">
                              <h6 style={{ fontWeight: "500" }} className="hh text-capitalize m-0">{employ.current_job_title}</h6>
                              <Link
                                data-bs-toggle="modal"
                                data-bs-target="#employModal"
                                onClick={() => editEmploymentData(employ.id)} // pass the employment ID
                              >
                                <i className="fa-solid fa-pencil ms-2" title="Edit"></i>
                              </Link>

                            </div>
                            <h6 style={{ fontWeight: "400" }} className="text-capitalize m-0">{employ.current_company_name}</h6>

                            <p className="m-0">
                              <small>
                                <span>
                                  {employ.employment_type} | {employ.joining_date} &nbsp;To&nbsp;
                                  {employ.worked_till || "Present"}
                                </span>
                              </small>
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted">No employment details filled yet.</p>
                      )}


                    </div>
                  </div>
                </div>
              </div>

              {/* Employment Delete Modal */}
              <div
                className="modal fade"
                id="deleteModal"
                tabIndex="-1"
                aria-labelledby="deleteModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="deleteModalLabel">
                        Delete employment data
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Are you sure you want to delete employment details?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => confirmDelete(employmentForm.id)}
                        data-bs-dismiss="modal"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employment Edit Modal */}
              <div
                className="modal fade employModal"
                id="employModal"
                tabIndex="-1"
                aria-labelledby="employModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content p-3 p-sm-4">
                    <div className="modal-header border-0 p-0">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body ">
                      <div className="d-flex justify-content-between">
                        <h1 className="modal-title fs-5" id="employModalLabel">
                          Edit Employment Details
                        </h1>
                        <Link
                          className="text-theme"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteModal"
                        >
                          Delete
                        </Link>
                      </div>

                      <form className="mt-3">
                        {/* Current Employment */}
                        <div className="mb-4">
                          <label>Is this your current employment?</label>
                          <div className="d-flex mt-3">
                            <div className="form-check me-4">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="RadioYesNo"
                                id="RadioYes"
                                value="yes"
                                checked={employmentForm.current_employment === "yes"}
                                onChange={(e) =>
                                  setEmploymentForm({
                                    ...employmentForm,
                                    current_employment: e.target.value,
                                  })
                                }
                              />
                              <label className="form-check-label">Yes</label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="RadioYesNo"
                                id="RadioNo"
                                value="no"
                                checked={employmentForm.current_employment === "no"}
                                onChange={(e) =>
                                  setEmploymentForm({
                                    ...employmentForm,
                                    current_employment: e.target.value,
                                  })
                                }
                              />
                              <label className="form-check-label">No</label>
                            </div>
                          </div>
                        </div>

                        {/* Employment Type */}
                        <div className="mb-4">
                          <label htmlFor="employment_type">Employment Type</label>
                          <select
                            className="form-select"
                            value={employmentForm.employment_type}
                            onChange={(e) =>
                              setEmploymentForm({
                                ...employmentForm,
                                employment_type: e.target.value,
                              })
                            }
                          >
                            <option value="">Select</option>
                            <option value="1">Full Time</option>
                            <option value="2">Part Time</option>
                            <option value="3">Fixed</option>
                            <option value="4">Hourly</option>
                          </select>
                        </div>

                        {/* Total Experience */}
                        {employmentForm.current_employment === "yes" && (
                          <div className="row mt-4">
                            <label>Total Experience</label>

                            <div className="col-md-6 mb-2">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Years (Ex:05)"
                                maxLength={2}
                                value={
                                  employmentForm.total_experience?.split(",")[0]?.replace(" years", "").trim() || ""
                                }
                                onChange={(e) => {
                                  const input = e.target.value;
                                  if (input === "" || /^\d*$/.test(input)) {
                                    setEmploymentForm((prev) => {
                                      const monthsPart = prev.total_experience.split(",")[1]?.trim() || "0 months";
                                      return {
                                        ...prev,
                                        total_experience: `${input} years, ${monthsPart}`,
                                      };
                                    });
                                  }
                                }}
                              />
                            </div>

                            <div className="col-md-6 mb-2">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Months (Ex:01)"
                                maxLength={2}
                                value={
                                  employmentForm.total_experience?.split(",")[1]?.replace(" months", "").trim() || ""
                                }
                                onChange={(e) => {
                                  const input = e.target.value;
                                  if (input === "" || /^\d*$/.test(input)) {
                                    setEmploymentForm((prev) => {
                                      const yearsPart = prev.total_experience.split(",")[0]?.trim() || "0 years";
                                      return {
                                        ...prev,
                                        total_experience: `${yearsPart}, ${input} months`,
                                      };
                                    });
                                  }
                                }}
                              />
                            </div>
                          </div>
                        )}


                        {/* Company Name */}
                        <div className="mt-4">
                          <label>
                            {employmentForm.current_employment === "yes"
                              ? "Current Company Name"
                              : "Previous Company Name"}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="XYZ Company"
                            value={employmentForm.current_company_name}
                            onChange={(e) =>
                              setEmploymentForm({
                                ...employmentForm,
                                current_company_name: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* Job Title */}
                        <div className="mt-4">
                          <label>
                            {employmentForm.current_employment === "yes"
                              ? "Current Job Title"
                              : "Previous Job Title"}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="ABC Job Title"
                            value={employmentForm.current_job_title}
                            onChange={(e) => {
                              const input = e.target.value;
                              if (/^[a-zA-Z\s]*$/.test(input)) {
                                setEmploymentForm({
                                  ...employmentForm,
                                  current_job_title: input,
                                });
                              }
                            }}
                          />
                        </div>

                        {/* Joining Date */}
                        <div className="row mt-4">
                          <label>Joining Date</label>
                          <div className="col-md-12 mb-2">
                            <input
                              type="date"
                              className="form-control"
                              value={employmentForm.joining_date}
                              onChange={(e) =>
                                setEmploymentForm({
                                  ...employmentForm,
                                  joining_date: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        {/* Worked Till */}
                        {employmentForm.current_employment === "no" && (
                          <div className="row mt-4">
                            <label>Worked Till</label>
                            <div className="col-md-12 mb-2">
                              <input
                                type="date"
                                className="form-control"
                                value={employmentForm.worked_till}
                                onChange={(e) =>
                                  setEmploymentForm({
                                    ...employmentForm,
                                    worked_till: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        )}

                        {/* Current Salary */}
                        {employmentForm.current_employment === "yes" &&
                          <div className="mt-4">
                            <label>Current Salary</label>
                            <div className="row">
                              <div className="col-4 col-md-3 col-lg-2">
                                <select
                                  className="form-select"
                                  value={employmentForm.current_salary?.split(" ")[0] || ""}
                                  onChange={(e) =>
                                    setEmploymentForm((prev) => ({
                                      ...prev,
                                      current_salary: `${e.target.value} ${prev.current_salary?.split(" ")[1] || ""}`,
                                    }))
                                  }

                                >
                                  <option value="kr">kr</option>
                                  <option value="$">$</option>
                                </select>
                              </div>
                              <div className="col-8 col-md-9 col-lg-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Eg. 4,50,000"
                                  value={employmentForm.current_salary?.split(" ")[1] || ""}
                                  onChange={(e) => {
                                    let input = e.target.value.replace(/\D/g, ""); // Only digits
                                    if (/^0+$/.test(input)) {
                                      input = ""; // Disallow only-zero input like 0, 00, etc.
                                    }
                                    if (input.length <= 10) {
                                      setEmploymentForm((prev) => ({
                                        ...prev,
                                        current_salary: `${prev.current_salary.split(" ")[0] || "kr"} ${input}`,
                                      }));
                                    }
                                  }}
                                  maxLength={10}
                                />

                              </div>
                            </div>
                          </div>
                        }

                        {/* Job Profile */}
                        <div className="mt-4">
                          <label>Job Profile</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter job profile"
                            value={employmentForm.job_profile}
                            onChange={(e) =>
                              setEmploymentForm({
                                ...employmentForm,
                                job_profile: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* Notice Period */}
                        {employmentForm.current_employment === "yes" &&
                          <div className="mt-4">
                            <label>Notice Period</label>
                            <select
                              className="form-select"
                              value={employmentForm.notice_period?.trim() || ""}
                              onChange={(e) =>
                                setEmploymentForm({
                                  ...employmentForm,
                                  notice_period: e.target.value,
                                })
                              }
                            >
                              <option value="">Select</option>
                              <option value="15 days or less">15 Days or Less</option>
                              <option value="1 month">1 Month</option>
                              <option value="2 months">2 Months</option>
                              <option value="3 months">3 Months</option>
                              <option value="more than 3 months">More than 3 months</option>
                              <option value="serving notice period">Serving notice period</option>
                            </select>
                          </div>
                        }
                      </form>
                    </div>

                    <div className="modal-footer border-0">
                      <button
                        type="button"
                        className="btn btn-secondary rounded-pill"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary rounded-pill"
                        data-bs-dismiss="modal"
                        onClick={updateEmploymentData}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Employment Modal */}
              <div
                className="modal fade employModal"
                id="AddemployModal"
                tabIndex="-1"
                aria-labelledby="AddemployModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content p-3 p-sm-4">
                    <div className="modal-header border-0 p-0">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="d-flex justify-content-between">
                        <h1 className="modal-title fs-5" id="AddemployModalLabel">
                          Add Employment
                        </h1>
                      </div>
                      <form className="mt-3">

                        {/* Current Employment */}
                        <div className="mb-4">
                          <label>Is this your current employment?</label>
                          <div className="d-flex mt-3">
                            <div className="form-check me-4">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="RadioYesNo"
                                id="RadioYes"
                                value="yes"
                                checked={employmentForm.current_employment === "yes"}
                                onChange={(e) =>
                                  setEmploymentForm({
                                    ...employmentForm,
                                    current_employment: e.target.value,
                                  })
                                }

                              />
                              <label className="form-check-label" >
                                Yes
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="RadioYesNo"
                                id="RadioNo"
                                value="no"
                                checked={employmentForm.current_employment === "no"}
                                onChange={(e) =>
                                  setEmploymentForm({
                                    ...employmentForm,
                                    current_employment: e.target.value,
                                  })
                                }
                              />
                              <label className="form-check-label" >
                                No
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Employment Type */}
                        <div className="mb-4">
                          <label htmlFor="employment_type">Employment Type</label>
                          <select
                            className="form-select"
                            value={employmentForm.employment_type}
                            onChange={(e) =>
                              setEmploymentForm({
                                ...employmentForm,
                                employment_type: e.target.value,
                              })
                            }
                          >
                            <option value="">Select</option>
                            <option value="1">Full Time</option>
                            <option value="2">Part Time</option>
                            <option value="3">Fixed</option>
                            <option value="4">Hourly</option>
                          </select>
                        </div>

                        {/* Total Experience */}
                        {employmentForm.current_employment === "yes" && (
                          <div className="row mt-4">
                            <label>Total Experience</label>

                            {/* Years */}
                            <div className="col-md-6 mb-2">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Years (Ex:05)"
                                maxLength={2}
                                onKeyPress={(e) => {
                                  if (!/[0-9]/.test(e.key)) e.preventDefault(); // Block non-numeric input
                                }}
                                onChange={(e) => {
                                  const input = e.target.value;
                                  if (/^\d*$/.test(input)) {
                                    setEmploymentForm((prev) => ({
                                      ...prev,
                                      total_experience: `${input} years, ${prev.total_experience.split(",")[1]?.trim() || "0 months"}`,
                                    }));
                                  }
                                }}
                              />
                            </div>

                            {/* Months */}
                            <div className="col-md-6 mb-2">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Months (Ex:01)"
                                maxLength={2}
                                onKeyPress={(e) => {
                                  if (!/[0-9]/.test(e.key)) e.preventDefault(); // Block non-numeric input
                                }}
                                onChange={(e) => {
                                  const input = e.target.value;
                                  if (/^\d*$/.test(input)) {
                                    setEmploymentForm((prev) => ({
                                      ...prev,
                                      total_experience: `${prev.total_experience.split(",")[0]?.trim() || "0 years"}, ${input} months`,
                                    }));
                                  }
                                }}
                              />
                            </div>
                          </div>
                        )}



                        {/* Company Name */}
                        <div className="mt-4">
                          <label>
                            {employmentForm.current_employment === "yes" ? " Current Company Name" : " Previous Company Name"}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="XYZ Company"
                            value={employmentForm.current_company_name}
                            onChange={(e) =>
                              setEmploymentForm({
                                ...employmentForm,
                                current_company_name: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* Job Title */}
                        <div className="mt-4">
                          <label>
                            {employmentForm.current_employment === "yes" ? " Current Job Title" : "Previous Job Title"}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="ABC Job Title"
                            value={employmentForm.current_job_title}
                            onChange={(e) => {
                              const input = e.target.value;
                              if (/^[a-zA-Z\s]*$/.test(input)) {
                                setEmploymentForm({
                                  ...employmentForm,
                                  current_job_title: input,
                                });
                              }
                            }}

                          />
                        </div>

                        {/* Joining Date */}
                        <div className="row mt-4">
                          <label>Joining Date</label>
                          <div className="col-md-12 mb-2">
                            <input
                              type="date"
                              className="form-control"
                              value={employmentForm.joining_date}
                              onChange={(e) =>
                                setEmploymentForm({
                                  ...employmentForm,
                                  joining_date: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        {/* Worked Till */}

                        {employmentForm.current_employment === "no" &&
                          <div className="row mt-4">
                            <label>Worked Till</label>
                            <div className="col-md-12 mb-2">
                              <input
                                type="date"
                                className="form-control"
                                value={employmentForm.worked_till}
                                onChange={(e) =>
                                  setEmploymentForm({
                                    ...employmentForm,
                                    worked_till: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        }

                        {/* Current Salary */}
                        {employmentForm.current_employment === "yes" &&
                          <div className="mt-4">
                            <label>Current Salary</label>
                            <div className="row">
                              <div className="col-4 col-md-3 col-lg-2">
                                <select
                                  className="form-select"
                                  onChange={(e) =>
                                    setEmploymentForm((prev) => ({
                                      ...prev,
                                      current_salary: `${e.target.value} ${prev.current_salary.split(" ")[1] || ""}`,
                                    }))
                                  }
                                >
                                  <option value="kr">kr</option>
                                  <option value="$">$</option>
                                </select>
                              </div>
                              <div className="col-8 col-md-9 col-lg-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Eg. 4,50,000"
                                  value={employmentForm.current_salary.split(" ")[1] || ""}
                                  onChange={(e) => {
                                    let input = e.target.value.replace(/\D/g, ""); // Keep only digits

                                    // Prevent values like 0, 00, 0000, etc.
                                    if (/^0+$/.test(input)) {
                                      input = "";
                                    }

                                    if (input.length <= 10) {
                                      setEmploymentForm((prev) => ({
                                        ...prev,
                                        current_salary: `${prev.current_salary.split(" ")[0] || "kr"} ${input}`,
                                      }));
                                    }
                                  }}
                                  maxLength={10}
                                />

                              </div>
                            </div>
                          </div>
                        }

                        {/* Job Profile */}
                        <div className="mt-4">
                          <label htmlFor="">Job Profile</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Type Here..."
                            value={employmentForm.job_profile}
                            onChange={(e) =>
                              setEmploymentForm({
                                ...employmentForm,
                                job_profile: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* Notice Period */}
                        {employmentForm.current_employment === "yes" &&
                          <div className="mt-4">
                            <label>Notice Period</label>
                            <select
                              className="form-select"
                              value={employmentForm.notice_period}
                              onChange={(e) =>
                                setEmploymentForm({
                                  ...employmentForm,
                                  notice_period: e.target.value,
                                })
                              }
                            >
                              <option value="">Select</option>
                              <option value="15 days or less">15 Days or less</option>
                              <option value="1 month">1 Month</option>
                              <option value="2 months">2 Months</option>
                              <option value="3 months">3 Months</option>
                              <option value="more than 3 months">More than 3 months</option>
                              <option value="serving notice period">Serving notice period</option>
                            </select>
                          </div>
                        }
                      </form>
                    </div>

                    <div className="modal-footer border-0">
                      <button
                        type="button"
                        className="btn btn-secondary rounded-pill"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary rounded-pill"
                        data-bs-dismiss="modal"
                        onClick={saveNewEmploymentData}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>


              {/* Education Section Starts --- */}

              <div className="card mt-4 shadow border-0 rounded-3"
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="text-theme">Education</h5>
                    <Link
                      className="text-theme"
                      data-bs-toggle="modal"
                      data-bs-target="#AddEducationModal"
                      onClick={() => setEducationData(defaultEducationForm)}
                    >
                      Add education
                    </Link>
                  </div>
                  {education.length > 0 ? (
                    education.map((edu, index) => {
                      const educationLabel =
                        edu.education === "4"
                          ? "12th"
                          : edu.education === "5"
                            ? "10th"
                            : edu.education;

                      return (
                        <div key={index} className="mt-4 employment_details">
                          <div className="mb-3">
                            <div className="d-flex align-items-baseline education_section">
                              <h6 style={{ fontWeight: "500" }} className="m-0 text-capitalize">
                                {edu.specialization
                                  ? `${edu.course} - ${edu.specialization}`
                                  : (`${edu.course || educationLabel} | ${edu.school_medium}`)}
                              </h6>
                              <Link
                                data-bs-toggle="modal"
                                data-bs-target="#EditEducationModal"
                                onClick={() => editEducationData(edu.id)}
                              >
                                <i className="fa-solid fa-pencil ms-2" title="Edit"></i>
                              </Link>
                            </div>
                            <h6 className="m-0 text-capitalize">
                              {edu.course && edu.course_type
                                ? ` ${edu.course_type}`
                                : edu.specialization
                                  ? `${edu.specialization} ${edu.passing_year}`
                                  : ""}
                            </h6>

                            <p className="m-0">
                              <small className="text-capitalize">
                                {edu.education === "4" || edu.education === "5"
                                  ? `${edu.board} - ${edu.passing_year}`
                                  : `${edu.course_starting_year} - ${edu.course_ending_year} `}
                              </small>
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="m-0 text-muted">No educational details filled yet.</p>
                  )}



                </div>
              </div>

              {/* Add Education Modal  */}
              <div
                className="modal fade"
                id="AddEducationModal"
                tabIndex="-1"
                aria-labelledby="AddEducationModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content p-3 p-sm-4">
                    <div className="modal-header border-0 pb-0">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="d-flex justify-content-between">
                        <h1 className="modal-title fs-5 m-0" id="AddEducationModalLabel">
                          Add Education
                        </h1>

                      </div>
                      <h6 className="text-muted">
                        Details of your course and university help recruiters
                        understand your background.
                      </h6>

                      <form>
                        <div className="mt-4 mb-4">
                          <label>Education</label>
                          <select
                            className="form-select"
                            value={educationData.education}
                            onChange={(e) => setEducationData({ ...educationData, education: e.target.value })}
                          >
                            <option value="">Select education</option>
                            <option value="1">Doctorate/PHD</option>
                            <option value="2">Masters/Post Graduation</option>
                            <option value="3">Graduation/Diploma</option>
                            <option value="4">12th</option>
                            <option value="5">10th</option>
                          </select>
                        </div>

                        {isSchoolLevel && (
                          <>
                            <div className="mb-4">
                              <label>Board</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter board name"
                                value={educationData.board}
                                // onChange={(e) => setEducationData({ ...educationData, board: e.target.value })}

                                onChange={(e) => {
                                  const input = e.target.value;
                                  if (/^[a-zA-Z\s]*$/.test(input)) {
                                    setEducationData({ ...educationData, board: input });
                                  }
                                }}
                              />
                            </div>

                            <div className="mb-4">
                              <label>Passing out year</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter year"
                                value={educationData.passing_year}
                                // onChange={(e) => setEducationData({ ...educationData, passing_year: e.target.value })}

                                onChange={(e) => {
                                  const input = e.target.value;
                                  if (/^\d*$/.test(input)) {
                                    setEducationData({ ...educationData, passing_year: input });
                                  }
                                }}
                                maxLength={4}
                              />
                            </div>

                            <div className="mb-4">
                              <label>School Medium</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter medium"
                                value={educationData.school_medium}
                                // onChange={(e) => setEducationData({ ...educationData, school_medium: e.target.value })}

                                onChange={(e) => {
                                  const input = e.target.value;
                                  if (/^[a-zA-Z\s]*$/.test(input)) {
                                    setEducationData({ ...educationData, school_medium: input });
                                  }
                                }}
                              />
                            </div>
                          </>
                        )}

                        {!isSchoolLevel && (
                          <>
                            <div className="mb-4">
                              <label>University/Institute</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter institute name"
                                value={educationData.institute}
                                // onChange={(e) => setEducationData({ ...educationData, institute: e.target.value })}
                                onChange={(e) => {
                                  const input = e.target.value;
                                  if (/^[a-zA-Z]*$/.test(input)) {
                                    setEducationData({ ...educationData, institute: input });
                                  }
                                }}
                              />
                            </div>

                            <div className="mb-4">
                              <label>Course</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter course name"
                                value={educationData.course}
                                // onChange={(e) => setEducationData({ ...educationData, course: e.target.value })}
                                onChange={(e) => {
                                  const input = e.target.value;
                                  if (/^[a-zA-Z]*$/.test(input)) {
                                    setEducationData({ ...educationData, course: input })
                                  }
                                }}
                              />
                            </div>

                            <div className="mb-4">
                              <label>Specialization</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your specialization"
                                value={educationData.specialization}
                                // onChange={(e) => setEducationData({ ...educationData, specialization: e.target.value })}

                                onChange={(e) => {
                                  const input = e.target.value;
                                  if (/^[a-zA-Z]*$/.test(input)) {
                                    setEducationData({ ...educationData, specialization: input })
                                  }
                                }}
                              />
                            </div>

                            <div className="mb-4">
                              <label>Course Type</label>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="courseType"
                                  checked={educationData.course_type === "Full Time"}
                                  onChange={() => setEducationData({ ...educationData, course_type: "Full Time" })}
                                />
                                <label className="form-check-label">Full Time</label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="courseType"
                                  checked={educationData.course_type === "Part Time"}
                                  onChange={() => setEducationData({ ...educationData, course_type: "Part Time" })}
                                />
                                <label className="form-check-label">Part Time</label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="courseType"
                                  checked={educationData.course_type === "Correspondence"}
                                  onChange={() => setEducationData({ ...educationData, course_type: "Correspondence" })}
                                />
                                <label className="form-check-label">Correspondence</label>
                              </div>
                            </div>

                            <div className="mb-4">
                              <label>Course Duration</label>
                              <div className="row flex-column flex-md-row align-items-center">
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Starting Year"
                                    value={educationData.course_starting_year}
                                    // onChange={(e) => {
                                    //   setEducationData({ ...educationData, course_starting_year: e.target.value });
                                    //   setYearError(''); // Clear error when user changes starting year
                                    // }}

                                     onChange={(e) => {
                                      const startingYear = e.target.value;
                                      if (/^\d{0,4}$/.test(startingYear)) {
                                        setEducationData({ ...educationData, course_starting_year: startingYear });
                                        setYearError(''); // Clear error on typing
                                      }
                                    }}
                                    maxLength={4}
                                  />
                                </div>
                                <div className="col-1 text-center">
                                  <span>To</span>
                                </div>
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ending Year"
                                    value={educationData.course_ending_year}
                                    onChange={(e) => {
                                      const endingYear = e.target.value;

                                      if (/^\d{0,4}$/.test(endingYear)) {
                                        setEducationData({ ...educationData, course_ending_year: endingYear });
                                        setYearError(''); // Clear error on typing
                                      }
                                    }}
                                    onBlur={() => {
                                      const { course_starting_year, course_ending_year } = educationData;
                                      if (
                                        course_starting_year &&
                                        course_ending_year &&
                                        parseInt(course_ending_year) < parseInt(course_starting_year)
                                      ) {
                                        setYearError('Ending year should be the same or greater than starting year');
                                      }
                                    }}
                                    maxLength={4}
                                  />
                                  {yearError && (
                                    <small className="text-danger">{yearError}</small>
                                  )}
                                </div>
                              </div>
                            </div>

                          </>
                        )}

                        {/* <div className="mb-4">
                          <label>Marks</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter marks"
                            value={educationData.marks}
                            onChange={(e) => setEducationData({ ...educationData, marks: e.target.value })}
                            maxLength={5}
                          />
                        </div> */}

                        <div className="mb-4">
                          <label>Marks</label>
                          <input
                            type="text"
                            className={`form-control ${marksError ? 'is-invalid' : ''}`}
                            placeholder="Enter marks"
                            value={educationData.marks}
                            onChange={(e) => {
                              const input = e.target.value;

                              // Allow only numbers and up to 5 digits
                              if (/^\d{0,5}$/.test(input)) {
                                setEducationData({ ...educationData, marks: input });
                                setMarksError('');
                              }
                            }}
                            onBlur={() => {
                              const marks = educationData.marks;

                              if (parseInt(marks) < 0 || marks === '0' || marks === '00' || marks === '000' || marks === '0000' || marks === '00000') {
                                setMarksError('Marks cannot be negative or 0');
                              }
                            }}
                            maxLength={5}
                            required
                          />
                          {marksError && (
                            <small className="text-danger">{marksError}</small>
                          )}
                        </div>

                      </form>
                    </div>

                    <div className="modal-footer border-0">
                      <button
                        type="button"
                        className="btn btn-secondary rounded-pill"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary rounded-pill"
                        data-bs-dismiss="modal"
                        onClick={AddEducationData}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Education Modal */}
              <div
                className="modal fade"
                id="EditEducationModal"
                tabIndex="-1"
                aria-labelledby="EditEducationModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content p-3 p-sm-4">
                    <div className="modal-header border-0 pb-0">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="d-flex justify-content-between">
                        <h1 className="modal-title fs-5 m-0" id="EditEducationModalLabel">
                          Edit Education
                        </h1>
                        <Link
                          className="text-theme"
                          data-bs-toggle="modal"
                          data-bs-target="#educationDeleteModal"
                        >
                          Delete
                        </Link>
                      </div>
                      <h6 className="text-muted">
                        Details of your course and university help recruiters
                        understand your background.
                      </h6>

                      <form>
                        <div className="mt-4 mb-4">
                          <label>Education</label>
                          <select
                            className="form-select"
                            value={educationData.education}
                            onChange={(e) => setEducationData({ ...educationData, education: e.target.value })}
                          >
                            <option value="">Select education</option>
                            <option value="1">Doctorate/PHD</option>
                            <option value="2">Masters/Post Graduation</option>
                            <option value="3">Graduation/Diploma</option>
                            <option value="4">12th</option>
                            <option value="5">10th</option>
                          </select>
                        </div>

                        {isSchoolLevel && (
                          <>
                            <div className="mb-4">
                              <label>Board</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter board name"
                                value={educationData.board}
                                // onChange={(e) => setEducationData({ ...educationData, board: e.target.value })}

                                onChange={(e) => {
                                  const input = e.target.value;
                                  if (/^[a-zA-Z\s]*$/.test(input)) {
                                    setEducationData({ ...educationData, board: input });
                                  }
                                }}
                              />
                            </div>

                            <div className="mb-4">
                              <label>Passing out year</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter year"
                                value={educationData.passing_year}
                                // onChange={(e) => setEducationData({ ...educationData, passing_year: e.target.value })}
                                onChange={(e) => {
                                  const input = e.target.value;
                                  if (/^\d*$/.test(input)) {
                                    setEducationData({ ...educationData, passing_year: input });
                                  }
                                }}

                                maxLength={4}
                              />
                            </div>

                            <div className="mb-4">
                              <label>School Medium</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter medium"
                                value={educationData.school_medium}
                                // onChange={(e) => setEducationData({ ...educationData, school_medium: e.target.value })}

                                onChange={(e) => {
                                  const input = e.target.value;
                                  if (/^[a-zA-Z\s]*$/.test(input)) {
                                    setEducationData({ ...educationData, school_medium: input });
                                  }
                                }}
                              />
                            </div>
                          </>
                        )}

                        {!isSchoolLevel && (
                          <>
                            <div className="mb-4">
                              <label>University/Institute</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter institute name"
                                value={educationData.institute}
                                // onChange={(e) => setEducationData({ ...educationData, institute: e.target.value })}

                                onChange={(e) => {
                                  const input = e.target.value;
                                  if (/^[a-zA-Z\s]*$/.test(input)) {
                                    setEducationData({ ...educationData, institute: input });
                                  }
                                }}
                              />
                            </div>

                            <div className="mb-4">
                              <label>Course</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter course name"
                                value={educationData.course}
                                // onChange={(e) => setEducationData({ ...educationData, course: e.target.value })}

                                onChange={(e) => {
                                  const input = e.target.value;
                                  if (/^[a-zA-Z\s]*$/.test(input)) {
                                    setEducationData({ ...educationData, course: input });
                                  }
                                }}

                              />
                            </div>

                            <div className="mb-4">
                              <label>Specialization</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your specialization"
                                value={educationData.specialization}
                                // onChange={(e) => setEducationData({ ...educationData, specialization: e.target.value })}

                                onChange={(e) => {
                                  const input = e.target.value;
                                  if (/^[a-zA-Z\s]*$/.test(input)) {
                                    setEducationData({ ...educationData, specialization: input });
                                  }
                                }}
                              />
                            </div>

                            <div className="mb-4">
                              <label>Course Type</label>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="courseType"
                                  checked={educationData.course_type === "Full Time"}
                                  onChange={() => setEducationData({ ...educationData, course_type: "Full Time" })}
                                />
                                <label className="form-check-label">Full Time</label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="courseType"
                                  checked={educationData.course_type === "Part Time"}
                                  onChange={() => setEducationData({ ...educationData, course_type: "Part Time" })}
                                />
                                <label className="form-check-label">Part Time</label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="courseType"
                                  checked={educationData.course_type === "Correspondence"}
                                  onChange={() => setEducationData({ ...educationData, course_type: "Correspondence" })}
                                />
                                <label className="form-check-label">Correspondence</label>
                              </div>
                            </div>

                            <div className="mb-4">
                              <label>Course Duration</label>
                              <div className="row flex-column flex-md-row align-items-center">
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Starting Year"
                                    value={educationData.course_starting_year}
                                    // onChange={(e) => {
                                    //   setEducationData({ ...educationData, course_starting_year: e.target.value });
                                    //   setYearError(''); // Clear error when user changes starting year
                                    // }}

                                     onChange={(e) => {
                                      const startingYear = e.target.value;
                                      if (/^\d{0,4}$/.test(startingYear)) {
                                        setEducationData({ ...educationData, course_starting_year: startingYear });
                                        setYearError(''); // Clear error on typing
                                      }
                                     }}
                                     maxLength={4}
                                  />
                                </div>
                                <div className="col-1 text-center">
                                  <span>To</span>
                                </div>
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ending Year"
                                    value={educationData.course_ending_year}
                                    onChange={(e) => {
                                      const endingYear = e.target.value;

                                      if (/^\d{0,4}$/.test(endingYear)) {
                                        setEducationData({ ...educationData, course_ending_year: endingYear });
                                        setYearError(''); // Clear error on typing
                                      }
                                    }}
                                    onBlur={() => {
                                      const { course_starting_year, course_ending_year } = educationData;
                                      if (
                                        course_starting_year &&
                                        course_ending_year &&
                                        parseInt(course_ending_year) < parseInt(course_starting_year)
                                      ) {
                                        setYearError('Ending year should be the same or greater than starting year');
                                      }
                                    }}
                                    maxLength={4}
                                  />
                                  {yearError && (
                                    <small className="text-danger">{yearError}</small>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        )}




                        {/* <div className="mb-4">
                          <label>Marks</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter marks"
                            value={educationData.marks}
                            onChange={(e) => setEducationData({ ...educationData, marks: e.target.value })}
                            maxLength={5}
                          />
                        </div> */}
                        <div className="mb-4">
                          <label>Marks</label>
                          <input
                            type="text"
                            className={`form-control ${marksError ? 'is-invalid' : ''}`}
                            placeholder="Enter marks"
                            value={educationData.marks}
                            onChange={(e) => {
                              const input = e.target.value;

                              // Allow only numbers and up to 5 digits
                              if (/^\d{0,5}$/.test(input)) {
                                setEducationData({ ...educationData, marks: input });
                                setMarksError('');
                              }
                            }}
                            onBlur={() => {
                              const marks = educationData.marks;

                              if (parseInt(marks) < 0 || marks === '0' || marks === '00' || marks === '000' || marks === '0000' || marks === '00000') {
                                setMarksError('Marks cannot be negative or 0');
                              }
                            }}
                            maxLength={5}
                          />
                          {marksError && (
                            <small className="text-danger">{marksError}</small>
                          )}
                        </div>

                      </form>
                    </div>

                    <div className="modal-footer border-0">
                      <button
                        type="button"
                        className="btn btn-secondary rounded-pill"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary rounded-pill"
                        data-bs-dismiss="modal"
                        onClick={UpdateEducationData}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education delete modal */}
              <div
                className="modal fade"
                id="educationDeleteModal"
                tabIndex="-1"
                aria-labelledby="educationDeleteModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title"
                        id="educationDeleteModalLabel"
                      >
                        Delete education data
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Are you sure you want to delete education details?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          confirmEducationDelete(educationData.id)
                        }
                        data-bs-dismiss="modal"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education Section Ends --- */}


              {/* Social Profiles */}
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between ">
                    <h5 className="m-0 text-theme">Online Profile</h5>

                    <Link
                      className="text-theme"
                      data-bs-toggle="modal"
                      data-bs-target="#addSocialModal"
                      onClick={() => setSelectedSocialProfile({})}
                    >
                      Add Profile
                    </Link>
                  </div>

                  <p>
                    <small> Add link to online professional profiles (e.g.LinkedIn, etc.) </small>
                  </p>

                  <div className=" online_profile">
                    {socialProfiles && socialProfiles.length > 0 ? (
                      socialProfiles.map((social_profiles, index) => (
                        <div key={index} className="mb-3">
                          <div className="d-flex align-items-baseline">
                            <h6 className="m-0">
                              {social_profiles.social_profile_name}
                              <Link
                                data-bs-toggle="modal"
                                data-bs-target={`#socialModal-${social_profiles.id}`}
                                onClick={() => openSocialModal(social_profiles)}
                              >
                                <i className="fa-solid fa-pencil ms-2" title="Edit"></i>
                              </Link>
                            </h6>
                          </div>
                          <p className="m-0 text-theme">
                            {social_profiles.url}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted m-0">No online profiles added yet</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal for Editing Social Profiles */}
              {socialProfiles.map((profile) => (
                <div key={profile.id}>
                  {/* Edit/Add Social Profile Modal */}
                  <div
                    className="modal fade"
                    id={`socialModal-${profile.id}`}
                    tabIndex="-1"
                    aria-labelledby={`socialModal-${profile.id}-Label`}
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content p-3 p-sm-4">
                        <div className="modal-header border-0 pb-0">
                          <h1
                            className="modal-title fs-5"
                            id={`socialModal-${profile.id}-Label`}
                          >
                            {profile.id
                              ? "Edit Online Profile"
                              : "Add Online Profile"}
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="d-flex justify-content-between">
                            <h6 className="text-muted">
                              Add link to online professional profiles (e.g.
                              LinkedIn, etc.)
                            </h6>
                            {profile.id && (
                              <Link
                                className="text-theme"
                                data-bs-toggle="modal"
                                data-bs-target={`#deleteSocialModal-${profile.id}`}
                              >
                                Delete
                              </Link>
                            )}
                          </div>

                          <form>
                            <div className="mt-4 mb-4">
                              <label
                                htmlFor={`social_profile_name-${profile.id}`}
                              >
                                Social Profile
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Social Profile Name"
                                value={
                                  selectedSocialProfile.social_profile_name ||
                                  ""
                                }
                                onChange={(e) =>
                                  setSelectedSocialProfile((prev) => ({
                                    ...prev,
                                    social_profile_name: e.target.value,
                                  }))
                                }
                              />
                            </div>
                            {/* <div className="mb-4">
                              <label htmlFor={`url-${profile.id}`}>URL</label>
                              <input
                                type="url"
                                className="form-control"
                                placeholder="Enter Social Profile URL"
                                value={selectedSocialProfile.url || ""}
                                onChange={(e) =>
                                  setSelectedSocialProfile((prev) => ({
                                    ...prev,
                                    url: e.target.value,
                                  }))
                                }
                              />
                            </div> */}

                            <div className="mb-4">
                              <label htmlFor={`url-${profile.id}`}>URL</label>
                              <input
                                type="url"
                                className={`form-control ${urlError ? 'is-invalid' : ''}`}
                                placeholder="Enter Social Profile URL"
                                value={selectedSocialProfile.url || ""}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setSelectedSocialProfile((prev) => ({
                                    ...prev,
                                    url: value,
                                  }));
                                  validateUrl(value); // Validate URL
                                }}
                                onBlur={() => {
                                  if (!selectedSocialProfile.url) {
                                    setUrlError('URL is required');
                                  }
                                }}
                              />
                              {urlError && <small className="text-danger">{urlError}</small>}
                            </div>

                            <div className="mb-4">
                              <label htmlFor={`description-${profile.id}`}>
                                Description
                              </label>
                              <textarea
                                name="description"
                                className="form-control"
                                rows={3}
                                placeholder="Type here..."
                                value={selectedSocialProfile.description || ""}
                                onChange={(e) =>
                                  setSelectedSocialProfile((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                  }))
                                }
                              ></textarea>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer border-0">
                          <button
                            type="button"
                            className="btn btn-secondary rounded-pill"
                            data-bs-dismiss="modal"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary rounded-pill"
                            onClick={() => saveSocialProfiles(profile.id)}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delete Social Profile Modal */}
                  <div
                    className="modal fade"
                    id={`deleteSocialModal-${profile.id}`}
                    tabIndex="-1"
                    aria-labelledby={`deleteSocialModal-${profile.id}-Label`}
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title"
                            id={`deleteSocialModal-${profile.id}-Label`}
                          >
                            Delete Social Profile
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          Are you sure you want to delete this social profile?
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => confirmSocialDelete(profile.id)}
                            data-bs-dismiss="modal"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Modal for Adding New Social Profile */}
              <div
                className="modal fade"
                id="addSocialModal"
                tabIndex="-1"
                aria-labelledby="addSocialModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content p-3 p-sm-4">
                    <div className="modal-header border-0 pb-0">
                      <h1 className="modal-title fs-5" id="addSocialModalLabel">
                        Add Online Profile
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <h6 className="text-muted">
                        Add link to online professional profiles (e.g. LinkedIn,
                        etc.)
                      </h6>
                      <form>
                        <div className="mt-4 mb-4">
                          <label htmlFor="social_profile_name">
                            Social profile
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Social Profile Name"
                            value={
                              selectedSocialProfile?.social_profile_name || ""
                            }
                            onChange={(e) =>
                              setSelectedSocialProfile((prev) => ({
                                ...prev,
                                social_profile_name: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor=''>URL</label>
                          <input
                            type="url"
                            className={`form-control ${urlError ? 'is-invalid' : ''}`}
                            placeholder="Enter Social Profile URL"
                            value={selectedSocialProfile.url || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              setSelectedSocialProfile((prev) => ({
                                ...prev,
                                url: value,
                              }));
                              validateUrl(value); // Validate URL
                            }}
                            onBlur={() => {
                              if (!selectedSocialProfile.url) {
                                setUrlError('URL is required');
                              }
                            }}
                          />
                          {urlError && <small className="text-danger">{urlError}</small>}
                        </div>
                        <div className="mb-4">
                          <label htmlFor="description">Description</label>
                          <textarea
                            name="description"
                            className="form-control"
                            rows={3}
                            placeholder="Type here..."
                            value={selectedSocialProfile?.description || ""}
                            onChange={(e) =>
                              setSelectedSocialProfile((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                          ></textarea>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer border-0">
                      <button
                        type="button"
                        className="btn btn-secondary rounded-pill"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary rounded-pill"
                        onClick={() => saveSocialProfiles()}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal details Section */}
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <h5 className="m-0 text-theme">
                      Personal Details
                      <Link
                        data-bs-toggle="modal"
                        data-bs-target="#PersonalDetailModal"
                      >

                        <i className="fa-solid fa-pencil ms-2" title="Edit"></i>
                      </Link>
                    </h5>
                  </div>

                  <div className="mt-4 personal_details">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-6">
                          <label htmlFor="">Personal</label>
                          <p className="text-capitalize">
                            {userData.gender && userData.maritial_status
                              ? `${userData.gender}, ${userData.maritial_status}`
                              : userData.gender
                                ? `${userData.gender}`
                                : userData.maritial_status
                                  ? `${userData.maritial_status}`
                                  : <span className="text-muted">N/A</span>}
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-6">
                          <label htmlFor="">Date of birth</label>
                          <p className="text-capitalize">
                            {userData.dob ? (
                              <span>{userData.dob}</span>
                            ) : (
                              <span className="text-muted">N/A</span>
                            )}
                          </p>
                        </div>                     
                        <div className="col-lg-4 col-md-6 col-6">
                          <label htmlFor="">Religion</label>
                          <p className="text-capitalize">
                            {userData.religion ? (
                              <span>{userData.religion}</span>
                            ) : (
                              <span className="text-muted">N/A</span>
                            )}
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-6">
                          <label htmlFor="">Address</label>
                          <p className="text-capitalize">
                            {userData.permanent_address ? (
                              <span>{userData.permanent_address}</span>
                            ) : (
                              <span className="text-muted">N/A</span>
                            )}
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-6">
                          <label htmlFor="">Zipcode</label>
                          <p className="text-capitalize">
                            {userData.pincode ? (
                              <span>{userData.pincode}</span>
                            ) : (
                              <span className="text-muted">N/A</span>
                            )}
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-6">
                          <label htmlFor="">City</label>
                          <p className="text-capitalize">
                            {userData.city ? (
                              <span>{userData.city}</span>
                            ) : (
                              <span className="text-muted">N/A</span>
                            )}
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-6">
                          <label htmlFor="">State</label>
                          <p>
                            {userData.state ? (
                              <span>{userData.state}</span>
                            ) : (
                              <span className="text-muted">N/A</span>
                            )}
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-6">
                          <label htmlFor="">Country</label>
                          <p>
                            {userData.country_name ? (
                              <span>{userData.country_name}</span>
                            ) : (
                              <span className="text-muted">N/A</span>
                            )}
                          </p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade"
                id="deleteLanguageModal"
                tabIndex="-1"
                aria-labelledby="deleteLanguageLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="deleteLanguageLabel">
                        Delete language
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Are you sure you want to delete?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteLanguageRow()}
                        data-bs-dismiss="modal"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal details Modal */}

              <div
                className="modal PersonalDetailModal"
                id="PersonalDetailModal"
                tabIndex="-1"
                aria-labelledby="PersonalDetailModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content p-3 p-sm-4">
                    <div className="modal-header border-0 pb-0">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body ">
                      <div>
                        <h1
                          className="modal-title fs-5 m-0"
                          id="PersonalDetailModalLabel"
                        >
                          Personal details
                        </h1>
                        <h6 className="text-muted">
                          This informations help recuiter to know you better
                        </h6>
                      </div>
                      <form action="" className="">
                        <div className="mt-4 mb-4">
                          <label htmlFor="">Gender</label>
                          <select
                            className="form-select"
                            value={userData.gender || ""}
                            onChange={(e) => {
                               const selectedGender = e.target.value;
                               console.log("Selected Gender:", selectedGender);
                              setUserData({
                                ...userData,
                                gender: e.target.value,
                              })
                            }
                            }
                          >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="">Maritial Status</label>
                          <select
                            className="form-select"
                            value={userData.maritial_status || ""}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                maritial_status: e.target.value,
                              })
                            }
                          >
                            <option value="">Select status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Widowed">Widowed</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Seperated">Seperated</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="">Date of birth</label>
                          <div className="row flex-column flex-md-row align-items-center">
                            <div className="col-md-12 col-12 mb-2">
                              <input
                                type="date"
                                className="form-control"
                                placeholder="Enter Date of Birth"
                                value={userData.dob ?? ""}
                                onChange={(e) =>
                                  setUserData({
                                    ...userData,
                                    dob: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="">Religion</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your religion"
                            value={userData.religion}
                            onChange={(e) => {
                              const input = e.target.value;
                              if (/^[a-zA-Z\s]*$/.test(input)) {
                                setUserData({ ...userData, religion: input });
                              }
                            }}
                            />
                          {/* <select
                            className="form-select"
                            value={userData.category || ""}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                category: e.target.value,
                              })
                            }
                            defaultValue="Other"
                          >
                            <option value="General">General</option>
                            <option value="SC">SC</option>
                            <option value="ST">ST</option>
                            <option value="OBC">OBC</option>
                            <option value="Other">Other</option>
                          </select> */}
                        </div>

                        <div className="abled_section">
                          <div className="mb-4">
                            <label htmlFor="">Are you differently abled?</label>
                            <div className="d-flex mt-2">
                              <div className="form-check me-4">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="AbledYesNo"
                                  id="AbledYes"
                                  value="Yes"
                                  checked={userData.differently_abled === "Yes"}
                                  onChange={handleDifferentlyAbledChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="AbledYes"
                                >
                                  Yes
                                </label>
                              </div>
                              <div className="form-check locationRadio">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="AbledYesNo"
                                  id="AbledNo"
                                  value="No"
                                  checked={userData.differently_abled === "No"}
                                  onChange={handleDifferentlyAbledChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="AbledNo"
                                >
                                  No
                                </label>
                              </div>
                            </div>
                          </div>

                          {isDifferentlyAbled === "Yes" && (
                            <>
                              <div className="mb-4 abled_type">
                                <label htmlFor="">Type</label>
                                <select
                                  className="form-select"
                                  value={userData.differently_abled_type || ""}
                                  onChange={handleAbledTypeChange}
                                >
                                  <option value="Blindness">Blindness</option>
                                  <option value="Low Vision">Low Vision</option>
                                  <option value="Hearing Impairment">
                                    Hearing Impairment
                                  </option>
                                  <option value="Speech and Language Disability">
                                    Speech and Language Disability
                                  </option>
                                  <option value="Dwarfism">Dwarfism</option>
                                  <option value="Acid Attack Victim">
                                    Acid Attack Victim
                                  </option>
                                  <option value="Mental Illness">
                                    Mental Illness
                                  </option>
                                  <option value="Multiple Disabilities">
                                    Multiple Disabilities
                                  </option>
                                  <option value="Others">Others</option>
                                </select>
                              </div>

                              {abledType === "Others" && (
                                <div className="mb-4 describe_abled">
                                  <label htmlFor="">Describe</label>
                                  <textarea
                                    name="differently_abled_condition"
                                    id="describe_abled"
                                    value={
                                      userData.differently_abled_condition || ""
                                    }
                                    placeholder="Specify about your differently abled condition"
                                    className="form-control"
                                    onChange={(e) =>
                                      setUserData((prevData) => ({
                                        ...prevData,
                                        differently_abled_condition:
                                          e.target.value,
                                      }))
                                    }
                                  ></textarea>
                                </div>
                              )}

                              <div className="mb-4 assistance">
                                <label htmlFor="">
                                  Do you need assistance at your workplace?
                                </label>
                                <textarea
                                  name="workplace_assistance"
                                  id="workplace_assistance"
                                  rows={3}
                                  value={userData.workplace_assistance || ""}
                                  placeholder="Type here (ex: wheelchair)"
                                  className="form-control"
                                  onChange={(e) =>
                                    setUserData((prevData) => ({
                                      ...prevData,
                                      workplace_assistance: e.target.value,
                                    }))
                                  }
                                ></textarea>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="mb-4">
                          <label htmlFor="">Permanent Address</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your permanent address"
                            value={userData.permanent_address}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                permanent_address: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="">Hometown</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your hometown"
                            value={userData.hometown}
                            // onChange={(e) =>
                            //   setUserData({
                            //     ...userData,
                            //     hometown: e.target.value,
                            //   })
                            // }
                            onChange={(e) => {
                              const input = e.target.value;
                              if (/^[a-zA-Z\s]*$/.test(input)) {
                                setUserData({ ...userData, hometown: input });
                              }
                            }}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="">Pincode</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your pincode"
                            value={userData.pincode}
                            // onChange={(e) =>
                            //   setUserData({
                            //     ...userData,
                            //     pincode: e.target.value,
                            //   })
                            // }
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*$/.test(value)) {
                                setUserData({ ...userData, pincode: value });
                              }
                            }}
                            maxLength={6}
                          />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="">City</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your city"
                            value={userData.city}
                            // onChange={(e) =>
                            //   setUserData({ ...userData, city: e.target.value })
                            // }
                            onChange={(e) => {
                              const input = e.target.value;
                              if (/^[a-zA-Z\s]*$/.test(input)) {
                                setUserData({ ...userData, city: input });
                              }
                            }}
                          />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="">State</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your state"
                            value={userData.state}
                            // onChange={(e) =>
                            //   setUserData({
                            //     ...userData,
                            //     state: e.target.value,
                            //   })
                            // }
                            onChange={(e) => {
                              const input = e.target.value;
                              if (/^[a-zA-Z\s]*$/.test(input)) {
                                setUserData({ ...userData, state: input });
                              }
                            }}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="">Country</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your state"
                            value={userData.country_name}
                            onChange={(e) => {
                              const input = e.target.value;
                              if (/^[a-zA-Z\s]*$/.test(input)) {
                                setUserData({ ...userData, country_name: input });
                              }
                            }}
                          />
                        </div>

                        <div className="card mt-4 shadow border-0 rounded-3">
                          <div className="card-body">
                            <div className="language_section mb-4">
                              <label htmlFor="">Language Proficiency</label>

                              {languages.map((row, index) => (
                                <div className="row mt-3" key={index}>
                                  <div className="col-md-6 mb-2 mb-md-0">
                                    <label htmlFor="">Language</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter language"
                                      value={row.language}
                                      onChange={(e) =>
                                        handleLanguageChange(
                                          index,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="col-md-6 mb-2 mb-md-0">
                                    <label htmlFor="">Proficiency</label>
                                    <select
                                      className="form-select"
                                      value={row.proficiency}
                                      onChange={(e) =>
                                        handleProficiencyChange(
                                          index,
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="Beginner">Beginner</option>
                                      <option value="Proficient">
                                        Proficient
                                      </option>
                                      <option value="Expert">Expert</option>
                                    </select>
                                  </div>
                                  <div className="d-flex mt-1 fw-semibold justify-content-end text-theme">
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        showDeleteLanguageModal(index)
                                      }
                                    >
                                      Delete
                                    </span>
                                  </div>
                                </div>
                              ))}

                              <p
                                className="mt-2 fw-semibold"
                                style={{ cursor: "pointer", color: "green" }}
                                onClick={addLanguageRow}
                              >
                                Add another language
                              </p>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer border-0">
                      <button
                        type="button"
                        className="btn btn-secondary rounded-pill"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary rounded-pill"
                        onClick={savePersonalDetail}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certification Section */}
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="text-theme">Certification</h5>
                    <Link
                      className="text-theme"
                      data-bs-toggle="modal"
                      data-bs-target="#certificateModal"
                      onClick={resetCertificateForm}
                    >
                      Add
                    </Link>
                  </div>

                  <div className="mt-4 certification_details">
                    {certificates.length > 0 ? (
                      certificates.map((certificate, index) => (
                        <div key={index} className="mb-3">
                          <div className="d-flex align-items-baseline">
                            <h6 className="m-0">
                              {certificate.certification_name}
                              <Link
                                data-bs-toggle="modal"
                                data-bs-target={`#showCertificateModal-${certificate.id}`}
                                onClick={() =>
                                  openCertificateModal(certificate)
                                }
                              >
                                <i className="fa-solid fa-pencil ms-2" title="Edit"></i>
                              </Link>
                            </h6>
                          </div>
                          <p className="m-0 text-theme">
                            {certificate.certification_url}
                          </p>
                          <p className="m-0">
                            {certificate.expire_on ? (
                              <small>Expire On - {certificate.expire_on}</small>
                            ) : (
                              <small>Validity - Lifetime</small>
                            )}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted m-0">No certifications added yet</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Add Certificate Modal */}
              <div
                className="modal certificateModal"
                id="certificateModal"
                tabIndex="-1"
                aria-labelledby="certificateModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content p-3 p-sm-4">
                    <div className="modal-header border-0 pb-0">
                      <h1 className="modal-title fs-5">Add Certificate</h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <h6 className="text-muted">
                        Add details of Certifications you have
                        achieved/completed
                      </h6>
                      <form>
                        {/* <div className="text-end">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={resetCertificateForm}
                          >
                            Reset
                          </button>
                        </div> */}
                        <div className="mt-4 mb-4">
                          <label htmlFor="certification_name">
                            Certification Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your certification name"
                            name="certification_name"
                            value={selectedCertificate.certification_name}
                            onChange={handleCertificateChange}
                          />
                        </div>
                        <div className="mt-4 mb-4">
                          <label htmlFor="certification_url">Certification URL</label>
                          <input
                            type="text"
                            className={`form-control ${urlError ? 'is-invalid' : ''}`}
                            placeholder="Enter the certification URL"
                            name="certification_url"
                            value={selectedCertificate.certification_url}
                            onChange={handleCertificateChange}  // Handles the change for any input
                            onBlur={() => validateCerUrl(selectedCertificate.certification_url)}  // Validates when input is blurred (when user finishes typing)
                          />
                          {urlError && <small className="text-danger">{urlError}</small>}  {/* Show URL validation error */}
                        </div>
                        <div className="mb-4">
                          <div className="row align-items-center">
                            <div className="col">
                              <div className="row">
                                <div className="col-lg-12 mb-2">
                                  <label htmlFor="certification_validity">
                                    Certification validity
                                  </label>
                                  <input
                                    type="text"
                                    list="certification_validity"
                                    className="form-control"
                                    placeholder="Enter Validity e.g: 5 years"
                                    name="certification_validity"
                                    value={
                                      selectedCertificate.certification_validity
                                    }
                                    onChange={handleCertificateChange}
                                    disabled={
                                      selectedCertificate.lifetime_validity
                                    }
                                  />
                                  <datalist id="certification_validity">
                                    <option value="6 months">6 months</option>
                                    <option value="1 year">1 year</option>
                                    <option value="2 years">2 years</option>
                                    <option value="3 years">3 years</option>
                                    <option value="5 years">5 years</option>
                                    <option value="Lifetime">Lifetime</option>
                                  </datalist>
                                </div>
                              </div>
                            </div>
                            {selectedCertificate.certification_validity !==
                              "Lifetime" && (
                                <div className="col">
                                  <div className="row">
                                    <div className="col-lg-12 mb-2">
                                      <label htmlFor="expire_on">
                                        Expired Date
                                      </label>
                                      <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Enter Expired Date"
                                        name="expire_on"
                                        value={selectedCertificate.expire_on}
                                        onChange={handleCertificateChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="d-flex align-items-center text-muted">
                            <input
                              type="checkbox"
                              name="lifetime_validity"
                              checked={selectedCertificate.lifetime_validity}
                              onChange={handleCertificateChange}
                            />
                            <span className="ms-2">
                              This certificate does not expire
                            </span>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer border-0">
                      <button
                        type="button"
                        className="btn btn-secondary rounded-pill"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary rounded-pill"
                        onClick={() => saveCertificate()}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id="deleteCertificate"
                tabIndex="-1"
                aria-labelledby="deleteCertificateLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="deleteCertificateLabel">
                        Delete Certificate
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Are you sure you want to delete Certificate?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          confirmCertificateDelete(selectedCertificate.id)
                        }
                        data-bs-dismiss="modal"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modals for Editing Certificates */}
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="modal fade"
                  id={`showCertificateModal-${certificate.id}`}
                  tabIndex="-1"
                  aria-labelledby={`showCertificateModal-${certificate.id}-Label`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content p-3 p-sm-4">
                      <div className="modal-header border-0 pb-0">
                        <h1
                          className="modal-title fs-5"
                          id={`showCertificateModal-${certificate.id}-Label`}
                        >
                          Edit Certification
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="d-flex justify-content-between">
                          <h6 className="text-muted">
                            Edit details of Certifications you have
                            achieved/completed
                          </h6>
                          {certificate.id && (
                            <Link
                              className="text-theme"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteCertificate"
                              onClick={() =>
                                setSelectedCertificate(certificate)
                              }
                            >
                              Delete
                            </Link>
                          )}
                        </div>
                        <form>
                          <div className="mt-4 mb-4">
                            <label htmlFor="certification_name">
                              Certification Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your certification name"
                              name="certification_name"
                              value={selectedCertificate.certification_name}
                              onChange={handleCertificateChange}
                            />
                          </div>
                          <div className="mt-4 mb-4">
                            <label htmlFor="certification_url">Certification URL</label>
                            <input
                              type="text"
                              className={`form-control ${urlError ? 'is-invalid' : ''}`}
                              placeholder="Enter the certification URL"
                              name="certification_url"
                              value={selectedCertificate.certification_url}
                              onChange={handleCertificateChange}  // Handles the change for any input
                              onBlur={() => validateCerUrl(selectedCertificate.certification_url)}  // Validates when input is blurred (when user finishes typing)
                            />
                            {urlError && <small className="text-danger">{urlError}</small>}  {/* Show URL validation error */}
                          </div>
                          <div className="mb-4">
                            <div className="row align-items-center">
                              <div className="col">
                                <div className="row">
                                  <div className="col-lg-12 mb-2">
                                    <label htmlFor="certification_validity">
                                      Certification validity
                                    </label>
                                    <input
                                      type="text"
                                      list="certification_validity"
                                      className="form-control"
                                      placeholder="Enter Validity e.g: 5 years"
                                      name="certification_validity"
                                      value={
                                        selectedCertificate.certification_validity
                                      }
                                      onChange={handleCertificateChange}
                                      disabled={
                                        selectedCertificate.lifetime_validity
                                      }
                                    />
                                    <datalist id="certification_validity">
                                      <option value="6 months">6 months</option>
                                      <option value="1 year">1 year</option>
                                      <option value="2 years">2 years</option>
                                      <option value="3 years">3 years</option>
                                      <option value="5 years">5 years</option>
                                      <option value="Lifetime">Lifetime</option>
                                    </datalist>
                                  </div>
                                </div>
                              </div>
                              {!selectedCertificate.lifetime_validity &&
                                selectedCertificate.certification_validity !==
                                "Lifetime" && (
                                  <div className="col">
                                    <div className="row">
                                      <div className="col-lg-12 mb-2">
                                        <label htmlFor="expire_on">
                                          Expired Date
                                        </label>
                                        <input
                                          type="date"
                                          className="form-control"
                                          placeholder="Enter Expire Date"
                                          name="expire_on"
                                          value={selectedCertificate.expire_on}
                                          onChange={handleCertificateChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="d-flex align-items-center text-muted">
                              <input
                                type="checkbox"
                                name="lifetime_validity"
                                checked={
                                  selectedCertificate.certification_validity ===
                                  "Lifetime"
                                }
                                onChange={handleCertificateChange}
                              />
                              <span className="ms-2">
                                This certificate does not expire
                              </span>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer border-0">
                        <button
                          type="button"
                          className="btn btn-secondary rounded-pill"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill"
                          onClick={() =>
                            saveCertificate(selectedCertificate.id)
                          }
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Footer />

      {/* Resume Modal  */}
      <div className="modal fade" id="resumeModal" tabIndex="-1" aria-labelledby="resumeModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header ">
                <h1 className="modal-title fs-4" id="resumeModalLabel">Resume</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body pt-3 pb-3 p-4 px-md-5" ref={resumeRef}>
                <div className="card candidate_resume">
                    <div className="card-body ">
                        <div className="d-flex flex-wrap align-items-center border-bottom">
                          <div className="resume_profile_image me-3"><img src={profileImage} style={{borderRadius:"50%", height:"80px", width:"80px"}} alt="profile_image" /></div>
                            <div className="user_details py-3">
                              <h5 className="mb-1 text-uppercase">{user.name}</h5>
                              {/* <h6 className="m-0">Front End Developer</h6> */}
                              <div className="d-flex flex-wrap align-items-baseline contact_details">
                                  <div className="d-flex align-items-baseline text-muted border-end me-3 pe-2">
                                      <i className="fa-solid fa-envelope me-2"></i>
                                      <span className="email" >{user.email}</span>
                                  </div>
                                  <div className="d-flex align-items-baseline text-muted">
                                      <i className="fa-solid fa-phone me-2"></i>
                                      <span>{user.phone}</span>
                                  </div>
                              </div>
                            </div>
                        </div>
                        
                        <div className="border-bottom details">
                          <h6 className="text-uppercase fw-semibold">Objective</h6>        
                          <p className="m-0">{userData.bio ? userData.bio : (<span className="text-muted">No details added yet!</span>)}</p>
                        </div> 

                        <div className="border-bottom details">
                            <h6 className="text-uppercase fw-semibold">Personal Details</h6>        
                            <div className="row">
                                <div className="col-sm-4 col-6"><span className="text-uppercase">Gender </span></div>
                                <div className="col-sm-8  col-6 text-capitalize"><span className="me-2">:</span>
                                  {userData.gender ? (
                                    <span>{userData.gender}</span>
                                  ) : (
                                    <span className="text-muted">N/A</span>
                                  )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4 col-6"><span className="text-uppercase">Date of birth </span></div>
                                <div className="col-sm-8  col-6 text-capitalize"><span className="me-2">:</span>
                                    {userData.dob ? (
                                      <span>{userData.dob}</span>
                                    ) : (
                                      <span className="text-muted">N/A</span>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4 col-6"><span className="text-uppercase">Maritial status </span></div>
                                <div className="col-sm-8  col-6 text-capitalize"><span className="me-2">:</span>
                                  {userData.maritial_status ? (
                                      <span>{userData.maritial_status}</span>
                                    ) : (
                                      <span className="text-muted">N/A</span>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4 col-6"><span className="text-uppercase">Address </span></div>
                                <div className="col-sm-8  col-6 text-capitalize"><span className="me-2">:</span>
                                {userData.permanent_address ? (
                                    <span>{userData.permanent_address}</span>
                                  ) : (
                                    <span className="text-muted">N/A</span>
                                  )}
                                </div>
                            </div>

                            {/* <div className="row">
                                <div className="col-sm-4 col-6"><span className="text-uppercase">Religion </span></div>
                                <div className="col-sm-8  col-6"><span>: &nbsp; Christian</span></div>
                            </div> */}

                            <div className="row">
                                <div className="col-sm-4 col-6"><span className="text-uppercase">Zipcode </span></div>
                                <div className="col-sm-8  col-6"><span className="me-2">:</span>{userData.pincode ? (
                              <span>{userData.pincode}</span>
                            ) : (
                              <span className="text-muted">N/A</span>
                            )}</div>
                            </div>
                        </div> 

                        <div className="border-bottom details">
                            <h6 className="text-uppercase fw-semibold">Educational Details</h6>        
                            
                            {education.length > 0 ? (
                              education.map((edu, index) => {
                                const educationLabel =
                                  edu.education === "4"
                                    ? "12th"
                                    : edu.education === "5"
                                      ? "10th"
                                      : edu.education;

                                return (
                                  // <div key={index} className="mt-4 employment_details">
                                  //   <div className="mb-3">
                                  //     <div className="d-flex align-items-baseline education_section">
                                  //       <h6 style={{ fontWeight: "500" }} className="m-0 text-capitalize">
                                  //         {edu.specialization
                                  //           ? `${edu.course} - ${edu.specialization}`
                                  //           : (`${edu.course || educationLabel} | ${edu.school_medium}`)}
                                  //       </h6>
                                        
                                  //     </div>
                                  //     <h6 className="m-0 text-capitalize">
                                  //       {edu.course && edu.course_type
                                  //         ? ` ${edu.course_type}`
                                  //         : edu.specialization
                                  //           ? `${edu.specialization} ${edu.passing_year}`
                                  //           : ""}
                                  //     </h6>

                                  //     <p className="m-0">
                                  //       <small className="text-capitalize">
                                  //         {edu.education === "4" || edu.education === "5"
                                  //           ? `${edu.board} - ${edu.passing_year}`
                                  //           : `${edu.course_starting_year} - ${edu.course_ending_year} `}
                                  //       </small>
                                  //     </p>
                                  //   </div>
                                  // </div>

                                    <div key={index} className="row mb-2">
                                        <div className="col-sm-4 col-6">
                                          <span className="text-uppercase">
                                          {edu.specialization
                                            ? `${edu.course}`
                                            : (`${edu.course || educationLabel} `)}
                                            </span>
                                        </div>
                                        <div className="col-sm-8  col-6 d-flex align-items-baseline">
                                          <span className="me-2">:</span>
                                          <div>
                                              <h6 className="mb-0 text-capitalize"> 
                                              {edu.school_medium}
                                              {edu.course && edu.course_type && edu.specialization
                                              ? `${edu.specialization} | ${edu.course_type}`
                                              : edu.specialization
                                                ? `${edu.specialization} ${edu.passing_year}`
                                                : ""}
                                            </h6>
                                            <p className="mb-0 text-capitalize"> 
                                              {edu.education === "4" || edu.education === "5"
                                                ? `${edu.board} - ${edu.passing_year}`
                                                : `${edu.course_starting_year} - ${edu.course_ending_year} `}
                                            </p>
                                          </div>
                                            {/* <p className="mb-0">BCA | 2020</p> */}
                                        </div>
                                    </div>
                                );
                              })
                            ) : (
                              <p className="m-0 text-muted">No educational details filled yet.</p>
                            )}   
                        </div> 

                        <div className="border-bottom details">
                            <h6 className="text-uppercase fw-semibold">Employment Details</h6>        
                            {employment && employment.length > 0 ? (
                            employment.map((employ) => (
                              // <div className="mb-3" key={employ.id}>
                              //   <div className="d-flex align-items-baseline">
                              //     <h6 style={{ fontWeight: "500" }} className="hh text-capitalize m-0">{employ.current_job_title}</h6>
                              //   </div>
                              //   <h6 style={{ fontWeight: "400" }} className="text-capitalize m-0">{employ.current_company_name}</h6>

                              //   <p className="m-0">
                              //     <small>
                              //       <span>
                              //         {employ.employment_type} | {employ.joining_date} to{" "}
                              //         {employ.worked_till || "Present"}
                              //       </span>
                              //     </small>
                              //   </p>
                              // </div>

                              <div className="row mb-2" key={employ.id}>
                                <div className="col-sm-4 col-6"><span className="text-uppercase">{employ.current_company_name}</span></div>
                                <div className="col-sm-8  col-6 d-flex align-items-baseline">
                                  <span className="me-2">:</span>
                                    <div>
                                      <h6 className="mb-0 text-capitalize">{employ.current_job_title}</h6>
                                      <p className="mb-0 text-capitalize">
                                        <span>
                                        {employ.employment_type} | {employ.joining_date}&nbsp;to&nbsp;
                                        {employ.worked_till || "Present"}
                                      </span>
                                      </p>
                                    </div>
                                </div>
                            </div>

                              ))
                            ) : (
                              <p className="text-muted">No employment details filled yet.</p>
                            )}
                        </div>
                         <div className="border-bottom details">
                            <h6 className="text-uppercase fw-semibold">Skills</h6>
                             {userData.skills && userData.skills.length > 0 ? (
                                <div className="row mb-2" >
                                  <div className="col-sm-4 col-6"><span className="text-uppercase">Key Skills</span>
                                  </div>
                                  <div className="col-sm-8  col-6 d-flex align-items-baseline">
                                    <span className="me-2">:</span>
                                        <p className="mb-0">
                                      {userData.skills.split(",").map((skill, index) => (
                                          <span key={index}>{skill.trim()}, &nbsp;</span>
                                        ))}
                                        </p>
                                  </div>
                              </div>
                    ) : (
                      <p className="m-0 text-muted">No skills added yet</p>
                    )}

                            
                        </div>

                        <div className="py-3 details">
                            <h6 className="text-uppercase fw-semibold">Certificates</h6> 
                            {certificates.length > 0 ? (
                              certificates.map((certificate, index) => (
                                  <div key={index} className="row mb-2">
                                      <div className="col-sm-4 col-6"><span className="text-uppercase">{certificate.certification_name}</span></div>
                                      <div className="col-sm-8  col-6 d-flex align-items-baseline">
                                        <span className="me-2">:</span>
                                        <div>
                                          <p className="mb-0 text-theme"> {certificate.certification_url}</p>
                                          <p className="mb-0 "> {certificate.expire_on ? (
                                            <small>Expire On - {certificate.expire_on}</small>
                                            ) : (
                                              <small>Validity - Lifetime</small>
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                  </div>
                              ))
                            ) : (
                              <p className="text-muted m-0">No certifications added yet</p>
                            )}       
                        </div>  

                    </div>
                </div>
            </div>
            <div className="modal-footer border-0">
                {/* <button onClick={handleDownload} className="btn btn-primary">
                  <i className="fa fa-download me-2"></i> Download Resume
                </button> */}
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>

               

          </div>
      </div>
      </div>     

      {isSaving && (
        <div className="modal show fade" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-4" id="">Processing...</h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsSaving(false)} // Close handler
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center p-3">
                <div className="spinner-border text-primary" role="status" />
                <p>Saving your details...</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
   
    </>
   );
};

export default MyAccount;