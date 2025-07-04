import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BannerSkeleton from "./skeleton/BannerSkeleton";

const AdvertisementBanner = () => {
  const bearerKey = import.meta.env.VITE_BEARER_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const cacheKey = "home_top_banners";
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      // If cache is valid (1 hour = 3600000 ms)
      if (now - timestamp < 60 * 60 * 1000) {
        setBanners(data);
        setLoading(false);
        return;
      }
    }

    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${API_URL}/banner-ads.php`, {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.type === "success" && Array.isArray(response.data.data)) {
          const filtered = response.data.data.filter(b => b.placement === "home_top");
          setBanners(filtered);

          //  Save to localStorage
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ data: filtered, timestamp: Date.now() })
          );
        } else {
          console.log("Unexpected API response");
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return (
    <>
      {loading ? (
        //  <div className="text-center my-5">
        //     <div className="loading-screen d-flex flex-column justify-content-center align-items-center">
        //       <div className="spinner-grow text-primary" role="status">
        //         <span className="visually-hidden">Loading...</span>
        //       </div>
        //       <p className='mt-2'>Please wait...</p>
        //     </div>
        //   </div>
        <div className="col-12">
          <BannerSkeleton />
        </div>
      ) : banners.length > 0 ? (
        <div className="banner_sideImage">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={3000}
            loop={true}
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={index}>
                <Link
                  to={banner.redirect_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${IMG_URL}/${banner.image_url}`}
                    className="img-fluid w-100 rounded-4"
                    alt={banner.title}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="text-center py-4">{t("NoBannerAvailable")}</div>
      )}
    </>
  );
};

export default AdvertisementBanner;
