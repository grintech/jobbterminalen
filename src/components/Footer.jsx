import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'

const Footer = () => {

    const { t } = useTranslation();

    const EMP_URL = import.meta.env.VITE_EMP_URL;

  return (
    <>
        <footer className="footer ">
            <div className="container pt-4">
              <div className="row">
                <div className="col-lg-4 col-md-4  col-sm-6  order-1">
                <Link className="navbar-brand" > <img loading='lazy' src="/images/foot_logo.png" alt="logo" /></Link>
                <h5 className='mt-3'>{ t("ConnectWithUs")}</h5>
                <p>{ t("FooterText")}</p>
                <div className="d-flex social_links flex-wrap mb-3">
                    <Link> 
                     <i className="fa-brands fa-facebook me-2"></i>
                    </Link>

                    <Link to={`https://www.instagram.com/jobbterminalen/`} target='_blank' >
                     <i className="fa-brands fa-instagram me-2"></i>
                    </Link>

                    <Link>
                     <i className="fa-brands fa-twitter me-2"></i>
                    </Link>

                    <Link to={`https://www.linkedin.com/company/jobbterminalen/`} target='_blank' > 
                     <i className="fa-brands fa-linkedin me-2"></i>
                    </Link>

                    <Link>
                     <i className="fa-brands fa-youtube me-2"></i>
                    </Link>
                </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 col-6 order-2">
                <h5 className='mt-3'>{ t("JobCategories")}</h5>
                <ul className='p-0' >
                    <li><Link><i className="fa-solid fa-chevron-right"></i> { t("WorkFromHome")}</Link></li>
                    <li><Link><i className="fa-solid fa-chevron-right"></i> { t("InternshipJob")}</Link></li>
                    <li><Link><i className="fa-solid fa-chevron-right"></i> { t("FreelancerJob")}</Link></li>
                    <li><Link><i className="fa-solid fa-chevron-right"></i> { t("PartTimeJob")}</Link></li>
                    <li><Link><i className="fa-solid fa-chevron-right"></i> { t("FullTimeJob")}</Link></li>
                </ul>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 col-6 order-3">
                <h5 className='mt-3'>{ t("QuickLinks")}</h5>
                <ul className='p-0' >
                    <li><Link to='/about'><i className="fa-solid fa-chevron-right"></i> { t("AboutUs")}</Link></li>
                    <li><Link to='/contact'><i className="fa-solid fa-chevron-right"></i>{ t("ContactUs")}</Link></li>
                    <li><Link to='/faqs'><i className="fa-solid fa-chevron-right"></i> { t("Faqs")}</Link></li>
                    <li><Link to='/feedback'><i className="fa-solid fa-chevron-right"></i> { t("SendFeedback")}</Link></li>
                    <li><Link to='/sitemap'><i className="fa-solid fa-chevron-right"></i> { t("Sitemap")}</Link></li>
                </ul>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 col-6 order-4">
                <h5 className='mt-3'>{ t("Employer")}</h5>
                <ul className='p-0' >
                    <li><Link target="_blank"  to={EMP_URL}><i className="fa-solid fa-chevron-right"></i>{ t("EmpLogin")}</Link></li>
                    <li><Link target="_blank"  to={EMP_URL} ><i className="fa-solid fa-chevron-right"></i>{ t("JobPosting")}</Link></li>
                    
                    {/* <li><Link><i className="fa-solid fa-chevron-right"></i>{ t("BannerPosting")}</Link></li> */}
                </ul>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 col-6 order-5">
                <h5 className='mt-3'>{ t("OtherLinks")}</h5>
                <ul className='p-0' >
                    <li><Link to='/privacy-policy'> <i className="fa-solid fa-chevron-right"></i>{ t("PrivacyPolicy")}</Link></li>
                    <li><Link to='/terms-and-conditions'> <i className="fa-solid fa-chevron-right"></i>{ t("TermsConditions")}</Link></li>
                    <li><Link to='/fraud-alert'> <i className="fa-solid fa-chevron-right"></i>{ t("FraudAlert")}</Link></li>
                    <li><Link to="/help"> <i className="fa-solid fa-chevron-right"></i>{ t("HelpCenter")}</Link></li>
                </ul>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center border-top py-3">
                <p className='m-0 px-2 text-center copyright_text'>{ t("Copyright")}</p>
            </div>
        </footer>
    </>
  )
}

export default Footer