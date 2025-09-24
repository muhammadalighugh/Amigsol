"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  Timestamp
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Building,
  User,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  Users,
  Code,
  Palette,
  Smartphone,
  ShoppingCart,
  TrendingUp,
  Target,
  X,
  Loader2
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState([]);
  const [activePartners, setActivePartners] = useState([]);
  const [partnerMap, setPartnerMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterType, setFilterType] = useState('All Types');
  const [filterPartner, setFilterPartner] = useState('All Partners');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();

  const projectTypes = [
    { id: 'web-development', label: 'Web Development', icon: Code, color: 'bg-blue-100 text-blue-800' },
    { id: 'mobile-app', label: 'Mobile App', icon: Smartphone, color: 'bg-green-100 text-green-800' },
    { id: 'ui-ux-design', label: 'UI/UX Design', icon: Palette, color: 'bg-purple-100 text-purple-800' },
    { id: 'e-commerce', label: 'E-commerce', icon: ShoppingCart, color: 'bg-orange-100 text-orange-800' },
    { id: 'seo-marketing', label: 'SEO/Marketing', icon: TrendingUp, color: 'bg-pink-100 text-pink-800' },
    { id: 'branding', label: 'Branding', icon: Target, color: 'bg-indigo-100 text-indigo-800' }
  ];

  const availableTechnologies = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Django', 'PHP', 'Laravel',
    'WordPress', 'Shopify', 'WooCommerce', 'MongoDB', 'MySQL', 'PostgreSQL',
    'Firebase', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'React Native', 'Flutter',
    'Swift', 'Kotlin', 'Adobe Creative Suite', 'Figma', 'Sketch', 'Webflow'
  ];

  const statusOptions = ['Planning', 'In Progress', 'Review', 'Completed', 'On Hold'];

  const initialFormData = {
    name: '',
    client: '',
    partnerId: '',
    type: '',
    status: 'Planning',
    priority: 'Medium',
    budget: '',
    paid: '',
    progress: '',
    deadline: '',
    description: '',
    technologies: [],
    clientSatisfaction: ''
  };

  // Authentication check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email && currentUser.email.endsWith("@gmail.com")) {
        setUser(currentUser);
      } else {
        setError("You are not authorized to view this page.");
        setLoading(false);
        router.push("/AdminLogin");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch active partners
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "partnerApplications"), where("status", "==", "active"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const partners = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setActivePartners(partners);
      const map = {};
      partners.forEach(p => {
        map[p.id] = { name: p.fullName, type: p.partnershipType };
      });
      setPartnerMap(map);
    }, (err) => {
      console.error("Error fetching partners:", err);
      toast.error("Failed to load partners.");
    });
    return unsubscribe;
  }, [user]);

  // Fetch projects real-time
  useEffect(() => {
    if (!user) return;
    const q = collection(db, "projects");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        startDate: doc.data().startDate ? doc.data().startDate.toDate().toISOString().split('T')[0] : null,
        deadline: doc.data().deadline ? doc.data().deadline.toDate().toISOString().split('T')[0] : null,
        joinDate: doc.data().createdAt ? new Date(doc.data().createdAt.toDate()).toLocaleDateString() : "N/A",
      }));
      // Enrich with partner info
      const enriched = projectsData.map(p => ({
        ...p,
        partner: partnerMap[p.partnerId] || { name: 'Unassigned', type: 'N/A' }
      }));
      setProjects(enriched);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects.");
      setLoading(false);
    });
    return unsubscribe;
  }, [user, partnerMap]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All Status' || project.status === filterStatus;
    const matchesType = filterType === 'All Types' || project.type === filterType;
    const matchesPartner = filterPartner === 'All Partners' || project.partner.name === filterPartner;
    return matchesSearch && matchesStatus && matchesType && matchesPartner;
  });

  const statsData = [
    {
      title: 'Total Projects',
      value: projects.length,
      icon: Building,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Projects',
      value: projects.filter(p => p.status === 'In Progress').length,
      icon: Clock,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Completed Projects',
      value: projects.filter(p => p.status === 'Completed').length,
      icon: CheckCircle,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Total Revenue',
      value: `$${projects.reduce((sum, p) => sum + (parseFloat(p.paid) || 0), 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Project name is required";
    if (!formData.client) errors.client = "Client name is required";
    if (!formData.partnerId) errors.partnerId = "Partner selection is required";
    if (!formData.type) errors.type = "Project type is required";
    if (formData.budget && isNaN(formData.budget)) errors.budget = "Budget must be a number";
    if (formData.paid && isNaN(formData.paid)) errors.paid = "Paid amount must be a number";
    if (formData.progress && (isNaN(formData.progress) || formData.progress < 0 || formData.progress > 100)) {
      errors.progress = "Progress must be between 0 and 100";
    }
    if (formData.clientSatisfaction && (isNaN(formData.clientSatisfaction) || formData.clientSatisfaction < 1 || formData.clientSatisfaction > 5)) {
      errors.clientSatisfaction = "Satisfaction must be between 1 and 5";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleView = (project) => {
    setSelectedProject(project);
    setFormData(project);
    setEditMode(false);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setFormData(project);
    setEditMode(true);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedProject(null);
    setFormData(initialFormData);
    setEditMode(true);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    try {
      const projectData = {
        name: formData.name,
        client: formData.client,
        partnerId: formData.partnerId,
        type: formData.type,
        status: formData.status,
        priority: formData.priority,
        budget: parseFloat(formData.budget) || 0,
        paid: parseFloat(formData.paid) || 0,
        progress: parseInt(formData.progress) || 0,
        deadline: formData.deadline ? Timestamp.fromDate(new Date(formData.deadline)) : null,
        description: formData.description,
        technologies: formData.technologies,
        clientSatisfaction: parseFloat(formData.clientSatisfaction) || null,
        updatedAt: Timestamp.fromDate(new Date()),
        updatedBy: user.email
      };

      if (selectedProject) {
        await updateDoc(doc(db, "projects", selectedProject.id), projectData);
        toast.success("Project updated successfully!");
      } else {
        projectData.createdAt = Timestamp.fromDate(new Date());
        projectData.startDate = Timestamp.fromDate(new Date());
        projectData.createdBy = user.email;
        await addDoc(collection(db, "projects"), projectData);
        toast.success("Project created successfully!");
      }
      setIsModalOpen(false);
      setFormErrors({});
    } catch (err) {
      console.error("Error saving project:", err);
      toast.error(`Failed to save project: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
      toast.success("Project deleted successfully!");
    } catch (err) {
      console.error("Error deleting project:", err);
      toast.error(`Failed to delete project: ${err.message}`);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleTechnologyToggle = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }));
  };

  const handleExport = () => {
    const headers = "Name,Client,Type,Status,Priority,Budget,Paid,Progress,Deadline\n";
    const csvContent = filteredProjects.map((p) => 
      `"${p.name.replace(/"/g, '""')}","${p.client.replace(/"/g, '""')}","${p.type}","${p.status}","${p.priority}","${p.budget}","${p.paid}","${p.progress}%","${p.deadline || 'N/A'}"`
    ).join("\n");
    const blob = new Blob([headers + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "projects.csv";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Projects exported successfully!");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Review': return 'bg-yellow-100 text-yellow-800';
      case 'Planning': return 'bg-purple-100 text-purple-800';
      case 'On Hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeInfo = (typeId) => {
    return projectTypes.find(type => type.id === typeId) || projectTypes[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#8BE31F]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-center text-lg font-medium">{error}</div>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-[#8BE31F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Projects Management</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor and manage all client projects and partnerships</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-[#8BE31F] text-black px-5 py-2.5 rounded-lg font-semibold hover:bg-[#7ACC1B] transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-[#8BE31F] focus:ring-offset-2"
          aria-label="Add new project"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[16rem]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by project or client name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
              aria-label="Search projects"
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-[8rem]"
            aria-label="Filter by status"
          >
            <option>All Status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-[8rem]"
            aria-label="Filter by type"
          >
            <option>All Types</option>
            {projectTypes.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
          <select 
            value={filterPartner}
            onChange={(e) => setFilterPartner(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-[8rem]"
            aria-label="Filter by partner"
          >
            <option>All Partners</option>
            {activePartners.map(partner => (
              <option key={partner.id} value={partner.fullName}>{partner.fullName}</option>
            ))}
          </select>
          <button 
            onClick={handleExport} 
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors flex items-center"
            aria-label="Export projects to CSV"
          >
            <Download className="w-5 h-5 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => {
            const typeInfo = getTypeInfo(project.type);
            const TypeIcon = typeInfo.icon;
            return (
              <div key={project.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-lg ${typeInfo.color}`}>
                        <TypeIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{project.client}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                      <span className={`px-2.5 py-1 text-xs font-medium ${getPriorityColor(project.priority)}`}>
                        {project.priority} Priority
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleView(project)} 
                      className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                      aria-label={`View ${project.name}`}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleEdit(project)} 
                      className="p-1 text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors"
                      aria-label={`Edit ${project.name}`}
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)} 
                      className="p-1 text-red-600 hover:text-red-800 transition-colors"
                      aria-label={`Delete ${project.name}`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {project.description || 'No description provided.'}
                  </p>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-[#8BE31F] h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Budget</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">${(project.budget || 0).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Paid</p>
                        <p className="text-sm font-medium text-green-600">${(project.paid || 0).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Deadline</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{project.deadline || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Team</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">1 member</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#8BE31F] to-green-400 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-black" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{project.partner.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{project.partner.type} Partner</p>
                      </div>
                    </div>
                    {project.clientSatisfaction && (
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Satisfaction:</span>
                        <span className="text-sm font-medium text-yellow-600">{project.clientSatisfaction}/5.0</span>
                      </div>
                    )}
                  </div>
                  {project.technologies?.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Technologies</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map(tech => (
                          <span key={tech} className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-xs text-gray-700 dark:text-gray-300">
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
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && formData && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[70vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editMode ? (selectedProject ? 'Edit Project' : 'Add New Project') : 'Project Details'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {editMode ? (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Project Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-2.5 border ${formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200`}
                      placeholder="Enter project name"
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? 'name-error' : undefined}
                    />
                    {formErrors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Client Name *</label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => handleInputChange('client', e.target.value)}
                      className={`w-full px-4 py-2.5 border ${formErrors.client ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200`}
                      placeholder="Enter client name"
                      aria-invalid={!!formErrors.client}
                      aria-describedby={formErrors.client ? 'client-error' : undefined}
                    />
                    {formErrors.client && (
                      <p id="client-error" className="mt-1 text-sm text-red-500">{formErrors.client}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Project Type *</label>
                      <select
                        value={formData.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className={`w-full px-4 py-2.5 border ${formErrors.type ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200`}
                        aria-invalid={!!formErrors.type}
                        aria-describedby={formErrors.type ? 'type-error' : undefined}
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map(type => (
                          <option key={type.id} value={type.id}>{type.label}</option>
                        ))}
                      </select>
                      {formErrors.type && (
                        <p id="type-error" className="mt-1 text-sm text-red-500">{formErrors.type}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Assign Partner *</label>
                      <select
                        value={formData.partnerId}
                        onChange={(e) => handleInputChange('partnerId', e.target.value)}
                        className={`w-full px-4 py-2.5 border ${formErrors.partnerId ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200`}
                        aria-invalid={!!formErrors.partnerId}
                        aria-describedby={formErrors.partnerId ? 'partnerId-error' : undefined}
                      >
                        <option value="">Select partner</option>
                        {activePartners.map(partner => (
                          <option key={partner.id} value={partner.id}>
                            {partner.fullName} ({partner.partnershipType})
                          </option>
                        ))}
                      </select>
                      {formErrors.partnerId && (
                        <p id="partnerId-error" className="mt-1 text-sm text-red-500">{formErrors.partnerId}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Priority</label>
                      <select
                        value={formData.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Budget ($)</label>
                      <input
                        type="number"
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className={`w-full px-4 py-2.5 border ${formErrors.budget ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200`}
                        placeholder="0"
                        min="0"
                        aria-invalid={!!formErrors.budget}
                        aria-describedby={formErrors.budget ? 'budget-error' : undefined}
                      />
                      {formErrors.budget && (
                        <p id="budget-error" className="mt-1 text-sm text-red-500">{formErrors.budget}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Paid ($)</label>
                      <input
                        type="number"
                        value={formData.paid}
                        onChange={(e) => handleInputChange('paid', e.target.value)}
                        className={`w-full px-4 py-2.5 border ${formErrors.paid ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200`}
                        placeholder="0"
                        min="0"
                        aria-invalid={!!formErrors.paid}
                        aria-describedby={formErrors.paid ? 'paid-error' : undefined}
                      />
                      {formErrors.paid && (
                        <p id="paid-error" className="mt-1 text-sm text-red-500">{formErrors.paid}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Progress (%)</label>
                    <input
                      type="number"
                      value={formData.progress}
                      onChange={(e) => handleInputChange('progress', e.target.value)}
                      className={`w-full px-4 py-2.5 border ${formErrors.progress ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200`}
                      placeholder="0"
                      min="0"
                      max="100"
                      aria-invalid={!!formErrors.progress}
                      aria-describedby={formErrors.progress ? 'progress-error' : undefined}
                    />
                    {formErrors.progress && (
                      <p id="progress-error" className="mt-1 text-sm text-red-500">{formErrors.progress}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Deadline</label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => handleInputChange('deadline', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Client Satisfaction (1-5)</label>
                    <input
                      type="number"
                      value={formData.clientSatisfaction}
                      onChange={(e) => handleInputChange('clientSatisfaction', e.target.value)}
                      className={`w-full px-4 py-2.5 border ${formErrors.clientSatisfaction ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200`}
                      placeholder="e.g., 4.5"
                      min="1"
                      max="5"
                      step="0.1"
                      aria-invalid={!!formErrors.clientSatisfaction}
                      aria-describedby={formErrors.clientSatisfaction ? 'satisfaction-error' : undefined}
                    />
                    {formErrors.clientSatisfaction && (
                      <p id="satisfaction-error" className="mt-1 text-sm text-red-500">{formErrors.clientSatisfaction}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                      placeholder="Enter project description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Technologies</label>
                    <div className="grid grid-cols-3 gap-3 max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-700">
                      {availableTechnologies.map(tech => (
                        <label key={tech} className="flex items-center space-x-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.technologies.includes(tech)}
                            onChange={() => handleTechnologyToggle(tech)}
                            className="w-4 h-4 text-[#8BE31F] border-gray-300 dark:border-gray-600 rounded focus:ring-[#8BE31F]"
                          />
                          <span className="text-gray-700 dark:text-gray-300">{tech}</span>
                        </label>
                      ))}
                    </div>
                    {formData.technologies.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {formData.technologies.map(tech => (
                          <span key={tech} className="px-2 py-1 bg-[#8BE31F]/20 text-[#8BE31F] rounded text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Project Name</label>
                    <p className="text-gray-900 dark:text-gray-100">{formData.name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Client Name</label>
                    <p className="text-gray-900 dark:text-gray-100">{formData.client || 'N/A'}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Project Type</label>
                      <p className="text-gray-900 dark:text-gray-100">{getTypeInfo(formData.type).label}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Assigned Partner</label>
                      <p className="text-gray-900 dark:text-gray-100">{formData.partner.name} ({formData.partner.type})</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Priority</label>
                      <p className="text-gray-900 dark:text-gray-100">{formData.priority || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                      <p className="text-gray-900 dark:text-gray-100">{formData.status || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Budget ($)</label>
                      <p className="text-gray-900 dark:text-gray-100">${(formData.budget || 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Paid ($)</label>
                      <p className="text-gray-900 dark:text-gray-100">${(formData.paid || 0).toLocaleString()}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Progress (%)</label>
                    <p className="text-gray-900 dark:text-gray-100">{formData.progress || 0}%</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Deadline</label>
                    <p className="text-gray-900 dark:text-gray-100">{formData.deadline || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Client Satisfaction</label>
                    <p className="text-gray-900 dark:text-gray-100">{formData.clientSatisfaction ? `${formData.clientSatisfaction}/5.0` : 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
                    <p className="text-gray-900 dark:text-gray-100">{formData.description || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Technologies</label>
                    {formData.technologies.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {formData.technologies.map(tech => (
                          <span key={tech} className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-xs text-gray-700 dark:text-gray-300">
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
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8BE31F] focus:ring-offset-2"
                aria-label="Close modal"
              >
                Close
              </button>
              {!editMode && selectedProject && (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Edit project"
                >
                  Edit
                </button>
              )}
              {editMode && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-black bg-[#8BE31F] rounded-lg hover:bg-[#7ACC1B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8BE31F] focus:ring-offset-2"
                  aria-label={selectedProject ? 'Save changes' : 'Create project'}
                >
                  {selectedProject ? 'Save Changes' : 'Create Project'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}