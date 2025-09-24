"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  orderBy,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Plus,
  Search,
  Users,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  FileText,
  Palette,
  Camera,
  BarChart3,
  Megaphone,
  Mail,
  Video,
  Code,
  ShoppingCart,
  Smartphone,
  Star,
  Phone,
  RefreshCw,
  Inbox,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Digital Services Categories
const SERVICE_CATEGORIES = [
  { id: "social-media", name: "Social Media Management", icon: Users, color: "bg-blue-100 text-blue-800" },
  { id: "web-development", name: "Web Development", icon: Code, color: "bg-green-100 text-green-800" },
  { id: "seo", name: "SEO & Digital Marketing", icon: BarChart3, color: "bg-purple-100 text-purple-800" },
  { id: "graphic-design", name: "Graphic Design", icon: Palette, color: "bg-pink-100 text-pink-800" },
  { id: "content-creation", name: "Content Creation", icon: FileText, color: "bg-yellow-100 text-yellow-800" },
  { id: "photography", name: "Photography & Videography", icon: Camera, color: "bg-indigo-100 text-indigo-800" },
  { id: "paid-advertising", name: "Paid Advertising", icon: Megaphone, color: "bg-red-100 text-red-800" },
  { id: "email-marketing", name: "Email Marketing", icon: Mail, color: "bg-teal-100 text-teal-800" },
  { id: "mobile-app", name: "Mobile App Development", icon: Smartphone, color: "bg-orange-100 text-orange-800" },
  { id: "ecommerce", name: "E-commerce Solutions", icon: ShoppingCart, color: "bg-cyan-100 text-cyan-800" },
  { id: "analytics", name: "Analytics & Reporting", icon: BarChart3, color: "bg-gray-100 text-gray-800" },
  { id: "video-production", name: "Video Production", icon: Video, color: "bg-violet-100 text-violet-800" },
];

