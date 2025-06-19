import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom'

const ThankYou = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

   useEffect(() => {
    const from = location.state?.from;

    if (!from) {
      // If direct URL access -> send to homepage
      navigate('/');
      return;
    }

    let redirectPath;
    switch (from) {
      case 'apply':
        redirectPath = '/jobs';
        break;
      case 'contact':
        redirectPath = '/contact';
        break;
      case 'feedback':
        redirectPath = '/feedback'; 
        break;
      default:
        redirectPath = '/';
    }

    const timer = setTimeout(() => {
      navigate(redirectPath);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location, navigate]);

  return (
    <>
        <div className="thank-you vh-100">
            <div className="container h-100">
                <div className="card border-0 d-flex align-items-center justify-content-center text-center">
                  <img src="/images/thank-you.webp" alt="check_image" />
                  <h1 className='text-theme'>{t("ThankYou")}</h1>
                  <h5 className='mb-3'>{t("SuccessMessage")}</h5>
                  <h6>{t("Redirecting")}</h6>
                </div>
            </div>
        </div>
    </>
  )
}

export default ThankYou