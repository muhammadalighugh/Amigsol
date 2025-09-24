"use client";
import { useState, useEffect } from "react";
import { 
  Building, 
  Plus, 
  Calendar, 
  DollarSign, 
  Users, 
  Clock, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Filter,
  Search,
  Award,
  MessageSquare,
  FileText,
  Settings,
  TrendingUp,
  Globe,
  Smartphone,
  Palette,
  Camera,
  BarChart3,
  Megaphone,
  Mail,
  Video,
  Code,
  ShoppingCart
} from "lucide-react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  updateDoc,
  deleteDoc,
  doc,
  where, 
  getDoc,
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Digital Services Categories
const SERVICE_CATEGORIES = [
  { id: 'social-media', name: 'Social Media Management', icon: Users, color: 'bg-blue-100 text-blue-800' },
  { id: 'web-development', name: 'Web Development', icon: Code, color: 'bg-green-100 text-green-800' },
  { id: 'seo', name: 'SEO & Digital Marketing', icon: TrendingUp, color: 'bg-purple-100 text-purple-800' },
  { id: 'graphic-design', name: 'Graphic Design', icon: Palette, color: 'bg-pink-100 text-pink-800' },
  { id: 'content-creation', name: 'Content Creation', icon: FileText, color: 'bg-yellow-100 text-yellow-800' },
  { id: 'photography', name: 'Photography & Videography', icon: Camera, color: 'bg-indigo-100 text-indigo-800' },
  { id: 'paid-advertising', name: 'Paid Advertising', icon: Megaphone, color: 'bg-red-100 text-red-800' },
  { id: 'email-marketing', name: 'Email Marketing', icon: Mail, color: 'bg-teal-100 text-teal-800' },
  { id: 'mobile-app', name: 'Mobile App Development', icon: Smartphone, color: 'bg-orange-100 text-orange-800' },
  { id: 'ecommerce', name: 'E-commerce Solutions', icon: ShoppingCart, color: 'bg-cyan-100 text-cyan-800' },
  { id: 'analytics', name: 'Analytics & Reporting', icon: BarChart3, color: 'bg-gray-100 text-gray-800' },
  { id: 'video-production', name: 'Video Production', icon: Video, color: 'bg-violet-100 text-violet-800' }
];

