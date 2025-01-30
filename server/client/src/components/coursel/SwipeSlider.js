// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";
// import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

// const SwiperSlider = () => {
//   return (
//     <>
//       <div className="container">
//         <Swiper
//           effect={"coverflow"}
//           grabCursor={true}
//           centeredSlides={true}
//           loop={true}
//           slidesPerView={"auto"}
//           coverflowEffect={{
//             rotate: 0,
//             stretch: 0,
//             depth: 100,
//             modifier: 2.5,
//           }}
//           pagination={{ el: ".swiper-pagination", clickable: true }}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//           }}
//           modules={[EffectCoverflow, Pagination, Autoplay]}
//           className="swiper_container"
//         >
//           <SwiperSlide>
//             <img src={banana} alt="banana" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img src={pineapple} alt="pineapple" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img src={dragon} alt="dragon" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img src={malta} alt="malta" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img src={papaya} alt="papaya" />
//           </SwiperSlide>

//           <div className="swiper-pagination"></div>
//         </Swiper>
//       </div>
//     </>
//   );
// };

// export default SwiperSlider;


import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner from "../../assets/banner.jpg";
import dovebanner from "../../assets/dovebanner.webp";
import malta from "../../assets/malta.JPG";
import papaya from "../../assets/papaya.JPG";
import './Carousel.css'; 

const SwiperSlider = () => {
  const settings = {
    // dots: true,
    infinite: true,
    // speed: 1500, // Increase transition speed for slower transitions
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 3000,
    cssEase: 'ease-in-out', // CSS easing function for smooth transitions
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div>
          <img src={dovebanner} alt="Slide 2" />
        </div>
        <div>
          <img src={banner} alt="Slide 1" />
        </div>
        <div>
          <img src={banner} alt="Slide 3" />
        </div>
        <div>
          <img src={malta} alt="Slide 4" />
        </div>
        <div>
          <img src={papaya} alt="Slide 5" />
        </div>

      </Slider>
    </div>
  );
};

export default SwiperSlider;

