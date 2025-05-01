import React from "react";
import { useCarousel } from "../../hooks/use-carousel";
import { nextBtn, prevBtn } from "../../assets";

export default function ImageCarousel({ images }) {
  const { currentIndex, next, prev } = useCarousel(images.length);

  return (
    <div className="relative z-1">
      <div className="relative border border-n-1/10 rounded-3xl overflow-hidden">
        {/* aspect-video = 16:9 ratio */}
        <img
          src={images[currentIndex]}
          className="transition-all duration-700 ease-in-out"
          alt={`carousel-${currentIndex}`}
        />

        {/* Prev Button */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 "
        >
          <img src={prevBtn} />
        </button>

        {/* Next Button */}
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 "
        >
          <img src={nextBtn} />
        </button>
      </div>
    </div>
  );
}
