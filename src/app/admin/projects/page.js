"use client";
import { useState, useEffect } from "react";
import { 
  Plus,
  Search,
  Filter,
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
  AlertTriangle,
  MoreVertical,
  Users,
  Code,
  Palette,
  Smartphone,
  Globe,
  ShoppingCart,
  TrendingUp,
  FileText,
  Target,
  X
} from "lucide-react";

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedPartner, setSelectedPartner] = useState('All Partners');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    partnerId: '',
    type: '',
    priority: 'Medium',
    budget: '',
    deadline: '',
    description: '',
    technologies: []
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const projectTypes = [
    { id: 'web-development', label: 'Web Development', icon: Code, color: 'bg-blue-100 text-blue-800' },
    { id: 'mobile-app', label: 'Mobile App', icon: Smartphone, color: 'bg-green-100 text-green-800' },
    { id: 'ui-ux-design', label: 'UI/UX Design', icon: Palette, color: 'bg-purple-100 text-purple-800' },
    { id: 'e-commerce', label: 'E-commerce', icon: ShoppingCart, color: 'bg-orange-100 text-orange-800' },
    { id: 'seo-marketing', label: 'SEO/Marketing', icon: TrendingUp, color: 'bg-pink-100 text-pink-800' },
    { id: 'branding', label: 'Branding', icon: Target, color: 'bg-indigo-100 text-indigo-800' }
  ];

  const availablePartners = [
    { id: 1, name: 'John Smith', type: 'Developer', skills: ['React', 'Node.js', 'Python'] },
    { id: 2, name: 'Sarah Johnson', type: 'Referral', specialties: ['Small Business', 'E-commerce'] },
    { id: 3, name: 'Emily Davis', type: 'Referral', specialties: ['Branding', 'Creative'] },
    { id: 4, name: 'Alex Rodriguez', type: 'Developer', skills: ['Vue.js', 'Django', 'PostgreSQL'] },
    { id: 5, name: 'Mike Chen', type: 'Developer', skills: ['Angular', 'C#', '.NET'] },
    { id: 6, name: 'Lisa Wang', type: 'Developer', skills: ['React', 'Python', 'AI/ML'] }
  ];

  const availableTechnologies = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Django', 'PHP', 'Laravel',
    'WordPress', 'Shopify', 'WooCommerce', 'MongoDB', 'MySQL', 'PostgreSQL',
    'Firebase', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'React Native', 'Flutter',
    'Swift', 'Kotlin', 'Adobe Creative Suite', 'Figma', 'Sketch', 'Webflow'
  ];

  const projects = [
    {
      id: 1,
      name: 'E-commerce Platform Redesign',
      client: 'TechCorp Inc.',
      partner: { name: 'John Smith', type: 'Developer' },
      type: 'web-development',
      status: 'In Progress',
      priority: 'High',
      budget: 15000,
      paid: 9000,
      progress: 65,
      startDate: '2024-01-10',
      deadline: '2024-02-15',
      description: 'Complete redesign and development of e-commerce platform with modern UI/UX',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      team: ['John Smith', 'Sarah Wilson'],
      clientSatisfaction: 4.5
    },
    {
      id: 2,
      name: 'Mobile Banking App',
      client: 'FinanceFlow Ltd',
      partner: { name: 'Sarah Johnson', type: 'Developer' },
      type: 'mobile-app',
      status: 'Completed',
      priority: 'High',
      budget: 25000,
      paid: 25000,
      progress: 100,
      startDate: '2023-12-01',
      deadline: '2024-01-20',
      description: 'Secure mobile banking application with biometric authentication',
      technologies: ['React Native', 'Firebase', 'Biometrics API'],
      team: ['Sarah Johnson', 'Mike Chen'],
      clientSatisfaction: 5.0
    },
    {
      id: 3,
      name: 'Brand Identity Package',
      client: 'Creative Studio XYZ',
      partner: { name: 'Emily Davis', type: 'Referral' },
      type: 'branding',
      status: 'Review',
      priority: 'Medium',
      budget: 8000,
      paid: 4000,
      progress: 80,
      startDate: '2024-01-15',
      deadline: '2024-02-10',
      description: 'Complete brand identity including logo, guidelines, and marketing materials',
      technologies: ['Adobe Creative Suite', 'Figma'],
      team: ['Lisa Wang', 'David Kumar'],
      clientSatisfaction: 4.8
    },
    {
      id: 4,
      name: 'SaaS Dashboard Development',
      client: 'DataInsights Pro',
      partner: { name: 'Alex Rodriguez', type: 'Developer' },
      type: 'web-development',
      status: 'Planning',
      priority: 'High',
      budget: 18000,
      paid: 0,
      progress: 15,
      startDate: '2024-01-20',
      deadline: '2024-03-15',
      description: 'Analytics dashboard with real-time data visualization and reporting',
      technologies: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
      team: ['Alex Rodriguez'],
      clientSatisfaction: null
    },
    {
      id: 5,
      name: 'Restaurant Website & App',
      client: 'Gourmet Bistro Chain',
      partner: { name: 'Mike Chen', type: 'Developer' },
      type: 'web-development',
      status: 'On Hold',
      priority: 'Low',
      budget: 12000,
      paid: 3000,
      progress: 25,
      startDate: '2024-01-05',
      deadline: '2024-02-20',
      description: 'Restaurant website with online ordering and reservation system',
      technologies: ['WordPress', 'WooCommerce', 'Custom Plugins'],
      team: ['Mike Chen', 'Emma Thompson'],
      clientSatisfaction: 4.2
    },
    {
      id: 6,
      name: 'Healthcare Management System',
      client: 'MediCare Solutions',
      partner: { name: 'Lisa Wang', type: 'Developer' },
      type: 'web-development',
      status: 'In Progress',
      priority: 'High',
      budget: 30000,
      paid: 15000,
      progress: 45,
      startDate: '2023-12-15',
      deadline: '2024-03-01',
      description: 'Comprehensive healthcare management system with patient records and scheduling',
      technologies: ['React', 'Node.js', 'MySQL', 'HIPAA Compliance'],
      team: ['Lisa Wang', 'James Wilson'],
      clientSatisfaction: 4.7
    }
  ];

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

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All Status' || project.status === selectedStatus;
    const matchesType = selectedType === 'All Types' || project.type === selectedType;
    const matchesPartner = selectedPartner === 'All Partners' || project.partner.name === selectedPartner;
    
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
      value: `$${projects.reduce((sum, p) => sum + p.paid, 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const handleAddProject = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewProject({
      name: '',
      client: '',
      partnerId: '',
      type: '',
      priority: 'Medium',
      budget: '',
      deadline: '',
      description: '',
      technologies: []
    });
  };

  const handleInputChange = (field, value) => {
    setNewProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTechnologyToggle = (tech) => {
    setNewProject(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }));
  };

  const handleSubmitProject = () => {
    // Validate required fields
    if (!newProject.name || !newProject.client || !newProject.partnerId || !newProject.type) {
      alert('Please fill in all required fields');
      return;
    }

    // Create new project object
    const partner = availablePartners.find(p => p.id === parseInt(newProject.partnerId));
    const projectData = {
      id: projects.length + 1,
      name: newProject.name,
      client: newProject.client,
      partner: { name: partner.name, type: partner.type },
      type: newProject.type,
      status: 'Planning',
      priority: newProject.priority,
      budget: parseInt(newProject.budget) || 0,
      paid: 0,
      progress: 5,
      startDate: new Date().toISOString().split('T')[0],
      deadline: newProject.deadline,
      description: newProject.description,
      technologies: newProject.technologies,
      team: [partner.name],
      clientSatisfaction: null
    };

    console.log('New project created:', projectData);
    // Here you would typically send this to your backend API
    
    // Show success message
    alert('Project created successfully!');
    handleCloseModal();
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-[#8BE31F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white">Projects Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor and manage all client projects and partnerships</p>
        </div>
        <button 
          onClick={handleAddProject}
          className="bg-[#8BE31F] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#7ACC1B] transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-black dark:text-white mt-2">{stat.value}</p>
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
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
          
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
          >
            <option>All Status</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Review</option>
            <option>Planning</option>
            <option>On Hold</option>
          </select>
          
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
          >
            <option>All Types</option>
            {projectTypes.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>

          <select 
            value={selectedPartner}
            onChange={(e) => setSelectedPartner(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
          >
            <option>All Partners</option>
            {Array.from(new Set(projects.map(p => p.partner.name))).map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#8BE31F] transition-colors flex items-center text-gray-600 dark:text-gray-400">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredProjects.map(project => {
          const typeInfo = getTypeInfo(project.type);
          const TypeIcon = typeInfo.icon;
          
          return (
            <div key={project.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg ${typeInfo.color.replace('text-', 'bg-').replace('-800', '-200')}`}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black dark:text-white text-lg">{project.name}</h3>
                      <p className="text-sm text-gray-500">{project.client}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeInfo.color}`}>
                      {typeInfo.label}
                    </span>
                    <span className={`text-xs font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority} Priority
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900 transition-colors p-1 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900 transition-colors p-1 rounded">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {project.description}
                </p>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-[#8BE31F] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Budget</p>
                      <p className="text-sm font-medium text-black dark:text-white">${project.budget.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Paid</p>
                      <p className="text-sm font-medium text-green-600">${project.paid.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Deadline</p>
                      <p className="text-sm font-medium text-black dark:text-white">{project.deadline}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Team</p>
                      <p className="text-sm font-medium text-black dark:text-white">{project.team.length} members</p>
                    </div>
                  </div>
                </div>

                {/* Partner Info */}
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#8BE31F] to-green-400 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black dark:text-white">{project.partner.name}</p>
                      <p className="text-xs text-gray-500">{project.partner.type} Partner</p>
                    </div>
                  </div>
                  {project.clientSatisfaction && (
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">Satisfaction:</span>
                      <span className="text-sm font-medium text-yellow-600">{project.clientSatisfaction}/5.0</span>
                    </div>
                  )}
                </div>

                {/* Technologies */}
                {project.technologies && (
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Technologies</p>
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
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-black dark:text-white mb-2">No projects found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={handleCloseModal}
            ></div>

            {/* Modal */}
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              
              {/* Modal Header */}
              <div className="bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-black dark:text-white">Add New Project</h3>
                  <button 
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="bg-white dark:bg-gray-800 px-6 py-6 max-h-96 overflow-y-auto">
                <div className="space-y-6">
                  
                  {/* Project Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      value={newProject.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
                      placeholder="Enter project name"
                    />
                  </div>

                  {/* Client Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      value={newProject.client}
                      onChange={(e) => handleInputChange('client', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
                      placeholder="Enter client name"
                    />
                  </div>

                  {/* Project Type & Partner */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Project Type *
                      </label>
                      <select
                        value={newProject.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map(type => (
                          <option key={type.id} value={type.id}>{type.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Assign Partner *
                      </label>
                      <select
                        value={newProject.partnerId}
                        onChange={(e) => handleInputChange('partnerId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
                      >
                        <option value="">Select partner</option>
                        {availablePartners.map(partner => (
                          <option key={partner.id} value={partner.id}>
                            {partner.name} ({partner.type})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Priority & Budget */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Priority
                      </label>
                      <select
                        value={newProject.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Budget ($)
                      </label>
                      <input
                        type="number"
                        value={newProject.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Deadline
                    </label>
                    <input
                      type="date"
                      value={newProject.deadline}
                      onChange={(e) => handleInputChange('deadline', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Description
                    </label>
                    <textarea
                      value={newProject.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
                      placeholder="Describe the project requirements and objectives"
                    />
                  </div>

                  {/* Technologies */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Technologies
                    </label>
                    <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                      {availableTechnologies.map(tech => (
                        <label key={tech} className="flex items-center space-x-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newProject.technologies.includes(tech)}
                            onChange={() => handleTechnologyToggle(tech)}
                            className="w-4 h-4 text-[#8BE31F] border-gray-300 rounded focus:ring-[#8BE31F]"
                          />
                          <span className="text-gray-700 dark:text-gray-300">{tech}</span>
                        </label>
                      ))}
                    </div>
                    {newProject.technologies.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Selected technologies:</p>
                        <div className="flex flex-wrap gap-1">
                          {newProject.technologies.map(tech => (
                            <span key={tech} className="px-2 py-1 bg-[#8BE31F]/20 text-[#8BE31F] rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex items-center justify-end space-x-3">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitProject}
                  className="px-4 py-2 text-sm font-medium text-black bg-[#8BE31F] rounded-lg hover:bg-[#7ACC1B] transition-colors"
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}