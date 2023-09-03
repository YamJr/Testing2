import React from "react";
import about_us from "../assets/images/about-us.jpg"
import about_us_2 from "../assets/images/about-us-2.jpg"

const AboutUs = () => {
  return (
    <div className="text-center about-us-parent">
        <h3 className="page-title">About ShenFurniture</h3>
      <div className="about-us-container">
        <div className="top-row">
          <div className="left-image">
            <img src={about_us_2} alt="AgriMart" className="agrimart-image" />
          </div>
          <div className="right-content">
            <p>
            Welcome to ShenFurniture, where quality craftsmanship meets timeless elegance. 
            We are more than just a furniture company; we are your partner in creating beautiful
             and functional living spaces that reflect your unique style and personality.
            </p>
            <p>
            At ShenFurniture, our mission is simple: to provide our customers with the finest handcrafted furniture that combines artistry, durability, and functionality.
            </p>
          </div>
        </div>
        <div className="bottom-row">
          <div className="left-content">
            <h3>Our Vision</h3>
            <p>
            At ShenFurniture, our vision is to transform spaces into timeless havens of comfort and beauty, where every piece of furniture becomes a masterpiece of craftsmanship and design. 
            </p>
          </div>
          <div className="right-image">
            <img src={about_us} alt="AgriMart" className="agrimart-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