const PROJECT_PRIORITIES = [
  { value: "low", label: "Low", color: "bg-gray-100 text-gray-800" },
  { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
  { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-800" },
];

const PROJECT_STATUSES = [
  { value: "open", label: "Open for Bidding", color: "bg-green-100 text-green-800" },
  { value: "in-review", label: "Under Review", color: "bg-yellow-100 text-yellow-800" },
  { value: "awarded", label: "Awarded", color: "bg-blue-100 text-blue-800" },
  { value: "closed", label: "Closed", color: "bg-gray-100 text-gray-800" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
];

const BID_STATUSES = [
  { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { value: "accepted", label: "Accepted", color: "bg-green-100 text-green-800" },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
  { value: "withdrawn", label: "Withdrawn", color: "bg-gray-100 text-gray-800" },
];

export default function EnhancedUserBidding() {
  const [projects, setProjects] = useState([]);
  const [bids, setBids] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [bidForms, setBidForms] = useState({});
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("open");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTab, setActiveTab] = useState("available");
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingBid, setEditingBid] = useState(null);
  const [stats, setStats] = useState({
    totalBids: 0,
    activeBids: 0,
    acceptedBids: 0,
    avgBidAmount: 0,
  });

  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    setLoading(true);

    const projectsQuery = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribeProjects = onSnapshot(
      projectsQuery,
      (snapshot) => {
        const projectsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching projects:", err);
        toast.error("Failed to load projects.");
        setError("Failed to load projects.");
        setLoading(false);
      }
    );

    const bidsQuery = query(collection(db, "bids"), orderBy("createdAt", "desc"));
    const unsubscribeBids = onSnapshot(
      bidsQuery,
      (snapshot) => {
        const bidsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBids(bidsData);
        const userBids = bidsData.filter((bid) => bid.email === user.email);
        setMyBids(userBids);

        const totalBids = userBids.length;
        const activeBids = userBids.filter((bid) => bid.status === "pending" || !bid.status).length;
        const acceptedBids = userBids.filter((bid) => bid.status === "accepted").length;
        const avgBidAmount = userBids.length > 0
          ? userBids.reduce((sum, bid) => sum + (bid.amount || 0), 0) / userBids.length
          : 0;

        setStats({
          totalBids,
          activeBids,
          acceptedBids,
          avgBidAmount: Math.round(avgBidAmount),
        });
      },
      (err) => {
        console.error("Error fetching bids:", err);
        toast.error("Failed to load bids.");
      }
    );

    return () => {
      unsubscribeProjects();
      unsubscribeBids();
    };
  }, [user]);

  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (project.skillsRequired &&
            project.skillsRequired.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((project) => project.category === categoryFilter);
    }

    
    

    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        break;
      case "oldest":
        filtered.sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
        break;
      case "budget-high":
        filtered.sort((a, b) => (b.maxBudget || 0) - (a.maxBudget || 0));
        break;
      case "budget-low":
        filtered.sort((a, b) => (a.maxBudget || 0) - (b.maxBudget || 0));
        break;
      case "deadline":
        filtered.sort((a, b) => (a.deadline?.seconds || 0) - (b.deadline?.seconds || 0));
        break;
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, statusFilter, categoryFilter, budgetFilter, sortBy]);

  const updateBidForm = (projectId, field, value) => {
    const form = bidForms[projectId] || {
      name: user?.displayName || "",
      email: user?.email || "",
      whatsapp: "",
      amount: "",
      proposal: "",
      deliveryTime: "",
    };
    setBidForms({ ...bidForms, [projectId]: { ...form, [field]: value } });
  };

  const openBidModal = (project) => {
    setSelectedProject(project);
    setShowBidModal(true);
    const existingBid = myBids.find((bid) => bid.projectId === project.id);
    setEditingBid(existingBid || null);

    if (existingBid) {
      setBidForms({
        ...bidForms,
        [project.id]: {
          name: existingBid.name || user?.displayName || "",
          email: existingBid.email || user?.email || "",
          whatsapp: existingBid.whatsapp || "",
          amount: existingBid.amount?.toString() || "",
          proposal: existingBid.proposal || "",
          deliveryTime: existingBid.deliveryTime || "",
        },
      });
    } else {
      setBidForms({
        ...bidForms,
        [project.id]: {
          name: user?.displayName || "",
          email: user?.email || "",
          whatsapp: "",
          amount: "",
          proposal: "",
          deliveryTime: "",
        },
      });
    }
  };

  const submitBid = async () => {
    if (!selectedProject) return;

    const form = bidForms[selectedProject.id] || {};
    if (!form.name || !form.email || !form.whatsapp || !form.amount) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (parseFloat(form.amount) <= 0) {
      toast.error("Bid amount must be greater than 0.");
      return;
    }

    try {
      const bidData = {
        projectId: selectedProject.id,
        name: form.name,
        email: form.email,
        whatsapp: form.whatsapp,
        amount: parseFloat(form.amount),
        proposal: form.proposal || "",
        deliveryTime: form.deliveryTime || "",
        status: "pending",
        updatedAt: serverTimestamp(),
      };

      if (editingBid) {
        await updateDoc(doc(db, "bids", editingBid.id), bidData);
        toast.success("Bid updated successfully!");
      } else {
        await addDoc(collection(db, "bids"), {
          ...bidData,
          createdAt: serverTimestamp(),
        });
        toast.success("Bid placed successfully!");
      }

      setShowBidModal(false);
      setSelectedProject(null);
      setEditingBid(null);
      setBidForms({
        ...bidForms,
        [selectedProject.id]: {
          name: user?.displayName || "",
          email: user?.email || "",
          whatsapp: "",
          amount: "",
          proposal: "",
          deliveryTime: "",
        },
      });
    } catch (err) {
      console.error("Error submitting bid:", err);
      toast.error("Failed to submit bid.");
    }
  };

  const withdrawBid = async (bidId) => {
    if (!window.confirm("Are you sure you want to withdraw this bid?")) return;

    try {
      await updateDoc(doc(db, "bids", bidId), {
        status: "withdrawn",
        updatedAt: serverTimestamp(),
      });
      toast.success("Bid withdrawn successfully!");
    } catch (err) {
      console.error("Error withdrawing bid:", err);
      toast.error("Failed to withdraw bid.");
    }
  };

  const deleteBid = async (bidId) => {
    if (!window.confirm("Are you sure you want to delete this bid permanently?")) return;

    try {
      await deleteDoc(doc(db, "bids", bidId));
      toast.success("Bid deleted successfully!");
    } catch (err) {
      console.error("Error deleting bid:", err);
      toast.error("Failed to delete bid.");
    }
  };

  const getCategoryIcon = (categoryId) => {
    const category = SERVICE_CATEGORIES.find((cat) => cat.id === categoryId);
    return category ? category.icon : FileText;
  };

  const getCategoryColor = (categoryId) => {
    const category = SERVICE_CATEGORIES.find((cat) => cat.id === categoryId);
    return category ? category.color : "bg-gray-100 text-gray-800";
  };

  const getCategoryName = (categoryId) => {
    const category = SERVICE_CATEGORIES.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  const getPriorityColor = (priority) => {
    const priorityObj = PROJECT_PRIORITIES.find((p) => p.value === priority);
    return priorityObj ? priorityObj.color : "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status) => {
    const statusObj = PROJECT_STATUSES.find((s) => s.value === status);
    return statusObj ? statusObj.color : "bg-gray-100 text-gray-800";
  };

  const getBidStatusColor = (status) => {
    const statusObj = BID_STATUSES.find((s) => s.value === status);
    return statusObj ? statusObj.color : "bg-yellow-100 text-yellow-800";
  };

  const getProjectBidsCount = (projectId) => {
    return bids.filter((bid) => bid.projectId === projectId).length;
  };

  const getUserBid = (projectId) => {
    return myBids.find((bid) => bid.projectId === projectId);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 mx-auto"
            aria-label="Retry loading"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Bids</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalBids}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Bids</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeBids}</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Accepted</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.acceptedBids}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Bid Amount</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgBidAmount.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("available")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "available"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
                aria-label="View available projects"
              >
                Available Projects ({filteredProjects.length})
              </button>
              <button
                onClick={() => setActiveTab("mybids")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "mybids"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
                aria-label="View my bids"
              >
                My Bids ({myBids.length})
              </button>
            </nav>
          </div>
        </div>
        {activeTab === "available" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search projects, skills, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="Search projects"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  aria-label="Filter by project status"
                >
                  <option value="all">All Status</option>
                  {PROJECT_STATUSES.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  aria-label="Filter by category"
                >
                  <option value="all">All Categories</option>
                  {SERVICE_CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
               
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  aria-label="Sort projects"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="budget-high">Highest Budget</option>
                  <option value="budget-low">Lowest Budget</option>
                  <option value="deadline">By Deadline</option>
                </select>
              </div>
            </div>
          </div>
        )}
        {activeTab === "available" && (
          <div>
            {filteredProjects.length === 0 ? (
              <div className="text-center text-gray-600 dark:text-gray-400 py-20">
                <Inbox className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">No projects found matching your criteria.</p>
                <p className="text-sm mt-2">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProjects.map((project) => {
                  const userBid = getUserBid(project.id);
                  const CategoryIcon = getCategoryIcon(project.category);
                  return (
                    <div
                      key={project.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${getCategoryColor(project.category)}`}>
                              <CategoryIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                                {project.title}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                  {PROJECT_STATUSES.find((s) => s.value === project.status)?.label}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                                  {PROJECT_PRIORITIES.find((p) => p.value === project.priority)?.label}
                                </span>
                                {userBid && (
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getBidStatusColor(
                                      userBid.status || "pending"
                                    )}`}
                                  >
                                    Your Bid: {BID_STATUSES.find((s) => s.value === (userBid.status || "pending"))?.label}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500 dark:text-gray-400">{getCategoryName(project.category)}</div>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">{project.description}</p>
                        {project.skillsRequired && project.skillsRequired.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Skills Required:</p>
                            <div className="flex flex-wrap gap-1">
                              {project.skillsRequired.slice(0, 6).map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                              {project.skillsRequired.length > 6 && (
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded">
                                  +{project.skillsRequired.length - 6} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span className="font-medium">
                                {project.minBudget && project.maxBudget
                                  ? `${project.minBudget.toLocaleString()}-${project.maxBudget.toLocaleString()} ${project.currency}`
                                  : `Budget in ${project.currency}`}
                              </span>
                            </div>
                            {project.deadline && (
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(project.deadline.seconds * 1000).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{getProjectBidsCount(project.id)} bids</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        {project.requirements && project.requirements.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Requirements:</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              {project.requirements.slice(0, 3).map((req, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <span className="text-blue-500 mt-1">•</span>
                                  <span>{req}</span>
                                </li>
                              ))}
                              {project.requirements.length > 3 && (
                                <li className="text-xs text-gray-500 dark:text-gray-400">
                                  +{project.requirements.length - 3} more requirements
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                        {project.deliverables && project.deliverables.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Deliverables:</h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              {project.deliverables.slice(0, 3).map((deliverable, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                                  <span>{deliverable}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Posted {project.createdAt ? new Date(project.createdAt.seconds * 1000).toLocaleDateString() : "Recently"}
                          </div>
                          <div className="flex space-x-2">
                            {project.status === "open" ? (
                              userBid ? (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => openBidModal(project)}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                                    aria-label="Update bid"
                                  >
                                    <Edit className="w-4 h-4" />
                                    <span>Update Bid</span>
                                  </button>
                                  <span className="px-3 py-2 bg-green-100 text-green-800 text-sm rounded-lg font-medium">
                                    {userBid.amount.toLocaleString()} {project.currency}
                                  </span>
                                </div>
                              ) : (
                                <button
                                  onClick={() => openBidModal(project)}
                                  className="px-6 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                                  aria-label="Place bid"
                                >
                                  <Plus className="w-4 h-4" />
                                  <span>Place Bid</span>
                                </button>
                              )
                            ) : (
                              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm rounded-lg">
                                Bidding Closed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        {activeTab === "mybids" && (
          <div>
            {myBids.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
                <Inbox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No bids submitted yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Start bidding on projects to see your proposals here.</p>
                <button
                  onClick={() => setActiveTab("available")}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  aria-label="Browse available projects"
                >
                  Browse Projects
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {myBids.map((bid) => {
                  const project = projects.find((p) => p.id === bid.projectId);
                  if (!project) return null;
                  const CategoryIcon = getCategoryIcon(project.category);
                  return (
                    <div
                      key={bid.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3 flex-1">
                            <div className={`p-2 rounded-lg ${getCategoryColor(project.category)}`}>
                              <CategoryIcon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{project.title}</h3>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                  {PROJECT_STATUSES.find((s) => s.value === project.status)?.label}
                                </span>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getBidStatusColor(bid.status || "pending")}`}
                                >
                                  {BID_STATUSES.find((s) => s.value === (bid.status || "pending"))?.label}
                                </span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{project.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                              {bid.amount.toLocaleString()} {project.currency}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Your Bid</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Contact Info:</p>
                            <div className="text-sm text-gray-900 dark:text-white">
                              <p>{bid.name}</p>
                              <p className="flex items-center space-x-1">
                                <Phone className="w-3 h-3" />
                                <span>{bid.whatsapp}</span>
                              </p>
                            </div>
                          </div>
                          {bid.deliveryTime && (
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Delivery Time:</p>
                              <p className="text-sm text-gray-900 dark:text-white">{bid.deliveryTime}</p>
                            </div>
                          )}
                        </div>
                        {bid.proposal && (
                          <div className="mb-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Your Proposal:</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                              {bid.proposal}
                            </p>
                          </div>
                        )}
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Project Budget Range:</p>
                          <p className="text-sm text-gray-900 dark:text-white">
                            {project.minBudget && project.maxBudget
                              ? `${project.minBudget.toLocaleString()} - ${project.maxBudget.toLocaleString()} ${project.currency}`
                              : `Budget in ${project.currency}`}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Bid submitted {bid.createdAt ? new Date(bid.createdAt.seconds * 1000).toLocaleDateString() : "Recently"}
                            {bid.updatedAt && bid.updatedAt.seconds !== bid.createdAt?.seconds && (
                              <span> • Updated {new Date(bid.updatedAt.seconds * 1000).toLocaleDateString()}</span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            {project.status === "open" && (bid.status === "pending" || !bid.status) && (
                              <>
                                <button
                                  onClick={() => openBidModal(project)}
                                  className="px-3 py-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 text-sm rounded-lg transition-colors flex items-center space-x-1"
                                  aria-label="Edit bid"
                                >
                                  <Edit className="w-3 h-3" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => withdrawBid(bid.id)}
                                  className="px-3 py-1 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900 text-sm rounded-lg transition-colors"
                                  aria-label="Withdraw bid"
                                >
                                  Withdraw
                                </button>
                              </>
                            )}
                            {(bid.status === "withdrawn" || bid.status === "rejected") && (
                              <button
                                onClick={() => deleteBid(bid.id)}
                                className="px-3 py-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 text-sm rounded-lg transition-colors flex items-center space-x-1"
                                aria-label="Delete bid"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete</span>
                              </button>
                            )}
                            {bid.status === "accepted" && (
                              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-lg flex items-center space-x-1">
                                <Star className="w-3 h-3" />
                                <span>Won Project</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        {showBidModal && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {editingBid ? "Update Your Bid" : "Place Your Bid"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowBidModal(false);
                      setSelectedProject(null);
                      setEditingBid(null);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    aria-label="Close bid modal"
                  >
                    <XCircle className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{selectedProject.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{selectedProject.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Budget:{" "}
                      {selectedProject.minBudget && selectedProject.maxBudget
                        ? `${selectedProject.minBudget.toLocaleString()} - ${selectedProject.maxBudget.toLocaleString()} ${selectedProject.currency}`
                        : `Budget in ${selectedProject.currency}`}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {getProjectBidsCount(selectedProject.id)} bids submitted
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={bidForms[selectedProject.id]?.name || ""}
                        onChange={(e) => updateBidForm(selectedProject.id, "name", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={bidForms[selectedProject.id]?.email || ""}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
                        aria-required="true"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300; mb-2">
                        WhatsApp Number *
                      </label>
                      <input
                        type="text"
                        value={bidForms[selectedProject.id]?.whatsapp || ""}
                        onChange={(e) => updateBidForm(selectedProject.id, "whatsapp", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., +92 300 1234567"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bid Amount ({selectedProject.currency}) *
                      </label>
                      <input
                        type="number"
                        value={bidForms[selectedProject.id]?.amount || ""}
                        onChange={(e) => updateBidForm(selectedProject.id, "amount", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your bid amount"
                        min="1"
                        aria-required="true"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Delivery Time</label>
                    <select
                      value={bidForms[selectedProject.id]?.deliveryTime || ""}
                      onChange={(e) => updateBidForm(selectedProject.id, "deliveryTime", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      aria-label="Select delivery time"
                    >
                      <option value="">Select delivery time</option>
                      <option value="1-3 days">1-3 days</option>
                      <option value="1 week">1 week</option>
                      <option value="2 weeks">2 weeks</option>
                      <option value="3-4 weeks">3-4 weeks</option>
                      <option value="1-2 months">1-2 months</option>
                      <option value="2+ months">2+ months</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Proposal / Cover Letter</label>
                    <textarea
                      value={bidForms[selectedProject.id]?.proposal || ""}
                      onChange={(e) => updateBidForm(selectedProject.id, "proposal", e.target.value)}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your approach, experience, and why you're the best fit for this project..."
                      aria-label="Proposal or cover letter"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      A compelling proposal increases your chances of winning the project.
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowBidModal(false);
                    setSelectedProject(null);
                    setEditingBid(null);
                  }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Cancel bid"
                >
                  Cancel
                </button>
                <button
                  onClick={submitBid}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  aria-label={editingBid ? "Update bid" : "Submit bid"}
                >
                  <span>{editingBid ? "Update Bid" : "Submit Bid"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}