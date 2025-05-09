import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import ReactFlagsSelect from "react-flags-select";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    const { t } = useTranslation();

    const bearerKey = import.meta.env.VITE_BEARER_KEY; // Make sure this contains the correct token
    const API_URL = import.meta.env.VITE_API_URL;

    const [selected, setSelected] = useState("");
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            attachment: e.target.files[0]
        }));
    };

    const handleRadioChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            type_of_user: e.target.id === "flexRadioDefault1" ? "job_seeker" : "recruiter"
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', `${customLabels[selected]}${formData.phone}`);
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
            // Reset form fields
            setFormData({
                name: "",
                email: "",
                phone: "",
                description: "",
                type_of_user: "",
                attachment: null
            });

            setSelected(""); // Clear country selection

            setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
            console.log(response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "There was an error sending your message.";
            setAlert({
                show: true,
                // message: "There was an error sending your message.",
                message: errorMessage,
                type: "danger"
            });

            setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
            console.error(error);
        } finally {
            setLoading(false); // re-enable button
        }
    };

    return (
        <>
            <Helmet >
                <title>Contact Us - JobbTerminalen</title>
                <meta name="description" content="Get in touch with JobbTerminalen for assistance with job searches, employer services, or general inquiries. We're here to help you navigate your career journey in Sweden." />
                <meta name="keywords" content="Contact JobbTerminalen, job search assistance, employer services, career support Sweden, job portal contact" />
                <meta property='og:title' content="Contact Us - JobbTerminalen" />
                <meta property='og:description' content="Get in touch with JobbTerminalen for assistance with job searches, employer services, or general inquiries. We're here to help you navigate your career journey in Sweden." />
            </Helmet>

            <div className="contact_page">
                <Navbar />
                <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
                    <h1 className='fw-bold position-relative'>{t("ContactTitle")}</h1>
                </div>
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-5 mx-auto mb-5 mb-lg-0">
                            <img loading='lazy' src="/images/contact1.avif" className='w-100 rounded-3' alt="contact-img" />
                        </div>
                        <div className="col-lg-5 mx-auto">
                            <form className='register_form' onSubmit={handleSubmit}>
                                <div className="card shadow border-0 ">
                                    <div className="card-body py-4">
                                        <h3 className='mb-3 text-center'>{t("ContactTitle")}</h3>
                                        <div className='px-3'>
                                            <div className="row">
                                                <div className="col-12 mb-3">
                                                    <label htmlFor="">{t("Full_Name")} <span>*</span></label>
                                                    <input type="text" className='form-control' placeholder={t("Name_placeholder")} name="name" onChange={handleChange} required />
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <label htmlFor="">{t("Email")} <span>*</span></label>
                                                    <input type="email" className='form-control' placeholder={t("Email_placeholder")} name="email" onChange={handleChange} required />
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <label htmlFor="">{t("Phone")}<span>*</span></label>
                                                    <div className="phone-input-container d-flex ">
                                                        <div className="col-3 mb-3 mb-sm-0 p-0">
                                                            <ReactFlagsSelect
                                                                selected={selected}
                                                                onSelect={(code) => setSelected(code)}
                                                                searchable
                                                                placeholder={t("Select")}
                                                                customLabels={customLabels}
                                                                className="w-100"
                                                            />
                                                        </div>
                                                        <div className="col-9 register_phone_input p-0">
                                                            <input
                                                                type="text"
                                                                placeholder={t("Phone_placeholder")}
                                                                name="phone"
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                                onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                                                className="form-control"
                                                                inputMode="numeric"
                                                                pattern="[0-9]{9,12}"
                                                                maxLength="11"
                                                                required

                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <label htmlFor="">{t("Description")}<span>*</span></label>
                                                    <textarea
                                                        className='form-control'
                                                        placeholder={t("Desc_placeholder")}
                                                        name="description"
                                                        onChange={handleChange}
                                                        rows={4}
                                                        required
                                                    ></textarea>
                                                </div>
                                                <div className="col-12 mb-3 d-flex flex-wrap">
                                                    <div className="form-check me-3">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault"
                                                            id="flexRadioDefault1"
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
                                                            onChange={handleRadioChange}
                                                        />
                                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                            {t("Recruiter")}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <label htmlFor="">{t("AttachFile")}</label>
                                                    <input type="file" className='form-control' onChange={handleFileChange} />
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
                                                    <button
                                                        type='submit'
                                                        style={{ height: "50px" }}
                                                        className="btn btn-register rounded-2 fs-6 w-100"
                                                        disabled={loading}
                                                    >
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
        </>
    )
}

export default Contact