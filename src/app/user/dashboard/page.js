"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  FileText,
  DollarSign,
  Briefcase,
  BarChart2,
  Eye,
  Mail,
  Search,
  Building,
  Calendar,
  Clock,
  Users,
  Code,
  Palette,
  Smartphone,
  ShoppingCart,
  TrendingUp,
  Target,
  Loader2,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";

export default function PartnerDashboard() {
  const [userData, setUserData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { theme } = useTheme();

  const projectTypes = [
    {
      id: "web-development",
      label: "Web Development",
      icon: Code,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "mobile-app",
      label: "Mobile App",
      icon: Smartphone,
      color: "bg-green-100 text-green-800",
    },
    {
      id: "ui-ux-design",
      label: "UI/UX Design",
      icon: Palette,
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "e-commerce",
      label: "E-commerce",
      icon: ShoppingCart,
      color: "bg-orange-100 text-orange-800",
    },
    {
      id: "seo-marketing",
      label: "SEO/Marketing",
      icon: TrendingUp,
      color: "bg-pink-100 text-pink-800",
    },
    {
      id: "branding",
      label: "Branding",
      icon: Target,
      color: "bg-indigo-100 text-indigo-800",
    },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/partner/login");
        return;
      }
      setIsEmailVerified(user.emailVerified);
      if (!user.emailVerified) {
        setError("Please verify your email to access the dashboard.");
        setLoading(false);
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, "partnerApplications", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          setError("No partner application found. Please complete the signup process.");
        }
      } catch (err) {
        let errorMessage = "Failed to load dashboard data. Please try again.";
        if (err.code === "unavailable") {
          errorMessage = "Network error: Please check your internet connection or try a different network/VPN.";
        } else if (err.code === "permission-denied") {
          errorMessage = "Access denied: Please ensure your email is verified.";
        }
        setError(errorMessage);
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!userData || !isEmailVerified) return;
    const q = query(
      collection(db, "projects"),
      where("partnerId", "==", auth.currentUser?.uid)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const projectsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          startDate: doc.data().startDate
            ? doc.data().startDate.toDate().toISOString().split("T")[0]
            : null,
          deadline: doc.data().deadline
            ? doc.data().deadline.toDate().toISOString().split("T")[0]
            : null,
          partner: {
            name: userData.fullName || "Unknown",
            type: userData.partnershipType || "Unknown",
          },
        }));
        setProjects(projectsData);
      },
      (err) => {
        console.error("Error fetching projects:", err);
        toast.error("Failed to load projects.");
        setError("Failed to load projects.");
      }
    );
    return () => unsubscribe();
  }, [userData, isEmailVerified]);

  const handleResendVerification = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success("Verification email resent. Please check your inbox and spam folder.");
    } catch (err) {
      toast.error("Failed to resend verification email.");
      console.error("Resend verification error:", err);
    }
  };

  const handleCompleteSignup = () => {
    router.push("/signup");
  };

  const handleView = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
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

  const getTypeInfo = (typeId) => {
    return projectTypes.find((type) => type.id === typeId) || projectTypes[0];
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
        <Loader2
          className="w-10 h-10 animate-spin text-[#8BE31F]"
          aria-label="Loading dashboard"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
        <div className="text-center space-y-6 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md border border-gray-200 dark:border-gray-700">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
          {error.includes("verify your email") && (
            <button
              onClick={handleResendVerification}
              className="flex items-center mx-auto px-5 py-2.5 bg-gradient-to-r from-[#8BE31F] to-green-500 text-white rounded-full hover:from-[#7ACC1B] hover:to-green-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#8BE31F] focus:ring-offset-2 shadow-md"
              aria-label="Resend verification email"
            >
              <Mail className="w-5 h-5 mr-2" />
              Resend Verification Email
            </button>
          )}
          {error.includes("complete the signup process") && (
            <button
              onClick={handleCompleteSignup}
              className="flex items-center mx-auto px-5 py-2.5 bg-gradient-to-r from-[#8BE31F] to-green-500 text-white rounded-full hover:from-[#7ACC1B] hover:to-green-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#8BE31F] focus:ring-offset-2 shadow-md"
              aria-label="Complete signup"
            >
              <FileText className="w-5 h-5 mr-2" />
              Complete Signup
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme={theme} />
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {userData?.fullName || "Partner"}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your {userData?.partnershipType?.toUpperCase() || "Partner"} Dashboard
          </p>
          {userData?.status === "pending" && (
            <p className="text-yellow-500 text-sm mt-2">
              Your application is pending review. We&apos;ll notify you once approved.
            </p>
          )}
          {userData?.status === "approved" && (
            <p className="text-[#8BE31F] text-sm mt-2">
              Your application is approved! View your assigned projects below.
            </p>
          )}
          {userData?.status === "rejected" && (
            <p className="text-red-500 text-sm mt-2">
              Your application was rejected. Please contact support or reapply.
            </p>
          )}
        </div>
      </header>
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            icon: FileText,
            title: "Application Status",
            value:
              userData?.status === "pending"
                ? "Pending Review"
                : userData?.status === "approved"
                ? "Approved"
                : userData?.status === "rejected"
                ? "Rejected"
                : "Unknown Status",
          },
          {
            icon: DollarSign,
            title: "Earnings",
            value: `$${projects
              .reduce((sum, p) => sum + (parseFloat(p.paid) || 0), 0)
              .toLocaleString()}`,
          },
          {
            icon: Briefcase,
            title: "Active Projects",
            value: `${projects.filter((p) => p.status === "In Progress").length} Projects`,
          },
          { icon: BarChart2, title: "Referrals", value: "0 Referrals" },
        ].map((metric, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:border-[#8BE31F] transition-all duration-300"
          >
            <div className="flex items-center">
              <metric.icon className="w-8 h-8 text-[#8BE31F] mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {metric.title}
                </h3>
                <p
                  className={`text-gray-600 dark:text-gray-400 mt-1 ${
                    metric.title === "Application Status" && metric.value === "Rejected"
                      ? "text-red-500"
                      : metric.value === "Approved"
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  {metric.value}
                </p>
                {metric.title === "Application Status" && metric.value === "Rejected" && (
                  <p className="text-xs text-red-500 mt-1">
                    Contact support or reapply.
                  </p>
                )}
                {metric.title === "Application Status" && metric.value === "Unknown Status" && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Please contact support for assistance.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Projects Section */}
      <section className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Projects
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => {
              const typeInfo = getTypeInfo(project.type);
              const TypeIcon = typeInfo.icon;
              return (
                <div
                  key={project.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg ${typeInfo.color}`}>
                          <TypeIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {project.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {project.client}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}
                        >
                          {typeInfo.label}
                        </span>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            project.priority
                          )}`}
                        >
                          {project.priority} Priority
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleView(project)}
                      className="p-1.5 rounded-full text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
                      aria-label={`View ${project.name}`}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {project.description || "No description provided."}
                    </p>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Progress
                        </span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-[#8BE31F] to-green-500 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Budget
                          </p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            ${(project.budget || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Paid
                          </p>
                          <p className="text-sm font-medium text-green-600">
                            ${(project.paid || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Deadline
                          </p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {project.deadline || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Team
                          </p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            1 member
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#8BE31F] to-green-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {project.partner.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {project.partner.type} Partner
                          </p>
                        </div>
                      </div>
                      {project.clientSatisfaction && (
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Satisfaction:
                          </span>
                          <span className="text-sm font-medium text-yellow-600">
                            {project.clientSatisfaction}/5.0
                          </span>
                        </div>
                      )}
                    </div>
                    {project.technologies?.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          Technologies
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-xs text-gray-700 dark:text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
              <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No projects assigned
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                You currently have no projects assigned to you.
              </p>
            </div>
          )}
        </div>
      </section>
   
      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Project Details
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8BE31F]"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Project Name
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {selectedProject.name || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Client Name
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {selectedProject.client || "N/A"}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Project Type
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {getTypeInfo(selectedProject.type).label}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Assigned Partner
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {selectedProject.partner
                        ? `${selectedProject.partner.name} (${selectedProject.partner.type})`
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Priority
                    </label>
                    <p
                      className={`text-gray-900 dark:text-gray-100 ${getPriorityColor(
                        selectedProject.priority
                      )}`}
                    >
                      {selectedProject.priority || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Status
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {selectedProject.status || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Budget ($)
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      ${(selectedProject.budget || 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Paid ($)
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      ${(selectedProject.paid || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Progress (%)
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {selectedProject.progress || 0}%
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Deadline
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {selectedProject.deadline || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Client Satisfaction
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {selectedProject.clientSatisfaction
                      ? `${selectedProject.clientSatisfaction}/5.0`
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Description
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {selectedProject.description || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Technologies
                  </label>
                  {selectedProject.technologies?.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-xs text-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-900 dark:text-gray-100">
                      None selected
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8BE31F] focus:ring-offset-2"
                aria-label="Close modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}