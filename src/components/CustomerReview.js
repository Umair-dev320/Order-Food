import React, { useState, useEffect } from "react";
import { realtimeDb } from "../firebase/Firebase";
import { ref, onValue } from "firebase/database";
import "./CustomerReview.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentReviews, setCurrentReviews] = useState([0, 1, 2]);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Set the duration
    });

    const reviewsRef = ref(realtimeDb, "Customer Review ");
    onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.values(data);
        setReviews(formattedData);
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviews((prevIndexes) => {
        const nextIndexes = [...prevIndexes];
        const lastIndex = prevIndexes[prevIndexes.length - 1];
        nextIndexes.shift();
        nextIndexes.push((lastIndex + 1) % reviews.length);
        return nextIndexes;
      });
    }, 12000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <section className="reviews-section">
      <h2 className="reviews-heading" data-aos="fade-up">
        Customer Reviews
      </h2>
      <div
        className="reviews-container"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        {currentReviews.map((index) => (
          <div key={index} className="review-card">
            <img
              src={reviews[index]?.img}
              alt={reviews[index]?.name}
              className="review-img"
            />
            <h3 className="review-name">{reviews[index]?.name}</h3>
            <p className="review-text">{reviews[index]?.text}</p>
            <div className="review-rating">
              {[...Array(Math.floor(reviews[index]?.rating || 0))].map(
                (any, i) => (
                  <FaStar key={i} className="star-icon" />
                )
              )}
              {reviews[index]?.rating % 1 !== 0 && (
                <FaStarHalfAlt className="star-icon" />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
