import React from "react";

export default function AboutUs() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center">
        {/* Left Side - About Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-bold text-accent mb-4">About us</h2>
          <p className="text-lg ">
            CodeQuest is designed to help developers of all levels improve their coding skills. 
            Whether you're a beginner or an experienced coder, our interactive platform ensures 
            a seamless learning experience.
          </p>
          <p className="mt-4 text-lg ">
            Join a community of passionate learners and take your coding skills to the next level.
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
          <img 
            src="/images/aboutus.jpeg" loading="lazy"
            alt="Coding Illustration" 
            className="w-80 max-w-lg object-cover rounded-2xl shadow-lg shadow-gray-400   "
          />
        </div>
      </div>
    </section>
  );
}
