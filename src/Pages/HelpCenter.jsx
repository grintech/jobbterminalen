import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

const HelpCenter = () => {

    const { t } = useTranslation();

  return (
    <div className="help-center-page">
      <Navbar />

        <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
            <h1 className="fw-bold position-relative">{t("HelpCenterTitle")}</h1>
        </div>

      <div className="container py-5">
        {/* Contact Support Section */}
        <h2 className="text-center mb-3 fs-3">{t("ContactSupportTitle")}</h2>
        <p className="text-center text-muted">
        {t("ContactSupportText")}
        </p>

         <div className="row mt-4 contact_us_details">
            <div className="col-md-4 mb-4 mb-md-0">
            <div className="card border-0">
                <div className="card-body rounded-3 text-center p-lg-5 p-md-4">
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
            <div className="card border-0">
                <div className="card-body rounded-3 text-center p-lg-5 p-md-4">
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
            <div className="card border-0">
                <div className="card-body rounded-3 text-center p-lg-5 p-md-4">
                    <div className="contact_icon shadow rounded-2 mb-3">
                    <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <h5>{t("ContactSmlHead3")}</h5>
                    <p className="text-muted">{t("ContactSmlText2")}</p>
                    <p className='text-primary m-0'>{t("ContactLink3")}</p>
                </div>
            </div>
            </div>
        </div>

        {/* Troubleshooting Section */}
        <h2 className="text-center mt-5 fs-3">{t("TroubleshootingTitle")}</h2>
        <p className="text-center text-muted">
        {t("TroubleshootingText")}
        </p>

        <div className="row mt-4">
          <div className="col-md-6">
            <div className="card p-3 shadow-sm">
              <h3 className="fs-5">{t("TroubleSmallHead1")}</h3>
              <p className="text-muted">
                <Trans i18nKey="TroubleSmallHead1Text1" components={{b: <b />, Link : <Link to='/forgot-password' />}} />
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-3 shadow-sm">
              <h3 className="fs-5">{t("TroubleSmallHead2")}</h3>
              <p className="text-muted">
              <Trans i18nKey="TroubleSmallHead1Text2" components={{b: <b />, Link : <Link to='/my-account' />}} />
              </p>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <div className="card p-3 shadow-sm">
              <h3 className="fs-5">{t("TroubleSmallHead3")}</h3>
              <p className="text-muted">
              {t("TroubleSmallHead1Text3")}
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-3 shadow-sm">
              <h3 className="fs-5">{t("TroubleSmallHead4")}</h3>
              <p className="text-muted">
              {t("TroubleSmallHead1Text4")}
              </p>
            </div>
          </div>
        </div>

        {/* Useful Links */}
        <h2 className="text-center mt-5 fs-3">{t("HelpfulHead")}</h2>
        <div className="row text-center mt-3">
          <div className="col-md-3">
            <button className="btn btn-register w-100">
            <Trans i18nKey="HelpfulLink1" components={{Link: <Link to="/faqs" />}} />
            </button>
            
          </div>
          <div className="col-md-3">
            <button className="btn btn-register w-100">
            <Trans i18nKey="HelpfulLink2" components={{Link: <Link to="/jobs" />}} />
            </button>
          </div>
          <div className="col-md-3">
            <button className="btn btn-register w-100">
            <Trans i18nKey="HelpfulLink3" components={{Link: <Link to="/register" />}} />
            </button>
          </div>
          <div className="col-md-3">
            <button className="btn btn-register w-100">
            <Trans i18nKey="HelpfulLink4" components={{Link: <Link to="/contact" />}} />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpCenter;
