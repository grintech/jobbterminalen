import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useTranslation,Trans } from 'react-i18next'

const TermsAndConditions = () => {

  const { t } = useTranslation();

  return (
    <>
        <div className="terms_page">
          <Navbar />
          <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
           <h1 className="fw-bold position-relative">{t("TermsTitle")}</h1>
          </div>
     
          <div className="terms_section py-4">
            <div className="container">
              <div className="col-12">
                <div className='py-4 border-bottom'>
                <h3 className='mb-3'>{t("TermsTitle")}</h3>
                <p className='mb-2'>{t("TermEffectiveDate")}</p>
                <p className='mb-2'>{t("TermsIntro")}</p>
                </div>

                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>{t("TermsDefinition")}</h4>
              <ul className=''>
                <li className='mb-2'>
                <Trans i18nKey="TermsDefinitionText" components={{ strong: <strong /> }} />
                </li>
                <li className='mb-2'>
                <Trans i18nKey="TermsDefinitionText1" components={{ strong: <strong /> }} />
                </li>
                <li className='mb-2'>
                <Trans i18nKey="TermsDefinitionText2" components={{ strong: <strong /> }} />
                </li>
                <li className='mb-2'>
                <Trans i18nKey="TermsDefinitionText3" components={{ strong: <strong /> }} />
                </li>
               
              </ul>
                </div>
                
                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>{t("TermsAcceptance")}</h4>
                <p className="mb-2">{t("TermsAcceptanceText")}</p>
                <ul className=''>
                  <li className='mb-2'>{t("TermsAcceptanceText1")}</li>
                  <li className='mb-2'>{t("TermsAcceptanceText2")}</li>
                  <li className='mb-2'>{t("TermsAcceptanceText3")}</li>
                </ul>
                <p>{t("TermsAcceptanceText4")}</p>
                </div>
                
                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>{t("TermsAccountRegistration")}</h4>
                <ul className=''>
                  <li className='mb-2'>{t("TermsAccountRegistrationText")}</li>
                  <li className='mb-2'>{t("TermsAccountRegistrationText1")}</li>
                  <li className='mb-2'>{t("TermsAccountRegistrationText2")}</li>
                </ul>
                </div>
                
                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>{t("TermsUserResponsibility")}</h4>
                <h6 className='mb-2 fw-bold'>{t("TermsUserResponsibilityHead")}</h6>
                <ul className=''>
                  <li className='mb-2'>{t("TermsUserResponsibilityText")}</li>
                  <li className='mb-2'>{t("TermsUserResponsibilityText1")}</li>
                </ul>
                <h6 className='mb-2 fw-bold'>{t("TermsUserResponsibilityHead1")}</h6>
                <ul className=''>
                  <li className='mb-2'>{t("TermsUserResponsibilityText2")}</li>
                  <li className='mb-2'>{t("TermsUserResponsibilityText3")}</li>
                </ul>
                </div>

                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>{t("TermsProhibitedActivities")}</h4>
                <p className="mb-2">{t("TermsProhibitedActivitiesText")}</p>
                <ul className=''>
                  <li className='mb-2'>{t("TermsProhibitedActivitiesText1")}</li>
                  <li className='mb-2'>{t("TermsProhibitedActivitiesText2")}</li>
                  <li className='mb-2'>{t("TermsProhibitedActivitiesText3")}</li>
                  <li className='mb-2'>{t("TermsProhibitedActivitiesText4")}</li>
                </ul>
                </div>

                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>{t("TermsFeesPayment")}</h4>
                <ul className=''>
                  <li className='mb-2'>{t("TermsFeesPaymentText")}</li>
                  <li className='mb-2'>{t("TermsFeesPaymentText1")}</li>
                </ul>
                </div>

                <div className='py-4 border-bottom'>
                  <h4 className='mb-3'>{t("TermsPrivacyPolicy")}</h4> 
                  <p className="mb-2">
                  <Trans i18nKey="TermsPrivacyPolicyText" components={{b:<b/>, Link: <Link to='/privacy-policy' /> }} />
                </p>
                </div>

                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>{t("TermsLimitationOfLiability")}</h4>
                <ul className=''>
                  <li className='mb-2'>{t("TermsLimitationOfLiabilityText")}</li>
                  <li className='mb-2'>{t("TermsLimitationOfLiabilityText1")}</li>
                  <li className='mb-2'>{t("TermsLimitationOfLiabilityText2")}</li>
                </ul>
                </div>

                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>{t("TermsIntellectualProperty")}</h4>
                <ul className=''>
                  <li className='mb-2'>{t("TermsIntellectualPropertyText")}</li>
                  <li className='mb-2'>{t("TermsIntellectualPropertyText1")}</li>
                </ul>
                </div>

                <div className='py-4 border-bottom'>
                  <h4 className='mb-3'>{t("TermsTermination")}</h4>
                  <p className="mb-2">{t("TermsTerminationText")}</p>
                </div>

                <div className='py-4 border-bottom'>
                  <h4 className='mb-3'>{t("TermsAmendments")}</h4>
                  <p className="mb-2">{t("TermsAmendmentsText")}</p>
                </div>

                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>{t("TermsContactUs")}</h4>
                <p className="mb-2">{t("TermsContactUsText")}</p>
                <ul className=''>
                  <li className='mb-2'>{t("CompanyName")}</li>
                  <li className='mb-2'>
                    <Trans i18nKey="ContactEmail" components={{strong: <strong /> }} />
                    </li>
                  <li className='mb-2'>  <Trans i18nKey="ContactPhone" components={{strong: <strong /> }} /></li>
                </ul>
                </div>

              </div>
            </div>
          </div>

         <Footer />

        </div>
    </>
  )
}

export default TermsAndConditions