import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useTranslation, Trans } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../store/authContext';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

const Feedback = () => {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const bearerKey = import.meta.env.VITE_BEARER_KEY;

  const [initialValues, setInitialValues] = useState({
    issue_type: '',
    description: '',
    name: '',
    email: '',
    phone_no: '',
    file: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const name = parsedUser?.name || '';
      const email = parsedUser?.email || '';
      const phone = parsedUser?.phone || '';
   
    setInitialValues(prev => ({
      ...prev,
      name,
      email,
      phone_no: phone,
    }));
   }

  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    if (!user) {
      toast.error("Please login to send feedback!");
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (values.file) {
      if (!allowedTypes.includes(values.file.type)) {
        toast.error('Only JPG, PNG, PDF, and DOCX files are allowed.');
        return;
      }
      if (values.file.size > 2 * 1024 * 1024) {
        toast.error('File size must be 2MB or less.');
        return;
      }
    }

    const formData = new FormData();
    formData.append('issue_type', values.issue_type);
    formData.append('description', values.description);
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone_no', values.phone_no);
    formData.append('user_id', user?.id || '');
    if (values.file) {
      formData.append('file', values.file);
    }

    try {
      const response = await fetch(`${API_URL}/feedback.php`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${bearerKey}` },
        body: formData,
      });

      const resData = await response.json();
      if (resData.type === 'success') {
        // toast.success(resData.message || 'Feedback submitted!');
        resetForm();
        navigate('/thank-you', { state: { from: 'feedback' } });
      } else {
        toast.error(resData.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Something went wrong while submitting.');
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container top_pad py-5">
        <div id='feedback_wrapper' className="col-xxl-5 col-lg-6 col-md-9 col-12 mx-auto">
          <h2 className='fs-3'>{t("FeedbackTitle")}</h2>

          {initialValues.name !== '' ? (
            <>
              <p className='text-muted mb-2 fs-6 mb-3'>{t("FeedbackText")}</p>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validate={(values) => {
                  const errors = {};
                  if (!values.issue_type) errors.issue_type = 'Required';
                  if (!values.description) errors.description = 'Required';
                  if (!values.name) errors.name = 'Required';
                  if (!values.email) errors.email = 'Required';
                  if (!values.phone_no) errors.phone_no = 'Required';
                  return errors;
                }}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, isSubmitting }) => (
                  <Form className='feedback_form'>
                    <div className='mb-3'>
                      <label>{t("FeedbackLabel1")}</label>
                      <Field as="select" name="issue_type" className='form-select'>
                        <option value="">{t("FeedbackSelect")}</option>
                        <option value="Bug Report">{t("FeedbackSelectOption1")}</option>
                        <option value="Problem With The Website">{t("FeedbackSelectOption2")}</option>
                        <option value="Request Information">{t("FeedbackSelectOption3")}</option>
                        <option value="General Feedback">{t("FeedbackSelectOption4")}</option>
                        <option value="Report Abuse">{t("FeedbackSelectOption5")}</option>
                        <option value="Report Fake Jobs Offer">{t("FeedbackSelectOption6")}</option>
                      </Field>
                      <ErrorMessage name="issue_type" component="div" className="text-danger small" />
                    </div>

                    <div className='mb-3'>
                      <label>{t("FeedbackLabel2")}</label>
                      <Field as="textarea" name="description" className='form-control' rows="5" placeholder={t("FeedbackLabel2Placeholder")} />
                      <ErrorMessage name="description" component="div" className="text-danger small" />
                    </div>

                    <div className='mb-3'>
                      <label>{t("FeedbackLabel3")}</label>
                      <Field type="text" name="name" className='form-control' readOnly />
                      <ErrorMessage name="name" component="div" className="text-danger small" />
                    </div>

                    <div className='mb-3'>
                      <label>{t("FeedbackLabel4")}</label>
                      <Field type="email" name="email" className='form-control' readOnly />
                      <ErrorMessage name="email" component="div" className="text-danger small" />
                    </div>

                    <div className='mb-3'>
                      <label>{t("FeedbackLabel5")}</label>
                      <Field name="phone_no">
                        {({ field }) => (
                          <PhoneInput
                            country={'se'}
                            value={field.value}
                            onChange={() => {}}
                            inputClass="form-control"
                            containerClass="react-phone-input"
                            inputStyle={{ width: "100%" }}
                            disabled
                          />
                        )}
                      </Field>
                      <ErrorMessage name="phone_no" component="div" className="text-danger small" />
                    </div>

                    <div className='mb-3'>
                      <label>{t("FeedbackLabel6")}</label>
                      <input
                        name="file"
                        type="file"
                        className='form-control'
                        onChange={(event) => setFieldValue('file', event.currentTarget.files[0])}
                      />
                    </div>

                    <div className="text-center mt-4">
                      <button
                        type="submit"
                        className="btn btn-register w-100 rounded-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting && (
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        )}
                        {isSubmitting ? t("Submitting") : t("Submit")}
                      </button>
                    </div>

                    <p className='text-center mt-3 mb-2'>{t("FeedbackBelowText1")}</p>
                    <p className='text-center'>
                      <Trans i18nKey="FeedbackBelowText2" components={{ b: <b />, Link: <Link className='text-theme' to="#" /> }} />
                    </p>
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            <div className="card mt-4">
             <div className="card-body text-center">
              <img src="/images/feedback.jpg" style={{width:"110px"}} alt="feedback image" />
              <h5 className='text-center mt-2 mb-2 text-theme'> Please Login to send any kind of feedback! </h5>
             </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Feedback;
