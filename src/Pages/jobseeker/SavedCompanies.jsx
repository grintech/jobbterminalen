import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../store/authContext';
import JobSidebar from './JobSidebar';
import Navbar from '../../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const SavedCompanies = () => {
    const [savedCompanies, setSavedCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saved, setSaved] = useState(false);  
    
    const { user } = useAuthContext();
    const userId = user ? user.id : null;

    const bearerKey = import.meta.env.VITE_BEARER_KEY;
    const API_URL = import.meta.env.VITE_API_URL;
    const IMG_URL = import.meta.env.VITE_IMG_URL;
    const SITE_URL = import.meta.env.VITE_SITE_URL;

    

    useEffect(() => {
        fetchSavedCompanies();
    }, []);

    const fetchSavedCompanies = async () => {
      try {
        const response = await axios.get(`${API_URL}/bookmarked-companies-list.php?user_id=${userId}`, {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log("API Response : " + JSON.stringify(response.data.data));
        if (response.data.type === 'success') {
          setSavedCompanies(response.data.data || []);
          setSaved(response.data.data.status === 'active');
        } else {
          setError('Companies not found');
        }
      } catch (error) {
        console.error('Error fetching saved Companies:', error);
        setError('Error fetching saved Companies:');
      } finally {
        setLoading(false);
      }
    };

    const toggleSavedCompanies = async (companyId) => {
      try {
          const formData = new FormData();
          formData.append('user_id', userId);
          formData.append('company_id', companyId);
  
          const response = await axios.post(`${API_URL}/bookmark-companies.php`, formData, {
              headers: { Authorization: `Bearer ${bearerKey}` },
          });
  
          if (response.data.type === 'success') {
              toast.success(response.data.message);
              fetchSavedCompanies();
          }
      } catch (error) {
          toast.error('Error while saving companies.');
      }
  };

  const isCompanySaved = (companyId) => {
    return Array.isArray(savedCompanies) && savedCompanies.some((savedCompanies) => savedCompanies.company_id === companyId);
  };


    return (
        < div className='account_page'>
            <Navbar />
            <div className="top_pad">
                <div className="container pb-5">
                    <div className="row mt-4">
                        <div className="col-md-3 mb-4 mb-md-0">
                            <JobSidebar />
                        </div>
                        <div className="col-md-9">
                            {loading ? (
                                <div className="text-center">
                                    <div className="spinner-grow text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-2">Fetching data...</p>
                                </div>
                            ) : error ? (
                                <p className="text-danger">{error}</p>
                            ) : savedCompanies.length === 0 ? (
                              <div className="no_saved_jobs mb-4">
                              <div className="card  border-0 shadow">
                                <div className="card-body text-center">
                                  <img
                                    className="job_search mb-3"
                                    src="/images/company_search.png"
                                    alt="job_search"  
                                  />
                                  <h4>No companies saved yet!</h4>
                                  <p>Tap on save icon on a job to save it.</p>
                                  <div className="btn btn-register">Search companies</div>
                                </div>
                              </div>
                            </div>
                            ) : (
                                <div className='row'>
                                    <h1 className=" job_head">Saved companies ({savedCompanies.length})</h1>
                                    {savedCompanies.map((company) => (
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={company.id}>
                                          <div className="card company_list_card border-0 shadow h-100">
                                            <div className="card-body">
                                              <div className="d-flex justify-content-between">
                                                <div className="logo_div me-3 mb-3 shadow ">
                                                  <Link  to={`/companies/${company.company_slug}`}>
                                                    <img
                                                      
                                                      src={`${IMG_URL}/${company.company_profile}`}
                                                      alt={company.company_name}
                                                    />
                                                  </Link>
                                                </div>

                                                  <div className="d-flex align-items-center">
                                                  <button
                                                    className={`btn-light border-0 shadow me-2 ${
                                                      isCompanySaved(company.company_id) ? "btn-primary" : ""
                                                    }`}
                                                    onClick={() => toggleSavedCompanies(company.company_id)}
                                                    title={
                                                      isCompanySaved(company.company_id) ? "Click to unsave" : "Click to save"
                                                    }
                                                  >
                                                    <i
                                                      className={`fa-bookmark ${
                                                        isCompanySaved(company.company_id) ? "fa-solid" : "fa-regular"
                                                      }`}
                                                    ></i>
                                                  </button>
                                                    <Link className="btn-light shadow me-2">
                                                      <i className="fa-solid fa-share"></i>
                                                    </Link>
                                                  </div>
                                                </div>
                                              <div className="pt-2 pb-3">
                                                <Link to={`/companies/${company.company_slug}`}>
                                                  <h5>{company.company_name}</h5>
                                                </Link>
                                                <p className=" m-0">{company.company_tagline}</p>
                                              </div>
                                              <div className="d-flex justify-content-between align-items-baseline border-top pt-3">
                                                <div className="text-muted me-2">
                                                  <i className="fa-solid fa-location-dot me-1 "></i>
                                                  {company.company_address}
                                                </div>
                                                <Link to={`/companies/${company.company_slug}`}>
                                                <p className="text_blue text-center m-0">
                                                  <span className="pe-1">{company.job_count === 0 ? "No" : company.job_count}</span>
                                                  Jobs</p>
                                                </Link>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
               <ToastContainer 
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
            <Footer />
        </div>
    );
};

export default SavedCompanies;