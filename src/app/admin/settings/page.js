"use client";
import { Building } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-black dark:text-white mb-2">Settings</h3>
        <p className="text-gray-500 dark:text-gray-400">This section is coming soon...</p>
      </div>
    </div>
  );
}