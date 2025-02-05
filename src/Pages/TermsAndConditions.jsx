import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const TermsAndConditions = () => {
  return (
    <>
        <div className="terms_page">
          <Navbar />
          <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
           <h1 className="fw-bold position-relative">Terms And Conditions</h1>
          </div>
     
          <div className="terms_section py-4">
            <div className="container">
              <div className="col-12">
                <div className='py-4 border-bottom'>
                <h3 className='mb-3'>Terms and Conditions</h3>
                <p className='mb-2'><strong>Effective Date: </strong>[Insert Date]</p>
                <p className='mb-2'>Welcome to [ Website Name]! By accessing or using our job portal (the “Service”), you agree to be bound by these Terms and Conditions. Please read them carefully before using our platform.</p>
                </div>

                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>1. Definitions</h4>
              <ul className=''>
                <li className='mb-2'><strong>Job Seeker:</strong> An individual registering on the platform to search and apply for job opportunities.
                </li>
                <li className='mb-2'><strong>Recruiter/Employer:</strong> An individual or entity posting job opportunities or seeking candidates for employment.</li>
                <li className='mb-2'><strong>User:</strong> Refers to both Job Seekers and Recruiters collectively.</li>
                <li className='mb-2'><strong>We/Us/Our:</strong> Refers to [ Website Name], the owner and operator of this job portal.</li>
              </ul>
                </div>
                
                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>2. Acceptance of Terms</h4>
                <p className="mb-2">By using the Service, you confirm that you:</p>
                <ul className=''>
                  <li className='mb-2'>Have read and understood these terms. </li>
                  <li className='mb-2'>Agree to comply with all applicable laws and regulations.</li>
                  <li className='mb-2'>Are at least 18 years old or of legal working age in your jurisdiction.</li>
                </ul>
                <p>If you do not agree to these terms, you must not use the Service.</p>
                </div>
                
                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>3. Account Registration</h4>
                <ul className=''>
                  <li className='mb-2'>Users must provide accurate and complete information during registration.</li>
                  <li className='mb-2'>You are responsible for maintaining the confidentiality of your login credentials.</li>
                  <li className='mb-2'>We reserve the right to suspend or terminate accounts if false information is provided or these Terms are violated.</li>
                </ul>
                </div>
                
                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>4. User Responsibilities</h4>
                <h6 className='mb-2 fw-bold'>For Job Seekers:</h6>
                <ul className=''>
                  <li className='mb-2'>You agree to provide truthful and accurate information in your resume and profile.</li>
                  <li className='mb-2'>You will not use the platform to solicit, spam, or engage in fraudulent activities.</li>
                </ul>
                <h6 className='mb-2 fw-bold'>For Recruiters:</h6>
                <ul className=''>
                  <li className='mb-2'>You are responsible for ensuring that job postings comply with all applicable laws, including labor laws and anti-discrimination regulations.</li>
                  <li className='mb-2'>You will not post false or misleading job advertisements.</li>
                </ul>
                </div>

                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>5. Prohibited Activities</h4>
                <p className="mb-2">Users must not:</p>
                <ul className=''>
                  <li className='mb-2'>Upload or distribute harmful, unlawful, or offensive content.</li>
                  <li className='mb-2'>Impersonate any person or entity.</li>
                  <li className='mb-2'>Attempt to hack or disrupt the functionality of the platform.</li>
                  <li className='mb-2'>Collect data or information about other users without consent..</li>
                </ul>
                </div>

                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>6. Fees and Payments</h4>
                <ul className=''>
                  <li className='mb-2'>Certain services may require payment, such as premium job postings or featured profiles.</li>
                  <li className='mb-2'>All fees are non-refundable unless explicitly stated otherwise.</li>
                </ul>
                </div>

                <div className='py-4 border-bottom'>
                  <h4 className='mb-3'>7. Privacy Policy</h4>
                  <p className="mb-2">Our Privacy Policy explains how we collect, use, and protect your personal information. By using the Service, you consent to the practices described in our<Link to='/privacy-policy'> Privacy Policy.</Link> </p>
                </div>

                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>8. Limitation of Liability</h4>
                <ul className=''>
                  <li className='mb-2'>We are not responsible for the accuracy, legality, or validity of job postings or user profiles.</li>
                  <li className='mb-2'>We do not guarantee that Job Seekers will secure employment or that Employers will find suitable candidates.</li>
                  <li className='mb-2'>We are not liable for any loss or damage resulting from your use of the platform.</li>
                </ul>
                </div>

                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>9. Intellectual Property</h4>
                <ul className=''>
                  <li className='mb-2'>All content, trademarks, and materials on the platform are the property of [ Website Name] unless otherwise stated.</li>
                  <li className='mb-2'>Users may not reproduce, modify, or distribute platform content without prior written consent.</li>
                </ul>
                </div>

                <div className='py-4 border-bottom'>
                  <h4 className='mb-3'>10. Termination of Service</h4>
                  <p className="mb-2">We reserve the right to suspend or terminate your account at our discretion if you violate these Terms or engage in prohibited activities.</p>
                </div>

                <div className='py-4 border-bottom'>
                  <h4 className='mb-3'>11. Amendments</h4>
                  <p className="mb-2">We may update these Terms from time to time. The latest version will always be available on our website. Your continued use of the Service after changes signifies your acceptance of the updated Terms.</p>
                </div>

                <div className='py-4 border-bottom'>
                <h4 className='mb-3'>12. Contact Information</h4>
                <p className="mb-2">For questions about these Terms and Conditions, you may contact us at:</p>
                <ul className=''>
                  <li className='mb-2'>[Website Name]</li>
                  <li className='mb-2'><strong>Email:</strong> [Insert Email Address]</li>
                  <li className='mb-2'><strong>Phone:</strong> [Insert Phone Number]</li>
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