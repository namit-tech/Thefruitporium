// import React from "react";
// import maltaaa from "../../../assets/malta.JPG";
// import "./banner.css";
// const Banner = () => {
//   return (
//     <>
//       <div className="banner-main">
//         <div className="Banner">
//           <img src={maltaaa} alt="" />
//         </div>
//         <div className="Banner">
//           <img src={maltaaa} alt="" />
//         </div>
//         <div className="Banner">
//           <img src={maltaaa} alt="" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Banner;

// import React from "react";
// import maltaaa from "../../../assets/malta.JPG";
// import "./banner.css";

// const Banner = () => {
//   return (
//     <>
//       <div className="banner-main">
//         <div className="Banner">
//           <img src={maltaaa} alt="" />
//           <div className="fade-square"></div>
//         </div>
//         <div className="Banner">
//           <img src={maltaaa} alt="" />
//           <div className="fade-square"></div>
//         </div>
//         <div className="Banner">
//           <img src={maltaaa} alt="" />
//           <div className="fade-square"></div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Banner;


import React from "react";
// import maltaaa from "../../../assets/malta.JPG"; // Ensure the path is correct
import banner1 from "../../../assets/smallonr.avif"
import banner2 from "../../../assets/smalltwo.avif"
import banner3 from "../../../assets/smallthree.avif"
import "./banner.css";

const Banner = () => {
  return (
    <div className="banner-main">
      <div className="Banner">
        <img src={banner1} alt="Fruit" />
        <div className="plus fade-horizontal"></div>
        <div className="plus fade-vertical"></div>
      </div>
      <div className="Banner">
        <img src={banner2} alt="Fruit" />
        <div className="plus fade-horizontal"></div>
        <div className="plus fade-vertical"></div>
      </div>
      <div className="Banner">
        <img src={banner3} alt="Fruit" />
        <div className="plus fade-horizontal"></div>
        <div className="plus fade-vertical"></div>
      </div>
    </div>
  );
};

export default Banner;


