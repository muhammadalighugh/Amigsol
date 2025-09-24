"use client";
import { useState, useEffect } from "react";
import { 
  Shield,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  ExternalLink,
  ArrowRight,
  User,
  Clock,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Github,
  Send,
  Slack
} from "lucide-react";

export default function ContactAdmin() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
  }, []);

  // Admin Contact Information
  const adminContact = {
    name: "Admin Team",
    email: "admin@yourcompany.com",
    phone: "+1 (555) 999-0000",
    whatsapp: "+1 (555) 999-0000",
    address: "123 Admin Street, Tech City, CA 90210",
    hours: "24/7 Available",
    response: "Within 1 hour"
  };

  // Admin Social Media Links
  const adminSocials = [
    {
      name: "WhatsApp",
      icon: Phone,
      link: "https://wa.me/15559990000",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/20",
      members: "Direct Line"
    },
    {
      name: "Telegram",
      icon: Send,
      link: "https://t.me/youradmin",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      members: "Instant Chat"
    },
    {
      name: "Email Support",
      icon: Mail,
      link: "mailto:admin@yourcompany.com",
      color: "text-red-600",
      bg: "bg-red-50 dark:bg-red-900/20",
      members: "Priority Support"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      link: "https://linkedin.com/company/yourcompany",
      color: "text-blue-700",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      members: "Professional"
    },
    {
      name: "Slack",
      icon: Slack,
      link: "https://yourcompany.slack.com",
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      members: "Team Chat"
    },
    {
      name: "Discord",
      icon: MessageSquare,
      link: "https://discord.gg/youradmin",
      color: "text-indigo-600",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      members: "Community"
    }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#8BE31F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        

        {/* Admin Info Card */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/10 dark:bg-gray-800/20 rounded-3xl p-8 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20 hover:border-[#8BE31F]/30 transition-all duration-300">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-[#8BE31F] to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-black" />
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-2">{adminContact.name}</h2>
            
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#8BE31F]" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-black dark:text-white font-medium">{adminContact.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#8BE31F]" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-black dark:text-white font-medium">{adminContact.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#8BE31F]" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                    <p className="text-black dark:text-white font-medium">{adminContact.address}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[#8BE31F]" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Availability</p>
                    <p className="text-black dark:text-white font-medium">{adminContact.hours}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <ArrowRight className="w-5 h-5 text-[#8BE31F]" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Response Time</p>
                    <p className="text-black dark:text-white font-medium">{adminContact.response}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-[#8BE31F]" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">WhatsApp</p>
                    <p className="text-black dark:text-white font-medium">{adminContact.whatsapp}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className={`mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-black dark:text-white mb-8 text-center">
            Connect with Admin
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminSocials.map((social, index) => (
              <div
                key={social.name}
                className={`${social.bg} rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-[#8BE31F]/50 transition-all duration-300 group cursor-pointer hover:scale-105`}
                onClick={() => window.open(social.link, '_blank')}
              >
                <div className="flex items-center justify-between mb-4">
                  <social.icon className={`w-8 h-8 ${social.color} group-hover:scale-110 transition-transform duration-300`} />
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#8BE31F] transition-colors duration-300" />
                </div>
                
                <h4 className="font-bold text-lg text-black dark:text-white mb-2 group-hover:text-[#8BE31F] transition-colors duration-300">
                  {social.name}
                </h4>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {social.members}
                </p>
                
                <button className="w-full py-2 bg-white/20 dark:bg-gray-700/20 rounded-lg text-sm font-medium text-black dark:text-white group-hover:bg-[#8BE31F]/20 transition-all duration-300">
                  Contact Now
                </button>
              </div>
            ))}
          </div>
        </div>

      
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8BE31F]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}