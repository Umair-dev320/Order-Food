import React, { useState, useEffect } from "react";
import { realtimeDb } from "../firebase/Firebase";
import { ref, get } from "firebase/database";
import "./HowItWorks.css";

const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const Howitworks = () => {
  const [steps1, setSteps1] = useState([]);
  const [steps2, setSteps2] = useState([]);
  const [steps3, setSteps3] = useState([]);

  const fetchSteps = async () => {
    const stepsRef1 = ref(realtimeDb, "howitwork/Image1");
    const stepsRef2 = ref(realtimeDb, "howitwork/Image2");
    const stepsRef3 = ref(realtimeDb, "howitwork/Image3");

    try {
      // Check if cached data exists and is valid
      const cachedSteps1 = JSON.parse(localStorage.getItem("steps1"));
      const cachedSteps2 = JSON.parse(localStorage.getItem("steps2"));
      const cachedSteps3 = JSON.parse(localStorage.getItem("steps3"));
      const cacheTime = localStorage.getItem("cacheTime");

      if (
        cachedSteps1 &&
        cachedSteps2 &&
        cachedSteps3 &&
        cacheTime &&
        Date.now() - cacheTime < CACHE_EXPIRY_TIME
      ) {
        setSteps1(cachedSteps1);
        setSteps2(cachedSteps2);
        setSteps3(cachedSteps3);
      } else {
        // Fetch data from Firebase
        const snapshot1 = await get(stepsRef1);
        const snapshot2 = await get(stepsRef2);
        const snapshot3 = await get(stepsRef3);

        const data1 = snapshot1.val();
        const data2 = snapshot2.val();
        const data3 = snapshot3.val();

        const formattedSteps1 = data1 ? Object.values(data1) : [];
        const formattedSteps2 = data2 ? Object.values(data2) : [];
        const formattedSteps3 = data3 ? Object.values(data3) : [];

        // Set data in state
        setSteps1(formattedSteps1);
        setSteps2(formattedSteps2);
        setSteps3(formattedSteps3);

        // Cache data in localStorage
        localStorage.setItem("steps1", JSON.stringify(formattedSteps1));
        localStorage.setItem("steps2", JSON.stringify(formattedSteps2));
        localStorage.setItem("steps3", JSON.stringify(formattedSteps3));
        localStorage.setItem("cacheTime", Date.now());
      }
    } catch (error) {
      console.error("Error fetching steps:", error);
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  return (
    <section className="section-how">
      <div className="containers container-sty">
        <h2 className="heading-secondary">
          Your daily dose of health in 3 simple steps.
        </h2>
      </div>
      <div className="containers grid-2-cols">
        {steps1.map((step, index) => (
          <React.Fragment key={index}>
            <div className="step-text-box">
              <p className="step-number">0{step.number}</p>
              <h3 className="main-heading">{step.heading}</h3>
              <p className="step-description">{step.description}</p>
            </div>
            <div className="step-img-box">
              <img src={step.img} className="step-img" alt={step.alt} />
            </div>
          </React.Fragment>
        ))}

        {steps2.map((step2, index) => (
          <React.Fragment key={index}>
            <div className="step-img-box">
              <img src={step2.img} className="step-img" alt={step2.alt} />
            </div>
            <div className="step-text-box">
              <p className="step-number">0{step2.number}</p>
              <h3 className="main-heading">{step2.heading}</h3>
              <p className="step-description">{step2.description}</p>
            </div>
          </React.Fragment>
        ))}

        {steps3.map((step3, index) => (
          <React.Fragment key={index}>
            <div className="step-text-box">
              <p className="step-number">0{step3.number}</p>
              <h3 className="main-heading">{step3.heading}</h3>
              <p className="step-description">{step3.description}</p>
            </div>
            <div className="step-img-box">
              <img src={step3.img} className="step-img" alt={step3.alt} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Howitworks;
