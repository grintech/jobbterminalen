import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Formik, Form, Field } from 'formik';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../store/authContext';

const Feedback = () => {
  const { t } = useTranslation();
  const { user } = useAuthContext();

  const API_URL = import.meta.env.VITE_API_URL;
  const bearerKey = import.meta.env.VITE_BEARER_KEY;

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('issue_type', values.issue_type);
    formData.append('description', values.description);
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone_no', values.phone_no);
    formData.append('user_id', user?.id || '' );
    formData.append('file', values.file);

    try {
      const response = await fetch(`${API_URL}/feedback.php`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerKey}`
        },
        body: formData,
      });

      const resData = await response.json();

      if (resData.type === 'success') {
        toast.success(resData.message || 'Feedback submitted!');
        resetForm();
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
          <p className='text-muted mb-2 fs-6 mb-3'>{t("FeedbackText")}</p>

          <Formik
            enableReinitialize
            initialValues={{
              issue_type: '',
              description: '',
              name: user?.name || '',
              email: user?.email || '',
              phone_no: user?.phone || '',
              file: null,
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
                </div>

                <div className='mb-3'>
                  <label>{t("FeedbackLabel2")}</label>
                  <Field as="textarea" name="description" className='form-control' rows="5" placeholder={t("FeedbackLabel2Placeholder")} />
                </div>

                <div className='mb-3'>
                  <label>{t("FeedbackLabel3")}</label>
                  <Field type="text" name="name" className='form-control' placeholder={t("FeedbackLabel3Placeholder")} />
                </div>

                <div className='mb-3'>
                  <label>{t("FeedbackLabel4")}</label>
                  <Field type="email" name="email" className='form-control' placeholder={t("FeedbackLabel4Placeholder")} />
                </div>

                <div className='mb-3'>
                  <label>{t("FeedbackLabel5")}</label>
                  {/* <Field type="tel" name="phone_no" className='form-control' placeholder={t("FeedbackLabel5Placeholder")} /> */}
                  <Field name="phone_no">
                    {({ field, form }) => (
                      <input
                        type="tel"
                        {...field}
                        className="form-control"
                        placeholder={t("FeedbackLabel5Placeholder")}
                        onChange={(e) => {
                          const input = e.target.value;
                          if (/^[0-9+]*$/.test(input)) {
                            form.setFieldValue("phone_no", input);
                          }
                        }}
                      />
                    )}
                  </Field>

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

                {/* <div className="text-center mt-4">
                  <button type='submit' className='btn btn-register w-100 rounded-0'>
                    {t("Submit")}
                  </button>
                </div> */}
                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-register w-100 rounded-0"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : null}
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Feedback;
