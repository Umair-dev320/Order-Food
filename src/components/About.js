import { useEffect, useState } from "react";
import "./About.css";
import { realtimeDb } from "../firebase/Firebase";
import { ref, get } from "firebase/database";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  const [grilImages, setGrilImages] = useState([]);
  const [foodImages, setFoodImages] = useState([]);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Set the duration
    });

    const fetchImages = async () => {
      const grilRef = ref(realtimeDb, "AboutImage");
      const foodRef = ref(realtimeDb, "FoodImage");
      try {
        const snapshot1 = await get(grilRef);
        const snapshot2 = await get(foodRef);

        const data1 = snapshot1.val();
        const data2 = snapshot2.val();

        const images1 = data1 ? Object.values(data1) : [];
        const images2 = data2 ? Object.values(data2) : [];

        setGrilImages(images1);
        setFoodImages(images2);
        // Refresh AOS after images are fetched and loaded
        AOS.refresh();
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-image" data-aos="fade-right">
          {grilImages.map((about, index) => (
            <img
              key={index}
              src={about.img}
              className="girl-img"
              alt={about.alt}
            />
          ))}
        </div>
        <div className="about-content">
          <h2 className="about-heading" data-aos="fade-up">
            About Us
          </h2>
          <p className="about-text" data-aos="fade-up">
            Welcome to OmniFood! We are passionate about bringing you the
            finest, freshest, and most delicious meals from around the world.
            Our chefs use only the highest quality ingredients to create dishes
            that are not only tasty but also nutritious.
          </p>
          <p className="about-text" data-aos="fade-up">
            Whether you're craving a comforting classic or something new and
            exciting, our menu has something for everyone. We believe in
            sustainability, and we work with local farmers to source fresh
            produce whenever possible.
          </p>
          <p className="about-text" data-aos="fade-up">
            At OmniFood, we are committed to providing excellent customer
            service and ensuring that your dining experience is nothing short of
            exceptional. Thank you for choosing us to satisfy your cravings!
          </p>
          <div className="food-images" data-aos="fade-up-left">
            {foodImages.map((food, index) => (
              <img
                key={index}
                src={food.img}
                alt={food.alt}
                className="food-img"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
