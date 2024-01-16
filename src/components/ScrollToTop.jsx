import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import { animateScroll as scroll } from "react-scroll";
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleScrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: "easeInOutQuart",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fab
      onClick={handleScrollToTop}
      color="primary"
      style={{
        position: "fixed",
        zIndex: 999,
        right: 100,
        bottom: 10,
        display: isVisible ? "flex" : "none",
      }}
    >
      TOP
    </Fab>
  );
};

export default ScrollToTop;
