import React from "react";
import {
  Code,
  Smartphone,
  Globe,
  Database,
  Cloud,
  Palette,
  ShoppingCart,
  Search,
  BarChart3,
  Shield,
  Zap,
  Users,
  Brain,
  Wrench,
  Rocket,
  Headphones
} from "lucide-react";

export default function ServicesComponent() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies like React, Next.js, and Node.js for optimal performance and user experience.",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Secure & Scalable"]
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android using Flutter and React Native with seamless user interfaces.",
      features: ["iOS & Android", "Cross Platform", "Native Performance", "App Store Ready"]
    },
    {
      icon: Globe,
      title: "UI/UX Design",
      description: "User-centered design solutions that combine aesthetics with functionality to create engaging and intuitive digital experiences.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
    },
    {
      icon: Database,
      title: "Database Solutions",
      description: "Robust database architecture and management using MongoDB, PostgreSQL, Firebase, and cloud-based solutions for data integrity.",
      features: ["Data Modeling", "Performance Optimization", "Backup & Recovery", "Cloud Integration"]
    },
    {
      icon: Cloud,
      title: "Cloud Services",
      description: "Scalable cloud infrastructure setup and management using AWS, Google Cloud, and Azure for reliable and cost-effective solutions.",
      features: ["Cloud Migration", "Auto Scaling", "Load Balancing", "DevOps Integration"]
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description: "Complete e-commerce platforms with payment integration, inventory management, and customer relationship management systems.",
      features: ["Payment Gateway", "Inventory Management", "Analytics Dashboard", "Mobile Responsive"]
    },
    // {
    //   icon: Search,
    //   title: "SEO & Digital Marketing",
    //   description: "Comprehensive digital marketing strategies including SEO, content marketing, and social media management to boost online presence.",
    //   features: ["Keyword Research", "Content Strategy", "Social Media", "Analytics Tracking"]
    // },
    // {
    //   icon: Brain,
    //   title: "AI Integration",
    //   description: "Artificial Intelligence and Machine Learning solutions including OpenAI API integration, chatbots, and automated systems.",
    //   features: ["Chatbot Development", "AI Analytics", "Process Automation", "Custom AI Models"]
    // },
    // {
    //   icon: BarChart3,
    //   title: "Data Analytics",
    //   description: "Business intelligence and data analytics solutions to help make informed decisions with real-time dashboards and reporting.",
    //   features: ["Real-time Dashboards", "Custom Reports", "Data Visualization", "Predictive Analytics"]
    // },
    // {
    //   icon: Shield,
    //   title: "Cybersecurity",
    //   description: "Comprehensive security solutions including vulnerability assessments, penetration testing, and security audits for digital assets.",
    //   features: ["Security Audits", "Threat Assessment", "Data Encryption", "Compliance Solutions"]
    // },
    // {
    //   icon: Wrench,
    //   title: "Maintenance & Support",
    //   description: "Ongoing technical support, system maintenance, updates, and performance optimization to ensure your digital assets run smoothly.",
    //   features: ["24/7 Support", "Regular Updates", "Performance Monitoring", "Bug Fixes"]
    // },
    // {
    //   icon: Rocket,
    //   title: "Startup Consulting",
    //   description: "Complete startup technology consulting including MVP development, technology stack selection, and scalability planning.",
    //   features: ["MVP Development", "Tech Stack Planning", "Scalability Strategy", "Team Building"]
    // }
  ];

  return (
    <div className="w-full transition-colors duration-500 py-8 md:py-16 relative ">
      
    
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-18 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 dark:from-[#8BE31F] dark:to-green-400">
            Our Services
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
            Comprehensive digital solutions tailored to transform your business and drive growth through innovative technology
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => {
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
                      <div key={featureIndex} className="flex items-center text-xs sm:text-sm">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#8BE31F] rounded-full mr-2 sm:mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-20">
          <div className="inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-[#8BE31F]/10 dark:bg-[#8BE31F]/20 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-[#8BE31F]/20 hover:bg-[#8BE31F]/20 dark:hover:bg-[#8BE31F]/30 transition-all duration-300 group cursor-pointer">
            <Headphones className="h-5 w-5 sm:h-6 sm:w-6 text-[#8BE31F] group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-white group-hover:text-gray-900 dark:group-hover:text-[#8BE31F] transition-colors duration-300">
              Ready to start your project?
            </span>
            <Users className="h-5 w-5 sm:h-6 sm:w-6 text-[#8BE31F] group-hover:scale-110 transition-transform duration-300" />
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-3 sm:mt-4">
            Contact us today for a free consultation and let&apos;s bring your vision to life
          </p>
        </div>
      </div>
    </div>
  );
}