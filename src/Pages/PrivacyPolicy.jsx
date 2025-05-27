import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Trans, useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
      {/* <title>Privacy Policy - JobbTerminalen</title>
      <meta name="description" content="Read the JobbTerminalen Privacy Policy to understand how we collect, use, and protect your personal information while using our job portal services." />
      <meta name="keywords" content="Privacy Policy, data protection, JobbTerminalen privacy, personal data, GDPR compliance, user information, data security" />
      <meta property="og:title" content="Privacy Policy - JobbTerminalen" />
      <meta property="og:description" content="Read the JobbTerminalen Privacy Policy to understand how we collect, use, and protect your personal information while using our job portal services." /> */}
    </Helmet>


      <div className="policy_page">
        <Navbar />
        <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
          <h1 className="fw-bold position-relative">{t("PrivacyPolicy")}</h1>
        </div>

        <div className="policy_section py-4">
          <div className="container">
            <div className="col-12">
              <div className="py-4 border-bottom">
                <h3 className="mb-3">{t("PrivacyPolicy")}</h3>
                <p className="mb-2">
                  <strong>{t("EffectiveDate")}</strong>
                </p>
                <p className="mb-2">{t("Intro")}</p>
              </div>

              <div className="py-4 border-bottom">
                <h4 className="mb-3">{t("InformationWeCollect")}</h4>
                <p className="mb-2">{t("InformationWeCollectText")}</p>
                <h5 className="mb-2">{t("PersonalInformation")}</h5>
                <ul className="">
                  <li className="mb-2">{t("PersonalInformationText")}</li>
                </ul>
                <h5 className="mb-2">{t("AccountInformation")}</h5>
                <ul>
                  <li className="mb-2">{t("AccountInformationText")}</li>
                </ul>
                <h5 className="mb-2">{t("JobApplicationData")}</h5>
                <ul>
                  <li className="mb-2">{t("JobApplicationDataText")}</li>
                </ul>
                <h5 className="mb-2">{t("AutomaticallyCollectedData")}</h5>
                <ul>
                  <li className="mb-2">
                    {t("AutomaticallyCollectedDataText")}
                  </li>
                </ul>
              </div>

              <div className="py-4 border-bottom">
                <h4 className="mb-3">{t("HowWeUseYourInformation")}</h4>
                <p className="mb-2">{t("HowWeUseYourInformationText")}</p>
                <ul>
                  <li className="mb-2">{t("UsePurpose1")}</li>
                  <li className="mb-2">{t("UsePurpose2")}</li>
                  <li className="mb-2">{t("UsePurpose3")}</li>
                  <li className="mb-2">{t("UsePurpose4")}</li>
                  <li className="mb-2">{t("UsePurpose5")}</li>
                  <li className="mb-2">{t("UsePurpose6")}</li>
                </ul>
              </div>

              <div className="py-4 border-bottom">
                <h4 className="mb-3">{t("HowWeShareYourInformation")}</h4>
                <p className="mb-2">{t("HowWeShareYourInformationText")}</p>
                <h5 className="mb-2">{t("RecruitersEmployers")}</h5>
                <ul className="">
                  <li className="mb-2">{t("RecruitersEmployersText")}</li>
                </ul>
                <h5 className="mb-2">{t("ServiceProviders")}</h5>
                <ul>
                  <li className="mb-2">{t("ServiceProvidersText")}</li>
                </ul>
                <h5 className="mb-2">{t("LegalAuthorities")}</h5>
                <ul>
                  <li className="mb-2">{t("LegalAuthoritiesText")}</li>
                </ul>
              </div>

              <div className="py-4 border-bottom">
                <h4 className="mb-3">{t("CookiesAndTracking")}</h4>
                <p className="mb-2">{t("CookiesAndTrackingText")}</p>
                <ul>
                  <li className="mb-2">
                    <Trans i18nKey="EssentialCookies" components={{b:<b/>}} />
                    </li>
                  <li className="mb-2">
                    <Trans i18nKey="AnalyticsCookies" components={{b:<b/>}} />
                    </li>
                  <li className="mb-2">
                    <Trans i18nKey="AdvertisingCookies" components={{b:<b/>}} />
                    </li>
                </ul>
              </div>

              <div className="py-4 border-bottom">
                <h4 className="mb-3">{t("DataRetention")}</h4>
                <p className="m-0">{t("DataRetentionText")}</p>
              </div>

              <div className="py-4 border-bottom">
                <h4 className="mb-3">{t("DataSecurity")}</h4>
                <p className="m-0">{t("DataSecurityText")}</p>
              </div>

              <div className="py-4 border-bottom">
                <h4 className="mb-3">{t("YourRights")}</h4>
                <p className="mb-2">{t("YourRightsText")}</p>
                <ul>
                   <li className="mb-2">
                    <Trans i18nKey="RightAccess" components={{b:<b/>}} />
                   </li>
                  <li className="mb-2">
                    <Trans i18nKey="RightRectification" components={{b:<b/>}} />
                  </li>
                  <li className="mb-2">
                    <Trans i18nKey="RightDeletion" components={{b:<b/>}} />
                  </li>
                  <li className="mb-2">
                    <Trans i18nKey="RightRestriction" components={{b:<b/>}} />
                  </li>
                  <li className="mb-2">
                    <Trans i18nKey="RightObjection" components={{b:<b/>}} />
                  </li>
                  <li className="mb-2">
                    <Trans i18nKey="RightDataPortability" components={{b:<b/>}} />
                  </li>
                </ul>
              </div>

              <div className="py-4 border-bottom">
                <h4 className="mb-3">{t("ThirdPartyLinks")}</h4>
                <p className="m-0">{t("ThirdPartyLinksText")}</p>
              </div>

              <div className="py-4 border-bottom">
                <h4 className="mb-3">{t("ChildrensPrivacy")}</h4>
                <p className="m-0">{t("ChildrensPrivacyText")}</p>
              </div>

              <div className="py-4 border-bottom">
                <h4 className="mb-3">{t("ChangesToPolicy")}</h4>
                <p className="m-0">{t("ChangesToPolicyText")}</p>
              </div>

              {/* <div className="py-4 border-bottom">
                <h4 className="mb-3">{t("PrivacyContactUs")}</h4>
                <p className="mb-2">{t("ContactUsText")}</p>
                <ul className="">
                  <li className="mb-2">
                  <Trans i18nKey="CompanyName" components={{b:<b/>}} />
                   </li>
                  <li className="mb-2">
                    <Trans i18nKey="ContactEmail" components={{b:<b/>}} />
                  </li>
                  <li className="mb-2">
                    <Trans i18nKey="ContactPhone" components={{b:<b/>}} />
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
