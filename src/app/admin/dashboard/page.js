"use client";
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
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Partners",
      value: "524",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Active Projects",
      value: "87",
      change: "+8%",
      trend: "up",
      icon: Briefcase,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Total Revenue",
      value: "$124K",
      change: "+23%",
      trend: "up",
      icon: DollarSign,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Pending Payouts",
      value: "$18.5K",
      change: "-5%",
      trend: "down",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const recentPartners = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      type: "Developer",
      status: "Active",
      earnings: "$2,450",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      type: "Referral",
      status: "Active",
      earnings: "$1,230",
      joinDate: "2024-01-14",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@example.com",
      type: "Developer",
      status: "Pending",
      earnings: "$0",
      joinDate: "2024-01-16",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      type: "Referral",
      status: "Active",
      earnings: "$3,120",
      joinDate: "2024-01-13",
    },
  ];

  const recentProjects = [
    {
      id: 1,
      name: "E-commerce Website",
      client: "TechCorp Inc.",
      partner: "John Smith",
      value: "$5,500",
      status: "In Progress",
      deadline: "2024-02-15",
    },
    {
      id: 2,
      name: "Mobile App Development",
      client: "StartupXYZ",
      partner: "Sarah Johnson",
      value: "$8,200",
      status: "Completed",
      deadline: "2024-01-20",
    },
    {
      id: 3,
      name: "Brand Identity Design",
      client: "Creative Agency",
      partner: "Emily Davis",
      value: "$3,400",
      status: "Review",
      deadline: "2024-02-10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-black dark:text-white mt-2">{stat.value}</p>
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
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black dark:text-white">Revenue Overview</h3>
            <button className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#8BE31F] transition-colors">
              <Filter className="w-4 h-4" />
              <span>Last 30 days</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">Chart will be implemented here</p>
            </div>
          </div>
        </div>

        {/* Partner Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black dark:text-white">Partner Distribution</h3>
            <button className="text-sm text-[#8BE31F] hover:text-[#7ACC1B] transition-colors">View All</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Developer Partners</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-black dark:text-white">312</span>
                <span className="text-xs text-gray-500 ml-2">59.5%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Referral Partners</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-black dark:text-white">212</span>
                <span className="text-xs text-gray-500 ml-2">40.5%</span>
              </div>
            </div>
            <div className="h-48 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg mt-4">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Pie chart visualization</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Partners */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black dark:text-white">Recent Partners</h3>
            <button className="text-sm text-[#8BE31F] hover:text-[#7ACC1B] transition-colors flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {recentPartners.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#8BE31F] to-green-400 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-medium text-black dark:text-white text-sm">{partner.name}</p>
                    <p className="text-xs text-gray-500">{partner.type} • {partner.joinDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm text-black dark:text-white">{partner.earnings}</p>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      partner.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {partner.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black dark:text-white">Recent Projects</h3>
            <button className="text-sm text-[#8BE31F] hover:text-[#7ACC1B] transition-colors flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-black dark:text-white text-sm">{project.name}</p>
                  <p className="text-xs text-gray-500">{project.client} • {project.partner}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm text-black dark:text-white">{project.value}</p>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : project.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}