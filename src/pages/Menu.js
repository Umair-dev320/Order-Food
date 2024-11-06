import React, { useContext, useEffect, useState } from "react";
import { AddToCartContext } from "../context/AddToCart";
import { realtimeDb } from "../firebase/Firebase";
import { ref, get } from "firebase/database";
import { NavLink } from "react-router-dom";
import "./Menu.css";

const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const Menu = () => {
  const { addToCart, setSelectedProduct } = useContext(AddToCartContext);
  const [meals, setMeals] = useState({
    vegetarianMeals: [],
    desiMeals: [],
    fastFoodMeals: [],
  });

  const fetchMeals = async () => {
    const vegetarianRef = ref(realtimeDb, "ProductDetails/vegetarian");
    const desiRef = ref(realtimeDb, "ProductDetails/desi");
    const fastFoodRef = ref(realtimeDb, "ProductDetails/fastfood");

    try {
      const cachedMeals = JSON.parse(localStorage.getItem("ProductDetails"));
      const cacheTime = localStorage.getItem("cacheTime");

      // If cached data exists and is not expired, use it
      if (
        cachedMeals &&
        cacheTime &&
        Date.now() - cacheTime < CACHE_EXPIRY_TIME
      ) {
        setMeals(cachedMeals);
      } else {
        // Fetch data from Firebase
        const vegetarianSnapshot = await get(vegetarianRef);
        const desiSnapshot = await get(desiRef);
        const fastFoodSnapshot = await get(fastFoodRef);

        const vegetarianData = vegetarianSnapshot.val();
        const desiData = desiSnapshot.val();
        const fastFoodData = fastFoodSnapshot.val();

        const formattedMeals = {
          vegetarianMeals: vegetarianData ? Object.values(vegetarianData) : [],
          desiMeals: desiData ? Object.values(desiData) : [],
          fastFoodMeals: fastFoodData ? Object.values(fastFoodData) : [],
        };

        setMeals(formattedMeals);

        // Cache data in localStorage
        localStorage.setItem("ProductDetails", JSON.stringify(formattedMeals));
        localStorage.setItem("cacheTime", Date.now());
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };
  return (
    <section className="menu-section">
      <h2 className="menu-heading">Our Menu</h2>

      {/* Vegetarian Meals */}
      <div className="menu-category">
        <h3 className="menu-subheading">Vegetarian Meals</h3>
        <div className="menu-items">
          {meals.vegetarianMeals.map((meal) => (
            <div
              key={meal.id}
              onClick={() => handleProductClick(meal)}
              className="menu-item"
            >
              <NavLink to={"/productdetails"}>
                <img
                  src={meal.img1}
                  alt={meal.title}
                  className="menu-item-img"
                />
              </NavLink>
              <h4 className="menu-item-title">{meal.title}</h4>
              <p className="menu-item-detail">{meal.detail}</p>
              <p className="menu-item-price">Rs {meal.price}</p>
              <button
                className="menu-item-button"
                onClick={() => addToCart(meal)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Desi Meals */}
      <div className="menu-category">
        <h3 className="menu-subheading">Desi Meals</h3>
        <div className="menu-items">
          {meals.desiMeals.map((food) => (
            <div
              key={food.id}
              onClick={() => handleProductClick(food)}
              className="menu-item"
            >
              <NavLink to={"/productdetails"}>
                <img
                  src={food.img1}
                  alt={food.title}
                  className="menu-item-img"
                />
              </NavLink>
              <h4 className="menu-item-title">{food.title}</h4>
              <p className="menu-item-detail">{food.detail}</p>
              <p className="menu-item-price">Rs {food.price}</p>
              <button
                className="menu-item-button"
                onClick={() => addToCart(food)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Fast Food Meals */}
      <div className="menu-category">
        <h3 className="menu-subheading">Fast Food Meals</h3>
        <div className="menu-items">
          {meals.fastFoodMeals.map((meal) => (
            <div
              key={meal.id}
              onClick={() => handleProductClick(meal)}
              className="menu-item"
            >
              <NavLink to={"/productdetails"}>
                <img
                  src={meal.img1}
                  alt={meal.title}
                  className="menu-item-img"
                />
              </NavLink>
              <h4 className="menu-item-title">{meal.title}</h4>
              <p className="menu-item-detail">{meal.detail}</p>
              <p className="menu-item-price">Rs {meal.price}</p>
              <button
                className="menu-item-button"
                onClick={() => addToCart(meal)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
