import React, { useEffect, useState } from "react";
import "./Main.css";
import "../App.css";
import { NavLink } from "react-router-dom";
import { realtimeDb } from "../firebase/Firebase";
import { ref, get } from "firebase/database";

const Main = () => {
  const [customerImages, setCustomerImages] = useState([]);
  const [heroImages, setHeroImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const customerRef = ref(realtimeDb, "Images");
      const heroRef = ref(realtimeDb, "Hero");
      try {
        const snapshot1 = await get(customerRef);
        const snapshot2 = await get(heroRef);

        const data1 = snapshot1.val();
        const data2 = snapshot2.val();

        const images1 = data1 ? Object.values(data1) : [];
        const images2 = data2 ? Object.values(data2) : [];

        setCustomerImages(images1);
        setHeroImages(images2);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleScroll = () => {
    document.getElementById("meals").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-hero">
      <div className="hero">
        <div className="hero-text-box">
          <h1 className="heading-primary">
            A healthy meal delivered to your door, every single day
          </h1>
          <p className="hero-description">
            The smart 365-days-per-year food subscription that will make you eat
            healthy again. Tailored to your personal tastes and nutritional
            needs.
          </p>
          <NavLink to="/login" className="btns btn--full">
            Start eating well
          </NavLink>
          <button onClick={handleScroll} className="btns btn--outline">
            Learn more &darr;
          </button>

          <div className="delivered-meals">
            <div className="delivered-imgs">
              {customerImages.map((customer, index) => (
                <img key={index} src={customer.img} alt={customer.alt} />
              ))}
            </div>
            <p className="delivered-text">
              <span>250,000+</span> meals delivered last year!
            </p>
          </div>
        </div>
        <div className="hero-img-box">
          {heroImages.map((hero, index) => (
            <img
              key={index}
              src={hero.img}
              className="hero-img"
              alt={hero.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Main;
