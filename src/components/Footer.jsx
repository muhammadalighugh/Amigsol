"use client";
import { useState, useEffect } from "react";
import { 
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Star,
  Heart,
  ExternalLink,
  ChevronUp,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Github,
  Send,
  Slack,
  MessageSquare,
  Globe,
  Shield,
  Award,
  Users,
  Briefcase,
  Code,
  Palette,
  TrendingUp,
  Zap
} from "lucide-react";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: Facebook,
      link: "#",
      color: "hover:text-blue-500",
      members: "5.2K"
    },
    {
      name: "WhatsApp",
      icon: Phone,
      link: "#",
      color: "hover:text-green-500",
      members: "1.8K"
    },
    {
      name: "Discord",
      icon: MessageSquare,
      link: "#",
      color: "hover:text-indigo-500",
      members: "3.1K"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      link: "#",
      color: "hover:text-blue-700",
      members: "4.5K"
    },
    {
      name: "Twitter",
      icon: Twitter,
      link: "#",
      color: "hover:text-gray-800 dark:hover:text-white",
      members: "2.7K"
    },
    {
      name: "YouTube",
      icon: Youtube,
      link: "#",
      color: "hover:text-red-500",
      members: "8.3K"
    },
    {
      name: "Telegram",
      icon: Send,
      link: "#",
      color: "hover:text-cyan-500",
      members: "2.1K"
    },
    {
      name: "Instagram",
      icon: Instagram,
      link: "#",
      color: "hover:text-pink-500",
      members: "3.8K"
    },
    {
      name: "GitHub",
      icon: Github,
      link: "#",
      color: "hover:text-gray-700 dark:hover:text-white",
      members: "1.9K"
    },
    {
      name: "Slack",
      icon: Slack,
      link: "#",
      color: "hover:text-purple-500",
      members: "950"
    }
  ];

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Services", href: "#" },
    { name: "Portfolio", href: "#" },
    { name: "Team", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Career", href: "#" }
  ];

  const services = [
    { name: "Web Development", icon: Code, href: "#" },
    { name: "UI/UX Design", icon: Palette, href: "#" },
    { name: "Digital Marketing", icon: TrendingUp, href: "#" },
    { name: "Mobile Apps", icon: Zap, href: "#" },
    { name: "E-commerce", icon: Globe, href: "#" },
    { name: "Consulting", icon: Briefcase, href: "#" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "GDPR Compliance", href: "#" },
    { name: "Refund Policy", href: "#" },
    { name: "Disclaimer", href: "#" }
  ];

  const achievements = [
    { icon: Award, label: "ISO 9001 Certified" },
    { icon: Shield, label: "GDPR Compliant" },
    { icon: Star, label: "Top Rated Agency" },
    { icon: Users, label: "500+ Happy Clients" }
  ];

  if (!mounted) return null;

  return (
    <footer className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black border-t border-gray-200/20 dark:border-gray-700/20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Company Info Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              {/* Logo with theme switching */}
              <div className="mb-4">
                <img 
                  src="/logos/logo-light.svg" 
                  alt="Amigsol Logo" 
                  className="h-12 w-auto dark:hidden"
                />
                <img 
                  src="/logos/logo-dark.svg" 
                  alt="Amigsol Logo" 
                  className="h-12 w-auto hidden dark:block"
                />
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Leading digital solutions agency crafting innovative web experiences, mobile applications, and digital strategies that drive business growth.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Mail className="w-5 h-5 text-[#8BE31F]" />
                <a href="mailto:hello@amigsol.com" className="hover:text-[#8BE31F] transition-colors duration-300">
                  hello@amigsol.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Phone className="w-5 h-5 text-[#8BE31F]" />
                <a href="tel:+1234567890" className="hover:text-[#8BE31F] transition-colors duration-300">
                  +1 (234) 567-8900
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <MapPin className="w-5 h-5 text-[#8BE31F]" />
                <span>123 Tech Street, Digital City, DC 12345</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Clock className="w-5 h-5 text-[#8BE31F]" />
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>

            {/* Achievements */}
            <div className="mt-8 pt-6 border-t border-gray-200/20 dark:border-gray-700/20">
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                      <Icon className="w-4 h-4 text-[#8BE31F]" />
                      <span>{achievement.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-600 dark:text-gray-400 hover:text-[#8BE31F] transition-colors duration-300 flex items-center group"
                  >
                    {link.name}
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <li key={service.name}>
                    <a 
                      href={service.href} 
                      className="text-gray-600 dark:text-gray-400 hover:text-[#8BE31F] transition-colors duration-300 flex items-center group"
                    >
                      <Icon className="w-4 h-4 mr-2 text-[#8BE31F]" />
                      {service.name}
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Legal Links */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-black dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-xs text-gray-500 dark:text-gray-500 hover:text-[#8BE31F] transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter & Social Column */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-6">Stay Connected</h3>
            
            {/* Newsletter Signup */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Subscribe to our newsletter for the latest updates, insights, and exclusive offers.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 dark:bg-gray-800/20 border border-gray-200/20 dark:border-gray-700/20 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-[#8BE31F] focus:outline-none transition-colors duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#8BE31F] text-black font-semibold py-3 px-6 rounded-xl hover:bg-[#7ACC1B] transition-colors duration-300 flex items-center justify-center group"
                >
                  Subscribe Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="text-sm font-semibold text-black dark:text-white mb-4">Follow Us</h4>
              <div className="grid grid-cols-5 gap-3">
                {socialPlatforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <a
                      key={platform.name}
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative p-3 rounded-xl bg-white/5 dark:bg-gray-800/20 border border-gray-200/20 dark:border-gray-700/20 hover:border-[#8BE31F]/30 transition-all duration-300 hover:scale-110 ${platform.color}`}
                      title={`${platform.name} - ${platform.members} members`}
                    >
                      <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors duration-300" />
                      
                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {platform.name}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>© 2024 Amigsol. All rights reserved.</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>Made with love for our clients</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-[#8BE31F]" />
                <span>Available Worldwide</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-[#8BE31F]" />
                <span>4.9/5 Client Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-[#8BE31F] text-black rounded-full shadow-lg hover:bg-[#7ACC1B] transition-all duration-300 hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#8BE31F]/30 to-transparent"></div>
    </footer>
  );
}