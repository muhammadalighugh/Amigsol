"use client";
import { useState, useEffect } from "react";
import { 
  Handshake, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  Code, 
  Star, 
  CheckCircle,
  ArrowRight,
  Crown,
  Gift,
  Zap,
  Globe,
  Target,
  Award,
  Rocket,
  Building
} from "lucide-react";

export default function Partner() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('referral');

  // Mount + animation
  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
  }, []);

  const partnershipTypes = [
    {
      id: 'referral',
      title: 'Referral Partner',
      icon: Handshake,
      description: 'Bring us projects and earn lucrative commissions',
      color: 'from-blue-500 to-purple-500',
      commission: '15-25%',
      features: [
        'Up to 25% commission on every project',
        'No technical skills required',
        'Dedicated partner support',
        'Marketing materials provided',
        'Real-time earnings tracking',
        'Monthly payouts guaranteed'
      ]
    },
    {
      id: 'developer',
      title: 'Developer Partner',
      icon: Code,
      description: 'Join our development team and share project ownership',
      color: 'from-green-500 to-emerald-500',
      commission: '30-40%',
      features: [
        'Up to 40% revenue share',
        'Collaborate on cutting-edge projects',
        'Access to premium tools & resources',
        'Skill development opportunities',
        'Direct client interaction',
        'Long-term project partnerships'
      ]
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'High Earnings',
      description: 'Industry-leading commission rates and transparent payouts'
    },
    {
      icon: Rocket,
      title: 'Growth Support',
      description: 'We provide training, resources, and ongoing support'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Access to international clients and diverse projects'
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Top performers get exclusive rewards and recognition'
    }
  ];

  const stats = [
    { value: '500+', label: 'Active Partners', icon: Users },
    { value: '$2M+', label: 'Paid in Commissions', icon: DollarSign },
    { value: '1000+', label: 'Projects Completed', icon: Briefcase },
    { value: '98%', label: 'Partner Satisfaction', icon: Star }
  ];

  const tiers = [
    {
      name: 'Bronze',
      icon: Target,
      requirement: '$5K+ in referrals',
      commission: '15%',
      perks: ['Basic support', 'Marketing materials', 'Monthly reports']
    },
    {
      name: 'Silver',
      icon: Award,
      requirement: '$25K+ in referrals',
      commission: '20%',
      perks: ['Priority support', 'Custom materials', 'Weekly check-ins', 'Bonus incentives']
    },
    {
      name: 'Gold',
      icon: Crown,
      requirement: '$100K+ in referrals',
      commission: '25%',
      perks: ['Dedicated manager', 'Exclusive events', 'Higher commissions', 'Co-marketing opportunities']
    }
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
      <div className="mx-auto px-4 sm:px-6 lg:px-28">
        
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#8BE31F]/20 to-green-400/20 border border-[#8BE31F]/30 text-[#8BE31F] text-sm font-medium mb-6 backdrop-blur-sm">
            <Building className="w-4 h-4 mr-2" />
            Partnership Program
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            Join Our
            <span className="block bg-gradient-to-r from-[#8BE31F] via-green-400 to-[#7ACC1B] bg-clip-text text-transparent">
              Success Network
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Partner with us and unlock unlimited earning potential. Whether you bring projects or build them, we share our success with you.
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

        {/* Partnership Types Tabs */}
        <div className={`mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 dark:bg-gray-800/20 rounded-xl p-1 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
              {partnershipTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === type.id 
                      ? 'bg-[#8BE31F] text-black shadow-lg' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {type.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Partnership Type Content */}
          {partnershipTypes.map((type) => {
            const Icon = type.icon;
            if (activeTab !== type.id) return null;

            return (
              <div key={type.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Side - Info */}
                <div className="space-y-6">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${type.color} text-white font-semibold`}>
                    <Icon className="w-5 h-5 mr-2" />
                    Earn up to {type.commission}
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
                    {type.title} Program
                  </h3>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    {type.description}
                  </p>

                  <div className="space-y-4">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#8BE31F] flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Visual */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-800/40 dark:to-gray-800/20 rounded-3xl p-8 border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm">
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${type.color} text-white mb-6`}>
                        <Icon className="w-10 h-10" />
                      </div>
                      <div className="text-4xl font-bold text-black dark:text-white mb-2">
                        {type.commission}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 mb-6">
                        Commission Rate
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/10 dark:bg-gray-700/20">
                          <span className="text-gray-600 dark:text-gray-400">Monthly Payouts</span>
                          <CheckCircle className="w-5 h-5 text-[#8BE31F]" />
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/10 dark:bg-gray-700/20">
                          <span className="text-gray-600 dark:text-gray-400">Real-time Tracking</span>
                          <CheckCircle className="w-5 h-5 text-[#8BE31F]" />
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/10 dark:bg-gray-700/20">
                          <span className="text-gray-600 dark:text-gray-400">24/7 Support</span>
                          <CheckCircle className="w-5 h-5 text-[#8BE31F]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${type.color} opacity-20 rounded-3xl blur-xl -z-10`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Partner Tiers */}
        <div className={`mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl font-bold text-center text-black dark:text-white mb-12">
            Partner Tier Benefits
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, index) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.name}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 hover:scale-105 group ${
                    index === 2 
                      ? 'bg-gradient-to-br from-[#8BE31F]/10 to-green-400/10 border-[#8BE31F]/50' 
                      : 'bg-white/10 dark:bg-gray-800/20 border-gray-200/20 dark:border-gray-700/20 hover:border-[#8BE31F]/30'
                  }`}
                >
                  {index === 2 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#8BE31F] text-black px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <Icon className="w-12 h-12 text-[#8BE31F] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h4 className="text-xl font-bold text-black dark:text-white mb-2">{tier.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tier.requirement}</p>
                    <div className="text-3xl font-bold text-[#8BE31F]">{tier.commission}</div>
                  </div>
                  
                  <div className="space-y-3">
                    {tier.perks.map((perk, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-[#8BE31F] flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className={`mb-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl font-bold text-center text-black dark:text-white mb-12">
            Why Partner With Us?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="text-center p-6 rounded-2xl bg-white/10 dark:bg-gray-800/20 border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm hover:border-[#8BE31F]/30 transition-all duration-300 group">
                  <Icon className="w-12 h-12 text-[#8BE31F] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-lg font-semibold text-black dark:text-white mb-3">{benefit.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-[#8BE31F]/10 to-green-400/10 rounded-3xl p-8 border border-[#8BE31F]/20 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-6">
              <Handshake className="w-8 h-8 text-[#8BE31F] mr-3" />
              <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
                Ready to Start Earning?
              </h3>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful partners who are already earning substantial commissions with our partnership programs
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative px-8 py-4 bg-[#8BE31F] text-black font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#8BE31F]/25 hover:shadow-[#8BE31F]/40 overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="absolute inset-0 bg-[#7ACC1B] scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></span>
                <span className="relative z-10 flex items-center group-hover:scale-105 transition-transform duration-300">
                  <Rocket className="mr-2 h-5 w-5" />
                  Become a Partner
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              
              <button className="group relative px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-black dark:text-white font-semibold rounded-xl transition-all duration-300 hover:border-[#8BE31F] overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-[#8BE31F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                <span className="relative z-10 flex items-center group-hover:text-[#8BE31F] transition-colors duration-300">
                  <Gift className="mr-2 h-5 w-5" />
                  Learn More
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}