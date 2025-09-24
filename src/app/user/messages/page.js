"use client";
import { useState, useEffect } from "react";
import { 
  TrendingUp,
  Calculator,
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Rocket,
  Clock,
  Bell,
  Mail,
  ArrowRight,
  CheckCircle,
  Zap,
  Star,
  Settings,
  Code,
  Wrench,
  Coffee,
  Calendar,
  Users,
  Heart
} from "lucide-react";

export default function EstimateProfit() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 30,
    hours: 8,
    minutes: 42,
    seconds: 30
  });

  useEffect(() => {
    setMounted(true);
    setIsVisible(true);

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEmailSubmit = () => {
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  const features = [
    {
      icon: Calculator,
      title: "Smart Calculations",
      description: "Advanced algorithms to calculate potential profits based on your project parameters"
    },
    {
      icon: TrendingUp,
      title: "Growth Projections",
      description: "Visualize your potential revenue growth over different time periods"
    },
    {
      icon: BarChart3,
      title: "Interactive Charts",
      description: "Beautiful, interactive charts and graphs to visualize your profit estimates"
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Set profit targets and track your progress toward achieving them"
    },
    {
      icon: PieChart,
      title: "Cost Breakdown",
      description: "Detailed breakdown of costs vs profits with visual representations"
    },
    {
      icon: Activity,
      title: "Real-time Updates",
      description: "Live updates as you adjust parameters to see instant profit changes"
    }
  ];

  const benefits = [
    "Accurate profit calculations for any project size",
    "Multiple calculation models and scenarios",
    "Export reports in PDF and Excel formats",
    "Integration with popular business tools",
    "Mobile-responsive design for on-the-go access",
    "Advanced analytics and insights"
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#8BE31F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#8BE31F]/20 to-green-400/20 border border-[#8BE31F]/30 text-[#8BE31F] text-sm font-medium mb-6 backdrop-blur-sm">
            <Settings className="w-4 h-4 mr-2 animate-spin" />
            Coming Soon
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            Profit Estimate
            <span className="block bg-gradient-to-r from-[#8BE31F] via-green-400 to-[#7ACC1B] bg-clip-text text-transparent">
              Calculator
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Our advanced profit estimation tool is currently under development. Get ready to calculate, analyze, and optimize your project profitability with precision.
          </p>

          {/* Status Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700">
            <Code className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
            <span className="text-yellow-700 dark:text-yellow-300 font-medium">Currently in Development</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-4">Expected Launch</h3>
            <p className="text-gray-600 dark:text-gray-400">We're working hard to bring you this amazing tool</p>
          </div>
          
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds }
            ].map((item, index) => (
              <div key={item.label} className="text-center p-6 bg-white/10 dark:bg-gray-800/20 rounded-2xl border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm">
                <div className="text-3xl md:text-4xl font-bold text-[#8BE31F] mb-2">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Features */}
        <div className={`mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl font-bold text-black dark:text-white mb-12 text-center">
            What's Coming
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="p-6 rounded-2xl bg-white/10 dark:bg-gray-800/20 border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm hover:border-[#8BE31F]/30 transition-all duration-300 group">
                <feature.icon className="w-12 h-12 text-[#8BE31F] mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-[#8BE31F] transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits List */}
        <div className={`mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-black dark:text-white mb-8">
                Key Features & Benefits
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#8BE31F] flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600 dark:text-gray-400">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              {/* Mock Calculator Interface */}
              <div className="bg-white/10 dark:bg-gray-800/20 rounded-3xl p-8 border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <Calculator className="w-16 h-16 text-[#8BE31F] mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-black dark:text-white">Profit Calculator Preview</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                  <div className="h-8 bg-[#8BE31F]/20 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                </div>
                
                <div className="mt-6 p-4 bg-[#8BE31F]/10 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-black dark:text-white font-medium">Estimated Profit:</span>
                    <span className="text-2xl font-bold text-[#8BE31F]">$--,---</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#8BE31F] rounded-full flex items-center justify-center animate-bounce">
                <DollarSign className="w-4 h-4 text-black" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce delay-500">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

      

        {/* Development Status */}
        <div className={`text-center transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-6 px-8 py-4 bg-white/10 dark:bg-gray-800/20 rounded-full border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Wrench className="w-5 h-5 text-[#8BE31F] animate-pulse" />
              <span className="text-black dark:text-white font-medium">In Development</span>
            </div>
            <div className="flex items-center space-x-2">
              <Coffee className="w-5 h-5 text-yellow-500" />
              <span className="text-black dark:text-white font-medium">Team Working</span>
            </div>
            <div className="flex items-center space-x-2">
              <Rocket className="w-5 h-5 text-purple-500" />
              <span className="text-black dark:text-white font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8BE31F]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-32 h-32 bg-[#8BE31F]/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
    </div>
  );
}