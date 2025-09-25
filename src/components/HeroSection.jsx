"use client";
import { useState, useEffect } from "react";
import { ArrowRight, Code, Zap, Globe, Star, Handshake } from "lucide-react";
import Lottie from "lottie-react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(true);
  const [animationData, setAnimationData] = useState(null);
  const words = ["Legacy", "Innovation", "Excellence", "Future"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Fetch animation data
  useEffect(() => {
    fetch("/your-animation.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Failed to load animation:", error));
  }, []);

  // Typewriter effect logic
  useEffect(() => {
    if (index === words.length) return;
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 150);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  const features = [
    {
      icon: Code,
      title: "Custom Development",
      description: "Tailored solutions built with cutting-edge technology",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance that scales with your business",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving clients worldwide with 24/7 support",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-20 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center pt-5 pb-16 gap-1">
          {/* Left Side */}
          <div className="max-w-3xl text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#8BE31F] border border-[#8BE31F]/20 text-[#1E1E1E] text-sm font-medium mb-8 backdrop-blur-sm">
              <Star className="w-4 h-4 mr-2" />
              #1 Web Development Agency
            </div>
            <div>
              <h1 className="text-6xl sm:text-8xl lg:text-6xl xl:text-8xl font-bold text-black dark:text-white leading-tight">
                <span className="block mb-2">Let's Build</span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#8BE31F] via-green-400 to-[#7ACC1B] bg-clip-text text-6xl xl:text-7xl sm:text-7xl text-transparent">
                    {`${words[index].substring(0, subIndex)}`}
                  </span>
                  <span className="border-r-2 border-[#8BE31F] animate-pulse ml-1"></span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#8BE31F]/20 to-green-400/20 blur-2xl opacity-50"></div>
                </span>
              </h1>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl leading-relaxed">
              Transform your digital presence with cutting-edge web solutions.
              We craft exceptional websites and applications that drive growth and innovation.
            </p>
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-10">
              <button className="group relative px-8 py-4 bg-[#8BE31F] text-black font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#8BE31F]/25 hover:shadow-[#8BE31F]/40 overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="absolute inset-0 bg-[#7ACC1B] scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></span>
                <span className="relative z-10 flex items-center group-hover:scale-105 transition-transform duration-300">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              <button className="group relative px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-black dark:text-white font-semibold rounded-xl transition-all duration-300 hover:border-[#8BE31F] overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-[#8BE31F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                <span className="relative z-10 flex items-center group-hover:text-[#8BE31F] transition-colors duration-300">
                  <Handshake className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Become Partner
                </span>
              </button>
            </div>
          </div>
          {/* Right Side – Lottie Animation */}
          <div className="w-full flex justify-center lg:justify-end max-w-lg lg:max-w-4xl">
            {animationData && <Lottie animationData={animationData} loop={true} className="w-full" />}
          </div>
        </div>
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-8 rounded-2xl bg-gray-100 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700/30 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8BE31F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#8BE31F] group-hover:w-3/4 transition-all duration-500"></div>
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8BE31F]/10 rounded-2xl mb-6 group-hover:bg-[#8BE31F]/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-8 w-8 text-[#8BE31F] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-4 group-hover:text-[#8BE31F] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}  