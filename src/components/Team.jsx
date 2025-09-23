"use client";
import { useState, useEffect } from "react";
import { 
  Users, 
  Code, 
  Palette, 
  TrendingUp, 
  Shield, 
  Briefcase,
  Star,
  Linkedin,
  Github,
  Mail,
  ExternalLink,
  Award,
  Coffee,
  Heart,
  Zap,
  Target,
  Globe,
  Crown,
  Rocket
} from "lucide-react";

export default function Team() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Alex Rodriguez",
      role: "CEO & Founder",
      department: "Leadership",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Visionary leader with 10+ years in digital transformation. Passionate about building innovative solutions that drive business growth.",
      skills: ["Strategic Planning", "Business Development", "Team Leadership"],
      experience: "10+ years",
      projects: "200+",
      social: {
        linkedin: "#",
        email: "alex@amigsol.com"
      },
      achievements: ["Forbes 30 Under 30", "Tech Entrepreneur Award"],
      quote: "Innovation is not just about technology, it's about transforming possibilities into reality."
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "CTO & Lead Developer",
      department: "Development",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=300&h=300&fit=crop&crop=face",
      bio: "Full-stack architect specializing in scalable web applications and cloud infrastructure. Expert in modern JavaScript frameworks.",
      skills: ["React", "Node.js", "AWS", "Docker", "GraphQL"],
      experience: "8+ years",
      projects: "150+",
      social: {
        linkedin: "#",
        github: "#",
        email: "sarah@amigsol.com"
      },
      achievements: ["Google Developer Expert", "AWS Solutions Architect"],
      quote: "Great code is not just functional, it's a work of art that solves real problems."
    },
    {
      id: 3,
      name: "Marcus Johnson",
      role: "Creative Director",
      department: "Design",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Award-winning designer creating stunning visual experiences. Specializes in UI/UX design and brand identity development.",
      skills: ["UI/UX Design", "Figma", "Adobe Suite", "Brand Strategy"],
      experience: "7+ years",
      projects: "180+",
      social: {
        linkedin: "#",
        email: "marcus@amigsol.com"
      },
      achievements: ["Design Awards Winner", "Dribbble Top Designer"],
      quote: "Design is not just how it looks and feels. Design is how it works."
    },
    {
      id: 4,
      name: "Emily Watson",
      role: "Marketing Director",
      department: "Marketing",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Digital marketing strategist with expertise in growth hacking and brand development. Drives customer acquisition and retention.",
      skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
      experience: "6+ years",
      projects: "120+",
      social: {
        linkedin: "#",
        email: "emily@amigsol.com"
      },
      achievements: ["Marketing Excellence Award", "Growth Hacker of the Year"],
      quote: "Great marketing tells a story that resonates with the heart and engages the mind."
    },
    {
      id: 5,
      name: "David Kim",
      role: "Senior Frontend Developer",
      department: "Development",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      bio: "Frontend specialist creating responsive, interactive web experiences. Expert in modern JavaScript frameworks and animation libraries.",
      skills: ["React", "Vue.js", "TypeScript", "Three.js", "GSAP"],
      experience: "5+ years",
      projects: "100+",
      social: {
        linkedin: "#",
        github: "#",
        email: "david@amigsol.com"
      },
      achievements: ["React Conf Speaker", "Open Source Contributor"],
      quote: "Every pixel matters when creating exceptional user experiences."
    },
    {
      id: 6,
      name: "Lisa Thompson",
      role: "Senior Backend Developer",
      department: "Development",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
      bio: "Backend engineer building robust, scalable server architectures. Specializes in microservices and database optimization.",
      skills: ["Python", "Django", "PostgreSQL", "Redis", "Docker"],
      experience: "6+ years",
      projects: "90+",
      social: {
        linkedin: "#",
        github: "#",
        email: "lisa@amigsol.com"
      },
      achievements: ["Tech Conference Speaker", "Database Expert Certified"],
      quote: "Solid architecture is the foundation of every great application."
    },
    {
      id: 7,
      name: "Jordan Martinez",
      role: "UI/UX Designer",
      department: "Design",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face",
      bio: "User experience designer focused on creating intuitive, accessible interfaces. Passionate about user research and design systems.",
      skills: ["UI Design", "UX Research", "Prototyping", "Design Systems"],
      experience: "4+ years",
      projects: "85+",
      social: {
        linkedin: "#",
        email: "jordan@amigsol.com"
      },
      achievements: ["UX Design Award", "Accessibility Champion"],
      quote: "Good design is invisible – it just works perfectly for the user."
    },
    {
      id: 8,
      name: "Michael Chang",
      role: "DevOps Engineer",
      department: "Development",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
      bio: "Infrastructure specialist ensuring seamless deployments and system reliability. Expert in cloud platforms and automation tools.",
      skills: ["AWS", "Kubernetes", "CI/CD", "Terraform", "Monitoring"],
      experience: "5+ years",
      projects: "110+",
      social: {
        linkedin: "#",
        github: "#",
        email: "michael@amigsol.com"
      },
      achievements: ["AWS Certified", "DevOps Excellence Award"],
      quote: "Automation and reliability are the pillars of modern software delivery."
    }
  ];

  const departments = [
    { name: "All", icon: Users, count: teamMembers.length },
    { name: "Leadership", icon: Crown, count: teamMembers.filter(m => m.department === "Leadership").length },
    { name: "Development", icon: Code, count: teamMembers.filter(m => m.department === "Development").length },
    { name: "Design", icon: Palette, count: teamMembers.filter(m => m.department === "Design").length },
    { name: "Marketing", icon: TrendingUp, count: teamMembers.filter(m => m.department === "Marketing").length }
  ];

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredMembers = activeFilter === "All" 
    ? teamMembers 
    : teamMembers.filter(member => member.department === activeFilter);

  const stats = [
    { value: "25+", label: "Team Members", icon: Users },
    { value: "500+", label: "Projects Delivered", icon: Rocket },
    { value: "50+", label: "Happy Clients", icon: Heart },
    { value: "99%", label: "Success Rate", icon: Star }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#8BE31F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#8BE31F]/20 to-green-400/20 border border-[#8BE31F]/30 text-[#8BE31F] text-sm font-medium mb-6 backdrop-blur-sm">
            <Users className="w-4 h-4 mr-2" />
            Meet Our Team
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            The Minds Behind
            <span className="block bg-gradient-to-r from-[#8BE31F] via-green-400 to-[#7ACC1B] bg-clip-text text-transparent">
              Digital Excellence
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Our diverse team of experts brings together creativity, technical expertise, and strategic thinking to deliver exceptional digital solutions.
          </p>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-white/10 dark:bg-gray-800/20 border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm hover:border-[#8BE31F]/30 transition-all duration-300 group">
                <Icon className="w-8 h-8 text-[#8BE31F] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-bold text-black dark:text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Department Filter */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <button
                key={dept.name}
                onClick={() => setActiveFilter(dept.name)}
                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeFilter === dept.name
                    ? 'bg-[#8BE31F] text-black shadow-lg scale-105'
                    : 'bg-white/10 dark:bg-gray-800/20 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/20 dark:hover:bg-gray-800/40'
                } border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {dept.name}
                <span className="ml-2 px-2 py-1 rounded-full bg-black/10 dark:bg-white/10 text-xs">
                  {dept.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Team Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filteredMembers.map((member, index) => (
            <div
              key={member.id}
              className="group relative bg-white/10 dark:bg-gray-800/20 rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm hover:border-[#8BE31F]/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedMember(member)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden bg-gradient-to-br from-[#8BE31F]/20 to-green-400/20">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute -top-2 -right-2 bg-[#8BE31F] text-black text-xs font-bold px-2 py-1 rounded-full">
                  {member.experience}
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-black dark:text-white mb-1 group-hover:text-[#8BE31F] transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{member.role}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#8BE31F]/10 text-[#8BE31F] text-xs font-semibold">
                  {member.projects} Projects
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded-full bg-gray-200/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-3">
                {member.social.linkedin && (
                  <a href={member.social.linkedin} className="p-2 rounded-lg bg-white/10 dark:bg-gray-700/20 hover:bg-[#8BE31F]/20 transition-colors duration-300">
                    <Linkedin className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-[#8BE31F]" />
                  </a>
                )}
                {member.social.github && (
                  <a href={member.social.github} className="p-2 rounded-lg bg-white/10 dark:bg-gray-700/20 hover:bg-[#8BE31F]/20 transition-colors duration-300">
                    <Github className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-[#8BE31F]" />
                  </a>
                )}
                <a href={`mailto:${member.social.email}`} className="p-2 rounded-lg bg-white/10 dark:bg-gray-700/20 hover:bg-[#8BE31F]/20 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-[#8BE31F]" />
                </a>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#8BE31F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Culture Section */}
        <div className={`text-center mb-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl font-bold text-black dark:text-white mb-8">Our Culture & Values</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/10 dark:bg-gray-800/20 border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm hover:border-[#8BE31F]/30 transition-all duration-300 group">
              <Coffee className="w-12 h-12 text-[#8BE31F] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-xl font-semibold text-black dark:text-white mb-3">Work-Life Balance</h4>
              <p className="text-gray-600 dark:text-gray-400">We believe great work comes from happy, well-rested minds. Flexible hours and remote work options.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/10 dark:bg-gray-800/20 border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm hover:border-[#8BE31F]/30 transition-all duration-300 group">
              <Zap className="w-12 h-12 text-[#8BE31F] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-xl font-semibold text-black dark:text-white mb-3">Innovation First</h4>
              <p className="text-gray-600 dark:text-gray-400">We encourage experimentation and learning. 20% time for personal projects and skill development.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/10 dark:bg-gray-800/20 border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm hover:border-[#8BE31F]/30 transition-all duration-300 group">
              <Heart className="w-12 h-12 text-[#8BE31F] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-xl font-semibold text-black dark:text-white mb-3">Team Spirit</h4>
              <p className="text-gray-600 dark:text-gray-400">We're more than colleagues – we're a family. Regular team events, mentorship, and growth opportunities.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedMember(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-start space-x-6 mb-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-[#8BE31F]/20 to-green-400/20 flex-shrink-0">
                <img 
                  src={selectedMember.image} 
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black dark:text-white mb-2">{selectedMember.name}</h3>
                <p className="text-[#8BE31F] font-semibold mb-4">{selectedMember.role}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>{selectedMember.experience} Experience</span>
                  <span>•</span>
                  <span>{selectedMember.projects} Projects</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 italic">"{selectedMember.quote}"</p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">{selectedMember.bio}</p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-black dark:text-white mb-3">Skills & Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMember.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-[#8BE31F]/10 text-[#8BE31F] text-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {selectedMember.achievements && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-black dark:text-white mb-3">Achievements</h4>
                <div className="space-y-2">
                  {selectedMember.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-[#8BE31F]" />
                      <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                {selectedMember.social.linkedin && (
                  <a href={selectedMember.social.linkedin} className="p-2 rounded-lg bg-[#8BE31F]/10 hover:bg-[#8BE31F]/20 transition-colors duration-300">
                    <Linkedin className="w-5 h-5 text-[#8BE31F]" />
                  </a>
                )}
                {selectedMember.social.github && (
                  <a href={selectedMember.social.github} className="p-2 rounded-lg bg-[#8BE31F]/10 hover:bg-[#8BE31F]/20 transition-colors duration-300">
                    <Github className="w-5 h-5 text-[#8BE31F]" />
                  </a>
                )}
                <a href={`mailto:${selectedMember.social.email}`} className="p-2 rounded-lg bg-[#8BE31F]/10 hover:bg-[#8BE31F]/20 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-[#8BE31F]" />
                </a>
              </div>
              
              <button 
                onClick={() => setSelectedMember(null)}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}