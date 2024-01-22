import React, { useState, useEffect } from "react";
import "./CustomScroll.css";

const CustomScroll = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const percentage = (scrollTop / scrollHeight) * 100;
    setScrollPercentage(percentage);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="custom-scroll-container">
      <div className="custom-scroll-content">
        {/* Your content goes here */}
        {/* This is just a placeholder */}
        {Array.from({ length: 100 }, (_, index) => (
          <p key={index}>Scrollable Content</p>
        ))}
      </div>
      <div
        className="custom-scroll-bar"
        style={{ width: `${scrollPercentage}%` }}
      ></div>
    </div>
  );
};

export default CustomScroll;
