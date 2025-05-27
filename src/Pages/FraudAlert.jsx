import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const FraudAlert = () => {

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        {/* <title>Fraud Alert - JobbTerminalen</title>
        <meta name="description" content="Stay informed about job fraud and scams. Learn how to identify fraudulent job postings and protect yourself from job-related scams on JobbTerminalen." />
        <meta name="keywords" content="job fraud alert, job scams, fake job postings, fraud prevention, job safety, employment scams, JobbTerminalen security, scam protection" />
        <meta property="og:title" content="Fraud Alert - JobbTerminalen" />
        <meta property="og:description" content="Stay informed about job fraud and scams. Learn how to identify fraudulent job postings and protect yourself from job-related scams on JobbTerminalen." /> */}
     </Helmet>

      <div className="fraud_alert">
          <Navbar />
          <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
            <h1 className="fw-bold position-relative">{t("FraudAlertTitle")}</h1>
          </div>
          <div className="container py-5">
              <h2 className="text-center fs-4 ">
                <Trans i18nKey="FraudAlertText"components={{ strong: <strong /> }}  />
              </h2>

              <h3 className="text-dark fw-semibold mt-5 fs-4">{t("FraudHead1")}</h3>
              <ul className="list-group list-group-flush">
              <li className="list-group-item">{t("FraudHead1Text1")}</li>
              <li className="list-group-item">{t("FraudHead1Text2")}</li>
              <li className="list-group-item">{t("FraudHead1Text3")}</li>
              <li className="list-group-item">{t("FraudHead1Text4")}</li>
              <li className="list-group-item">{t("FraudHead1Text5")}</li>
              </ul>

              <h3 className="text-dark fw-semibold mt-5 fs-4">{t("FraudHead2")}</h3>
              <ul className="list-group list-group-flush">
              <li className="list-group-item">{t("FraudHead2Text1")}</li>
              <li className="list-group-item">{t("FraudHead2Text2")}</li>
              <li className="list-group-item">{t("FraudHead2Text3")}</li>
              <li className="list-group-item">{t("FraudHead2Text4")}</li>
              <li className="list-group-item">{t("FraudHead2Text5")}</li>
              </ul>

              <h3 className="text-dark fw-semibold mt-5 fs-4"> {t("FraudHead3")}</h3>
              <p className="text-muted mb-2">{t("FraudHead3Text1")}</p>
              <p className="text-primary fw-semibold mb-2">
                <Trans i18nKey="FraudHead3Text2" components={{ Link: <Link /> }} />
              </p>
              <p className="text-muted mb-2">
                {t("FraudHead3Text3")}
              </p>
              <p className="text-muted mb-2">{t("FraudHead3Text4")}</p>
              <div className="text-center mt-4">
              <button  className="btn btn-register">
                <Trans i18nKey="FraudBackToHome" components={{Link: <Link to='/' />}} />
              </button>
              </div>

          </div>

          <Footer />
      </div>
    </>
  );
};

export default FraudAlert;
