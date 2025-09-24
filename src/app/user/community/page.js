"use client";
import { useState, useEffect } from "react";
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2,
  ExternalLink,
  ArrowRight,
  Star,
  Zap,
  Globe,
  Coffee,
  Gift,
  Bell,
  Calendar,
  BookOpen,
  Video,
  Headphones,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Github,
  Phone,
  Send,
  Slack,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Code,
  Briefcase,
  Monitor,
  Smartphone,
  Database,
  Cloud,
  Terminal,
  Gamepad2,
  Twitch
} from "lucide-react";

export default function ContactCommunityPage() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPlatform, setHoveredPlatform] = useState(null);
  const [activeSection, setActiveSection] = useState("community");

  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
  }, []);
 

  // Enhanced Developer-focused Community Platforms (15+ platforms)
  const communityPlatforms = [
    {
      name: "Discord Server",
      icon: MessageSquare,
      description: "Join 24/7 developer discussions, code reviews, and tech talks",
      members: "12.5K+",
      link: "https://discord.gg/developers",
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      engagement: "Active 24/7",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      category: "chat"
    },
    {
      name: "GitHub Community",
      icon: Github,
      description: "Open source projects, contributions, and code collaborations",
      members: "8.9K+",
      link: "https://github.com/yourcompany",
      color: "from-gray-700 to-gray-900",
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
      engagement: "Code Daily",
      iconColor: "text-gray-700 dark:text-gray-300",
      category: "code"
    },
    {
      name: "WhatsApp Devs",
      icon: Phone,
      description: "Direct developer support and instant problem solving",
      members: "3.2K+",
      link: "https://wa.me/yourwhatsapp",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      engagement: "Instant Help",
      iconColor: "text-green-600 dark:text-green-400",
      category: "chat"
    },
    {
      name: "Telegram Channel",
      icon: Send,
      description: "Tech news, tutorials, and exclusive development resources",
      members: "5.7K+",
      link: "https://t.me/yourdevs",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
      engagement: "Daily Updates",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      category: "chat"
    },
    {
      name: "Slack Workspace",
      icon: Slack,
      description: "Professional dev teams, project discussions, and networking",
      members: "4.1K+",
      link: "https://yourcompany.slack.com",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      engagement: "Work Focus",
      iconColor: "text-purple-600 dark:text-purple-400",
      category: "professional"
    },
    {
      name: "YouTube Channel",
      icon: Youtube,
      description: "Coding tutorials, live streams, and tech project showcases",
      members: "25.3K+",
      link: "https://youtube.com/c/yourdevs",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      engagement: "Weekly Videos",
      iconColor: "text-red-600 dark:text-red-400",
      category: "video"
    },
    {
      name: "LinkedIn Company",
      icon: Linkedin,
      description: "Career opportunities, industry insights, and professional growth",
      members: "15.8K+",
      link: "https://linkedin.com/company/yourcompany",
      color: "from-blue-700 to-blue-800",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      engagement: "Professional",
      iconColor: "text-blue-700 dark:text-blue-300",
      category: "professional"
    },
    {
      name: "Twitter/X",
      icon: Twitter,
      description: "Real-time tech updates, quick tips, and developer threads",
      members: "18.7K+",
      link: "https://x.com/yourcompany",
      color: "from-black to-gray-800",
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
      engagement: "Live Updates",
      iconColor: "text-gray-700 dark:text-gray-300",
      category: "social"
    },
    {
      name: "Instagram",
      icon: Instagram,
      description: "Behind-the-scenes coding, team culture, and visual inspiration",
      members: "9.4K+",
      link: "https://instagram.com/yourcompany",
      color: "from-pink-500 to-purple-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      engagement: "Daily Stories",
      iconColor: "text-pink-600 dark:text-pink-400",
      category: "social"
    },
    {
      name: "Facebook Page",
      icon: Facebook,
      description: "Community events, announcements, and developer discussions",
      members: "7.2K+",
      link: "https://facebook.com/yourcompany",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      engagement: "Community Hub",
      iconColor: "text-blue-600 dark:text-blue-400",
      category: "social"
    },
    {
      name: "Reddit Community",
      icon: MessageCircle,
      description: "r/YourCompany - Technical discussions and community support",
      members: "11.6K+",
      link: "https://reddit.com/r/yourcompany",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      engagement: "Deep Discussions",
      iconColor: "text-orange-600 dark:text-orange-400",
      category: "forum"
    },
    {
      name: "Stack Overflow",
      icon: Code,
      description: "Technical Q&A, problem solving, and code expertise sharing",
      members: "2.8K+",
      link: "https://stackoverflow.com/c/yourcompany",
      color: "from-orange-600 to-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      engagement: "Problem Solving",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      category: "code"
    },
    {
      name: "Medium Blog",
      icon: BookOpen,
      description: "In-depth technical articles, tutorials, and thought leadership",
      members: "6.3K+",
      link: "https://medium.com/@yourcompany",
      color: "from-gray-800 to-black",
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
      engagement: "Weekly Articles",
      iconColor: "text-gray-800 dark:text-gray-200",
      category: "content"
    },
    {
      name: "Twitch Stream",
      icon: Twitch,
      description: "Live coding sessions, tech talks, and interactive development",
      members: "4.7K+",
      link: "https://twitch.tv/yourcompany",
      color: "from-purple-600 to-indigo-700",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      engagement: "Live Coding",
      iconColor: "text-purple-600 dark:text-purple-400",
      category: "video"
    },
    {
      name: "Dev.to Community",
      icon: Terminal,
      description: "Developer articles, coding challenges, and tech community",
      members: "3.9K+",
      link: "https://dev.to/yourcompany",
      color: "from-black to-gray-700",
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
      engagement: "Dev Articles",
      iconColor: "text-gray-800 dark:text-gray-200",
      category: "content"
    },
    {
      name: "Hashnode Blog",
      icon: Globe,
      description: "Technical blog posts, developer stories, and coding insights",
      members: "2.1K+",
      link: "https://yourcompany.hashnode.dev",
      color: "from-blue-600 to-cyan-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      engagement: "Tech Stories",
      iconColor: "text-blue-600 dark:text-blue-400",
      category: "content"
    }
  ];

  const stats = [
    { value: "50K+", label: "Total Community Members", icon: Users },
    { value: "2.5K+", label: "Daily Active Developers", icon: Code },
    { value: "150+", label: "Weekly Interactions", icon: MessageCircle },
    { value: "99%", label: "Developer Satisfaction", icon: Heart }
  ];

  const benefits = [
    {
      icon: Code,
      title: "Code Reviews",
      description: "Get your code reviewed by experienced developers and learn best practices"
    },
    {
      icon: Users,
      title: "Developer Network",
      description: "Connect with developers worldwide and build valuable professional relationships"
    },
    {
      icon: BookOpen,
      title: "Learning Resources",
      description: "Access exclusive tutorials, coding challenges, and educational content"
    },
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description: "First access to job openings, freelance projects, and collaboration opportunities"
    },
    {
      icon: Video,
      title: "Live Sessions",
      description: "Join live coding sessions, tech talks, and interactive workshops"
    },
    {
      icon: Gift,
      title: "Exclusive Perks",
      description: "Special discounts on tools, courses, and early access to new features"
    }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="w-16 h-16 border-4 border-[#8BE31F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation Tabs */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
           
           
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
      

        {/* Community Section */}
        {activeSection === "community" && (
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Header Section */}
            <div className="text-center mb-5">
            
              
              <h1 className="text-4xl md:text-3xl font-bold text-black dark:text-white mb-6">
                Connect, Code & Collaborate
                
              </h1>
              
              <p className="text-gray-600 dark:text-gray-400 max-w-5xl mx-auto leading-relaxed">
                Join thousands of developers, designers, and tech enthusiasts in our thriving community. Share knowledge, get support, and build amazing things together across multiple platforms.
              </p>
            </div>

            

            {/* Community Platforms Grid */}
            <div className="mb-16">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {communityPlatforms.map((platform, index) => (
                  <div
                    key={platform.name}
                    className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer group hover:scale-105 ${
                      hoveredPlatform === platform.name
                        ? `${platform.bgColor} border-[#8BE31F]/50 shadow-2xl shadow-[#8BE31F]/10`
                        : 'bg-white/10 dark:bg-gray-800/20 border-gray-200/20 dark:border-gray-700/20 hover:border-[#8BE31F]/30'
                    }`}
                    onMouseEnter={() => setHoveredPlatform(platform.name)}
                    onMouseLeave={() => setHoveredPlatform(null)}
                    onClick={() => window.open(platform.link, '_blank')}
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="flex-shrink-0 p-2 rounded-2xl bg-white/20 dark:bg-gray-700/30 group-hover:bg-white/30 dark:group-hover:bg-gray-700/50 transition-all duration-300">
                        <platform.icon className={`w-4 h-4 ${platform.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-center">
                          <h4 className="font-bold text-sm text-black dark:text-white group-hover:text-[#8BE31F] transition-colors duration-300">
                            {platform.name}
                          </h4>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                          {platform.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#8BE31F] font-bold bg-[#8BE31F]/10 px-3 py-1 rounded-full">
                            {platform.members}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                            {platform.engagement}
                          </span>
                        </div>
                      </div>
                      
                    
                      
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8BE31F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
         

            
          </div>
        )}

     
       
      </div>
    </div>
  );
}