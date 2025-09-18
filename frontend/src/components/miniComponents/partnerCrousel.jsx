import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const PartnersCarousel = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=12')
      .then(res => res.json())
      .then(data => {
        const formatted = data.users.map(user => ({
          name: `${user.firstName} ${user.lastName}`,
          logo: user.image,
        }));
        setPartners(formatted);
      })
      .catch(err => console.error('Error fetching partners:', err));
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4 scroll-mt-16" id="partners">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          We Work With Our Partners To Provide Project Perfection,
        </h2>
        <p className="text-orange-600 dark:text-orange-400 font-medium text-lg mb-8">
          Join With Our Partnership.
        </p>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          speed={1000}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {partners.map((partner, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 h-32 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-20 w-auto object-contain rounded-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PartnersCarousel;
