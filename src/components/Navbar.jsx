"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "/contact" },
    {
      label: "Blog",
      href: "#blog",
      dropdown: [
        {
          label: "Tech",
          subItems: [
            { label: "AI & ML", href: "/blog/ai-ml" },
            { label: "Web Dev", href: "/blog/web-dev" },
          ],
        },
        {
          label: "Design",
          subItems: [
            { label: "UI/UX", href: "/blog/ui-ux" },
            { label: "Graphic Design", href: "/blog/graphic-design" },
          ],
        },
        {
          label: "Business",
          subItems: [
            { label: "Startups", href: "/blog/startups" },
            { label: "Marketing", href: "/blog/marketing" },
          ],
        },
      ],
    },
  ];

  const toggleMobileDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 lg:px-10 w-full transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-black/98 backdrop-blur-2xl border-b border-gray-800/90 shadow-lg shadow-gray-900/40"
            : "bg-black/90 backdrop-blur-xl border-b border-gray-800/60"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="group block transition-all duration-300 hover:scale-105"
              >
                <div className="relative w-28 h-16 sm:w-30 sm:h-20 md:w-28 md:h-24 lg:w-42 lg:h-28 transition-all duration-300">
                  {mounted && (
                    <Image
                      src="/logos/logo-dark.svg"
                      alt="AMIGSOL Logo"
                      fill
                      sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                      className="object-contain transition-all duration-300"
                      priority
                    />
                  )}
                  {!mounted && (
                    <div className="w-full h-full bg-gradient-to-br from-[#8BE31F] to-green-500 rounded-lg animate-pulse" />
                  )}
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item) =>
                item.dropdown ? (
                  <div key={item.label} className="relative group">
                    <button className="relative flex items-center px-4 py-2 text-sm font-medium text-gray-100 transition-all duration-300 overflow-hidden group">
                      {/* Default subtle line */}
                      <span className="absolute bottom-0 left-1/2 w-4/5 h-0.5 bg-gradient-to-r from-transparent via-[#8BE31F]/30 to-transparent transform -translate-x-1/2 transition-all duration-300"></span>
                      
                      {/* Hover line effect */}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8BE31F] to-[#7ACC1B] group-hover:w-full transition-all duration-500 ease-out"></span>
                      
                      {/* Background hover effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-[#8BE31F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></span>
                      
                      <span className="relative z-10 group-hover:text-[#8BE31F] transition-colors duration-300">{item.label}</span>
                      <ChevronDown className="relative z-10 h-4 w-4 ml-1 transition-all duration-300 group-hover:rotate-180 group-hover:text-[#8BE31F]" />
                    </button>
                    <div className="absolute left-0 mt-3 w-64 bg-gray-900 rounded-xl shadow-2xl border border-gray-700/80 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 backdrop-blur-xl">
                      <div className="p-2">
                        {item.dropdown.map((dropdownItem) => (
                          <div key={dropdownItem.label} className="group/sub relative">
                            <div className="relative flex justify-between items-center px-3 py-2.5 text-sm font-medium text-gray-100 rounded-lg transition-all duration-300 cursor-pointer overflow-hidden">
                              {/* Hover background */}
                              <span className="absolute inset-0 bg-gradient-to-r from-[#8BE31F]/10 to-transparent opacity-0 group-hover/sub:opacity-100 transition-all duration-300"></span>
                              
                              {/* Left border accent */}
                              <span className="absolute left-0 top-0 w-0 h-full bg-[#8BE31F] group-hover/sub:w-1 transition-all duration-300"></span>
                              
                              <span className="relative z-10 group-hover/sub:text-[#8BE31F] transition-colors duration-300">{dropdownItem.label}</span>
                              <ChevronRight className="relative z-10 h-3 w-3 transition-all duration-300 group-hover/sub:translate-x-1 group-hover/sub:text-[#8BE31F]" />
                            </div>
                            <div className="absolute left-full top-0 ml-2 w-48 bg-gray-900 rounded-xl shadow-2xl border border-gray-900 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible group-hover/sub:translate-x-0 -translate-x-2 transition-all duration-300">
                              <div className="p-2">
                                {dropdownItem.subItems.map((subItem) => (
                                  <Link
                                    key={subItem.label}
                                    href={subItem.href}
                                    className="relative block px-3 py-2.5 text-sm text-gray-100 rounded-lg transition-all duration-300 overflow-hidden group/link"
                                  >
                                    {/* Hover background */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#8BE31F]/10 to-transparent opacity-0 group-hover/link:opacity-100 transition-all duration-300"></span>
                                    
                                    {/* Left border accent */}
                                    <span className="absolute left-0 top-0 w-0 h-full bg-[#8BE31F] group-hover/link:w-1 transition-all duration-300"></span>
                                    
                                    <span className="relative z-10 group-hover/link:text-[#8BE31F] transition-colors duration-300">{subItem.label}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-medium text-gray-100 transition-all duration-300 overflow-hidden group"
                  >
                    {/* Default subtle line */}
                    <span className="absolute bottom-0 left-1/2 w-4/5 h-0.5 bg-gradient-to-r from-transparent via-[#8BE31F]/30 to-transparent transform -translate-x-1/2 transition-all duration-300"></span>
                    
                    {/* Hover line effect */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8BE31F] to-[#7ACC1B] group-hover:w-full transition-all duration-500 ease-out"></span>
                    
                    {/* Background hover effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-[#8BE31F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></span>
                    
                    <span className="relative z-10 group-hover:text-[#8BE31F] transition-colors duration-300">{item.label}</span>
                  </Link>
                )
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <ModeToggle />
              <Link
                href="/login"
                className="relative hidden sm:inline-flex items-center px-6 py-2 rounded-lg bg-[#8BE31F] text-black text-sm font-semibold transition-all duration-300 shadow-lg overflow-hidden group"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
                
                {/* Hover background */}
                <span className="absolute inset-0 bg-[#7ACC1B] scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></span>
                
                <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">Get Started</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-gray-400 hover:text-[#8BE31F] hover:bg-[#8BE31F]/10 transition-all duration-200"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Menu */}
        <div
          className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500 ${
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar - Full Height, Limited Width */}
          <div
            className={`fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-black border-r border-gray-800/80 z-50 transform transition-all duration-500 ease-out shadow-2xl ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between h-20 px-6 border-b border-gray-800 bg-black">
              <div className="flex items-center space-x-3">
                <div className="relative w-30 h-12">
                  {mounted && (
                    <Image
                      src="/logos/logo-dark.svg"
                      alt="AMIGSOL Logo"
                      fill
                      sizes="48px"
                      className="object-contain"
                    />
                  )}
                  {!mounted && (
                    <div className="w-full h-full bg-gradient-to-br from-[#8BE31F] to-green-500 rounded-lg animate-pulse" />
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-[#8BE31F] hover:bg-[#8BE31F]/10 rounded-lg transition-all duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="px-4 py-6 space-y-2 overflow-y-auto bg-gray-900/30 min-h-[calc(100vh-80px)]">
              {navigationItems.map((item, index) =>
                item.dropdown ? (
                  <div key={item.label} className="space-y-1">
                    <button
                      onClick={() => toggleMobileDropdown(index)}
                      className="relative flex items-center justify-between w-full px-4 py-3 text-gray-300 font-medium transition-all duration-300 shadow-sm overflow-hidden group rounded-xl"
                    >
                      {/* Default line effect */}
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#8BE31F]/20 to-transparent"></span>
                      
                      {/* Hover background */}
                      <span className="absolute inset-0 bg-gradient-to-r from-[#8BE31F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                      
                      {/* Left border accent */}
                      <span className="absolute left-0 top-0 w-1 h-0 bg-[#8BE31F] group-hover:h-full transition-all duration-300"></span>
                      
                      <span className="relative z-10 group-hover:text-[#8BE31F] transition-colors duration-300">{item.label}</span>
                      <ChevronDown className={`relative z-10 h-4 w-4 transition-all duration-300 group-hover:text-[#8BE31F] ${
                        activeDropdown === index ? "rotate-180" : ""
                      }`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${
                      activeDropdown === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}>
                      <div className="pl-4 pr-2 pb-2 space-y-3">
                        {item.dropdown.map((dropdownItem) => (
                          <div key={dropdownItem.label} className="space-y-2">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">
                              {dropdownItem.label}
                            </p>
                            <div className="space-y-1">
                              {dropdownItem.subItems.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
                                  className="relative block px-4 py-2.5 text-sm text-gray-400 rounded-lg transition-all duration-300 border-l-2 border-transparent hover:border-[#8BE31F] overflow-hidden group"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {/* Hover background */}
                                  <span className="absolute inset-0 bg-gradient-to-r from-[#8BE31F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                                  
                                  <span className="relative z-10 group-hover:text-[#8BE31F] transition-colors duration-300">{subItem.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="relative block px-4 py-3 text-gray-300 font-medium transition-all duration-300 shadow-sm overflow-hidden group rounded-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {/* Default line effect */}
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#8BE31F]/20 to-transparent"></span>
                    
                    {/* Hover background */}
                    <span className="absolute inset-0 bg-gradient-to-r from-[#8BE31F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    
                    {/* Left border accent */}
                    <span className="absolute left-0 top-0 w-1 h-0 bg-[#8BE31F] group-hover:h-full transition-all duration-300"></span>
                    
                    <span className="relative z-10 group-hover:text-[#8BE31F] transition-colors duration-300">{item.label}</span>
                  </Link>
                )
              )}
              
              {/* Mobile CTA Button */}
              <div className="pt-6 border-t border-gray-800/80 mt-6">
                <Link
                  href="/login"
                  className="relative flex items-center justify-center w-full px-6 py-4 rounded-xl bg-[#8BE31F] text-black text-sm font-semibold transition-all duration-300 shadow-lg overflow-hidden group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {/* Shimmer effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
                  
                  {/* Hover background */}
                  <span className="absolute inset-0 bg-[#7ACC1B] scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></span>
                  
                  <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">Get Started</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16" />
    </>
  );
}