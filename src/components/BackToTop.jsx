import { React, useState, useEffect } from "react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <>
      <div
        onClick={scrollToTop}
        className="fa-solid fa-arrow-up back_to_top"
        style={{ display: visible ? "inline" : "none" }}
      ></div>
    </>
  );
};

export default BackToTop;