const PROJECT_PRIORITIES = [
  { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
];

const PROJECT_STATUSES = [
  { value: 'open', label: 'Open for Bidding', color: 'bg-green-100 text-green-800' },
  { value: 'in-review', label: 'Under Review', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'awarded', label: 'Awarded', color: 'bg-blue-100 text-blue-800' },
  { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
];

export default function ProfessionalProjectBidding() {
  const [projects, setProjects] = useState([]);
  const [bids, setBids] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    currency: "PKR",
    minBudget: "",
    maxBudget: "",
    category: "",
    priority: "medium",
    deadline: "",
    requirements: [""],
    deliverables: [""],
    skillsRequired: [""],
    status: "open"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPartner, setIsPartner] = useState(false);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeBids: 0,
    completedProjects: 0,
    totalRevenue: 0
  });
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/admin/login");
        return;
      }

      setLoading(true);
      try {
        // Check if user is a partner
        const partnerDoc = await getDoc(doc(db, "partnerApplications", user.uid));
        const isPartnerUser = partnerDoc.exists();
        setIsPartner(isPartnerUser);

        // Query projects based on user role
        const projectsQuery = isPartnerUser
          ? query(
              collection(db, "projects"), 
              where("partnerId", "==", user.uid),
              orderBy("createdAt", "desc")
            )
          : query(collection(db, "projects"), orderBy("createdAt", "desc"));
        
        // Subscribe to projects
        const unsubscribeProjects = onSnapshot(
          projectsQuery,
          (snapshot) => {
            const projectsData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setProjects(projectsData);
            setFilteredProjects(projectsData);
            
            // Calculate stats
            const totalProjects = projectsData.length;
            const activeBids = projectsData.filter(p => p.status === 'open').length;
            const completedProjects = projectsData.filter(p => p.status === 'awarded').length;
            
            setStats({
              totalProjects,
              activeBids,
              completedProjects,
              totalRevenue: 0 // This would need to be calculated from completed projects
            });
          },
          (err) => {
            console.error("Error fetching projects:", err);
            toast.error("Failed to load projects.");
            setError("Failed to load projects.");
          }
        );

        // Subscribe to bids
        const bidsQuery = query(collection(db, "bids"), orderBy("createdAt", "desc"));
        const unsubscribeBids = onSnapshot(
          bidsQuery,
          (snapshot) => {
            const bidsData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setBids(bidsData);
          },
          (err) => {
            console.error("Error fetching bids:", err);
            toast.error("Failed to load bids.");
          }
        );

        setLoading(false);

        // Cleanup function
        return () => {
          unsubscribeProjects();
          unsubscribeBids();
        };
      } catch (err) {
        console.error("Error initializing dashboard:", err);
        toast.error("Failed to initialize project bidding dashboard.");
        setError("Failed to initialize project bidding dashboard.");
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  // Filter projects
  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(project => project.category === categoryFilter);
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, statusFilter, categoryFilter]);

  const addProject = async () => {
    if (!newProject.title || !newProject.description || !newProject.category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        router.push("/admin/login");
        return;
      }

      const projectData = {
        ...newProject,
        minBudget: parseFloat(newProject.minBudget) || 0,
        maxBudget: parseFloat(newProject.maxBudget) || 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        partnerId: isPartner ? user.uid : null,
        createdBy: user.uid,
        bidCount: 0
      };

      await addDoc(collection(db, "projects"), projectData);

      setNewProject({
        title: "",
        description: "",
        currency: "PKR",
        minBudget: "",
        maxBudget: "",
        category: "",
        priority: "medium",
        deadline: "",
        requirements: [""],
        deliverables: [""],
        skillsRequired: [""],
        status: "open"
      });
      setShowCreateForm(false);
      toast.success("Project created successfully!");
    } catch (err) {
      console.error("Error adding project:", err);
      toast.error("Failed to create project.");
    }
  };

  const updateProject = async () => {
    if (!editingProject) return;

    try {
      const projectData = {
        ...newProject,
        minBudget: parseFloat(newProject.minBudget) || 0,
        maxBudget: parseFloat(newProject.maxBudget) || 0,
        updatedAt: serverTimestamp()
      };

      await updateDoc(doc(db, "projects", editingProject.id), projectData);
      
      setEditingProject(null);
      setShowCreateForm(false);
      setNewProject({
        title: "",
        description: "",
        currency: "PKR",
        minBudget: "",
        maxBudget: "",
        category: "",
        priority: "medium",
        deadline: "",
        requirements: [""],
        deliverables: [""],
        skillsRequired: [""],
        status: "open"
      });
      toast.success("Project updated successfully!");
    } catch (err) {
      console.error("Error updating project:", err);
      toast.error("Failed to update project.");
    }
  };

  const deleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteDoc(doc(db, "projects", projectId));
      toast.success("Project deleted successfully!");
    } catch (err) {
      console.error("Error deleting project:", err);
      toast.error("Failed to delete project.");
    }
  };

  const updateProjectStatus = async (projectId, newStatus) => {
    try {
      await updateDoc(doc(db, "projects", projectId), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      toast.success(`Project status updated to ${newStatus}!`);
    } catch (err) {
      console.error("Error updating project status:", err);
      toast.error("Failed to update project status.");
    }
  };

  const startEdit = (project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      description: project.description,
      currency: project.currency,
      minBudget: project.minBudget?.toString() || "",
      maxBudget: project.maxBudget?.toString() || "",
      category: project.category,
      priority: project.priority,
      deadline: project.deadline ? new Date(project.deadline.seconds * 1000).toISOString().split('T')[0] : "",
      requirements: project.requirements || [""],
      deliverables: project.deliverables || [""],
      skillsRequired: project.skillsRequired || [""],
      status: project.status
    });
    setShowCreateForm(true);
  };

  const addArrayItem = (field) => {
    setNewProject({
      ...newProject,
      [field]: [...newProject[field], ""]
    });
  };

  const updateArrayItem = (field, index, value) => {
    const newArray = [...newProject[field]];
    newArray[index] = value;
    setNewProject({
      ...newProject,
      [field]: newArray
    });
  };

  const removeArrayItem = (field, index) => {
    const newArray = newProject[field].filter((_, i) => i !== index);
    setNewProject({
      ...newProject,
      [field]: newArray
    });
  };

  const getProjectBids = (projectId) => {
    return bids.filter(bid => bid.projectId === projectId);
  };

  const getCategoryIcon = (categoryId) => {
    const category = SERVICE_CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.icon : FileText;
  };

  const getCategoryColor = (categoryId) => {
    const category = SERVICE_CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.color : 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const priorityObj = PROJECT_PRIORITIES.find(p => p.value === priority);
    return priorityObj ? priorityObj.color : 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    const statusObj = PROJECT_STATUSES.find(s => s.value === status);
    return statusObj ? statusObj.color : 'bg-gray-100 text-gray-800';
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
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
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
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
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Project Bidding Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Digital Marketing Agency - Project Management
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowCreateForm(true);
                setEditingProject(null);
                setNewProject({
                  title: "",
                  description: "",
                  currency: "PKR",
                  minBudget: "",
                  maxBudget: "",
                  category: "",
                  priority: "medium",
                  deadline: "",
                  requirements: [""],
                  deliverables: [""],
                  skillsRequired: [""],
                  status: "open"
                });
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Create Project</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProjects}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Bids</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeBids}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedProjects}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Bids</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{bids.length}</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                {PROJECT_STATUSES.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {SERVICE_CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
            <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || statusFilter !== "all" || categoryFilter !== "all" 
                ? "Try adjusting your filters to see more projects." 
                : "Get started by creating your first project."}
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => {
              const projectBids = getProjectBids(project.id);
              const CategoryIcon = getCategoryIcon(project.category);
              
              return (
                <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  {/* Project Header */}
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
                              {PROJECT_STATUSES.find(s => s.value === project.status)?.label}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                              {PROJECT_PRIORITIES.find(p => p.value === project.priority)?.label}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => startEdit(project)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>
                            {project.minBudget && project.maxBudget 
                              ? `${project.minBudget}-${project.maxBudget} ${project.currency}`
                              : `Budget in ${project.currency}`
                            }
                          </span>
                        </div>
                        {project.deadline && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(project.deadline.seconds * 1000).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{projectBids.length} bids</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Actions */}
                  {project.status === 'open' && (
                    <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateProjectStatus(project.id, 'in-review')}
                          className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200 transition-colors"
                        >
                          Move to Review
                        </button>
                        <button
                          onClick={() => updateProjectStatus(project.id, 'closed')}
                          className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          Close Bidding
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Bids Section */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Received Bids ({projectBids.length})
                      </h4>
                      {projectBids.length > 0 && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Latest bid: {projectBids.length > 0 ? new Date(projectBids[0].createdAt?.seconds * 1000).toLocaleDateString() : 'N/A'}
                        </span>
                      )}
                    </div>
                    
                    {projectBids.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 dark:text-gray-400 text-sm">No bids received yet</p>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Bids will appear here once submitted</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {projectBids.slice(0, 5).map((bid, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-gray-900 dark:text-white text-sm">
                                  {bid.name}
                                </span>
                                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                                  {bid.amount} {project.currency}
                                </span>
                              </div>
                              <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                                <span>{bid.email}</span>
                                <span>•</span>
                                <span>{bid.whatsapp}</span>
                                {bid.createdAt && (
                                  <>
                                    <span>•</span>
                                    <span>{new Date(bid.createdAt.seconds * 1000).toLocaleDateString()}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            {project.status === 'open' && (
                              <button
                                onClick={() => updateProjectStatus(project.id, 'awarded')}
                                className="ml-3 px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
                              >
                                Award
                              </button>
                            )}
                          </div>
                        ))}
                        {projectBids.length > 5 && (
                          <div className="text-center">
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                              View all {projectBids.length} bids
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create/Edit Project Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {editingProject ? 'Edit Project' : 'Create New Project'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingProject(null);
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter project title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Service Category *
                    </label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      {SERVICE_CATEGORIES.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Priority Level
                    </label>
                    <select
                      value={newProject.priority}
                      onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      {PROJECT_PRIORITIES.map(priority => (
                        <option key={priority.value} value={priority.value}>{priority.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Currency
                    </label>
                    <select
                      value={newProject.currency}
                      onChange={(e) => setNewProject({ ...newProject, currency: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="PKR">PKR - Pakistani Rupee</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Deadline
                    </label>
                    <input
                      type="date"
                      value={newProject.deadline}
                      onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Min Budget
                      </label>
                      <input
                        type="number"
                        value={newProject.minBudget}
                        onChange={(e) => setNewProject({ ...newProject, minBudget: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Max Budget
                      </label>
                      <input
                        type="number"
                        value={newProject.maxBudget}
                        onChange={(e) => setNewProject({ ...newProject, maxBudget: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Status
                    </label>
                    <select
                      value={newProject.status}
                      onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      {PROJECT_STATUSES.map(status => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Description *
                </label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Provide a detailed description of your project requirements..."
                />
              </div>

              {/* Requirements */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Project Requirements
                  </label>
                  <button
                    onClick={() => addArrayItem('requirements')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Requirement</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {newProject.requirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => updateArrayItem('requirements', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter requirement"
                      />
                      <button
                        onClick={() => removeArrayItem('requirements', index)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Expected Deliverables
                  </label>
                  <button
                    onClick={() => addArrayItem('deliverables')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Deliverable</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {newProject.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={deliverable}
                        onChange={(e) => updateArrayItem('deliverables', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter deliverable"
                      />
                      <button
                        onClick={() => removeArrayItem('deliverables', index)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Required */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Skills Required
                  </label>
                  <button
                    onClick={() => addArrayItem('skillsRequired')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Skill</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {newProject.skillsRequired.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => updateArrayItem('skillsRequired', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter required skill"
                      />
                      <button
                        onClick={() => removeArrayItem('skillsRequired', index)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingProject(null);
                }}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingProject ? updateProject : addProject}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>{editingProject ? 'Update Project' : 'Create Project'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}