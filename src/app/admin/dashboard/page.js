"use client";
import { useState, useEffect } from "react";
import {
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  User,
  BarChart3,
  PieChart,
  Filter,
  ChevronDown,
  Search,
  Loader2,
  X,
  Code,
  Smartphone,
  Palette,
  ShoppingCart,
  TrendingUp as TrendingUpIcon,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { collection, query, onSnapshot, where, getDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DashboardPage() {
  const [stats, setStats] = useState([]);
  const [recentPartners, setRecentPartners] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("30d");
  const [isPartner, setIsPartner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalType, setModalType] = useState(""); // "partner" or "project"
  const [error, setError] = useState(null);
  const router = useRouter();

  const projectTypes = [
    { id: "web-development", label: "Web Development", icon: Code, color: "bg-blue-100 text-blue-800" },
    { id: "mobile-app", label: "Mobile App", icon: Smartphone, color: "bg-green-100 text-green-800" },
    { id: "ui-ux-design", label: "UI/UX Design", icon: Palette, color: "bg-purple-100 text-purple-800" },
    { id: "e-commerce", label: "E-commerce", icon: ShoppingCart, color: "bg-orange-100 text-orange-800" },
    { id: "seo-marketing", label: "SEO/Marketing", icon: TrendingUpIcon, color: "bg-pink-100 text-pink-800" },
    { id: "branding", label: "Branding", icon: Target, color: "bg-indigo-100 text-indigo-800" },
  ];

  const filterOptions = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 90 days" },
    { value: "all", label: "All time" },
  ];

  const getTypeInfo = (typeId) => {
    return projectTypes.find((type) => type.id === typeId) || { id: "unknown", label: "Unknown", icon: Code, color: "bg-gray-100 text-gray-800" };
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

  // Calculate revenue data for chart
  const getRevenueData = (projects, period) => {
    const now = new Date();
    let startDate;
    switch (period) {
      case "7d":
        startDate = new Date(now - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30d":
        startDate = new Date(now - 30 * 24 * 60 * 60 * 1000);
        break;
      case "90d":
        startDate = new Date(now - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(0);
    }

    const filteredProjects = projects.filter(
      (p) => p.deadline && new Date(p.deadline) >= startDate
    );

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const revenueByMonth = months.map(() => 0);
    filteredProjects.forEach((p) => {
      if (p.deadline) {
        const month = new Date(p.deadline).getMonth();
        revenueByMonth[month] += p.paid || 0;
      }
    });

    return {
      labels: months.slice(0, new Date().getMonth() + 1),
      datasets: [
        {
          label: "Revenue",
          data: revenueByMonth.slice(0, new Date().getMonth() + 1),
          backgroundColor: "#8BE31F",
          borderColor: "#7ACC1B",
          borderWidth: 1,
        },
      ],
    };
  };

  const partnerDistributionData = {
    labels: ["Developer Partners", "Referral Partners"],
    datasets: [
      {
        data: [
          recentPartners.filter((p) => p.partnershipType.toLowerCase() === "developer").length,
          recentPartners.filter((p) => p.partnershipType.toLowerCase() === "referral").length,
        ],
        backgroundColor: ["#3B82F6", "#10B981"],
        borderColor: ["#2563EB", "#059669"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/admin/login");
        return;
      }

      setLoading(true);
      try {
        const partnerDoc = await getDoc(doc(db, "partnerApplications", user.uid));
        const isPartnerUser = partnerDoc.exists();
        setIsPartner(isPartnerUser);

        const partnersQuery = isPartnerUser
          ? query(collection(db, "partnerApplications"), where("uid", "==", user.uid))
          : query(collection(db, "partnerApplications"));
        const unsubscribePartners = onSnapshot(
          partnersQuery,
          (snapshot) => {
            const partnersData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              fullName: doc.data().fullName || "Unknown",
              partnershipType: doc.data().partnershipType || "Unknown",
              email: doc.data().email || "N/A",
              status: doc.data().status || "pending",
              earnings: doc.data().earnings || 0,
              joinDate: doc.data().joinDate
                ? doc.data().joinDate.toDate().toISOString().split("T")[0]
                : "N/A",
            }));

            setRecentPartners(
              partnersData
                .sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate))
                .slice(0, 4)
            );

            const totalPartners = partnersData.length;
            const activePartners = partnersData.filter((p) => p.status === "approved").length;
            const totalEarnings = partnersData.reduce((sum, p) => sum + (p.earnings || 0), 0);

            setStats((prev) => [
              {
                title: "Total Partners",
                value: totalPartners.toLocaleString(),
                change: prev.find((s) => s.title === "Total Partners")?.change || "+0%",
                trend: prev.find((s) => s.title === "Total Partners")?.trend || "up",
                icon: Users,
                color: "from-blue-500 to-blue-600",
              },
              {
                title: "Active Projects",
                value: prev.find((s) => s.title === "Active Projects")?.value || "0",
                change: prev.find((s) => s.title === "Active Projects")?.change || "+0%",
                trend: prev.find((s) => s.title === "Active Projects")?.trend || "up",
                icon: Briefcase,
                color: "from-green-500 to-green-600",
              },
              {
                title: "Total Revenue",
                value: `$${totalEarnings.toLocaleString()}`,
                change: prev.find((s) => s.title === "Total Revenue")?.change || "+0%",
                trend: prev.find((s) => s.title === "Total Revenue")?.trend || "up",
                icon: DollarSign,
                color: "from-purple-500 to-purple-600",
              },
              {
                title: "Pending Payouts",
                value: prev.find((s) => s.title === "Pending Payouts")?.value || "$0",
                change: prev.find((s) => s.title === "Pending Payouts")?.change || "+0%",
                trend: prev.find((s) => s.title === "Pending Payouts")?.trend || "down",
                icon: TrendingUp,
                color: "from-orange-500 to-orange-600",
              },
            ]);
          },
          (err) => {
            console.error("Error fetching partners:", err);
            toast.error("Failed to load partner data.");
            setError("Failed to load partner data.");
          }
        );

        const projectsQuery = isPartnerUser
          ? query(collection(db, "projects"), where("partnerId", "==", user.uid))
          : query(collection(db, "projects"));
        const unsubscribeProjects = onSnapshot(
          projectsQuery,
          (snapshot) => {
            const projectsData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              deadline: doc.data().deadline
                ? doc.data().deadline.toDate().toISOString().split("T")[0]
                : "N/A",
              paid: doc.data().paid || 0,
              budget: doc.data().budget || 0,
              partnerName: doc.data().partnerName || "N/A",
              partnerType: doc.data().partnerType || "N/A",
              type: doc.data().type || "web-development",
              status: doc.data().status || "In Progress",
              progress: doc.data().progress || 0,
              clientSatisfaction: doc.data().clientSatisfaction || null,
              technologies: doc.data().technologies || [],
              description: doc.data().description || "N/A",
              priority: doc.data().priority || "Medium",
            }));

            setRecentProjects(
              projectsData
                .sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
                .slice(0, 3)
            );

            const activeProjects = projectsData.filter((p) => p.status === "In Progress").length;
            const pendingPayouts = projectsData.reduce((sum, p) => sum + (p.budget - p.paid || 0), 0);

            setStats((prev) =>
              prev.map((stat) => {
                if (stat.title === "Active Projects") {
                  return { ...stat, value: activeProjects.toLocaleString() };
                }
                if (stat.title === "Pending Payouts") {
                  return { ...stat, value: `$${pendingPayouts.toLocaleString()}` };
                }
                return stat;
              })
            );
          },
          (err) => {
            console.error("Error fetching projects:", err);
            toast.error("Failed to load project data.");
            setError("Failed to load project data.");
          }
        );

        setLoading(false);
      } catch (err) {
        console.error("Error initializing dashboard:", err);
        toast.error("Failed to initialize dashboard.");
        setError("Failed to initialize dashboard.");
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  const filteredPartners = recentPartners.filter(
    (partner) =>
      partner.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProjects = recentProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const revenueData = getRevenueData(recentProjects, filterPeriod);

  const handleViewPartner = (partner) => {
    setModalData({
      name: partner.fullName || "Unknown",
      email: partner.email || "N/A",
      type: partner.partnershipType || "Unknown",
      status: partner.status || "pending",
      earnings: `$${partner.earnings.toLocaleString()}` || "$0",
      joinDate: partner.joinDate || "N/A",
    });
    setModalType("partner");
    setIsModalOpen(true);
  };

  const handleViewProject = (project) => {
    setModalData({
      name: project.name || "Unknown",
      client: project.client || "N/A",
      partner: { name: project.partnerName || "N/A", type: project.partnerType || "N/A" },
      type: project.type || "web-development",
      status: project.status || "In Progress",
      priority: project.priority || "Medium",
      budget: project.budget || 0,
      paid: project.paid || 0,
      progress: project.progress || 0,
      deadline: project.deadline || "N/A",
      clientSatisfaction: project.clientSatisfaction || null,
      description: project.description || "N/A",
      technologies: project.technologies || [],
    });
    setModalType("project");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
    setModalType("");
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-[#8BE31F]" aria-label="Loading dashboard data" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" autoClose={3000} theme={typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"} />
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search partners or projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2.5 w-full sm:w-64 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
          aria-label="Search partners or projects"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                  <div
                    className={`flex items-center mt-2 text-sm ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
            <div className="relative group">
              <button
                className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#8BE31F] transition-colors"
                aria-label="Filter revenue data"
              >
                <Filter className="w-4 h-4" />
                <span>{filterOptions.find((opt) => opt.value === filterPeriod)?.label || "Last 30 days"}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 hidden group-hover:block">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFilterPeriod(option.value)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label={`Filter by ${option.label}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="h-64">
            {revenueData.datasets[0].data.some((v) => v > 0) ? (
              <Bar
                data={revenueData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Revenue ($)",
                      },
                    },
                    x: {
                      title: {
                        display: true,
                        text: "Month",
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400">No revenue data available</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Partner Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Partner Distribution</h3>
            {!isPartner && (
              <button
                onClick={() => router.push("/admin/partners")}
                className="text-sm text-[#8BE31F] hover:text-[#7ACC1B] transition-colors"
                aria-label="View all partners"
              >
                View All
              </button>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Developer Partners</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {partnerDistributionData.datasets[0].data[0] || 0}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  {recentPartners.length
                    ? ((partnerDistributionData.datasets[0].data[0] / recentPartners.length) * 100).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Referral Partners</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {partnerDistributionData.datasets[0].data[1] || 0}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  {recentPartners.length
                    ? ((partnerDistributionData.datasets[0].data[1] / recentPartners.length) * 100).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
            </div>
            <div className="h-48">
              {partnerDistributionData.datasets[0].data.some((v) => v > 0) ? (
                <Pie
                  data={partnerDistributionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          color: "#ffffff",
                          font: {
                            size: 12,
                          },
                        },
                      },
                    },
                  }}
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">No partner data available</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Partners */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Partners</h3>
            {!isPartner && (
              <button
                onClick={() => router.push("/admin/partners")}
                className="text-sm text-[#8BE31F] hover:text-[#7ACC1B] transition-colors flex items-center"
                aria-label="View all partners"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>
          <div className="space-y-4">
            {filteredPartners.length > 0 ? (
              filteredPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                  onClick={() => handleViewPartner(partner)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${partner.fullName}`}
                  onKeyDown={(e) => e.key === "Enter" && handleViewPartner(partner)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#8BE31F] to-green-400 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{partner.fullName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {partner.partnershipType} • {partner.joinDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm text-gray-900 dark:text-white">
                      ${partner.earnings.toLocaleString()}
                    </p>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        partner.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : partner.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {partner.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">No partners found</p>
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Projects</h3>
            {!isPartner && (
              <button
                onClick={() => router.push("/admin/projects")}
                className="text-sm text-[#8BE31F] hover:text-[#7ACC1B] transition-colors flex items-center"
                aria-label="View all projects"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>
          <div className="space-y-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                  onClick={() => handleViewProject(project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${project.name}`}
                  onKeyDown={(e) => e.key === "Enter" && handleViewProject(project)}
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{project.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {project.client} • {project.partnerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm text-gray-900 dark:text-white">
                      ${project.budget.toLocaleString()}
                    </p>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">No projects found</p>
            )}
          </div>
        </div>
      </div>

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
                {modalType === "partner" ? "Partner Details" : "Project Details"}
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
              {modalType === "partner" ? (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                    <p className="text-gray-900 dark:text-gray-100">{modalData.name || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                    <p className="text-gray-900 dark:text-gray-100">{modalData.email || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Type</label>
                    <p className="text-gray-900 dark:text-gray-100">{modalData.type || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                    <p className="text-gray-900 dark:text-gray-100">{modalData.status || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Earnings</label>
                    <p className="text-gray-900 dark:text-gray-100">{modalData.earnings || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Join Date</label>
                    <p className="text-gray-900 dark:text-gray-100">{modalData.joinDate || "N/A"}</p>
                  </div>
                </div>
              ) : (
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
                      <p className={`text-gray-900 dark:text-gray-100 ${getPriorityColor(modalData.priority)}`}>
                        {modalData.priority || "N/A"}
                      </p>
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
              )}
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
  );
}
