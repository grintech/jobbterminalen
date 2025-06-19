import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { Trans, useTranslation } from 'react-i18next'

const Sitemap = () => {
    const empLogin = import.meta.env.VITE_EMP_URL;
    const { t } = useTranslation();

  return (
    <div className='sitemap_page'>
        <Navbar />
         <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
            <h1 className="fw-bold position-relative">{t("SitemapTitle")}</h1>
          </div>  

          <div className="container all_links py-5">
            <h2 className="text-center fs-3 ">{t("SitemapText1")}</h2>
            <p className="text-center mb-1">{t("SitemapText2")}</p>
            <p className="text-center mb-2">{t("SitemapText3")}</p>
           
           <div className="row  mt-4">
            <div className="col-md-3 col-sm-6 col-6">
                <h3 className='fs-5 fw-semibold'>{t("SitemapSmallHead1")}</h3>
                <ul className="list-unstyled">
                    <li>
                    <Trans i18nKey="InformationLink1" components={{ Link: <Link to="/" />}} />
                    </li>
                    <li>
                    <Trans i18nKey="InformationLink2" components={{ Link: <Link to="/about" />}} />
                    </li>
                    <li>
                    <Trans i18nKey="InformationLink3" components={{ Link: <Link to="/jobs" />}} />
                    </li>
                    <li>
                    <Trans i18nKey="InformationLink4" components={{ Link: <Link to="/faqs" />}} />
                    </li>
                    <li>
                    <Trans i18nKey="InformationLink5" components={{ Link: <Link to="/contact" />}} />
                    </li>
                    <li>
                    <Trans i18nKey="InformationLink6" components={{ Link: <Link to="/feedback" />}} />
                    </li>
                   
                </ul>
            </div>
            <div className="col-md-3 col-sm-6 col-6">
                <h3 className='fs-5 fw-semibold'>{t("SitemapSmallHead2")}</h3>
                <ul className="list-unstyled">
                    <li>
                    <Trans i18nKey="CompanyLink1" components={{ Link: <Link to="/companies" />}} />
                    </li>
                    {/* <li>
                        <Trans i18nKey="CompanyLink2" components={{ Link: <Link to="/companies/featured" />}} />
                    </li> */}
                     
                </ul>
            </div>
            <div className="col-md-3 col-sm-6 col-6">
                <h3 className='fs-5 fw-semibold'>{t("SitemapSmallHead3")}</h3>
                <ul className="list-unstyled">
                    <li>
                    <Trans i18nKey="JobLink1" components={{ Link: <Link to="#" />}} /></li>
                    <li> 
                    <Trans i18nKey="JobLink2" components={{ Link: <Link to="#" />}} /></li>
                    <li>
                    <Trans i18nKey="JobLink3" components={{ Link: <Link to="#" />}} />
                    </li>
                    <li>
                    <Trans i18nKey="JobLink4" components={{ Link: <Link to="#" />}} />
                    </li>
                    <li>
                    <Trans i18nKey="JobLink5" components={{ Link: <Link to="#" />}} />   
                    </li>   
                </ul>
            </div>
            <div className="col-md-3 col-sm-6 col-6">
                <h3 className='fs-5 fw-semibold'>{t("SitemapSmallHead4")}</h3>
                <ul className="list-unstyled">
                <li>
                <Trans i18nKey="UserLink1" components={{ Link: <Link to="/login" />}} /> 
                </li>
                <li>
                <Trans i18nKey="UserLink2" components={{ Link: <Link to="/register" />}} /> 
                </li>
                <li>
                <Trans i18nKey="UserLink3" components={{ Link: <Link to="/forgot-password" />}} />
                </li>
                <li>
                <Trans i18nKey="UserLink4" components={{ Link: <Link to="/verify-otp" />}} />
                </li>
                <li>
                <Trans i18nKey="UserLink5" components={{ Link: <Link to="/reset-password" />}} />
                </li>
                
            </ul>
            </div>               
            <div className="col-md-3 col-sm-6 col-6">
                <h3 className='fs-5 fw-semibold'>{t("SitemapSmallHead5")}</h3>
                <ul className="list-unstyled">
                <li>
                <Trans i18nKey="JobseekerLink1" components={{ Link: <Link to="/my-account" />}} />
                </li>
                <li>
                <Trans i18nKey="JobseekerLink2" components={{ Link: <Link to="/jobs" />}} />
                </li>
                <li>
                <Trans i18nKey="JobseekerLink3" components={{ Link: <Link to="/saved-jobs" />}} />
                </li>
                <li>
                <Trans i18nKey="JobseekerLink4" components={{ Link: <Link to="/saved-companies" />}} />
                </li>
                <li>
                <Trans i18nKey="JobseekerLink5" components={{ Link: <Link to="/applied-jobs" />}} />
                </li>
            </ul>
            </div>
            <div className="col-md-3 col-sm-6 col-6">
                <h3 className='fs-5 fw-semibold'>{t("SitemapSmallHead6")}</h3>
                <ul className="list-unstyled">
                <li>
                 <Trans i18nKey="EmployerLink1" components={{ Link: <Link to={`${empLogin}`} />}} />
                </li>
                <li>
                 <Trans i18nKey="EmployerLink2" components={{ Link: <Link to="/register?role=recruiter" />}} />
                </li>
                </ul>
            </div>
            <div className="col-md-3 col-sm-6 col-6">
                <h3 className='fs-5 fw-semibold'>{t("SitemapSmallHead7")}</h3>
                <ul className="list-unstyled">
                    <li>
                     <Trans i18nKey="LegalLink1" components={{ Link: <Link to="/privacy-policy" />}} />
                    </li>
                    <li>
                    <Trans i18nKey="LegalLink2" components={{ Link: <Link to="/terms-and-conditions" />}} />
                    </li>
                    <li>
                    <Trans i18nKey="LegalLink3" components={{ Link: <Link to="/fraud-alert" />}} />
                    </li>
                    <li>
                     <Trans i18nKey="LegalLink4" components={{ Link: <Link to="/help" />}} />
                    </li>
                </ul>
            </div>
           </div>

          </div>


          <Footer />
    </div>
  )
}

export default Sitemap