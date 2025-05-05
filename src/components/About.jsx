import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'


const About = () => {
    const { t } = useTranslation();

  return (
    <>  
      <Helmet>
        <title>About JobbTerminalen - Your Trusted Job Portal in Sweden</title>
        <meta name="description" content="Learn more about JobbTerminalen, Sweden's leading job portal connecting job seekers with top employers. Find your dream job with us!" />
        <meta name="keywords" content="About JobbTerminalen, job portal Sweden, career opportunities, employment platform, job search, hiring solutions" />
      </Helmet>

        <div className="about_page">
            <Navbar />
            <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
                <h1 className='fw-bold position-relative'>{t("AboutTitle")}</h1>
             </div>
             {/* <div className="position-relative"><div className="shape overflow-hidden text-white"><svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path></svg></div></div> */}

            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-lg-5 mb-4 mb-lg-0">
                       <div className="row ">
                        <div className="col-7 ">
                        <img src="/images/bg1.png" loading="lazy" style={{objectFit:"cover"}} className='w-100 h-100' alt="about1" />
                        </div>
                        <div className="col-5 h-100">
                         <img src="/images/about1.jpg" loading="lazy" className='w-100 mb-3' alt="about2" />
                         <img src="/images/about2.jpg" loading="lazy" className='w-100' alt="about3" />
                        </div>
                       </div>
                    </div>
                    <div className="col-lg-6 offset-lg-1 about_right">
                        <h2 className=''>{t("AboutHead")}<br/>{t("AboutHead1")}</h2>
                        <p className="text-muted">{t("AboutText")}</p>
                        <ul className="list-unstyled text-muted mb-0 mt-3"><li className="mb-1"><span className="text-primary h5 me-2"><i className="fa-solid fa-check-circle"></i></span>{t("Aboutlist1")}</li><li className="mb-1"><span className="text-primary h5 me-2"><i className="fa-solid fa-check-circle"></i></span>{t("Aboutlist2")}</li><li className="mb-1"><span className="text-primary h5 me-2"><i className="fa-solid fa-check-circle"></i></span>{t("Aboutlist3")}</li></ul>
                    </div>
                </div>
                <div className="mt-5 py-4">
                 <div className="col-lg-7 col-md-9 col-12 text-center mx-auto">
                 <h4 className='text-center'>{t("AboutHead2")}</h4>
                 <p className="text-muted ">{t("AboutText2")}</p>
                 </div>

                 <div className="row  contact_us_details mt-4">
                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body rounded-3 text-center ">
                              <div className="contact_icon shadow rounded-2 mb-3">
                              <i className="fa-solid fa-phone"></i>
                              </div>
                                <h5>{t("AboutSmallHead1")}</h5>
                                <p className="text-muted">{t("AboutSmltext1")}</p>
                                {/* <Link className='text-primary'>{t("Readmore")} <i className="fa-solid fa-arrow-right"></i></Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body rounded-3 text-center ">
                              <div className="contact_icon shadow rounded-2 mb-3">
                              <i className="fa-solid fa-microchip"></i>
                              </div>
                              <h5>{t("AboutSmallHead2")}</h5>
                                <p className="text-muted">{t("AboutSmltext2")}</p>
                                {/* <Link className='text-primary'>{t("Readmore")} <i className="fa-solid fa-arrow-right"></i></Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body rounded-3 text-center ">
                              <div className="contact_icon shadow rounded-2 mb-3">
                              <i className="fa-solid fa-chart-line"></i>
                              </div>
                              <h5>{t("AboutSmallHead3")}</h5>
                                <p className="text-muted">{t("AboutSmltext3")}</p>
                                {/* <Link className='text-primary'>{t("Readmore")} <i className="fa-solid fa-arrow-right"></i></Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body rounded-3 text-center ">
                              <div className="contact_icon shadow rounded-2 mb-3">
                              <i className="fa-regular fa-clock"></i>
                              </div>
                              <h5>{t("AboutSmallHead4")}</h5>
                                <p className="text-muted">{t("AboutSmltext4")}</p>
                                {/* <Link className='text-primary'>{t("Readmore")} <i className="fa-solid fa-arrow-right"></i></Link> */}
                            </div>
                        </div>
                    </div>
                  
                </div>
                </div>
                <div className="mt-5 py-4 bg-white">
                 <div className="col-lg-7 col-md-9 col-12 text-center mx-auto p-3">
                 <h4 className='text-center'>{t("CallActionHead")}</h4>
                 <p className="text-muted ">{t("CallActionText")}</p>
                 <Link to='/contact' className='btn btn-register fs-6 px-4 py-2 '>{t("CallActionBtn")}</Link>
                 </div>
                 </div>
            </div>

          <Footer />

        </div>
    </>
  )
}

export default About