import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAuthContext } from '../store/authContext';
import { useTranslation } from 'react-i18next';
import Avatar from 'react-avatar';


const SponsorCompanies = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [industries, setIndustries] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [savedCompanies, setSavedCompanies] = useState([]); // Ensure it's initialized as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const { user } = useAuthContext();
  const userId = user ? user.id : null;

  const { t } = useTranslation();
  const navigate = useNavigate();


  // Fetch industries from the API
  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}/get_industries.php`, {
      headers: {
        Authorization: `Bearer ${bearerKey}`,
        "Content-Type": "multipart/form-data",
      }
    })
      .then((response) => {
        if (response.data.type === 'success') {
          setIndustries(response.data.industries);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching industries:', error);
        setError('No companies found');
        setLoading(false);
      });
  }, []);

  // Fetch companies from the API
  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}/get_companies.php?type=all`, {
      headers: {
        Authorization: `Bearer ${bearerKey}`,
        "Content-Type": "multipart/form-data",
      }
    })
      .then((response) => {
        if (response.data.type === 'success') {
          setCompanies(response.data.companies);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
        setError('No companies found.');
        setLoading(false);
      });
  }, []);

  // Fetch saved (bookmarked) companies for the user after page refresh
  useEffect(() => {
    if (userId) {
      axios.get(`${API_URL}/bookmarked-companies-list.php?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
          "Content-Type": "multipart/form-data",
        }
      })
        .then((response) => {
          if (response.data.type === 'success') {
            // console.log("Fetched Saved Companies: ", response.data.data); 
            setSavedCompanies(response.data.data || []); // Ensure it's an array
          }
        })
        .catch((error) => {
          console.error('Error fetching saved companies:', error);
        });
    }
  }, [userId]);

  // Toggle save/unsave company
  const toggleSaveCompany = async (companyId) => {
    if (!userId) {
      toast.error("Please login to save companies.");
      setTimeout(() => {
        navigate('/login')
      }, 2000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("company_id", companyId);

      const response = await axios.post(`${API_URL}/bookmark-companies.php`, formData, {
        headers: {
          Authorization: `Bearer ${bearerKey}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.type === 'success') {
        const actionMessage = isCompanySaved(companyId) ? "Company Unsaved" : "Company Saved";
        toast.success(actionMessage);

        setSavedCompanies((prevSavedCompanies) => {
          if (isCompanySaved(companyId)) {
            return prevSavedCompanies.filter((company) => company.company_id !== companyId); // Use company_id for correct filtering
          } else {
            return [...prevSavedCompanies, { company_id: companyId }]; // Ensure saved companies have company_id
          }
        });
      } else {
        toast.error(`Failed to save company: ${response.data.message}`);
      }
    } catch (err) {
      console.error("Error while toggling saved company:", err);
      toast.error("Error while saving company. Please try again.");
    }
  };

  // Check if the company is saved by comparing company_id
  const isCompanySaved = (companyId) => {
    // Ensure savedCompanies is an array before calling .some()
    if (Array.isArray(savedCompanies)) {
      return savedCompanies.some((savedCompany) => savedCompany.company_id === companyId); // Compare company_id
    }
    return false;
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Filter companies based on the active tab (industry)
  const filteredCompanies = activeTab === 'All'
    ? companies
    : companies.filter(company => company.company_industry === activeTab);

  return (
    <>
      <div className="sponsor_companies container py-5">
        <h4 className="text-center">{t("SponserCompanies")}</h4>


        {/* Loading and Error States */}
        {loading ? (
          <div className="text-center my-5">
            <div className="loading-screen d-flex flex-column justify-content-center align-items-center">
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className='mt-2'>Fetching data...</p>
            </div>
          </div>
        ) : error ? (
          <div className='text-center text-theme'>
            <img src="/images/no-company.webp" className='no_data' alt='' />
            <p>{error === "No companies found." ? "No companies available at the moment." : error}</p>
          </div>
        ) : (
          <>

            <ul className="d-flex justify-content-center flex-wrap p-0 mt-3 all_comp_tabs">
              <li
                key="All"
                className={`btn ${activeTab === 'All' ? 'active' : ''}`}
                onClick={() => handleTabClick('All')}
              >
                All
              </li>

              {/* Industry tabs */}
              {industries.slice(0, 7).map((industry) => (
                <li
                  key={industry.slug}
                  className={`btn ${activeTab === industry.slug ? 'active' : ''}`}
                  onClick={() => handleTabClick(industry.slug)}
                >
                  {industry.title}
                </li>
              ))}
            </ul>

            {/* Companies Display */}
            <div className="row justify-content-center mt-5">
              {filteredCompanies && filteredCompanies.map((company) => (
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={company.id}>
                  <div className="card h-100">
                    <div className="card-body text-center">
                      {/* <img
                      src={company.company_profile ? `${IMG_URL}/${company.company_profile}` : '/images/company3.gif'}
                      alt="company-logo"
                      className="img-fluid"
                    /> */}

                      {!company.company_profile  ? (
                        <Avatar
                          name={company.company_name}
                          size="55"
                          round={true}
                          //  color={'#003479ed'}
                          fgColor="#fff"
                          textSizeRatio={2}
                        />
                      ) : (<img src={`${IMG_URL}/${company.company_profile}`}
                        alt={company.company_name} />)}


                      <div className="my-3 job_desc">
                        <Link to={`/companies/${company.slug}`}>
                          <h5 className="m-0">{company.company_name}</h5>
                        </Link>
                      </div>

                      {/* <p className='text-capitalize'>{company.company_industry.replace(/-/g, ' ')}</p> */}
                      <p className='text-capitalize'>{company.company_industry.replace(/-/g, ' ')}</p>
                      <p className="main_desc">{company.company_tagline}</p>
                      <div className="d-flex justify-content-center align-items-center">
                        <Link to={`/companies/${company.slug}`} className="btn btn-login mx-2">
                         {t("ViewMore")}
                        </Link>
                        <div
                          className="save_post mx-2"
                          style={{ cursor: 'pointer' }}
                          onClick={() => toggleSaveCompany(company.id)}
                        >
                          <i
                            className={`fa-heart ${isCompanySaved(company.id) ? 'fa-solid' : 'fa-regular'}`}
                            title={
                              isCompanySaved(company.id) ? "Click to unsave" : "Click to save"
                            }
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center">
              <Link to="/companies" className="btn btn-login px-4">
                {t("ViewAllCompanies")}
              </Link>
            </div>
          </>
        )}
      </div>

      <ToastContainer
        position="top-right"
        // autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>

  );
};

export default SponsorCompanies;
