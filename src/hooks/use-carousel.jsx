// useCarousel.js or useCarousel.ts
import { useState } from "react";

export function useCarousel(length) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  const goTo = (index) => {
    if (index >= 0 && index < length) {
      setCurrentIndex(index);
    }
  };

  return {
    currentIndex,
    next,
    prev,
    goTo,
  };
}
