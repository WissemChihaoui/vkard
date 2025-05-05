import React from "react";
import { RotatingLines } from 'react-loader-spinner'
export default function Loader() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="blue"
          strokeColor="white"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
    </div>
  );
}
