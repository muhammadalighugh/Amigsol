"use client";
import { useState, useEffect } from "react";
import { 
  Bot, 
  MessageCircle, 
  Zap, 
  Brain, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Lottie from "lottie-react";

export default function AddChatBot() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [activeFeature, setActiveFeature] = useState(0);

  // Mount + animation
  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
    fetch("/bot.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.log("Animation file not found:", error));
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced natural language processing for human-like conversations",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Instant customer support around the clock, never miss a query",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Multi-User Support",
      description: "Handle unlimited conversations simultaneously with ease",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description: "Track performance and gather valuable customer insights",
      color: "from-orange-500 to-red-500"
    }
  ];

  const benefits = [
    "Reduce customer service costs by up to 80%",
    "Increase customer satisfaction with instant responses",
    "Generate more leads with proactive engagement",
    "Scale your support without hiring more staff"
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#8BE31F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-2">
            <span className="block bg-gradient-to-r from-[#8BE31F] via-green-400 to-[#7ACC1B] bg-clip-text text-transparent">
            Add  Intelligent Chatbots
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Enhance customer experience and boost conversions with AI-powered chatbots seamlessly integrated into your existing web applications
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Left Side - Animation */}
          <div className={`order-2 lg:order-1 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              {/* Chatbot Animation Container */}
              <div className="relative bg-white/10 dark:bg-gray-800/30 rounded-3xl p-8 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
                {animationData && (
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    className="w-full max-w-md mx-auto"
                  />
                )}
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-[#8BE31F] text-black px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                  Live Chat
                </div>
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                  AI Powered
                </div>
              </div>

              {/* Background Glow */}
            </div>
          </div>

          {/* Right Side - Features */}
          <div className={`order-1 lg:order-2 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="space-y-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = activeFeature === index;
                
                return (
                  <div
                    key={feature.title}
                    className={`relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer group ${
                      isActive 
                        ? 'bg-white/20 dark:bg-gray-800/40 border-[#8BE31F]/50 scale-105' 
                        : 'bg-white/10 dark:bg-gray-800/20 border-gray-200/20 dark:border-gray-700/20 hover:border-[#8BE31F]/30'
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-black dark:text-white mb-2 group-hover:text-[#8BE31F] transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#8BE31F]/10 to-transparent rounded-2xl"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
    

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <button className="group relative px-8 py-4 bg-[#8BE31F] text-black font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#8BE31F]/25 hover:shadow-[#8BE31F]/40 overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="absolute inset-0 bg-[#7ACC1B] scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></span>
                <span className="relative z-10 flex items-center group-hover:scale-105 transition-transform duration-300">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Get Chatbot Integration
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
        </div>
      </div>
    </section>
  );
}