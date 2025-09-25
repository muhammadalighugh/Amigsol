"use client";
import { useState, useEffect } from "react";
import { Calculator, TrendingUp, BarChart3, CheckCircle, Wrench, Coffee, Rocket } from "lucide-react";

export default function EstimateProfit() {
  const [countdown, setCountdown] = useState({ days: 20, hours: 5, minutes: 30, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: Calculator, title: "Smart Calculations" },
    { icon: TrendingUp, title: "Growth Projections" },
    { icon: BarChart3, title: "Interactive Charts" }
  ];

  const benefits = [
    "Accurate profit estimates",
    "Export reports easily",
    "Mobile responsive"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-6 py-12">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
          Profit Estimate <span className="text-[#8BE31F]">Calculator</span>
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Coming soon! Estimate and track project profitability with ease.
        </p>
      </div>

      {/* Countdown */}
      <div className="grid grid-cols-4 gap-4 mb-12">
        {[
          { label: "Days", value: countdown.days },
          { label: "Hours", value: countdown.hours },
          { label: "Minutes", value: countdown.minutes },
          { label: "Seconds", value: countdown.seconds }
        ].map((t) => (
          <div key={t.label} className="p-4 bg-white/10 dark:bg-gray-800/20 rounded-xl text-center">
            <div className="text-2xl font-bold text-[#8BE31F]">{t.value.toString().padStart(2, "0")}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{t.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {features.map((f) => (
          <div key={f.title} className="p-6 rounded-xl bg-white/10 dark:bg-gray-800/20 text-center">
            <f.icon className="w-10 h-10 text-[#8BE31F] mx-auto mb-3" />
            <h4 className="font-semibold text-black dark:text-white">{f.title}</h4>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div className="mb-12 max-w-md space-y-3">
        {benefits.map((b, i) => (
          <div key={i} className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-[#8BE31F]" />
            <p className="text-gray-600 dark:text-gray-400">{b}</p>
          </div>
        ))}
      </div>

      {/* Development Status */}
      <div className="flex space-x-6 bg-white/10 dark:bg-gray-800/20 px-6 py-3 rounded-full">
        <div className="flex items-center space-x-2">
          <Wrench className="w-5 h-5 text-[#8BE31F]" />
          <span>In Development</span>
        </div>
        <div className="flex items-center space-x-2">
          <Coffee className="w-5 h-5 text-yellow-500" />
          <span>Team Working</span>
        </div>
        <div className="flex items-center space-x-2">
          <Rocket className="w-5 h-5 text-purple-500" />
          <span>Coming Soon</span>
        </div>
      </div>
    </div>
  );
}
