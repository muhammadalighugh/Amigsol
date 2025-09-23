"use client";
import { useState, useEffect } from "react";
import {
  ExternalLink,
  Star,
  Users,
  Award,
  TrendingUp,
  Globe,
  Shield,
  Eye,
  CheckCircle,
  Crown,
  Briefcase
} from "lucide-react";
import {
  SiFiverr,
  SiUpwork,
  SiFreelancer,
  SiToptal,
  
} from "react-icons/si";

export default function SeeUs() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPlatform, setHoveredPlatform] = useState(null);

  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
  }, []);

  // ✅ Only platforms with real icons
  const platforms = [
    {
      name: "Fiverr",
      Icon: SiFiverr,
      description: "Top-rated seller with 500+ completed projects and 5-star reviews",
      rating: "4.9/5",
      projects: "500+",
      badge: "Level 2 Seller",
      link: "#",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      stats: { orders: "500+", rating: "4.9", response: "1 hour" }
    },
    {
      name: "Upwork",
      Icon: SiUpwork,
      description: "Top Rated Plus freelancer with 98% job success score",
      rating: "4.8/5",
      projects: "350+",
      badge: "Top Rated Plus",
      link: "#",
      color: "from-green-600 to-green-700",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      stats: { earned: "$50K+", success: "98%", clients: "120+" }
    },
    {
      name: "Freelancer",
      Icon: SiFreelancer,
      description: "Preferred freelancer with excellent track record and client satisfaction",
      rating: "4.7/5",
      projects: "280+",
      badge: "Preferred Freelancer",
      link: "#",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      stats: { contests: "50+", rating: "4.7", completed: "280+" }
    },
    {
      name: "Toptal",
      Icon: SiToptal,
      description: "Elite developer in the top 3% of talent worldwide",
      rating: "5.0/5",
      projects: "45+",
      badge: "Top 3% Developer",
      link: "#",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      stats: { projects: "45+", rating: "5.0", hourly: "$75+" }
    },
 
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "All our profiles are verified with proven track records"
    },
    {
      icon: Star,
      title: "Top Ratings",
      description: "Consistently high ratings across all platforms"
    },
    {
      icon: Award,
      title: "Certified Excellence",
      description: "Multiple certifications and badges of honor"
    },
    {
      icon: Users,
      title: "Happy Clients",
      description: "Thousands of satisfied clients worldwide"
    }
  ];

  const stats = [
    { value: "2000+", label: "Projects Completed", icon: Briefcase },
    { value: "4.9", label: "Average Rating", icon: Star },
    { value: "98%", label: "Success Rate", icon: TrendingUp },
    { value: "24/7", label: "Support Available", icon: Globe }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#8BE31F]/20 to-green-400/20 border border-[#8BE31F]/30 text-[#8BE31F] text-sm font-medium mb-6 backdrop-blur-sm">
            <Eye className="w-4 h-4 mr-2" />
            Find Us Online
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            See Us on
            <span className="block bg-gradient-to-r from-[#8BE31F] via-green-400 to-[#7ACC1B] bg-clip-text text-transparent">
              Leading Platforms
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover our proven track record across the world's top freelancing and business platforms. Check our reviews, ratings, and completed projects.
          </p>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat) => {
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

        {/* Platforms */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className={`relative group p-6 rounded-2xl border transition-all duration-300 cursor-pointer hover:scale-105 ${
                hoveredPlatform === platform.name
                  ? `${platform.bgColor} border-[#8BE31F]/50 shadow-xl`
                  : 'bg-white/10 dark:bg-gray-800/20 border-gray-200/20 dark:border-gray-700/20 hover:border-[#8BE31F]/30'
              }`}
              onMouseEnter={() => setHoveredPlatform(platform.name)}
              onMouseLeave={() => setHoveredPlatform(null)}
              onClick={() => window.open(platform.link, '_blank')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <platform.Icon className="w-8 h-8 text-[#8BE31F]" />
                  <div>
                    <h3 className="font-bold text-black dark:text-white group-hover:text-[#8BE31F] transition-colors duration-300">
                      {platform.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{platform.rating}</span>
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#8BE31F] transition-colors duration-300" />
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${platform.color} text-white text-xs font-semibold mb-3`}>
                <Crown className="w-3 h-3 mr-1" />
                {platform.badge}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {platform.description}
              </p>
              <div className="space-y-2">
                {Object.entries(platform.stats).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400 capitalize">
                      {key === 'ontime' ? 'On Time' : key === 'hourlies' ? 'Hourlies' : key}:
                    </span>
                    <span className="text-[#8BE31F] font-semibold">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Projects</span>
                  <span className="font-bold text-black dark:text-white">{platform.projects}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8BE31F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl"></div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className={`mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl font-bold text-center text-black dark:text-white mb-12">
            Why Check Our Profiles?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => {
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
