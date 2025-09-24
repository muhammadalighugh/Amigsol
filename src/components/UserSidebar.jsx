// File: components/UserSidebar.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import PropTypes from "prop-types";
import {
  Home,
  FileText,
  LogOut,
  Menu,
  X,
  Users,
  MessageSquare,
  Star,
  AlertCircle,
  BarChart2,
  Settings,
  BadgeDollarSign ,
  Calculator ,
} from "lucide-react";

/**
 * Responsive Sidebar for Partner Portal
 * - Desktop: Collapsible (icon-only or expanded with text)
 * - Mobile: Drawer with overlay
 */
function UserSidebar({ onLogout }) {
  const router = useRouter();
  const pathname = usePathname();

  // Sidebar states
  const [isOpen, setIsOpen] = useState(true); // desktop expanded/collapsed
  const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile drawer

  // Detect screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsOpen(true); // mobile always full
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/user/dashboard", icon: Home },
    { name: "Contact Admin", path: "/user/Contact", icon: FileText },
    { name: "Community", path: "/user/community", icon: Users },
    { name: "Calculator", path: "/user/messages", icon: Calculator  },
    { name: "BedProjects", path: "/user/BedProjects", icon: BadgeDollarSign  },
  ];

  const handleNavClick = (path) => {
    router.push(path);
    if (window.innerWidth < 1024) {
      setIsMobileOpen(false); // close drawer on mobile
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-full bg-gradient-to-r from-[#8BE31F] to-green-500 text-white hover:from-[#7ACC1B] hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-[#8BE31F] focus:ring-offset-2 transition-all duration-300 shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-xl transform transition-all duration-300 z-40
          ${isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"} 
          lg:translate-x-0 lg:static lg:shadow-none
          ${isOpen ? "lg:w-64" : "lg:w-20"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-700 px-4">
            {isOpen ? (
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Partner Portal
              </h1>
            ) : (
              <div className="w-8 h-8 bg-gradient-to-r from-[#8BE31F] to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
            )}
            {/* Desktop collapse toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden lg:block p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle sidebar"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-gradient-to-r from-green-700/50 to-green-700 text-white shadow-md"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200"
                    }`}
                  />
                  {isOpen && (
                    <span className="ml-3 transition-opacity duration-200">
                      {item.name}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer / Logout */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-2">
            <button
              onClick={onLogout}
              className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200 group"
            >
              <LogOut className="w-5 h-5 shrink-0 text-red-500" />
              {isOpen && <span className="ml-3">Log Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-30"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

// PropTypes
UserSidebar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default UserSidebar;