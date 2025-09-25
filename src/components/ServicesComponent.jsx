import React from "react";
import { Code, ShoppingCart, Brain, Globe } from "lucide-react";

// Reusable component for feature items
const FeatureItem = ({ feature }) => (
  <div className="flex items-center text-xs sm:text-sm">
    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#8BE31F] rounded-full mr-2 sm:mr-3 group-hover:scale-125 transition-transform duration-300"></div>
    <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
      {feature}
    </span>
  </div>
);

// Reusable component for service cards
const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;

  return (
    <div
      key={index}
      className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#8BE31F]/10 dark:hover:shadow-[#8BE31F]/20"
    >
      {/* Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8BE31F]/5 to-green-400/5 dark:from-[#8BE31F]/10 dark:to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#8BE31F]/10 dark:bg-[#8BE31F]/20 group-hover:bg-[#8BE31F]/20 dark:group-hover:bg-[#8BE31F]/30 transition-colors duration-300">
            <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-[#8BE31F] group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800 dark:text-white group-hover:text-gray-900 dark:group-hover:text-[#8BE31F] transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        <div className="space-y-1 sm:space-y-2">
          {service.features.map((feature, featureIndex) => (
            <FeatureItem key={featureIndex} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ServicesComponent() {
  const services = [
    {
      icon: Code,
      title: "WordPress Development",
      description: "Custom WordPress websites and solutions tailored to your business needs, ensuring flexibility, scalability, and ease of management.",
      features: ["Custom Themes", "Plugin Development", "SEO Optimized", "Responsive Design"]
    },
    {
      icon: Code,
      title: "Custom Code Websites",
      description: "Bespoke websites built from scratch using modern technologies like React, Next.js, and Node.js for unique and high-performance solutions.",
      features: ["Tailored Solutions", "Modern Stack", "Optimized Performance", "Secure & Scalable"]
    },
    {
      icon: Globe,
      title: "Portfolio Websites",
      description: "Professional portfolio websites designed to showcase your work, skills, and achievements in a visually appealing and user-friendly manner.",
      features: ["Custom Design", "Responsive Layout", "SEO Friendly", "Easy Updates"]
    },
    {
      icon: Brain,
      title: "AI Chatbot Integration",
      description: "Integration of AI-powered chatbots to enhance user engagement, automate customer support, and streamline business operations.",
      features: ["Natural Language Processing", "24/7 Availability", "Custom Workflows", "Seamless Integration"]
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description: "Complete e-commerce platforms with payment integration, inventory management, and customer relationship management systems.",
      features: ["Payment Gateway", "Inventory Management", "Analytics Dashboard", "Mobile Responsive"]
    }
  ];

  return (
    <div className="w-full transition-colors duration-500 py-8 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 dark:from-[#8BE31F] dark:to-green-400">
            Our Services
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
            Comprehensive digital solutions tailored to transform your business and drive growth through innovative technology
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-20">
          <div className="inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-[#8BE31F]/10 dark:bg-[#8BE31F]/20 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-[#8BE31F]/20 hover:bg-[#8BE31F]/20 dark:hover:bg-[#8BE31F]/30 transition-all duration-300 group cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6 text-[#8BE31F] group-hover:scale-110 transition-transform duration-300">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            <span className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-white group-hover:text-gray-900 dark:group-hover:text-[#8BE31F] transition-colors duration-300">
              Ready to start your project?
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6 text-[#8BE31F] group-hover:scale-110 transition-transform duration-300">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-3 sm:mt-4">
            Contact us today for a free consultation and let's bring your vision to life
          </p>
        </div>
      </div>
    </div>
  );
}
