import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { ToastContainer, toast } from "react-toastify";
import { useRef } from 'react';
import { useAuthContext } from '../store/authContext';

const Contact = () => {
    const { t } = useTranslation();
    const bearerKey = import.meta.env.VITE_BEARER_KEY;
    const API_URL = import.meta.env.VITE_API_URL;

    const {user} = useAuthContext();
    const navigate = useNavigate();

    const fileInputRef = useRef(null);
    const [phone, setPhone] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        description: "",
        type_of_user: "",
        attachment: null
    });
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({
        show: false,
        message: "",
        type: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const allowedTypes = [
            "application/pdf",
            "application/msword", // .doc
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
            "image/jpeg",
            "image/png"
        ];
    
        if (!allowedTypes.includes(file.type)) {
            toast.error("Only PDF, Word (.doc, .docx), JPG, and PNG files are allowed!");
            e.target.value = ""; // clear file input
            return;
        }
    
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            toast.error("File size must not exceed 2MB!");
            e.target.value = ""; // clear file input
            return;
        }
    
        setFormData(prevState => ({
            ...prevState,
            attachment: file
        }));
    };
    

    const handleRadioChange = (e) => {
        const value = e.target.id === "flexRadioDefault1" ? "job_seeker" : "recruiter";
        setFormData(prevState => ({
            ...prevState,
            type_of_user: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            toast.error("Please login to contact us!");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            return;
        }

        if (!formData.name) {
            toast.error("Please enter the name!");
            return;
        }
        if (!formData.email) {
            toast.error("Please enter a valid email!");
            return;
        }
        if (!formData.phone) {
            toast.error("Please enter a phone number!");
            return;
        }
        if (!formData.description ) {
            toast.error("Please write your message!");
            return;
        }
        if (!formData.description || formData.description.length < 20) {
            toast.error("Minimum 20 characters required!");
            return;
        }

        if (!formData.phone || formData.phone.replace(/\D/g, "").length < 8) {
            toast.error("Phone number must be at least 8 digits!");
            return;
        }

        if (!formData.type_of_user) {
            toast.error("Please select user type!");
            return;
        }

        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('type_of_user', formData.type_of_user);

        if (formData.attachment) {
            formDataToSend.append('attachment', formData.attachment);
        }

        try {
            const response = await axios.post(`${API_URL}/contact_us_mail.php`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${bearerKey}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setAlert({
                show: true,
                message: response.data.message,
                type: "success"
            });

            
            setFormData({
                name: "",
                email: "",
                phone: "",
                description: "",
                type_of_user: "",
                attachment: null
            });
            setPhone(""); 
   
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            
            // setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
            navigate("/thank-you", { state: { from: "contact" } });

        } catch (error) {
            const errorMessage = error.response?.data?.message || "There was an error sending your message.";
            setAlert({
                show: true,
                message: errorMessage,
                type: "danger"
            });
            setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                {/* <title>Contact Us - JobbTerminalen</title>
                <meta name="description" content="Get in touch with JobbTerminalen..." />
                <meta name="keywords" content="Contact JobbTerminalen..." />
                <meta property='og:title' content="Contact Us - JobbTerminalen" />
                <meta property='og:description' content="Get in touch with JobbTerminalen..." /> */}
            </Helmet>

            <div className="contact_page">
                <Navbar />
                <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
                    <h1 className='fw-bold position-relative m-0'>{t("ContactTitle")}</h1>
                </div>

                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-5 mx-auto mb-5 mb-lg-0">
                            <img loading='lazy' src="/images/contact1.avif" className='w-100 rounded-3' alt="contact-img" />
                        </div>
                        <div className="col-lg-5 mx-auto">
                            <form className='register_form' onSubmit={handleSubmit} noValidate>
                                <div className="card shadow border-0">
                                    <div className="card-body py-4">
                                        <h3 className='mb-3 text-center'>{t("ContactTitle")}</h3>
                                        <div className='px-3'>
                                            <div className="row">
                                                <div className="col-12 mb-3">
                                                    <label>{t("Full_Name")} <span>*</span></label>
                                                    <input type="text" className='form-control' placeholder={t("Name_placeholder")} name="name" value={formData.name} onChange={handleChange} required />
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <label>{t("Email")} <span>*</span></label>
                                                    <input type="email" className='form-control' placeholder={t("Email_placeholder")} name="email" value={formData.email} onChange={handleChange} required />
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <label>{t("Phone")} <span>*</span></label>
                                                    <PhoneInput
                                                        country={'se'}
                                                        value={phone}
                                                        onChange={(value) => {
                                                            const formattedPhone = `+${value}`;
                                                            setPhone(formattedPhone);
                                                            setFormData(prevData => ({
                                                                ...prevData,
                                                                phone: formattedPhone,
                                                            }));
                                                        }}
                                                        inputStyle={{ width: "100%" }}
                                                        enableSearch
                                                    />
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <label>{t("Description")} <span>*</span></label>
                                                    <textarea className='form-control' placeholder={t("Desc_placeholder")} name="description" value={formData.description} onChange={handleChange} rows={4} required></textarea>
                                                </div>
                                                <div className="col-12 mb-3 d-flex flex-wrap">
                                                    <div className="form-check me-3">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault"
                                                            id="flexRadioDefault1"
                                                            checked={formData.type_of_user === "job_seeker"}
                                                            onChange={handleRadioChange}
                                                        />
                                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                            {t("JobSeeker")}
                                                        </label>
                                                    </div>
                                                    <div className="form-check me-3">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault"
                                                            id="flexRadioDefault2"
                                                            checked={formData.type_of_user === "recruiter"}
                                                            onChange={handleRadioChange}
                                                        />
                                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                            {t("Recruiter")}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <label>{t("AttachFile")}</label>
                                                    <input type="file" className='form-control'
                                                     onChange={handleFileChange}
                                                     ref={fileInputRef}
                                                      />
                                                </div>
                                                <div className="col-12">
                                                    {alert.show && (
                                                        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                                                            {alert.message}
                                                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-12 text-end mt-3">
                                                    <button type='submit' style={{ height: "50px" }} className="btn btn-register rounded-2 fs-6 w-100" disabled={loading}>
                                                     {loading ? t("Submitting") : t("Submit")}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="row mt-5 py-4 contact_us_details">
                        <div className="col-md-4 mb-4 mb-md-0">
                            <div className="card h-100 border-0">
                                <div className="card-body rounded-3 text-center p-lg-5 p-md-4 p-4 ">
                                    <div className="contact_icon shadow rounded-2 mb-3">
                                        <i className="fa-solid fa-phone"></i>
                                    </div>
                                    <h5>{t("ContactSmlHead1")}</h5>
                                    <p className="text-muted">{t("ContactSmlText1")}</p>
                                    <Link className='text-primary'>{t("ContactLink1")}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4 mb-md-0">
                            <div className="card h-100 border-0">
                                <div className="card-body rounded-3 text-center p-lg-5 p-md-4 p-4 ">
                                    <div className="contact_icon shadow rounded-2 mb-3">
                                        <i className="fa-regular fa-envelope"></i>
                                    </div>
                                    <h5>{t("ContactSmlHead2")}</h5>
                                    <p className="text-muted">{t("ContactSmlText2")}</p>
                                    <Link className='text-primary'>{t("ContactLink2")}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0">
                                <div className="card-body rounded-3 text-center p-lg-5 p-md-4 p-4 ">
                                    <div className="contact_icon shadow rounded-2 mb-3">
                                        <i className="fa-solid fa-location-dot"></i>
                                    </div>
                                    <h5>{t("ContactSmlHead3")}</h5>
                                    <p className="text-muted">{t("ContactSmlText3")}</p>
                                    <p className='text-primary m-0'>{t("ContactLink3")}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <Footer />
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
        </>
    );
};

export default Contact;
