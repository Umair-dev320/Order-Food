import React, { useEffect, useState } from "react";
import "./DishCard.css";
import {
  IoFlameOutline,
  IoRestaurantOutline,
  IoStarOutline,
} from "react-icons/io5";
import { realtimeDb } from "../firebase/Firebase";
import { ref, get } from "firebase/database";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";

const DishCard = () => {
  const [dishCard, setDishCard] = useState([]);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // duration for the animations
    });

    const fetchMeals = async () => {
      const mealsRef = ref(realtimeDb, "Dishcard");
      try {
        const snapshot = await get(mealsRef);
        const data = snapshot.val();
        const fetchedMeals = data ? Object.values(data) : [];
        setDishCard(fetchedMeals);
      } catch (error) {
        console.error("Error fetching meals data from Firebase:", error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <section className="section-meals">
      <div className="center-text">
        <span className="subheading" id="meals">
          Meals
        </span>
        <h2 className="heading-secondary" data-aos="fade-up">
          Omnifood AI chooses from 50+ Foods
        </h2>
      </div>

      <div className="dish-contaniner grid-3-cols">
        {dishCard.map((meal, index) => (
          <div
            key={index}
            className="meal"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <NavLink to={"/menu"}>
              <img src={meal.img} className="meal-img" alt={meal.alt} />
            </NavLink>
            <div className="meal-content">
              <div className="meal-tags">
                <span className="tag tag--name">{meal.veg}</span>
              </div>
              <p className="meal-title">{meal.title}</p>
              <ul className="meal-attributes">
                <li className="meal-attribute">
                  <IoFlameOutline className="meal-icon" />
                  <span>
                    <strong>{meal.calories}</strong> calories
                  </span>
                </li>
                <li className="meal-attribute">
                  <IoRestaurantOutline className="meal-icon" />
                  <span>
                    NutriScore &reg; <strong>{meal.nutriScore}</strong>
                  </span>
                </li>
                <li className="meal-attribute">
                  <IoStarOutline className="meal-icon" />
                  <span>
                    <strong>{meal.rating}</strong> rating ({meal.reviews})
                  </span>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="all-recipes" data-aos="fade-up">
        <a href="/menu" className="link">
          See all recipes &rarr;
        </a>
      </div>
    </section>
  );
};

export default DishCard;
