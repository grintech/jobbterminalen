import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useAuthContext } from "../../store/authContext";
import Footer from "../../components/Footer";
import JobSidebar from "./JobSidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const MyAccount = () => {
  const { user } = useAuthContext();
  const userId = user ? user.id : null;
  const [userData, setUserData] = useState({});
  const [profileImage, setProfileImage] = useState("/images/blank_user.png");
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resume, setResume] = useState(null);
  const [resumeError, setResumeError] = useState('');
  const [skills, setSkills] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [education, setEducation] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [socialProfiles, setSocialProfiles] = useState([]);
  const [selectedSocialProfile, setSelectedSocialProfile] = useState({});

  const [isCurrentEmployment, setIsCurrentEmployment] = useState(true); 
  const [isDifferentlyAbled, setIsDifferentlyAbled] = useState(userData.differently_abled || null);
  const [abledType, setAbledType] = useState(userData.differently_abled_type || "");

  const [languageToDeleteIndex, setLanguageToDeleteIndex] = useState(null);

  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState({
    certification_name: '',
    certification_url: '',
    certification_validity: '',
    expire_on: '',
    lifetime_validity: false,
  });

  const handleRadioEmpChange = (event) => {
    const value = event.target.value;
    setIsCurrentEmployment(value === 'yes');
    setEmployment((prevData) => ({
      ...prevData,
      current_employment: value,
    }));
  };

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
  
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/rtf',
    ];
    const maxSize = 2 * 1024 * 1024; // 2 MB in bytes
  
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setResumeError('Invalid file type. Supported formats are PDF, DOC, DOCX, and RTF.');
        return;
      }
  
      if (file.size > maxSize) {
        setResumeError('File size exceeds 2 MB.');
        return;
      }
  
      setResumeError('');
      const fileName = file.name;
      setResume({ file, fileName });
  
      // Create form data
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("resume", file);
  
      try {
        const response = await axios.post(`${API_URL}/upload-resume.php`, formData, {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "multipart/form-data",
          },
        });
  
        if (response.data.type === "success") {
          toast.success("Resume uploaded successfully!");
          var resumeLink = response.data.resume.split('/').pop();
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
      }
    }
  };
  
  const handleResumeDownload = async () => {
    if (!userId) {
      toast.error("User ID not available.");
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/view-resume.php?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.data.data && response.data.data.length > 0) {
        const resumeData = response.data.data[0];

        // console.log("Resume File:", resumeData.resume);
        const url = `${IMG_URL}/${resumeData.resume}`;
        const fileName = resumeData.resume.split('/').pop();
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.target = '_blank';
        link.click();
      } else {
        console.log("No resume found for the user.");
      }
  
    } catch (error) {
      console.error("Error while fetching resume:", error);
      toast.error("Failed to get response. Please try again.");
    }
  };
  
    const handleRemoveResume = () => {
      const removeResumeModal = new bootstrap.Modal(document.getElementById("removeResumeModal"));
      removeResumeModal.show();
    };
    
    const confirmRemoveResume = async () => {
      if (!userId) return;
    
      try {
        const response = await axios.delete(`${API_URL}/remove-resume.php?user_id=${userId}`, {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        });
    
        if (response.data.type === "success") {
          toast.success("Resume removed successfully!");
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
      }
    };
  

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const SITE_URL = import.meta.env.VITE_SITE_URL;

  useEffect(() => {
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
        const response = await axios.get(`${API_URL}/job-seeker-details.php?user_id=${userId}`, {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.data.type === "success") {
          const userDetails = response.data.data;
  
          // Add the provided code snippet here
          if (userDetails.total_experience && userDetails.total_experience.includes(" - ")) {
            const experienceParts = userDetails.total_experience.split(" - ");
            const monthsPart = experienceParts[1] ? experienceParts[1].split(" ")[0] : null;
  
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
            const languageArray = userDetails.language.split(",").map((lang, index) => ({
              language: lang.trim(),
              proficiency: userDetails.language_proficiency.split(",")[index].trim(),
            }));
            setLanguages(languageArray);
          }
  
          setUserData(userDetails);
  
          if (userDetails.image) {
            setProfileImage(`${IMG_URL}/${userDetails.image}`);
          }
  
          if (userDetails.skills) {
            setSkills(userDetails.skills.split(',').map(skill => skill.trim()));
          }
        } else {
          console.error("Failed to fetch user data:", response.data.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
      }
    };
  
    fetchUserData();
  }, [userId]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // Allowed file types
    const allowedExtensions = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    
    if (!allowedExtensions.includes(file.type)) {
      toast.error("Invalid file type. Only JPG, PNG, WEBP, and GIF are allowed.");
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
  
      const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
      document.getElementById("ajaxModalMessage").textContent = "Uploading profile image...";
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
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Error uploading profile image.");
    } finally {
      setUploading(false); // Stop Uploading
  
      const ajaxModal = bootstrap.Modal.getInstance(document.getElementById("ajaxModal"));
      ajaxModal.hide();
    }
  };  
  

  const handleRemoveImage = async () => {
    if (!selectedImageId) return;
    // console.log("Image ID:", selectedImageId);

    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent = "Removing profile image...";
    ajaxModal.show();

    try {
      const response = await axios.delete(`${API_URL}/profile-remove.php?id=${selectedImageId}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.type === "success") {
        toast.success("Profile image removed successfully!");
        setProfileImage("/images/blank_user.png");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error removing profile image:", error);
      toast.error("Error removing profile image.");
    } finally {
      ajaxModal.hide();
    }
  };

  
  const fetchSkillSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setLoadingSuggestions(true);
    try {
      const response = await axios.get(`${API_URL}/fetch-skills.php?skill=${query}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
        },
      });

      if (response.data.type === "success") {
        setSuggestions(response.data.skills);
      } else {
        console.error("Failed to fetch skill suggestions:", response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching skill suggestions:", error.response ? error.response.data : error.message);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setInput(''); // Clear input after adding skill
      setSuggestions([]); // Clear suggestions after adding skill
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
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
        setUserData((prevData) => ({
          ...prevData,
          skills: skills.join(", "),
        }));
        const skillModal = bootstrap.Modal.getInstance(document.getElementById("skillModal"));
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
    const totalExperience = userData.total_experience_years && userData.total_experience_months 
    ? userData.total_experience_years + " - " + userData.total_experience_months 
    : userData.total_experience_years
    ? userData.total_experience_years
    : userData.total_experience_months
    ? userData.total_experience_months
    : "";
  
    // Show ajaxModal with dynamic message
    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent = "Saving your details...";
    ajaxModal.show();

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
        }));

        const editProfileModal = bootstrap.Modal.getInstance(document.getElementById("editProfileModal"));
        editProfileModal.hide();

      } else {
        toast.error(response.data.message || "Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      ajaxModal.hide();
    }
  };


  const fetchEmployment = async (userId) => {

    try {
      const response = await axios.get(`${API_URL}/employment-details.php?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
        },
      });

      if (response.data.type === "success") {

        const employmentDetails = response.data.data;

        // console.log("Employment Details:", employmentDetails);

        if (employmentDetails.employment_type === '1') {
          employmentDetails.employment_type = 'Full Time';
        } else if (employmentDetails.employment_type === '2') { 
          employmentDetails.employment_type = 'Part Time';
        } else if (employmentDetails.employment_type === '3') {
          employmentDetails.employment_type = 'Fixed';
        } else if (employmentDetails.employment_type === '4') {
          employmentDetails.employment_type = 'Hourly';
        }

        if (employmentDetails.total_experience && employmentDetails.total_experience.includes(" - ")) {
          const experienceParts = employmentDetails.total_experience.split(" - ");
          const monthsPart = experienceParts[1] ? experienceParts[1].split(" ")[0] : null;

          employmentDetails.total_experience_months = monthsPart
            ? `${monthsPart} Month${parseInt(monthsPart, 10) > 1 ? "s" : ""}`
            : "";
        } else {
          employmentDetails.total_experience_months = "";
        }

        if (employmentDetails.total_experience) {
          const yearsPart = employmentDetails.total_experience.split(" ")[0];

          employmentDetails.total_experience_years = yearsPart
            ? `${yearsPart} Year${parseInt(yearsPart, 10) > 1 ? "s" : ""}`
            : "";
        } else {
          employmentDetails.total_experience_years = "";
        }

        setEmployment(employmentDetails);
      } else {
        console.error("Failed to fetch seeker employment:", response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching seeker employment:", error.response ? error.response.data : error.message);
    }
  };


  const saveEmploymentData = async () => {
    // Calculate total experience
    const totalExperience = employment.total_experience_years && employment.total_experience_months 
      ? employment.total_experience_years + " - " + employment.total_experience_months 
      : employment.total_experience_years
      ? employment.total_experience_years
      : employment.total_experience_months
      ? employment.total_experience_months
      : "";
  
    // Show ajaxModal with dynamic message
    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent = "Saving your details...";
    ajaxModal.show();
  
    try {
      const response = await axios.put(
        `${API_URL}/employment-details-save.php?user_id=${userId}`,
        {
          current_employment: employment.current_employment,
          employment_type: employment.employment_type,
          total_experience: totalExperience,
          current_company_name: employment.current_company_name,
          current_job_title: employment.current_job_title,
          joining_date: employment.joining_date,
          worked_till: employment.worked_till,
          current_salary: employment.current_salary,
          job_profile: employment.job_profile,
          notice_period: employment.notice_period,
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
        setEmployment((prevData) => ({
          ...prevData,
          current_employment: employment.current_employment,
          employment_type: employment.employment_type,
          total_experience: totalExperience,
          current_company_name: employment.current_company_name,
          current_job_title: employment.current_job_title,
          joining_date: employment.joining_date,
          worked_till: employment.worked_till,
          current_salary: employment.current_salary,
          job_profile: employment.job_profile,
          notice_period: employment.notice_period,
        }));
  
        const employModal = bootstrap.Modal.getInstance(document.getElementById("employModal"));
        employModal.hide();
  
        // Fetch updated employment data
        fetchEmployment(userId);
      } else {
        toast.error(response.data.message || "Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      ajaxModal.hide();
    }
  };

  const confirmDelete = async (Id) => {
    if (!Id) return;
  
    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent = "Deleting employment data...";
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
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting employment data:", error);
      toast.error("Error deleting employment data.");
    } finally {
      ajaxModal.hide();
    }
  };


  const fetchEducation = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/education.php?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
        },
      });
  
      if (response.data.type === "success") {
        let educationDetails = response.data.data;
  
        educationDetails = educationDetails.map((edu) => {
  
          // Extracting course duration years
          if (edu.course_duration && edu.course_duration.includes(" - ")) {
            const [startYear, endYear] = edu.course_duration.split(" - ").map(year => year.trim());
            edu.course_starting_year = startYear || "";
            edu.course_ending_year = endYear || "";
          } else {
            edu.course_starting_year = "";
            edu.course_ending_year = "";
          }
  
          return edu;
        });
  
        setEducation(educationDetails);
        console.log("Education Details:", education);
      } else {
        console.error("Failed to fetch seeker education:", response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching seeker education:", error.response?.data || error.message);
    }
  };


  const openEducationModal = (edu) => {
    setSelectedEducation(edu);
  };
  
  const saveEducationData = async () => {
    if (!selectedEducation) return;
  
    // Calculate course duration
    const combinedDuration = selectedEducation.course_starting_year && selectedEducation.course_ending_year 
      ? selectedEducation.course_starting_year + " - " + selectedEducation.course_ending_year 
      : selectedEducation.course_starting_year
      ? selectedEducation.course_starting_year
      : selectedEducation.course_ending_year
      ? selectedEducation.course_ending_year
      : "";
  
    // Show ajaxModal with dynamic message
    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent = "Saving your details...";
    ajaxModal.show();
  
    try {
      const response = await axios.put(
        `${API_URL}/education-save.php?user_id=${userId}`,
        {
          education: selectedEducation.education,
          institute: selectedEducation.institute,
          course: selectedEducation.course,
          specialization: selectedEducation.specialization,
          course_type: selectedEducation.course_type,
          course_duration: combinedDuration,
          grading_system: selectedEducation.grading_system,
          marks: selectedEducation.marks,
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
        setEducation((prevData) => prevData.map((edu) => 
          edu.id === selectedEducation.id ? { ...selectedEducation, course_duration: combinedDuration } : edu
        ));
  
        const educationModal = bootstrap.Modal.getInstance(document.getElementById("educationModal"));
        educationModal.hide();
  
        // Fetch updated education data
        fetchEducation(userId);
  
        console.log("Education Data:", response.data.data);
      } else {
        toast.error(response.data.message || "Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      ajaxModal.hide();
    }
  };
  
  
  const confirmEducationDelete = async (Id) => {
    if (!Id) return;
  
    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent = "Deleting education data...";
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
        setEducation((prevEducation) => prevEducation.filter((edu) => edu.id !== Id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting education data:", error);
      toast.error("Error deleting education data.");
    } finally {
      ajaxModal.hide();
    }
  };

  const fetchSocialProfiles = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/social-profiles.php?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
        },
      });
  
      if (response.data.type === "success") {
        let social_profile = response.data.data;
  
  
        setSocialProfiles(social_profile);
        // console.log("Social Profiles  :", socialProfiles);
      } else {
        console.error("Failed to fetch seeker social profiles:", response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching seeker social profiles:", error.response?.data || error.message);
    }
  };


  const openSocialModal = (profile) => {
    setSelectedSocialProfile(profile);
  };
  
  const saveSocialProfiles = async (Id = null) => {
    if (!selectedSocialProfile) return;
  
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
        const addSocialModal = bootstrap.Modal.getInstance(addSocialModalElement);
        if (addSocialModal) addSocialModal.hide();
      }
    }
  
    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent = "Saving your details...";
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
              profile.id === Id ? { ...profile, ...selectedSocialProfile } : profile
            );
          } else {
            return [...prevProfiles, { ...selectedSocialProfile, id: response.data.id }];
          }
        });
  
        // Clear the selectedSocialProfile state
        setSelectedSocialProfile({});
      } else {
        toast.error(response.data.message || "Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      ajaxModal.hide();
    }
  };


  const confirmSocialDelete = async (Id) => {
    if (!Id) return;
  
    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent = "Deleting social profile...";
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
        setSocialProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== Id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting social profile:", error);
      toast.error("Error deleting social profile.");
    } finally {
      ajaxModal.hide();
    }
  };

  /*------------Language-------------------*/
  const [languages, setLanguages] = useState([]);

  // Add a new row
  const addLanguageRow = () => {
    setLanguages([...languages, { language: "", proficiency: "Beginner" }]);
  };


  const showDeleteLanguageModal = (index) => {
    const PersonalDetailModal = bootstrap.Modal.getInstance(document.getElementById("PersonalDetailModal"));
    PersonalDetailModal.hide();
    setLanguageToDeleteIndex(index);
    const deleteLanguageModal = new bootstrap.Modal(document.getElementById("deleteLanguageModal"));
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
    const PersonalDetailModal = bootstrap.Modal.getInstance(document.getElementById("PersonalDetailModal"));
    if (PersonalDetailModal) {
      PersonalDetailModal.hide();
    }
  
    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent = "Saving your details...";
    ajaxModal.show();
  
    try {
      const response = await axios.put(
        `${API_URL}/personal-detail-save.php?user_id=${userId}`,
        {
          gender: userData.gender,
          maritial_status: userData.maritial_status,
          dob: userData.dob,
          category: userData.category,
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
          language: languages.map(lang => lang.language).join(", "),
          language_proficiency: languages.map(lang => lang.proficiency).join(", "),
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
      } else {
        toast.error(response.data.message || "Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      ajaxModal.hide();
    }
  };

  const fetchCertificates = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/certificates.php?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
        },
      });
  
      if (response.data.type === "success") {
        let certificates = response.data.data;
  
  
        setCertificates(certificates);
        console.log("Certificates  :", certificates);
      } else {
        console.error("Failed to fetch seeker social profiles:", response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching seeker social profiles:", error.response?.data || error.message);
    }
  };

  const openCertificateModal = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const saveCertificate = async (Id = null) => {
    if (!selectedCertificate) return;
  
    // Hide the certificate modals before showing the ajaxModal
    if (Id) {
      const showCertificateModalElement = document.getElementById(`showCertificateModal-${Id}`);
      if (showCertificateModalElement) {
        const showCertificateModal = bootstrap.Modal.getInstance(showCertificateModalElement);
        if (showCertificateModal) showCertificateModal.hide();
      }
    } else {
      const certificateModalElement = document.getElementById("certificateModal");
      if (certificateModalElement) {
        const certificateModal = bootstrap.Modal.getInstance(certificateModalElement);
        if (certificateModal) certificateModal.hide();
      }
    }
  
    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent = "Saving your details...";
    ajaxModal.show();
  
    try {
      const response = await axios.put(
        `${API_URL}/certificate-save.php${Id ? `?id=${Id}` : ""}`,
        {
          user_id: userId,
          certification_name: selectedCertificate.certification_name,
          certification_url: selectedCertificate.certification_url,
          certification_validity: selectedCertificate.certification_validity,
          expire_on: selectedCertificate.lifetime_validity ? null : selectedCertificate.expire_on,
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
              certificate.id === Id ? { ...certificate, ...selectedCertificate } : certificate
            );
          } else {
            return [...prevCertificates, { ...selectedCertificate, id: response.data.id }];
          }
        });
      } else {
        toast.error(response.data.message || "Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      ajaxModal.hide();
    }
  };

  
  const resetCertificateForm = () => {
    setSelectedCertificate({
      certification_name: '',
      certification_url: '',
      certification_validity: '',
      expire_on: '',
      lifetime_validity: false,
    });
  };


  const confirmCertificateDelete = (Id) => {
    deleteCertificate(Id);
  };
  
  const deleteCertificate = async (Id) => {
    if (!Id) return;
  
    const ajaxModal = new bootstrap.Modal(document.getElementById("ajaxModal"));
    document.getElementById("ajaxModalMessage").textContent = "Deleting certificate...";
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
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
      toast.error("Error deleting certificate.");
    } finally {
      ajaxModal.hide();
    }
  };


  
  const calculateTimeAgo = (date) => {
    if (!date) return "Updating...";
  
    const utcZero = date.replace(" ", "T") + "Z";
    const localDate = new Date(utcZero);
    if (isNaN(localDate.getTime())) {
      return "1 second ago";
    }
    const now = new Date();
    const diffTime = now - localDate;
  
    const diffSeconds = Math.floor(diffTime / 1000);
    if (diffSeconds < 60) {
      return `${diffSeconds} second${diffSeconds === 1 ? "" : "s"} ago`;
    }
  
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
    }
  
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    }
  
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  };
  

  return (
    <>
      <Navbar />
      <div className="top_pad">
        <div className="container py-5">
          <div className="row my_account_page mt-4">
            <div className="col-md-3 mb-4 mb-md-0">
              <JobSidebar />
            </div>
            <div className="col-md-9 profile_details">
              <div className="card border-0 shadow bg_lblue">
                <div className="card-body">
                  <h1 className="job_head">
                    Welcome <span className="text-green text-capitalize">"{user?.name}"</span> to your account
                  </h1>
                  <h6>
                    From your account dashboard, you can see your saved jobs, applied jobs, and profile, and edit them as well.
                  </h6>
                </div>
              </div>

              {/* Ajax Loader */}
              <div className="modal fade" id="ajaxModal" tabIndex="-1" aria-labelledby="ajaxModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="ajaxModalLabel">Processing...</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div id="loader" className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status"></div>
                      </div>
                      <p className="text-center" id="ajaxModalMessage">Please wait...</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3 col-lg-2">
                      <div className="job_profile_icon position-relative">
                        <img src={profileImage} className="profile_image" alt="Profile" />
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
                              <span>Upload <i className="fa-solid fa-plus"></i></span>
                            </label>
                          </>
                        ) : (
                          <i
                            className="fa-solid fa-xmark"
                            onClick={() => setSelectedImageId(userData.id)}
                            data-bs-toggle="modal"
                            data-bs-target="#removeImageModal"
                          ></i>
                        )}
                      </div>
                    </div>
                    <div className="col-md-9 col-lg-10">
                      <div className="border-bottom pb-3">
                        <div className="d-flex align-items-center mb-2">
                          <h4 className="m-0 text-capitalize">{userData.name}</h4>
                          <Link>
                            <i className="fa-solid fa-pencil ms-2" data-bs-toggle="modal" data-bs-target="#editProfileModal"></i>
                          </Link>
                        </div>
                        <h6 className="text-secondary m-0 fw-light">
                          Profile last updated - {calculateTimeAgo(userData.updated_at)}
                        </h6>
                      </div>

                      <div className='row py-3 jobseeker_details'>
                        <div className="col-md-6">
                          <ul className='p-0 '>
                            <li><i className="fa-solid fa-location-dot "></i> <span className="text-capitalize">{userData.current_location}</span></li>
                            <li><i className="fa-solid fa-briefcase "></i> <span className="text-capitalize">{userData.work_status}</span></li>
                            <li><i className="fa-regular fa-calendar "></i> <span className="text-capitalize">{userData.notice_period}</span></li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <ul className='p-0'>
                            <li><i className="fa-solid fa-phone"></i> <span>{userData.phone}</span></li>
                            <li><i className="fa-regular fa-envelope"></i> <span>{userData.email}</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* Remove Image  */}
              <div className="modal fade" id="removeImageModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Remove Profile Image</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">Are you sure you want to remove your profile image?</div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-danger" onClick={handleRemoveImage} data-bs-dismiss="modal">Remove</button>
                    </div>
                  </div>
                </div>
              </div>


            {/* Edit Profile Modal */}
            <div className="modal fade basicModal" id="editProfileModal" tabIndex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content p-3 p-sm-4">
                  <div className="modal-header border-0">
                    <h1 className="modal-title fs-5" id="editProfileModalLabel">Basic Details</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body ">
                    <form action="" className=''>
                      <div className='mb-4'>
                        <label htmlFor="">Name</label>
                        <input 
                          type="text" 
                          className='form-control' 
                          name="name" 
                          value={userData.name} 
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })} 
                        />
                      </div>
                      <div className="mb-4">
                        {userData.current_employment === "yes" ? (
                          <strong>{userData.current_job_title} at {userData.current_company_name}</strong>
                        ) : (
                          <strong>Unemployed</strong>
                        )}
                      </div>
                      <div className='mb-4'>
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
                            <label className="form-check-label" htmlFor="fresher">
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
                            <label className="form-check-label" htmlFor="experienced">
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
                                onChange={(e) => setUserData({ ...userData, total_experience_years: e.target.value })} 
                              />
                            </div>
                            <div className="col-md-6 mb-2 mb-md-0">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Months"
                                name="total_experience_months"
                                value={userData.total_experience_months || ""}
                                onChange={(e) => setUserData({ ...userData, total_experience_months: e.target.value })} 
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='mb-4'>
                        <label htmlFor="">Current Salary</label>
                        <p><small>Salary information helps us find relevant jobs for you</small></p>
                        <div className="row">
                          <div className="col-4 col-md-3 col-lg-2">
                            <select className="form-select" defaultValue="dollar">
                              <option value="rupees">kr</option>
                              <option value="dollar">$</option>
                            </select>
                          </div>
                          <div className="col-8 col-md-9 col-lg-10">
                            <input 
                              type="text" 
                              name="current_salary"
                              className='form-control' 
                              placeholder='Eg. 4,50,000'
                              value={userData.current_salary ? userData.current_salary.split(" ")[0] : ""} 
                              onChange={(e) => setUserData({ ...userData, current_salary: e.target.value })} 
                            />
                          </div>
                        </div>
                      </div>
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
                                checked={userData.current_location === "Sweden"}
                                onChange={handleRadioLocation}
                              />
                              <label className="form-check-label" htmlFor="RadioLocation1">
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
                                checked={userData.current_location !== "Sweden"}
                                onChange={handleRadioLocation}
                              />
                              <label className="form-check-label" htmlFor="RadioLocation2">
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
                                onChange={(e) =>
                                  setUserData((prev) => ({
                                    ...prev,
                                    current_location: e.target.value,
                                  }))
                                }
                              />
                            </div>
                            {userData.current_location !== "Sweden" && (
                              <div className="col-md-6 mb-2 mb-md-0 country_input">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter country name"
                                  value={userData.country_name || ""}
                                  onChange={(e) =>
                                    setUserData((prev) => ({
                                      ...prev,
                                      country_name: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="">Notice Period</label>
                        <p><small>Lets recruiters know your availability to join</small></p>
                        <div className="mt-3">
                          <select
                            className="form-select"
                            value={userData.notice_period || "15 days or less"}
                            onChange={(e) => setUserData({ ...userData, notice_period: e.target.value })}
                          >
                            <option value="15 days or less">15 Days or less</option>
                            <option value="1 month">1 Month</option>
                            <option value="2 months">2 Months</option>
                            <option value="3 months">3 Months</option>
                            <option value="more than 3 months">More than 3 months</option>
                            <option value="serving notice period">Serving notice period</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary rounded-pill" data-bs-dismiss="modal" onClick={saveJobSeekerData}>Save</button>
                  </div>
                </div>
              </div>
            </div>


              {/* Resume Upload Section */}
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                  <h5>Resume</h5>
                  <p>75% of recruiters discover candidates through their resume</p>

                  <div className="upload_resume">
                    {resume || userData.resume ? (
                      <div className="uploaded_file_details d-flex justify-content-between align-items-baseline">
                        <div>
                          <h6 className='file_name m-0'>
                            {userData.resume && (
                              <a href={`${IMG_URL}/${userData.resume}`} target="_blank" rel="noopener noreferrer">
                                <img src={`${SITE_URL}/images/PDF.png`} alt="PDF" style={{ width: '80px' }} />
                              </a>
                            )}
                          </h6>
                          <p><small>Uploaded on {calculateTimeAgo(userData.resume_uploaded_on)}</small></p>
                        </div>
                        <div className='d-flex position-relative'>
                          <i className="fa-solid fa-download me-3" onClick={handleResumeDownload}></i>
                          <i className="fa-solid fa-trash" onClick={handleRemoveResume}></i>
                        </div>
                      </div>
                    ) : (
                      <div className='d-flex flex-column align-items-center justify-content-center'>
                        <input type="file" id='upload_resume_input' onChange={handleResumeUpload} />
                        <label htmlFor="upload_resume_input">Upload resume</label>
                        <p className='m-0'><small>Supported Formats: doc, docx, rtf, pdf, upto 2 MB</small></p>
                      </div>
                    )}
                    {resumeError && <p className="text-danger">{resumeError}</p>}
                  </div>

                </div>
              </div>

              {/* Remove Resume Modal */}
              <div className="modal fade" id="removeResumeModal" tabIndex="-1" aria-labelledby="removeResumeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="removeResumeModalLabel">Remove Resume</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">Are you sure you want to remove your resume?</div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-danger" onClick={confirmRemoveResume} data-bs-dismiss="modal">Remove</button>
                    </div>
                  </div>
                </div>
              </div>


              {/* Skills Section */}     
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className='m-0 me-3'>Key Skills 
                      {userData.skills && userData.skills.length > 0 && (
                        <Link data-bs-toggle="modal" data-bs-target="#skillModal"> <i className="fa-solid fa-pencil"></i></Link>
                      )}
                    </h5>
                      {(!userData.skills || Object.keys(userData.skills).length === 0) && (
                        <Link className="text-green" data-bs-toggle="modal" data-bs-target="#skillModal">
                          Add Skills
                        </Link>
                      )}
                  </div>
                  <div className="mt-4 job_skills">
                    <ul className='d-flex flex-wrap p-0'>
                      {userData.skills && userData.skills.split(',').map((skill, index) => (
                        <li key={index} className='rounded-pill border px-3 py-1 me-2 mb-2'>{skill.trim()}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="modal fade skillModal" id="skillModal" tabIndex="-1" aria-labelledby="skillModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content p-3 p-sm-4">
                    <div className="modal-header border-0">
                      <h1 className="modal-title fs-5" id="skillModalLabel">Key Skills</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body ">
                      <form action="" className=''>
                        <div className='mb-4'>
                          <label htmlFor="">Skills</label>

                          {skills && skills.length >= 1 && (
                            <div className="all_added_skills py-2">
                              <ul className="p-0 d-flex flex-wrap m-0">
                                {skills.map((skill, index) => (
                                  <li key={index} className="rounded-pill border me-2 mb-2 py-1 ps-3 pe-4 position-relative">
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

                          <input type="text" placeholder='Add skills' className='add_Skill_input form-control' 
                            value={input}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
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
                      <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-primary rounded-pill" onClick={() => saveSkills()}>Save</button>
                    </div>
                  </div>
                </div>
              </div>



              {/* Employment Section */}
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <h5>Employment</h5>
                    {(!employment || Object.keys(employment).length === 0) && (
                      <Link className="text-green" data-bs-toggle="modal" data-bs-target="#employModal">
                        Add employment
                      </Link>
                    )}
                  </div>

                  <div className="mt-4 educational_details">
                    <div>
                      <div className="d-flex align-items-center">
                        {employment && employment.job_profile && Object.keys(employment).length > 0 && (
                          <h6 className="m-0">
                            {employment.job_profile}
                            <Link data-bs-toggle="modal" data-bs-target="#employModal">
                              <i className="fa-solid fa-pencil ms-2"></i>
                            </Link>
                          </h6>
                        )}
                      </div>
                      {employment && Object.keys(employment).length > 0 ? (
                        <>
                          <h6>{employment.current_company_name}</h6>
                          <p className="m-0">
                            <small>
                              {employment.employment_type} | {employment.joining_date}
                            </small>
                          </p>
                        </>
                      ) : (
                        <p className="m-0">No employment details added yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>


              <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="deleteModalLabel">Delete employment data</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">Are you sure you want to delete employment details?</div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-danger" onClick={() => confirmDelete(employment.id)} data-bs-dismiss="modal">Delete</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade employModal" id="employModal" tabIndex="-1" aria-labelledby="employModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content p-3 p-sm-4">
                    <div className="modal-header border-0 p-0">
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body ">
                      <div className="d-flex justify-content-between">
                      <h1 className="modal-title fs-5" id="employModalLabel">Employment</h1>
                      {employment && employment.id && Object.keys(employment).length > 0 && (
                        <Link className='text-green' data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</Link>
                      )}
                      </div>
                      <form action="" className="mt-3">
                        <div className="mb-4">
                          <label htmlFor="">Is this your current employment?</label>
                          <div className="d-flex mt-3">
                            <div className="form-check me-4">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="RadioYesNo"
                                id="RadioYes"
                                value="yes"
                                checked={employment.current_employment === "yes"}
                                onChange={handleRadioEmpChange}
                              />
                              <label className="form-check-label" htmlFor="RadioYes">
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
                                checked={employment.current_employment === "no"}
                                onChange={handleRadioEmpChange}
                              />
                              <label className="form-check-label" htmlFor="RadioNo">
                                No
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <label htmlFor="employment_type">Employment Type</label>
                          <select value={employment.employment_type || "1"}
                            onChange={(e) => setEmployment({ ...employment, employment_type: e.target.value })}
                            className="form-select" defaultValue="1">
                            <option value="1">Full Time</option>
                            <option value="2">Part Time</option>
                            <option value="3">Fixed</option>
                            <option value="4">Hourly</option>
                          </select>
                        </div>

                        <div className="row mt-4">
                          <label htmlFor="">Total experience</label>
                          <div className="col-md-6 mb-2 mb-md-0">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Years"
                                name="total_experience_years"
                                value={employment.total_experience_years || ""}
                                onChange={(e) => setEmployment({ ...employment, total_experience_years: e.target.value })} 
                              />
                            </div>
                            <div className="col-md-6 mb-2 mb-md-0">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Months"
                                name="total_experience_months"
                                value={employment.total_experience_months || ""}
                                onChange={(e) => setEmployment({ ...employment, total_experience_months: e.target.value })} 
                              />
                            </div>
                        </div>

                        {/* Change label dynamically based on isCurrentEmployment state */}
                        <div className="mt-4">
                        <label htmlFor="">{isCurrentEmployment ? 'Current company name' : 'Previous company name'}</label>
                          <div className="col-12">
                            <input
                              type="text" 
                              className="form-control"
                              placeholder='XYZ Company'
                              value={employment.current_company_name ?? ''} 
                              onChange={(e) => setEmployment({ ...employment, current_company_name: e.target.value })} 
                            />
                          </div>
                        </div>

                        {/* Change label dynamically based on isCurrentEmployment state */}
                        <div className="mt-4">
                        <label htmlFor="">{isCurrentEmployment ? 'Current job title' : 'Previous job title'}</label>
                          <div className="col-12">
                            <input
                              type="text"
                              className="form-control"
                              placeholder='ABC Job Title'
                              value={employment.current_job_title ?? ''} 
                              onChange={(e) => setEmployment({ ...employment, current_job_title: e.target.value })} 
                            />
                          </div>
                        </div>


                        <div className="row mt-4">
                          <label htmlFor="">Joining Date</label>
                          <div className="col-md-12 mb-2 mb-md-0">
                          <input 
                            type="date" 
                            className='form-control' 
                            name="joining_date" 
                            value={employment.joining_date ?? ''} 
                            onChange={(e) => setEmployment({ ...employment, joining_date: e.target.value })} 
                          />
                          </div>
                        </div>

                        {/* Conditionally render the worked_till section if "No" is selected */}
                        {!isCurrentEmployment && (
                          <div className="row mt-4 worked_till">
                            <label htmlFor="">Worked Till</label>
                            <div className="col-md-12 mb-2 mb-md-0">
                            <input 
                              type="date" 
                              className='form-control' 
                              name="worked_till" 
                              value={employment.worked_till ?? ''} 
                              onChange={(e) => setEmployment({ ...employment, worked_till: e.target.value })} 
                            />
                            </div>
                          </div>
                        )}

                        <div className="mt-4">
                          <label htmlFor="">Current Salary</label>
                          <div className="row">
                            <div className="col-4 col-md-3 col-lg-2">
                              <select className="form-select" defaultValue="dollar">
                                <option value="rupees">kr</option>
                                <option value="dollar">$</option>
                              </select>
                            </div>
                            <div className="col-8 col-md-9 col-lg-10">
                              <input type="text" className="form-control" placeholder="Eg. 4,50,000"
                                value={employment.current_salary ? employment.current_salary.split(" ")[0] : ""} 
                                onChange={(e) => setEmployment({ ...employment, current_salary: e.target.value })} 
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <label htmlFor="">Job Profile</label>
                          <div className="col-12">
                            <input className="form-control" type="text" placeholder="Enter job profile"
                              value={employment.job_profile ?? ''} 
                              onChange={(e) => setEmployment({ ...employment, job_profile: e.target.value })} 
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <label htmlFor="">Notice Period</label>
                          <select
                            className="form-select"
                            value={employment.notice_period || "15 days or less"}
                            onChange={(e) => setEmployment({ ...employment, notice_period: e.target.value })}
                          >
                            <option value="15 Days or less">15 Days or less</option>
                            <option value="1 Month">1 Month</option>
                            <option value="2 Months">2 Months</option>
                            <option value="3 Months">3 Months</option>
                            <option value="More than 3 months">More than 3 months</option>
                            <option value="Serving notice period">Serving notice period</option>
                          </select>
                        </div>
                      </form>
                  
                    </div>
                    <div className="modal-footer border-0">
                      <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-primary rounded-pill" data-bs-dismiss="modal" onClick={saveEmploymentData}>Save</button>
                    </div>
                  </div>
                </div>
              </div>


              {/* Education Section */}
              {education.length > 0 ? (
                education.map((edu, index) => (
                  <div key={index} className="card mt-4 shadow border-0 rounded-3">
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <h5>Education</h5>
                        {!edu || Object.keys(edu).length === 0 ? (
                          <Link
                            className="text-green"
                            data-bs-toggle="modal"
                            data-bs-target="#educationModal"
                            onClick={() => openEducationModal({})}
                          >
                            Add education
                          </Link>
                        ) : null}
                      </div>

                      <div className="mt-4 employment_details">
                        <div className="mb-3">
                          {edu && Object.keys(edu).length > 0 ? (
                            <>
                              <div className="d-flex align-items-center">
                                <h6 className="m-0">
                                  {edu.specialization
                                    ? `${edu.course} - ${edu.specialization}`
                                    : edu.course}
                                  <Link
                                    data-bs-toggle="modal"
                                    data-bs-target="#educationModal"
                                    onClick={() => openEducationModal(edu)}
                                  >
                                    <i className="fa-solid fa-pencil ms-2"></i>
                                  </Link>
                                </h6>
                              </div>
                              <h6 className="m-0">{edu.institute}</h6>
                              <p className="m-0">
                                <small>
                                  {edu.course_type} | {edu.course_duration}
                                </small>
                              </p>
                            </>
                          ) : (
                            <p className="m-0">No education details available.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="card mt-4 shadow border-0 rounded-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <h5>Education</h5>
                      <Link
                          className="text-green"
                          data-bs-toggle="modal"
                          data-bs-target="#educationModal"
                          onClick={() => openEducationModal({})}
                        >
                          Add education
                        </Link>
                    </div>

                    <div className="mt-4 employment_details">
                    <p className="m-0">No education details available.</p>

                    </div>
                  </div>
                </div>

              )}


              <div className="modal fade" id="educationDeleteModal" tabIndex="-1" aria-labelledby="educationDeleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="educationDeleteModalLabel">Delete education data</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">Are you sure you want to delete education details?</div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-danger" onClick={() => confirmEducationDelete(selectedEducation.id)} data-bs-dismiss="modal">Delete</button>
                    </div>
                  </div>
                </div>
              </div>


                {/* Education Modal (Outside .map()) */}
                {selectedEducation && (
                  <div className="modal fade" id="educationModal" tabIndex="-1" aria-labelledby="educationModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content p-3 p-sm-4">
                        <div className="modal-header border-0 pb-0">
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div className="d-flex justify-content-between">
                            <h1 className="modal-title fs-5 m-0" id="educationModalLabel">
                              {selectedEducation.id ? "Edit Education" : "Add Education"}
                            </h1>
                            {selectedEducation && selectedEducation.id && Object.keys(selectedEducation).length > 0 && (
                              <Link className="text-green" data-bs-toggle="modal" data-bs-target="#educationDeleteModal">Delete</Link>
                            )}
                          </div>
                          <h6 className="text-muted">Details of your course and university help recruiters understand your background.</h6>

                          <form>
                            <div className="mt-4 mb-4">
                              <label>Education</label>
                              <select
                                value={selectedEducation.education || ""}
                                onChange={(e) => setSelectedEducation({ ...selectedEducation, education: e.target.value })}
                                className="form-select"
                              >
                                <option value="">Select education</option>
                                <option value="1">Doctorate/PHD</option>
                                <option value="2">Masters/Post Graduation</option>
                                <option value="3">Graduation/Diploma</option>
                                <option value="4">12th</option>
                                <option value="5">10th</option>
                              </select>
                            </div>

                            <div className="mb-4">
                              <label>University/Institute</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter institute name"
                                value={selectedEducation.institute || ""}
                                onChange={(e) => setSelectedEducation({ ...selectedEducation, institute: e.target.value })}
                              />
                            </div>

                            <div className="mb-4">
                              <label>Course</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter course name"
                                value={selectedEducation.course || ""}
                                onChange={(e) => setSelectedEducation({ ...selectedEducation, course: e.target.value })}
                              />
                            </div>

                            <div className="mb-4">
                              <label>Specialization</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your specialization"
                                value={selectedEducation.specialization || ""}
                                onChange={(e) => setSelectedEducation({ ...selectedEducation, specialization: e.target.value })}
                              />
                            </div>

                            <div className="mb-4">
                              <label>Course Type</label>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="courseType"
                                  checked={selectedEducation.course_type === "Full Time"}
                                  onChange={() => setSelectedEducation({ ...selectedEducation, course_type: "Full Time" })}
                                />
                                <label className="form-check-label">Full Time</label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="courseType"
                                  checked={selectedEducation.course_type === "Part Time"}
                                  onChange={() => setSelectedEducation({ ...selectedEducation, course_type: "Part Time" })}
                                />
                                <label className="form-check-label">Part Time</label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="courseType"
                                  checked={selectedEducation.course_type === "Correspondence"}
                                  onChange={() => setSelectedEducation({ ...selectedEducation, course_type: "Correspondence" })}
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
                                    value={selectedEducation.course_starting_year || ""}
                                    onChange={(e) => setSelectedEducation({ ...selectedEducation, course_starting_year: e.target.value })}
                                  />
                                </div>
                                <div className="col-1 text-center"> <span>To</span></div>
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ending Year"
                                    value={selectedEducation.course_ending_year || ""}
                                    onChange={(e) => setSelectedEducation({ ...selectedEducation, course_ending_year: e.target.value })}
                                  />
                                </div>
                              </div>
                            </div>

                            {selectedEducation.grading_system === 'Cgpa' ? (
                              <div className="mb-4">
                                {/* <label htmlFor="">{selectedEducation.grading_system.toUpperCase()}</label> */}
                                <label>Marks</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter marks"
                                  value={(selectedEducation.marks ? selectedEducation.marks + ' ' : '') + selectedEducation.grading_system.toUpperCase()}
                                  onChange={(e) => setSelectedEducation({ ...selectedEducation, marks: e.target.value })}
                                />
                              </div>
                            ) : (
                              <div className="mb-4">
                                <label>Marks</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter marks"
                                  value={selectedEducation.marks || ""}
                                  onChange={(e) => setSelectedEducation({ ...selectedEducation, marks: e.target.value })}
                                />
                              </div>
                            )}

                          </form>
                        </div>

                        <div className="modal-footer border-0">
                          <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                          <button type="button" className="btn btn-primary rounded-pill" data-bs-dismiss="modal" onClick={saveEducationData}>Save</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}


                  {/* Social Profiles */}
                  <div className="card mt-4 shadow border-0 rounded-3">
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <h5 className="m-0">Online Profile</h5>
                          <p>
                            <small>Add link to online professional profiles (e.g. LinkedIn, etc.)</small>
                          </p>
                        </div>
                        {/* {(!socialProfiles || Object.keys(socialProfiles).length === 0) && (
                          <Link className="text-green" data-bs-toggle="modal" data-bs-target="#addSocialModal">
                            Add
                          </Link>
                        )} */}
                        <Link className="text-green" data-bs-toggle="modal" data-bs-target="#addSocialModal">
                          Add
                        </Link>
                      </div>

                      <div className="mt-4 online_profile">
                        {socialProfiles && socialProfiles.length > 0 ? (
                          socialProfiles.map((social_profiles, index) => (
                            <div key={index} className="mb-3">
                              <div className="d-flex align-items-center">
                                <h6 className="m-0">
                                  {social_profiles.social_profile_name}{" "}
                                  <Link
                                    data-bs-toggle="modal"
                                    data-bs-target={`#socialModal-${social_profiles.id}`}
                                    onClick={() => openSocialModal(social_profiles)}
                                  >
                                    <i className="fa-solid fa-pencil ms-2"></i>
                                  </Link>
                                </h6>
                              </div>
                              <p className="m-0 text-green">{social_profiles.url}</p>
                            </div>
                          ))
                        ) : (
                          <p>No online profiles added yet</p>
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
                                <h1 className="modal-title fs-5" id={`socialModal-${profile.id}-Label`}>
                                  {profile.id ? "Edit Online Profile" : "Add Online Profile"}
                                </h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <div className="d-flex justify-content-between">
                                  <h6 className="text-muted">Add link to online professional profiles (e.g. LinkedIn, etc.)</h6>
                                  {profile.id && (
                                    <Link
                                      className="text-green"
                                      data-bs-toggle="modal"
                                      data-bs-target={`#deleteSocialModal-${profile.id}`}
                                    >
                                      Delete
                                    </Link>
                                  )}
                                </div>

                                <form>
                                  <div className="mt-4 mb-4">
                                    <label htmlFor={`social_profile_name-${profile.id}`}>Social Profile</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter Social Profile Name"
                                      value={selectedSocialProfile.social_profile_name || ""}
                                      onChange={(e) =>
                                        setSelectedSocialProfile((prev) => ({
                                          ...prev,
                                          social_profile_name: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div className="mb-4">
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
                                  </div>
                                  <div className="mb-4">
                                    <label htmlFor={`description-${profile.id}`}>Description</label>
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
                                <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">
                                  Cancel
                                </button>
                                <button type="button" className="btn btn-primary rounded-pill" onClick={() => saveSocialProfiles(profile.id)}>
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
                                <h5 className="modal-title" id={`deleteSocialModal-${profile.id}-Label`}>
                                  Delete Social Profile
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">Are you sure you want to delete this social profile?</div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                  Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => confirmSocialDelete(profile.id)} data-bs-dismiss="modal">
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}


                  {/* Modal for Adding New Social Profile */}
                  <div className="modal fade" id="addSocialModal" tabIndex="-1" aria-labelledby="addSocialModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content p-3 p-sm-4">
                        <div className="modal-header border-0 pb-0">
                          <h1 className="modal-title fs-5" id="addSocialModalLabel">Add Online Profile</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <h6 className="text-muted">Add link to online professional profiles (e.g. LinkedIn, etc.)</h6>
                          <form>
                            <div className="mt-4 mb-4">
                              <label htmlFor="social_profile_name">Social profile</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Social Profile Name"
                                value={selectedSocialProfile?.social_profile_name || ""}
                                onChange={(e) =>
                                  setSelectedSocialProfile((prev) => ({
                                    ...prev,
                                    social_profile_name: e.target.value,
                                  }))
                                }
                              />
                            </div>
                            <div className="mb-4">
                              <label htmlFor="url">URL</label>
                              <input
                                type="url"
                                className="form-control"
                                placeholder="Enter Social Profile URL"
                                value={selectedSocialProfile?.url || ""}
                                onChange={(e) =>
                                  setSelectedSocialProfile((prev) => ({
                                    ...prev,
                                    url: e.target.value,
                                  }))
                                }
                              />
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
                          <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">
                            Cancel
                          </button>
                          <button type="button" className="btn btn-primary rounded-pill" onClick={() => saveSocialProfiles()}>Save</button>
                        </div>
                      </div>
                    </div>
                  </div>

              {/* Personal details Section */}     
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                 <div className="d-flex align-items-center">
                    <h5 className='m-0 '>Personal Details  
                      <Link data-bs-toggle="modal" data-bs-target="#PersonalDetailModal" > <i className="fa-solid fa-pencil ms-2"></i></Link>
                      </h5> 
                  </div>

                 <div className="mt-4 personal_details">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="">Personal</label>
                        <p>{userData.gender ?? ''} , {userData.maritial_status ?? ''} </p>
                      </div>
                     
                      <div className="col-md-6">
                        <label htmlFor="">Date of birth</label>
                        <p>{userData.dob ?? ''}</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">Category</label>
                        <p>{userData.category ?? ''}</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">Address</label>
                        <p>{userData.permanent_address ?? ''}</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">Zipcode</label>
                        <p>{userData.pincode ?? ''}</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">City</label>
                        <p>{userData.city ?? ''}</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">State</label>
                        <p>{userData.state ?? ''}</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">Country</label>
                        <p>{userData.country_name ?? ''}</p>
                      </div>
                    </div>
                 </div>
                </div>
              </div>

              <div className="modal fade" id="deleteLanguageModal" tabIndex="-1" aria-labelledby="deleteLanguageLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="deleteLanguageLabel">Delete language</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">Are you sure you want to delete?</div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-danger" onClick={() => deleteLanguageRow()} data-bs-dismiss="modal">Delete</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal PersonalDetailModal" id="PersonalDetailModal" tabIndex="-1" aria-labelledby="PersonalDetailModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content p-3 p-sm-4">
                    <div className="modal-header border-0 pb-0">
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body ">
                      <div className="">
                      <h1 className="modal-title fs-5 m-0" id="PersonalDetailModalLabel">Personal details</h1>
                      <h6 className='text-muted'>This informations help recuiter to know you better</h6>
                      </div>
                      <form action="" className=''>
                      <div className='mt-4 mb-4'>
                          <label htmlFor="">Gender</label>
                          <select
                            className="form-select"
                            value={userData.gender || ""}
                            onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                            defaultValue="">
                            <option value="" disabled>Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                          </select>
                      </div>
                      <div className='mb-4'>
                          <label htmlFor="">Maritial Status</label>
                          <select
                            className="form-select"
                            value={userData.maritial_status || ""}
                            onChange={(e) => setUserData({ ...userData, maritial_status: e.target.value })}
                            defaultValue="">
                            <option value="" disabled>Select status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Widowed">Widowed</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Seperated">Seperated</option>
                            <option value="Other">Other</option>
                          </select>
                      </div>
                        <div className='mb-4'>
                          <label htmlFor="">Date of birth</label>
                        <div className="row flex-column flex-md-row align-items-center">
                          <div className="col-md-12 col-12 mb-2">
                            <input type="date" className='form-control' 
                            placeholder='Enter Date of Birth' 
                            value={userData.dob ?? ''} 
                            onChange={(e) => setUserData({ ...userData, dob: e.target.value })} 
                            />
                          </div>
                        </div>
                        </div>
                        <div className='mb-4'>
                          <label htmlFor="">Category</label>
                          <select className="form-select"
                            value={userData.category || ""}
                            onChange={(e) => setUserData({ ...userData, category: e.target.value })}
                            defaultValue="Other">
                            <option value="General">General</option>
                            <option value="SC">SC</option>
                            <option value="ST">ST</option>
                            <option value="OBC">OBC</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className='abled_section'>
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
                                <label className="form-check-label" htmlFor="AbledYes">
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
                                <label className="form-check-label" htmlFor="AbledNo">
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
                                  <option value="Hearing Impairment">Hearing Impairment</option>
                                  <option value="Speech and Language Disability">Speech and Language Disability</option>
                                  <option value="Dwarfism">Dwarfism</option>
                                  <option value="Acid Attack Victim">Acid Attack Victim</option>
                                  <option value="Mental Illness">Mental Illness</option>
                                  <option value="Multiple Disabilities">Multiple Disabilities</option>
                                  <option value="Others">Others</option>
                                </select>
                              </div>

                              {abledType === "Others" && (
                                <div className="mb-4 describe_abled">
                                  <label htmlFor="">Describe</label>
                                  <textarea
                                    name="differently_abled_condition"
                                    id="describe_abled"
                                    value={userData.differently_abled_condition || ""}
                                    placeholder="Specify about your differently abled condition"
                                    className="form-control"
                                    onChange={(e) =>
                                      setUserData((prevData) => ({
                                        ...prevData,
                                        differently_abled_condition: e.target.value,
                                      }))
                                    }
                                  ></textarea>
                                </div>
                              )}

                              <div className="mb-4 assistance">
                                <label htmlFor="">Do you need assistance at your workplace?</label>
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
                          <input type="text" className='form-control' 
                            placeholder='Enter your permanent address' 
                            value={userData.permanent_address} 
                            onChange={(e) => setUserData({ ...userData, permanent_address: e.target.value })} 
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="">Hometown</label>
                          <input type="text" className='form-control' 
                            placeholder='Enter your hometown' 
                            value={userData.hometown} 
                            onChange={(e) => setUserData({ ...userData, hometown: e.target.value })} 
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="">Pincode</label>
                          <input type="text" className='form-control'
                            placeholder='Enter your pincode' 
                            value={userData.pincode} 
                            onChange={(e) => setUserData({ ...userData, pincode: e.target.value })} 
                            />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="">City</label>
                          <input type="text" className='form-control'
                            placeholder='Enter your city' 
                            value={userData.city} 
                            onChange={(e) => setUserData({ ...userData, city: e.target.value })} 
                            />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="">State</label>
                          <input type="text" className='form-control'
                            placeholder='Enter your state' 
                            value={userData.state} 
                            onChange={(e) => setUserData({ ...userData, state: e.target.value })} 
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
                                      onChange={(e) => handleLanguageChange(index, e.target.value)}
                                    />
                                  </div>
                                  <div className="col-md-6 mb-2 mb-md-0">
                                    <label htmlFor="">Proficiency</label>
                                    <select
                                      className="form-select"
                                      value={row.proficiency}
                                      onChange={(e) => handleProficiencyChange(index, e.target.value)}
                                    >
                                      <option value="Beginner">Beginner</option>
                                      <option value="Proficient">Proficient</option>
                                      <option value="Expert">Expert</option>
                                    </select>
                                  </div>
                                  <div className="d-flex mt-1 fw-semibold justify-content-end text-green">
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() => showDeleteLanguageModal(index)}
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
                      <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-primary rounded-pill" onClick={savePersonalDetail}>Save</button>
                    </div>
                  </div>
                </div>
              </div>


              {/* Certification Section */}     
              <div className="card mt-4 shadow border-0 rounded-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <h5>Certification</h5>
                    <Link className="text-green" data-bs-toggle="modal" data-bs-target="#certificateModal">Add</Link>
                  </div>

                  <div className="mt-4 certification_details">
                    {certificates.length > 0 ? (
                      certificates.map((certificate, index) => (
                        <div key={index} className="mb-3">
                          <div className="d-flex align-items-center">
                            <h6 className="m-0">
                              {certificate.certification_name}
                              <Link data-bs-toggle="modal" 
                              data-bs-target={`#showCertificateModal-${certificate.id}`}
                              onClick={() => openCertificateModal(certificate)}
                              >
                                <i className="fa-solid fa-pencil ms-2"></i>
                              </Link>
                            </h6>
                          </div>
                          <p className="m-0 text-green">{certificate.certification_url}</p>
                          <p className="m-0">
                            {certificate.expire_on ? (
                              <small>
                                Expire On - {certificate.expire_on}
                              </small>
                            ) : (
                              <small>
                                Validity - Lifetime
                              </small>
                            )}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No certifications added yet</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Existing code */}
              <div className="modal certificateModal" id="certificateModal" tabIndex="-1" aria-labelledby="certificateModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content p-3 p-sm-4">
                    <div className="modal-header border-0 pb-0">
                      <h1 className="modal-title fs-5">Add Certificate</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <h6 className='text-muted'>Add details of Certifications you have achieved/completed</h6>
                      <form>
                        <div className="text-end">
                          <button type="button" className="btn btn-secondary" onClick={resetCertificateForm}>Reset</button>
                        </div>
                        <div className='mt-4 mb-4'>
                          <label htmlFor="certification_name">Certification Name</label>
                          <input
                            type="text"
                            className='form-control'
                            placeholder='Enter your certification name'
                            name="certification_name"
                            value={selectedCertificate.certification_name}
                            onChange={handleCertificateChange}
                          />
                        </div>
                        <div className='mb-4'>
                          <label htmlFor="certification_url">Certification URL</label>
                          <input
                            type="url"
                            className='form-control'
                            placeholder='Enter your certification url'
                            name="certification_url"
                            value={selectedCertificate.certification_url}
                            onChange={handleCertificateChange}
                          />
                        </div>
                        <div className='mb-4'>
                          <div className="row align-items-center">
                            <div className="col">
                              <div className="row">
                                <div className="col-lg-12 mb-2">
                                  <label htmlFor="certification_validity">Certification validity</label>
                                  <input
                                    type="text"
                                    list="certification_validity"
                                    className='form-control'
                                    placeholder='Enter Certification Validity'
                                    name="certification_validity"
                                    value={selectedCertificate.certification_validity}
                                    onChange={handleCertificateChange}
                                    disabled={selectedCertificate.lifetime_validity}
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
                            {selectedCertificate.certification_validity !== "Lifetime" && (
                              <div className="col">
                                <div className="row">
                                  <div className="col-lg-12 mb-2">
                                    <label htmlFor="expire_on">Expired Date</label>
                                    <input
                                      type="date"
                                      className='form-control'
                                      placeholder='Enter Expired Date'
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
                            <span className='ms-2'>This certificate does not expire</span>
                          </div>
                        </div>

                      </form>
                    </div>
                    <div className="modal-footer border-0">
                      <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-primary rounded-pill" onClick={() => saveCertificate()}>Save</button>
                    </div>
                  </div>
                </div>
              </div>


              <div className="modal fade" id="deleteCertificate" tabIndex="-1" aria-labelledby="deleteCertificateLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="deleteCertificateLabel">Delete Certificate</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">Are you sure you want to delete Certificate?</div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-danger" onClick={() => confirmCertificateDelete(selectedCertificate.id)} data-bs-dismiss="modal">Delete</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modals for Editing Certificates */}
              {certificates.map((certificate) => (
                <div key={certificate.id} className="modal fade" id={`showCertificateModal-${certificate.id}`} tabIndex="-1" aria-labelledby={`showCertificateModal-${certificate.id}-Label`} aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content p-3 p-sm-4">
                      <div className="modal-header border-0 pb-0">
                        <h1 className="modal-title fs-5" id={`showCertificateModal-${certificate.id}-Label`}>Edit Certification</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div className="d-flex justify-content-between">
                        <h6 className='text-muted'>Edit details of Certifications you have achieved/completed</h6>
                        {certificate.id && (
                            <Link
                              className="text-green"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteCertificate"
                              onClick={() => setSelectedCertificate(certificate)}
                            >
                              Delete
                            </Link>
                          )}
                        </div>
                        <form>
                          <div className='mt-4 mb-4'>
                            <label htmlFor="certification_name">Certification Name</label>
                            <input
                              type="text"
                              className='form-control'
                              placeholder='Enter your certification name'
                              name="certification_name"
                              value={selectedCertificate.certification_name}
                              onChange={handleCertificateChange}
                            />
                          </div>
                          <div className='mb-4'>
                            <label htmlFor="certification_url">Certification URL</label>
                            <input
                              type="url"
                              className='form-control'
                              placeholder='Enter your certification url'
                              name="certification_url"
                              value={selectedCertificate.certification_url}
                              onChange={handleCertificateChange}
                            />
                          </div>
                          <div className='mb-4'>
                            <div className="row align-items-center">
                              <div className="col">
                                <div className="row">
                                  <div className="col-lg-12 mb-2">
                                  <label htmlFor="certification_validity">Certification validity</label>
                                    <input
                                      type="text"
                                      list="certification_validity"
                                      className='form-control'
                                      placeholder='Enter Certification Validity'
                                      name="certification_validity"
                                      value={selectedCertificate.certification_validity}
                                      onChange={handleCertificateChange}
                                      disabled={selectedCertificate.lifetime_validity}
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
                              {!selectedCertificate.lifetime_validity && selectedCertificate.certification_validity !== "Lifetime" && (
                                <div className="col">
                                  <div className="row">
                                    <div className="col-lg-12 mb-2">
                                      <label htmlFor="expire_on">Expired Date</label>
                                      <input
                                        type="date"
                                        className='form-control'
                                        placeholder='Enter Expire Date'
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
                                checked={selectedCertificate.certification_validity === "Lifetime"}
                                onChange={handleCertificateChange}
                              />
                              <span className='ms-2'>This certificate does not expire</span>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer border-0">
                        <button type="button" className="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary rounded-pill" onClick={() => saveCertificate(selectedCertificate.id)}>Save</button>
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
    </>
  );
};

export default MyAccount;
