import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Filter from '../components/Filter';

const FeaturedEmployers = () => {
  const [featuredCompanies, setFeaturedCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  useEffect(() => {
    const fetchFeaturedCompanies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/featured-companies.php`, {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        if (!response.ok) {
          throw new Error('No Companies Found');
        }
        
        const data = await response.json();

        console.log('API Response:', data);
        if (data.type === 'success') {
          setFeaturedCompanies(data.companies);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCompanies();
  }, []);


  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }


  return (
    <>
        <div className="fea_emp_page">
        <Navbar />
        <div className="hero_banner d-flex flex-column align-items-center justify-content-center ">
          <h1 className="fw-bold position-relative"> Featured Companies</h1>
        </div>

        <div className="container py-5">
          <h3 className="mb-5">Here is the list of featured companies!</h3>
          <div className="row">
         
          <div className="col-lg-12">

            { loading ? (
                 <div className="loading-screen d-flex justify-content-center align-items-center flex-column ">
                 <div className="spinner-grow text-primary" role="status">
                   <span className="visually-hidden">Loading...</span>
                 </div>
                 <p className="mt-2">Fetching data...</p>
               </div>
            ) : error ? (
              <div className="text-center text-theme " >
                <div className='text-center text-theme'>
                  <img src="/images/no-data1.png" className='no_company' alt='' /> 
                  <h6>{error}</h6>
                  </div>
                </div>
            ) : featuredCompanies ? (
                <div className="row mt-4">
                  {featuredCompanies.map((company) => (
                  <div className="col-lg-3 col-md-4 mb-5">
                    <div className="card company_list_card border-0 shadow position-relative h-100">
                      <div className="fea_tag">Featured</div>
                      <div className="card-body ">
                        <div className="logo_div me-3 mb-3 shadow position-relative">
                        <img
                            
                            src={`${IMG_URL}/${company.featured_company.company_profile}`}
                            alt={company.featured_company.company_name}
                        />
                        </div>
                        <div className="py-3">
                          <Link to={`/companies/${company.featured_company.slug}`}>
                            <h5>{company.featured_company.company_name}</h5>
                          </Link>
                          <p className="text-muted m-0">
                            {company.featured_company.company_tagline || 'No tagline available'}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between  border-top pt-3">
                          <div className="text-muted me-2">
                            <i className="fa-solid fa-location-dot me-1 "></i>
                            {company.featured_company.company_address}
                          </div>
                          <p style={{minWidth:"60px"}} className="text_blue m-0">{company.job_count} Jobs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
            ): (
              <div className="text-center text-theme " >
              <div className='text-center text-theme'>
                <img src="/images/no-data1.png" className='no_company' alt='' /> 
                <h6>No companies found at the moment.Please try later.</h6>
                </div>
              </div>
            )
          } 

          </div>

        </div>
         
        </div>

        <Footer />
      </div>
    </>
  );
}

export default FeaturedEmployers;