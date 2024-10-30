import React from "react";
import Main from "../components/Main";
import DishCard from "../components/DishCard";
import About from "../components/About";
import CustomerReview from "../components/CustomerReview";

const Home = () => {
  return (
    <>
      <Main />
      <DishCard />
      <About />
      <CustomerReview />
    </>
  );
};

export default Home;
