import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'

const Feedback = () => {

  const { t } = useTranslation();

  return (
    <div>
        <Navbar />
       
          <div className="container top_pad py-5">
            <div id='feedback_wrapper' className="col-xxl-5 col-lg-6  col-md-9 col-12 mx-auto ">
            <h2 className='fs-3'>{t("FeedbackTitle")}</h2>
            <p className='text-muted mb-2 fs-6 mb-3'>{t("FeedbackText")}</p>
                <form action="" className='feedback_form'>
                    <div className='mb-3'>
                    <label htmlFor="">{t("FeedbackLabel1")}</label>
                    <select name="" id="" className='form-select'>
                        <option value="" selected >{t("FeedbackSelect")}</option>
                        <option value="Bug Report">{t("FeedbackSelectOption1")}</option>
                        <option value="Problem With The Website">{t("FeedbackSelectOption2")}</option>
                        <option value="Request Information">{t("FeedbackSelectOption3")}</option>
                        <option value="General Feedback">{t("FeedbackSelectOption4")}</option>
                        <option value="Report Abuse">{t("FeedbackSelectOption5")}</option>
                        <option value="Report Fake Jobs Offer">{t("FeedbackSelectOption6")}</option>
                    </select>
                    </div>
                   <div className='mb-3'>
                   <label htmlFor="">{t("FeedbackLabel2")}</label>
                   <textarea name="" id="" cols="30" rows="5" className='form-control' placeholder={t("FeedbackLabel2Placeholder")}></textarea>
                   </div>
                   <div className='mb-3'>
                   <label htmlFor="">{t("FeedbackLabel3")}</label>
                   <input type="text" className='form-control' placeholder={t("FeedbackLabel3Placeholder")} />
                   </div>
                    <div className='mb-3'>
                    <label htmlFor="">{t("FeedbackLabel4")}</label>
                    <input type="email" className='form-control' placeholder={t("FeedbackLabel4Placeholder")} />
                    </div>
                    <div className='mb-3'>
                    <label htmlFor="">{t("FeedbackLabel5")}</label>
                    <input type="tel" className='form-control' placeholder={t("FeedbackLabel5Placeholder")} />
                    </div>
                    <div className='mb-3'>
                    <label htmlFor="">{t("FeedbackLabel6")}</label>
                    <input type="file" className='form-control' />
                    </div>
                    <div className="text-center mt-4">
                        <button type='submit' className='btn btn-register w-100 rounded-0'>{t("Submit")}</button>
                    </div>
                    <p className='text-center mt-3 mb-2'>{t("FeedbackBelowText1")}</p>
                    <p className='text-center '>
                      <Trans i18nKey="FeedbackBelowText2" components={{b: <b />, Link: <Link className='text-theme' to="#" />}} />
                    </p>

                </form>
            </div>
          </div>
          <Footer />
    </div>
  )
}

export default Feedback