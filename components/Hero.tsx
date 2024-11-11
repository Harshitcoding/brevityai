'use client';

// import { BackgroundBeams } from "./ui/background-beams";
import Lottie from "lottie-react";
import summary from "../assets/summary.json";

const Hero = () => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center mt-10 md:mt-10 lg:mt-40 text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-400 to-pink-600 bg-clip-text text-transparent text-center px-4">
      <p>Turn Long Content into Clear Insights in Seconds</p>
      
      <div className="w-64 md:w-80 lg:w-96">
        <Lottie animationData={summary} loop={true} />
      </div>
      
      {/* <BackgroundBeams /> */}
    </div>
  );
};

export default Hero;
