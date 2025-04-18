import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bearerKey = import.meta.env.VITE_BEARER_KEY; 
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  
  useEffect(() => {
    // Load cached data from localStorage first (if available)
    const storedCategories = localStorage.getItem('categories');
    
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
      setLoading(false); // Show cached data immediately
    }
  
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_main_categories.php`, {
          headers: { Authorization: `Bearer ${bearerKey}` },
        });
  
        if (response.data.type === 'success' && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
          
          // ✅ Save fresh data to localStorage
          localStorage.setItem('categories', JSON.stringify(response.data.categories));
        } else {
          setError('Unexpected API response');
        }
      } catch (err) {
        console.error('Error fetching categories:', err.response || err.message);
        setError('Failed to load categories');
      }
      setLoading(false);
    };
  
    fetchCategories();
  }, []);
  

  

  return (
    <div className="popular_categories container pb-4">
      <h4 className="mb-4 text-center">Popular Job Categories</h4>
       {loading ? (
              <div className="loading-screen d-flex flex-column justify-content-center align-items-center">
                <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className='mt-2'>Fetching data...</p>
              </div>
            ) : error ? (
              <div className='text-center text-theme'>
              <img src="/images/no-data.webp" className='no_data' alt='No category' /> 
              <p>{error}</p>
              </div>
            ) : categories.length > 0 ? (
              <>
              <div className="row justify-content-center flex-wrap">
                {categories.slice(0,12).map((category) => (
                  <div key={category.id} className="col-lg-2 col-md-3 col-sm-4 col-4 mb-4">
                    <Link  
                    to={`/job/category/${category.name.trim().toLowerCase().replace(/\s+/g, '-')}`} className="cat_card">
                      <div className="card">
                        <div className="card-body text-center">                      
                          <img src={`${IMG_URL}/${category.image}`} alt={category.name} />
                          <h5 className="mt-3">{category.name}</h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center">
                <Link to="/jobs/category" className="btn btn-login text-theme">
                  View more
                </Link>
              </div>
              </>
            ) : (
              <div className='text-center text-theme'>
               <img src="/images/no-data.webp" className='no_data' alt='No category' /> 
               <p>No categories available at the moment.</p>
              </div>
            ) }

      
    </div>
  );
};

export default Categories;
