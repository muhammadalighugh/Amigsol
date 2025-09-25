"use client";
import { useState, useEffect, useCallback } from "react";
import { Brain, Clock, Users, TrendingUp, MessageCircle, ArrowRight } from "lucide-react";
import Lottie from "lottie-react";

// Reusable component for feature items
const FeatureItem = ({ feature, isActive, onClick }) => {
  const Icon = feature.icon;

  return (
    <div
      className={`relative p-4 md:p-6 rounded-xl md:rounded-2xl border cursor-pointer group ${
        isActive
          ? "bg-white/20 dark:bg-gray-800/40 border-[#8BE31F]/50 scale-[1.02]"
          : "bg-white/10 dark:bg-gray-800/20 border-gray-200/20 dark:border-gray-700/20 hover:border-[#8BE31F]/30"
      }`}
      onClick={onClick}
      aria-label={feature.title}
    >
      <div className="flex items-start space-x-3 md:space-x-4">
        <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-r ${feature.color} text-white group-hover:scale-105 transition-transform duration-200`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-1 md:mb-2 group-hover:text-[#8BE31F] transition-colors duration-200">
            {feature.title}
          </h3>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            {feature.description}
          </p>
        </div>
      </div>
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#8BE31F]/10 to-transparent rounded-xl md:rounded-2xl"></div>
      )}
    </div>
  );
};

export default function AddChatBot() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced natural language processing for human-like conversations",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Instant customer support around the clock, never miss a query",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Multi-User Support",
      description: "Handle unlimited conversations simultaneously with ease",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description: "Track performance and gather valuable customer insights",
      color: "from-orange-500 to-red-500",
    },
  ];

  // Fetch animation data
  useEffect(() => {
    setIsVisible(true);
    fetch("/bot.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Animation file not found:", error));
  }, []);

  // Auto-rotate features with cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-3">
            <span className="block bg-gradient-to-r from-[#8BE31F] via-green-400 to-[#7ACC1B] bg-clip-text text-transparent">
              Add Intelligent Chatbots
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Enhance customer experience and boost conversions with AI-powered chatbots seamlessly integrated into your existing web applications
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          {/* Left Side - Animation */}
          <div className="relative bg-white/10 dark:bg-gray-800/30 rounded-3xl p-6 md:p-8 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
            {animationData && <Lottie animationData={animationData} loop={true} className="w-full max-w-xs md:max-w-md mx-auto" />}
            <div className="absolute -top-3 -right-3 bg-[#8BE31F] text-black px-2 py-1 rounded-full text-xs md:text-sm font-semibold animate-bounce">
              Live Chat
            </div>
            <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs md:text-sm font-semibold animate-pulse">
              AI Powered
            </div>
          </div>

          {/* Right Side - Features */}
          <div className="space-y-4 md:space-y-6">
            {features.map((feature, index) => (
              <FeatureItem
                key={feature.title}
                feature={feature}
                isActive={activeFeature === index}
                onClick={() => setActiveFeature(index)}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            className="group relative inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-[#8BE31F] text-black font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg overflow-hidden"
            aria-label="Get Chatbot Integration"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
            <span className="absolute inset-0 bg-[#7ACC1B] scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></span>
            <span className="relative z-10 flex items-center group-hover:scale-105 transition-transform duration-200">
              <MessageCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Get Chatbot Integration
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
