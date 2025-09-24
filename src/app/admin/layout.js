"use client";
import { useState, useEffect, createContext, useContext } from "react";
import {
  LayoutDashboard,
  Users,
  Handshake,
  DollarSign,
  Briefcase,
  FileText,
  Settings,
  Bell,
  Search,
  Building,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Code,
  Palette,
  Smartphone,
  ShoppingCart,
  TrendingUp,
  Target,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Modal Context to allow child components to trigger the modal
const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

export default function AdminLayout({ children }) {
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalMode, setModalMode] = useState("view"); // "view" or "edit"
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const activeTab = pathname.split("/").pop() || "dashboard";

  const projectTypes = [
    { id: "web-development", label: "Web Development", icon: Code, color: "bg-blue-100 text-blue-800" },
    { id: "mobile-app", label: "Mobile App", icon: Smartphone, color: "bg-green-100 text-green-800" },
    { id: "ui-ux-design", label: "UI/UX Design", icon: Palette, color: "bg-purple-100 text-purple-800" },
    { id: "e-commerce", label: "E-commerce", icon: ShoppingCart, color: "bg-orange-100 text-orange-800" },
    { id: "seo-marketing", label: "SEO/Marketing", icon: TrendingUp, color: "bg-pink-100 text-pink-800" },
    { id: "branding", label: "Branding", icon: Target, color: "bg-indigo-100 text-indigo-800" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { id: "partners", label: "Partners", icon: Users, href: "/admin/partners" },
    { id: "projects", label: "Projects", icon: Briefcase, href: "/admin/projects" },
    { id: "commissions", label: "Bidding", icon: DollarSign, href: "/admin/Bidding" },
    { id: "applications", label: "Applications", icon: FileText, href: "/admin/applications" },
    { id: "analytics", label: "Analytics", icon: Handshake, href: "/admin/analytics" },
    { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/adminLogin");
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const openModal = (data, mode = "view") => {
    setModalData(data);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
    setModalMode("view");
  };

  const getTypeInfo = (typeId) => {
    return projectTypes.find((type) => type.id === typeId) || projectTypes[0];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Review":
        return "bg-yellow-100 text-yellow-800";
      case "Planning":
        return "bg-purple-100 text-purple-800";
      case "On Hold":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  // Sample notifications
  const notifications = [
    { id: 1, message: "New project assigned: E-commerce Platform", time: "2 hours ago" },
    { id: 2, message: "Partner application pending review", time: "Yesterday" },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-[#8BE31F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        <ToastContainer position="top-right" autoClose={3000} />
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out shadow-lg`}
        >
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#8BE31F] to-green-400 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8BE31F]"
              aria-label="Close sidebar"
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
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-all duration-200 group relative ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-[#8BE31F] to-green-400 text-black font-medium"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                    }`}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <Icon className="w-6 h-6" />
                    <span>{item.label}</span>
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -ml-24">
                      {item.label}
                    </span>
                  </Link>
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
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@company.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8BE31F]"
                  aria-label="Open sidebar"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{activeTab}</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage your projects and partnerships</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search projects or partners..."
                    className="pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-64 transition-all duration-200"
                    aria-label="Search projects or partners"
                  />
                </div>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#8BE31F]"
                    aria-label="View notifications"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                      </div>
                      <div className="p-2">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className="p-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <p>{notification.message}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                            </div>
                          ))
                        ) : (
                          <p className="p-3 text-sm text-gray-500 dark:text-gray-400">No notifications</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8BE31F]"
                    aria-label="Open profile menu"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <button
                        onClick={() => router.push("/admin/profile")}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="View profile"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Log out"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Modal */}
        {isModalOpen && modalData && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4"
            onClick={closeModal}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[70vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {modalMode === "edit" ? "Project Details (Edit)" : "Project Details"}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8BE31F]"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Project Name</label>
                    <p className="text-gray-900 dark:text-gray-100">{modalData.name || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Client Name</label>
                    <p className="text-gray-900 dark:text-gray-100">{modalData.client || "N/A"}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Project Type</label>
                      <p className="text-gray-900 dark:text-gray-100">{getTypeInfo(modalData.type).label}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Assigned Partner</label>
                      <p className="text-gray-900 dark:text-gray-100">
                        {modalData.partner ? `${modalData.partner.name} (${modalData.partner.type})` : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Priority</label>
                      <p className="text-gray-900 dark:text-gray-100">{modalData.priority || "N/A"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                      <p className="text-gray-900 dark:text-gray-100">{modalData.status || "N/A"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Budget ($)</label>
                      <p className="text-gray-900 dark:text-gray-100">${(modalData.budget || 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Paid ($)</label>
                      <p className="text-gray-900 dark:text-gray-100">${(modalData.paid || 0).toLocaleString()}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Progress (%)</label>
                    <p className="text-gray-900 dark:text-gray-100">{modalData.progress || 0}%</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Deadline</label>
                    <p className="text-gray-900 dark:text-gray-100">{modalData.deadline || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Client Satisfaction</label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {modalData.clientSatisfaction ? `${modalData.clientSatisfaction}/5.0` : "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
                    <p className="text-gray-900 dark:text-gray-100">{modalData.description || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Technologies</label>
                    {modalData.technologies?.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {modalData.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-xs text-gray-700 dark:text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-900 dark:text-gray-100">None selected</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8BE31F] focus:ring-offset-2"
                  aria-label="Close modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ModalContext.Provider>
  );
}