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
  const [selectedCategory, setSelectedCategory] = useState("All Food");

  const fetchMeals = async () => {
    const vegetarianRef = ref(realtimeDb, "ProductDetails/vegetarian");
    const desiRef = ref(realtimeDb, "ProductDetails/desi");
    const fastFoodRef = ref(realtimeDb, "ProductDetails/fastfood");

    try {
      const cachedMeals = JSON.parse(localStorage.getItem("ProductDetails"));
      const cacheTime = localStorage.getItem("cacheTime");

      if (
        cachedMeals &&
        cacheTime &&
        Date.now() - cacheTime < CACHE_EXPIRY_TIME
      ) {
        setMeals(cachedMeals);
      } else {
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

  const renderMeals = (category, items) => (
    <>
      <h3 className="menu-subheading">{category}</h3>
      <div className="menu-items">
        {items.map((meal) => (
          <div
            key={meal.id}
            onClick={() => handleProductClick(meal)}
            className="menu-item"
          >
            <NavLink to={"/productdetails"}>
              <img src={meal.img1} alt={meal.title} className="menu-item-img" />
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
    </>
  );

  return (
    <section className="menu-section">
      <h2 className="menu-heading">Our Menu</h2>

      {/* Category Dropdown */}
      <div className="category-dropdown">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All Food">All Food</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Desi">Desi</option>
          <option value="Fast Food">Fast Food</option>
        </select>
      </div>

      {/* Render Meals Based on Selected Category */}
      <div className="menu-content">
        {selectedCategory === "All Food" && (
          <>
            {renderMeals("Vegetarian Meals", meals.vegetarianMeals)}
            {renderMeals("Desi Meals", meals.desiMeals)}
            {renderMeals("Fast Food Meals", meals.fastFoodMeals)}
          </>
        )}
        {selectedCategory === "Vegetarian" &&
          renderMeals("Vegetarian Meals", meals.vegetarianMeals)}
        {selectedCategory === "Desi" &&
          renderMeals("Desi Meals", meals.desiMeals)}
        {selectedCategory === "Fast Food" &&
          renderMeals("Fast Food Meals", meals.fastFoodMeals)}
      </div>
    </section>
  );
};

export default Menu;
