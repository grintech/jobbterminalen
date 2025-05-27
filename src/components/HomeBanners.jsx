import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomeBanners = () => {
  const [banners, setBanners] = useState([]);

  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${API_URL}/banner-ads.php`, {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        });
        
        const rawResponse = response.data;
        const splitResponse = rawResponse.split('}{').map((item, index, array) => {
          if (index === 0) return item + '}';
          if (index === array.length - 1) return '{' + item;
          return '{' + item + '}';
        });
        
        const parsedData = splitResponse.map(item => JSON.parse(item));
        
        const formattedArray = parsedData.map(item => {
            return {
                type: item.type,
                message: item.message,
                data: {
                    id: item.data.id,
                    title: item.data.title,
                    image_url: item.data.image_url,
                    redirect_url: item.data.redirect_url,
                    placement: item.data.placement,
                }
            };
        });

        // console.log(banners);
        setBanners(formattedArray[0].data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div>
      <div id="banners" className="container pb-5">
        <div className="row banner_images">
          {Array.isArray(banners) && banners.length > 0 ? (
            banners.map((banner) => (
              <div className="row" key={banner.id}>
                {/* Banner Image */}
                <div className="col-lg-12 col-md-12 mb-4 mb-lg-0">
                  <Link to={banner.redirect_url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`${IMG_URL}/${banner.image_url}`}
                      className="img-fluid w-100 rounded-4"
                      alt={banner.title}
                    />
                  </Link>
                </div>
              </div>
            ))
          ) : banners ? (
            // Handle case where `banners` is a single object
            <div className="row">
              <div className="col-lg-12 col-md-12 mb-4 mb-lg-0">
                <Link to={banners.redirect_url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`${IMG_URL}/${banners.image_url}`}
                    className="img-fluid w-100 rounded-4"
                    alt={banners.title}
                  />
                </Link>
              </div>
            </div>
          ) : (
            <p>No banners available</p>
          )}
        </div>
      </div>
    </div>
  );  
};

export default HomeBanners;
