"use client";
import {
  Code2,
  Database,
  Cloud,
  Smartphone,
  Palette,
  Settings,
  Zap,
  Globe,
  Server,
  GitBranch,
  Cpu,
  Layers,
  Terminal,
  FileCode,
  Brain,
  CreditCard
} from "lucide-react";

export default function ProfessionalTechStackLoop() {
  const technologies = [
    { name: "JavaScript", icon: Code2, category: "Language" },
    { name: "React", icon: Layers, category: "Frontend" },
    { name: "Node.js", icon: Server, category: "Backend" },
    { name: "Firebase", icon: Database, category: "Database" },
    { name: "OpenAI API", icon: Brain, category: "AI/ML" },
    { name: "Next.js", icon: Globe, category: "Framework" },
    { name: "TypeScript", icon: FileCode, category: "Language" },
    { name: "Tailwind CSS", icon: Palette, category: "Styling" },
    { name: "MongoDB", icon: Database, category: "Database" },
    { name: "Python", icon: Terminal, category: "Backend" },
    { name: "AWS", icon: Cloud, category: "Cloud" },
    { name: "Docker", icon: Settings, category: "DevOps" },
    { name: "GraphQL", icon: Zap, category: "API" },
    { name: "Redis", icon: Cpu, category: "Cache" },
    { name: "Stripe API", icon: CreditCard, category: "Payment" },
    { name: "Vercel", icon: Globe, category: "Deployment" },
    { name: "Flutter", icon: Smartphone, category: "Mobile" },
    { name: "Git", icon: GitBranch, category: "Version Control" },
    { name: "PostgreSQL", icon: Database, category: "Database" },
    { name: "Express.js", icon: Server, category: "Backend" }
  ];

  // Create enough copies for seamless infinite scroll
  const duplicatedTechs = [...technologies, ...technologies, ...technologies];

  // Render a single tech item to avoid repetition
  const renderTechItem = (tech, index, keyPrefix) => {
    const Icon = tech.icon;
    return (
      <div
        key={`${keyPrefix}-${index}`}
        className="flex-shrink-0 flex items-center space-x-4 py-4 px-6 pointer-events-none select-none"
      >
        <Icon className="h-8 w-8 text-gray-700 dark:text-[#8BE31F]" />
        <span className="text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-white">
          {tech.name}
        </span>
        <span className="text-sm px-3 py-1 rounded-full bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
          {tech.category}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full transition-colors duration-500 py-8 md:py-2 overflow-hidden relative">
      {/* Header */}
      <div className="text-center mb-16 relative z-10 px-4">
        <h2 className="text-2xl md:text-3xl font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 dark:text-[#8BE31F]">
          Cutting-edge tools and frameworks for modern digital solutions
        </h2>
      </div>

      {/* First Row - Left to Right */}
      <div className="flex items-center space-x-12 mb-5 animate-scroll-left">
        {duplicatedTechs.slice(0, 20).map((tech, index) => renderTechItem(tech, index, `row1`))}
      </div>

      {/* Second Row - Right to Left */}
      <div className="flex items-center space-x-12 mb-5 animate-scroll-right">
        {duplicatedTechs.slice(20, 40).map((tech, index) => renderTechItem(tech, index, `row2`))}
      </div>

      {/* Third Row - Left to Right */}
      <div className="flex items-center lg:space-x-30 sm:space-x-12 animate-scroll-left-slow">
        {duplicatedTechs.slice(40, 60).map((tech, index) => renderTechItem(tech, index, `row3`))}
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-20%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-20%); }
          to { transform: translateX(0); }
        }
        @keyframes scroll-left-slow {
          from { transform: translateX(0); }
          to { transform: translateX(-20%); }
        }
        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 50s linear infinite;
        }
        .animate-scroll-left-slow {
          animation: scroll-left-slow 70s linear infinite;
        }
      `}</style>
    </div>
  );
}
