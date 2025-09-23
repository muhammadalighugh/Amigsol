import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  DollarSign,
  FileText,
  BarChart3,
  Settings,
  Building,
  User,
  MoreVertical,
  X,
} from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen, setActiveTab }) {
  const [activeTab, setLocalActiveTab] = useState("dashboard");

  const handleTabChange = (tabId) => {
    setLocalActiveTab(tabId);
    if (setActiveTab) setActiveTab(tabId);
    setSidebarOpen(false);
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "partners", label: "Partners", icon: Users },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "commissions", label: "Commissions", icon: DollarSign },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-[#8BE31F] to-green-400 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold text-black dark:text-white">Admin Panel</span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-6">
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-[#8BE31F] text-black font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-black dark:text-white truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@company.com</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}