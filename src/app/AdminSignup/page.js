"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Mail, Lock, Key, LogIn } from "lucide-react";

export default function AdminSignup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email.endsWith("@gmail.com")) {
        router.push("/admin/applications");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const validateForm = async () => {
    if (!email || !password || !confirmPassword || !secretKey) {
      setError("All fields are required.");
      return false;
    }
    if (!email.endsWith("@gmail.com")) {
      setError("Admin email must end with @gmail.com.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    try {
      const response = await fetch("/api/validateAdminSecret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretKey }),
      });
      const { valid, error } = await response.json();
      if (!valid) {
        setError(error || "Invalid secret key.");
        return false;
      }
      return true;
    } catch (err) {
      setError("Error validating secret key. Please try again.");
      return false;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!(await validateForm())) {
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/AdminLogin");
    } catch (err) {
      let errorMessage = "Failed to create admin account. Please try again.";
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password is too weak.";
      }
      setError(errorMessage);
      console.error("Signup error:", {
        code: err.code,
        message: err.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-6">
          Admin Signup
        </h2>
        {error && (
          <p className="text-center text-sm text-red-500 mb-4">{error}</p>
        )}
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#8BE31F] focus:border-[#8BE31F] bg-white dark:bg-gray-700 text-black dark:text-white sm:text-sm"
                placeholder="admin@gmail.com"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#8BE31F] focus:border-[#8BE31F] bg-white dark:bg-gray-700 text-black dark:text-white sm:text-sm"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#8BE31F] focus:border-[#8BE31F] bg-white dark:bg-gray-700 text-black dark:text-white sm:text-sm"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="secretKey"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Secret Key
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="secretKey"
                type="text"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#8BE31F] focus:border-[#8BE31F] bg-white dark:bg-gray-700 text-black dark:text-white sm:text-sm"
                placeholder="Enter secret key"
                required
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#8BE31F] hover:bg-[#7ACC1B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8BE31F] transition-all duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <LogIn className="h-5 w-5 mr-2" />
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}