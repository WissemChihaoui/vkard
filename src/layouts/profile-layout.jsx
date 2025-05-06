import React, { useRef } from "react";
import { BackgroundCircles, Gradient } from "../components/UI/Hero";

export default function ProfileLayout({ children }) {
  const parallaxRef = useRef(null);
  return (
    <>
    <div className="relative" ref={parallaxRef}>
      <div className="relative border border-n-1/10 z-1 max-w-[28rem] mx-auto h-full">
        <div className="bg-opacity-30 bg-slate-700 h-full">{children}</div>
      </div>
      <BackgroundCircles />
    </div>
    </>
  );
}
