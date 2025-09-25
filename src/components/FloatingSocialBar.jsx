"use client";
import { useState, useRef, useEffect } from "react";
import {
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  MessageSquare,
  PhoneCall,
  Users,
  X
} from "lucide-react";

// Reusable component for social media buttons
const SocialButton = ({ social, index, isOpen }) => {
  const Icon = social.icon;

  return (
    <div
      className={`transform transition-all duration-500 ease-out ${
        isOpen
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-75"
      }`}
      style={{
        transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
      }}
    >
      {/* Tooltip */}
      <div
        className={`absolute right-16 top-1/2 transform -translate-y-1/2
          bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap
          transition-all duration-200 pointer-events-none
          ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`}
        style={{
          transitionDelay: isOpen ? `${index * 50 + 200}ms` : "0ms",
        }}
      >
        {social.name}
        <div
          className="absolute left-full top-1/2 transform -translate-y-1/2
            border-4 border-transparent border-l-gray-900"
        ></div>
      </div>

      {/* Social Button */}
      <a
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center w-12 h-12 rounded-full
          shadow-lg transform transition-all duration-300 group
          ${social.bg} ${social.color}
          hover:scale-110 hover:shadow-xl active:scale-95
          focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
          ${!isOpen ? "pointer-events-none" : "pointer-events-auto"}`}
        aria-label={`Contact us via ${social.name}`}
        onClick={(e) => {
          if (!isOpen) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
      </a>
    </div>
  );
};

export default function ProfessionalContactMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const menuRef = useRef(null);

  const socials = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:contact@yourcompany.com",
      bg: "bg-[#8BE31F] hover:bg-[#7CD41A]",
      color: "text-black",
    },
    {
      name: "WhatsApp",
      icon: MessageSquare,
      href: "https://wa.me/1234567890",
      bg: "bg-green-600 hover:bg-green-500",
      color: "text-white",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/yourcompany",
      bg: "bg-blue-600 hover:bg-blue-500",
      color: "text-white",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/yourcompany",
      bg: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-500 hover:via-pink-500 hover:to-orange-400",
      color: "text-white",
    },
    {
      name: "Phone",
      icon: PhoneCall,
      href: "tel:+1234567890",
      bg: "bg-emerald-600 hover:bg-emerald-500",
      color: "text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/company/yourcompany",
      bg: "bg-blue-700 hover:bg-blue-600",
      color: "text-white",
    },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMainButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsOpen(false);
  };

  return (
    <div
      ref={menuRef}
      className="fixed bottom-8 right-8 z-50 flex flex-col items-end"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Social Media Icons */}
      <div className="flex flex-col items-end space-y-3 mb-4">
        {socials.map((social, index) => (
          <SocialButton
            key={social.name}
            social={social}
            index={index}
            isOpen={isOpen}
          />
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={handleMainButtonClick}
        className={`relative flex items-center justify-center w-16 h-16 rounded-full
          bg-[#8BE31F] text-black shadow-xl
          transform transition-all duration-300 hover:scale-105 active:scale-95
          focus:outline-none focus:ring-4 focus:ring-[#8BE31F] focus:ring-opacity-50
          ${isOpen ? "rotate-45" : "rotate-0"}`}
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
      >
        {/* Background pulse animation when closed */}
        <div
          className={`absolute inset-0 rounded-full bg-[#8BE31F]
            animate-ping opacity-20 ${isOpen ? "hidden" : "block"}`}
        ></div>

        {/* Icon with smooth transition */}
        <div className="relative transform transition-all duration-300">
          <Users
            className={`h-7 w-7 transition-all duration-300 ${
              isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <X
            className={`absolute inset-0 h-7 w-7 transition-all duration-300 ${
              isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
            }`}
          />
        </div>

        {/* Ripple effect on click */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div
            className="absolute inset-0 rounded-full bg-white opacity-0
              transform scale-0 transition-all duration-500 pointer-events-none
              active:opacity-30 active:scale-150"
          ></div>
        </div>
      </button>
    </div>
  );
}
