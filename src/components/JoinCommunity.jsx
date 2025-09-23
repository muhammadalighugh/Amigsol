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
  MessageSquare
} from "lucide-react";
import Lottie from "lottie-react";

export default function JoinCommunity() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [hoveredPlatform, setHoveredPlatform] = useState(null);

  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
    // Load the hands animation (assuming you'll save it as community.json)
    fetch("/community.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.log("Animation file not found:", error));
  }, []);

  const communityPlatforms = [
    {
      name: "Facebook Page",
      icon: Facebook,
      description: "Get daily updates, tips, and behind-the-scenes content",
      members: "5.2K+",
      link: "#",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      engagement: "High",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      name: "WhatsApp Group",
      icon: Phone,
      description: "Direct communication with our team and instant support",
      members: "1.8K+",
      link: "#",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      engagement: "Very High",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      name: "Discord Server",
      icon: MessageSquare,
      description: "Join developers, designers, and tech enthusiasts",
      members: "3.1K+",
      link: "#",
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      engagement: "Active 24/7",
      iconColor: "text-indigo-600 dark:text-indigo-400"
    },
    {
      name: "LinkedIn Page",
      icon: Linkedin,
      description: "Professional insights, job opportunities, and networking",
      members: "4.5K+",
      link: "#",
      color: "from-blue-700 to-blue-800",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      engagement: "Professional",
      iconColor: "text-blue-700 dark:text-blue-300"
    },
    {
      name: "Twitter/X",
      icon: Twitter,
      description: "Quick updates, tech news, and industry discussions",
      members: "2.7K+",
      link: "#",
      color: "from-black to-gray-800",
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
      engagement: "Real-time",
      iconColor: "text-gray-700 dark:text-gray-300"
    },
    {
      name: "YouTube Channel",
      icon: Youtube,
      description: "Tutorials, project showcases, and educational content",
      members: "8.3K+",
      link: "#",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      engagement: "Weekly Videos",
      iconColor: "text-red-600 dark:text-red-400"
    },
    {
      name: "Telegram Channel",
      icon: Send,
      description: "Instant notifications and exclusive announcements",
      members: "2.1K+",
      link: "#",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
      engagement: "Instant Updates",
      iconColor: "text-cyan-600 dark:text-cyan-400"
    },
    {
      name: "Instagram",
      icon: Instagram,
      description: "Visual content, team moments, and creative inspiration",
      members: "3.8K+",
      link: "#",
      color: "from-pink-500 to-purple-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      engagement: "Daily Stories",
      iconColor: "text-pink-600 dark:text-pink-400"
    },
    {
      name: "GitHub Community",
      icon: Github,
      description: "Open source projects, code reviews, and collaborations",
      members: "1.9K+",
      link: "#",
      color: "from-gray-700 to-gray-900",
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
      engagement: "Code Together",
      iconColor: "text-gray-700 dark:text-gray-300"
    },
    {
      name: "Slack Workspace",
      icon: Slack,
      description: "Professional discussions, project updates, and networking",
      members: "950+",
      link: "#",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      engagement: "Business Focus",
      iconColor: "text-purple-600 dark:text-purple-400"
    }
  ];

  const benefits = [
    {
      icon: Bell,
      title: "Exclusive Updates",
      description: "Be first to know about new projects, services, and opportunities"
    },
    {
      icon: Users,
      title: "Networking",
      description: "Connect with like-minded professionals and potential collaborators"
    },
    {
      icon: BookOpen,
      title: "Learning Resources",
      description: "Access tutorials, guides, and educational content regularly"
    },
    {
      icon: Gift,
      title: "Community Perks",
      description: "Exclusive discounts, early access, and special community rewards"
    }
  ];

  const stats = [
    { value: "25K+", label: "Community Members", icon: Users },
    { value: "500+", label: "Weekly Interactions", icon: MessageCircle },
    { value: "50+", label: "Resources Shared", icon: Share2 },
    { value: "98%", label: "Satisfaction Rate", icon: Heart }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#8BE31F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#8BE31F]/20 to-green-400/20 border border-[#8BE31F]/30 text-[#8BE31F] text-sm font-medium mb-6 backdrop-blur-sm">
            <Users className="w-4 h-4 mr-2" />
            Join Our Community
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            Connect, Learn &
            <span className="block bg-gradient-to-r from-[#8BE31F] via-green-400 to-[#7ACC1B] bg-clip-text text-transparent">
              Grow Together
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Join thousands of developers, designers, and entrepreneurs in our thriving community. Share knowledge, get support, and build amazing things together.
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Left Side - Animation */}
          <div className={`order-2 lg:order-1 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              {/* Community Animation - Clean Integration */}
              <div className="relative">
                {animationData ? (
                  <div className="relative">
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      className="w-full max-w-lg mx-auto drop-shadow-2xl"
                    />
                    {/* Floating Community Stats positioned over animation */}
                    <div className="absolute top-8 right-8 bg-[#8BE31F] text-black px-4 py-2 rounded-xl font-bold text-sm animate-bounce shadow-lg">
                      25K+ Members
                    </div>
                    <div className="absolute bottom-8 left-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold text-sm animate-pulse shadow-lg">
                      Growing Daily
                    </div>
                  </div>
                ) : (
                  // Enhanced Fallback with animated community icons
                  <div className="w-full max-w-lg mx-auto flex items-center justify-center h-80 relative">
                    <div className="relative">
                      {/* Central community icon */}
                      <div className="text-8xl mb-4 animate-pulse">🤝</div>
                      {/* Surrounding animated icons */}
                      <div className="absolute -top-8 -left-8 text-3xl animate-bounce delay-100">👥</div>
                      <div className="absolute -top-8 -right-8 text-3xl animate-bounce delay-300">💬</div>
                      <div className="absolute -bottom-8 -left-8 text-3xl animate-bounce delay-500">🌟</div>
                      <div className="absolute -bottom-8 -right-8 text-3xl animate-bounce delay-700">🚀</div>
                    </div>
                    
                    {/* Fallback Stats */}
                    <div className="absolute top-8 right-8 bg-[#8BE31F] text-black px-4 py-2 rounded-xl font-bold text-sm animate-bounce shadow-lg">
                      25K+ Members
                    </div>
                    <div className="absolute bottom-8 left-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold text-sm animate-pulse shadow-lg">
                      Growing Daily
                    </div>
                  </div>
                )}
              </div>

              {/* Subtle Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#8BE31F]/5 to-green-400/5 rounded-full blur-3xl -z-10 scale-150"></div>
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#8BE31F]/10 rounded-full blur-2xl -z-10 animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-green-400/10 rounded-full blur-2xl -z-10 animate-pulse delay-1000"></div>
            </div>
          </div>

          {/* Right Side - Community Platforms */}
          <div className={`order-1 lg:order-2 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="text-3xl font-bold text-black dark:text-white mb-8">Choose Your Platform</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {communityPlatforms.map((platform, index) => (
                <div
                  key={platform.name}
                  className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer group hover:scale-105 ${
                    hoveredPlatform === platform.name
                      ? `${platform.bgColor} border-[#8BE31F]/50 shadow-lg`
                      : 'bg-white/5 dark:bg-gray-800/10 border-gray-200/20 dark:border-gray-700/20 hover:border-[#8BE31F]/30'
                  }`}
                  onMouseEnter={() => setHoveredPlatform(platform.name)}
                  onMouseLeave={() => setHoveredPlatform(null)}
                  onClick={() => window.open(platform.link, '_blank')}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-white/10 dark:bg-gray-700/20 group-hover:bg-white/20 dark:group-hover:bg-gray-700/40 transition-all duration-300">
                      <platform.icon className={`w-6 h-6 ${platform.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-black dark:text-white group-hover:text-[#8BE31F] transition-colors duration-300 truncate">
                          {platform.name}
                        </h4>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#8BE31F] transition-colors duration-300 flex-shrink-0" />
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                        {platform.description}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#8BE31F] font-semibold">{platform.members}</span>
                        <span className="text-gray-500 dark:text-gray-400">{platform.engagement}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-[#8BE31F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className={`mb-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl font-bold text-center text-black dark:text-white mb-12">
            Community Benefits
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="text-center p-6 rounded-2xl bg-white/10 dark:bg-gray-800/20 border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm hover:border-[#8BE31F]/30 transition-all duration-300 group">
                  <Icon className="w-12 h-12 text-[#8BE31F] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-lg font-semibold text-black dark:text-white mb-3 group-hover:text-[#8BE31F] transition-colors duration-300">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

      

      </div>
    </section>
  );
}