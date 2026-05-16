import { useEffect, useState } from "react";

export default function useResponsive() {
  const [screenWidth, setScreenWidth] = useState(
    window.innerWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  return {
    isMobile: screenWidth < 768,
    isTablet:
      screenWidth >= 768 &&
      screenWidth < 1024,
    isDesktop: screenWidth >= 1024,
  };
}