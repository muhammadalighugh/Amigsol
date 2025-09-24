"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  User,
  Mail,
  Lock,
  MapPin,
  Globe,
  MessageSquare,
  GraduationCap,
  Code,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Handshake,
  Building,
  Shield,
  Star,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    partnershipType: "",
    address: "",
    city: "",
    country: "",
    linkedinProfile: "",
    website: "",
    whatsappContact: "",
    education: [
      {
        degreeName: "",
        institution: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ],
    hearAboutUs: "",
    targetAudience: [],
    marketingChannels: [],
    payoutMethod: "",
    skills: [],
    experienceLevel: "",
    githubLink: "",
    portfolioLink: "",
    availability: "",
    ndaAccepted: false,
    termsAccepted: false,
    privacyAccepted: false,
  });

  useEffect(() => {
    const savedData = localStorage.getItem("partnerSignupForm");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData((prev) => ({
        ...prev,
        fullName: parsedData.fullName || "",
        email: parsedData.email || "",
        password: parsedData.password || "",
        confirmPassword: parsedData.confirmPassword || "",
      }));
    }
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsEmailVerified(currentUser.emailVerified);
        if (!currentUser.emailVerified) {
          setMessage("Please verify your email before proceeding. Check your inbox or spam folder.");
        } else {
          setMessage("Email verified successfully!");
        }
      } else {
        setUser(null);
        setIsEmailVerified(false);
        setMessage("");
      }
    });

    let intervalId;
    if (user && !isEmailVerified) {
      intervalId = setInterval(async () => {
        try {
          await user.reload();
          if (user.emailVerified) {
            setIsEmailVerified(true);
            clearInterval(intervalId);
          }
        } catch (error) {
          console.error("Error checking email verification:", error);
        }
      }, 5000);
    }

    return () => {
      unsubscribe();
      if (intervalId) clearInterval(intervalId);
    };
  }, [user]);

  useEffect(() => {
    if (currentStep === 1 && isEmailVerified && validateStep(1)) {
      setCurrentStep(2);
      setMessage("Email verified! Proceeding to partnership type selection.");
      localStorage.removeItem("partnerSignupForm");
    }
  }, [isEmailVerified]);

  const totalSteps = 6;

  const partnershipTypes = [
    {
      id: "referral",
      title: "Referral Partner",
      description: "Bring us projects, we handle execution, you earn commission.",
      icon: TrendingUp,
      color: "from-blue-500 to-purple-500",
      benefits: ["Up to 25% commission", "No technical skills required", "Marketing support"],
    },
    {
      id: "developer",
      title: "Developer Partner",
      description: "We give you client projects, you complete them, we share earnings.",
      icon: Code,
      color: "from-green-500 to-emerald-500",
      benefits: ["Up to 40% revenue share", "Direct client work", "Skill development"],
    },
  ];

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Australia",
    "Japan",
    "South Korea",
    "Singapore",
    "Netherlands",
    "Sweden",
    "Switzerland",
    "Pakistan",
    "India",
    "Bangladesh",
    "Other",
  ];

  const hearAboutUsOptions = [
    "Social Media",
    "Friend/Referral",
    "Event/Conference",
    "Search Engine",
    "Blog/Article",
    "YouTube",
    "LinkedIn",
    "Other",
  ];

  const targetAudienceOptions = ["Small Business", "Medium Enterprise", "Large Corporation", "Startups"];

  const marketingChannelsOptions = [
    "Social Media",
    "Blog Writing",
    "YouTube Channel",
    "Events/Conferences",
    "Email Marketing",
    "Personal Network",
    "Cold Outreach",
    "Content Creation",
  ];

  const payoutMethods = ["Bank Transfer", "PayPal", "Wise", "Cryptocurrency", "Stripe", "Other"];

  const skillsOptions = [
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "AI/ML",
    "WordPress",
    "Shopify",
    "Mobile Development",
    "UI/UX Design",
    "DevOps",
    "Blockchain",
    "Data Science",
  ];

  const experienceLevels = ["Junior (0-2 years)", "Mid-level (2-5 years)", "Senior (5+ years)"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleArrayToggle = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degreeName: "",
          institution: "",
          startYear: "",
          endYear: "",
          description: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const updateEducation = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.email.includes("@")) newErrors.email = "Valid email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword)
          newErrors.confirmPassword = "Passwords do not match";
        break;

      case 2:
        if (!formData.partnershipType) newErrors.partnershipType = "Please select a partnership type";
        break;

      case 3:
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.whatsappContact.trim()) newErrors.whatsappContact = "WhatsApp contact is required";
        break;

      case 4:
        if (formData.partnershipType === "developer") {
          if (!formData.education[0].degreeName.trim())
            newErrors.education = "At least one education entry is required for developers";
        }
        break;

      case 5:
        if (formData.partnershipType === "referral") {
          if (!formData.hearAboutUs) newErrors.hearAboutUs = "Please select how you heard about us";
          if (!formData.payoutMethod) newErrors.payoutMethod = "Please select a payout method";
        } else {
          if (formData.skills.length === 0) newErrors.skills = "Please select at least one skill";
          if (!formData.experienceLevel) newErrors.experienceLevel = "Please select your experience level";
          if (!formData.ndaAccepted) newErrors.ndaAccepted = "NDA acceptance is required for developers";
        }
        break;

      case 6:
        if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions";
        if (!formData.privacyAccepted) newErrors.privacyAccepted = "You must accept the privacy policy";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      setMessage("");
      if (currentStep === 1) {
        localStorage.removeItem("partnerSignupForm");
      }
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setMessage("");
  };

  const handleRegister = async () => {
    if (validateStep(1)) {
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        await sendEmailVerification(userCredential.user);
        setMessage("Verification email sent! Please check your inbox and verify your email.");
        localStorage.setItem(
          "partnerSignupForm",
          JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          })
        );
      } catch (error) {
        let errorMessage = "An error occurred during registration.";
        switch (error.code) {
          case "auth/network-request-failed":
            errorMessage = "Network error: Please check your internet connection or try a different network/VPN.";
            break;
          case "auth/email-already-in-use":
            errorMessage = "This email is already registered. Please use a different email or sign in.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email format. Please enter a valid email address.";
            break;
          case "auth/weak-password":
            errorMessage = "Password is too weak. Please use a stronger password (at least 6 characters).";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many attempts. Please wait a few minutes and try again.";
            break;
          default:
            errorMessage = `Registration failed: ${error.message}`;
        }
        setErrors({ email: errorMessage });
        console.error("Registration error:", {
          code: error.code,
          message: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setLoading(true);
      try {
        await setDoc(doc(db, "partnerApplications", user.uid), {
          ...formData,
          userId: user.uid,
          status: "pending",
          submittedAt: new Date(),
        });

        setMessage("Application submitted successfully! You'll receive a confirmation soon.");
        setShowModal(true);

        setTimeout(() => {
          setShowModal(false);
          router.push("/login");
        }, 3000);

        localStorage.removeItem("partnerSignupForm");
      } catch (error) {
        let errorMessage = "Failed to submit application. Please try again.";
        if (error.code === "unavailable") {
          errorMessage = "Network error: Please check your internet connection or try a different network/VPN.";
        } else if (error.code === "permission-denied") {
          errorMessage = "Access denied: Please ensure you are signed in and try again.";
        } else {
          errorMessage = `Submission error: ${error.message}`;
        }
        setErrors({ submit: errorMessage });
        console.error("Submission error:", {
          code: error.code,
          message: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                Create Your Account
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Start your partnership journey with us</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="Enter your full name"
                    disabled={user}
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="Enter your email address"
                    disabled={user}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="Create a password"
                    disabled={user}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="Confirm your password"
                    disabled={user}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
              {!user && (
                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full px-8 py-3 bg-[#8BE31F] text-black font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-[#8BE31F]/25 hover:shadow-[#8BE31F]/40"
                >
                  {loading ? "Registering..." : "Register and Send Verification Email"}
                </button>
              )}
              {user && !isEmailVerified && (
                <div className="text-center">
                  <p className="text-blue-500 text-sm mb-2">Waiting for email verification...</p>
                  <div className="w-6 h-6 border-4 border-[#8BE31F] border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              )}
              {message && <p className="text-center text-sm text-blue-500 mt-4">{message}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Select Partnership Type</h2>
              <p className="text-gray-600 dark:text-gray-400">Choose how you'd like to partner with us</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partnershipTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.id}
                    onClick={() => handleInputChange("partnershipType", type.id)}
                    className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      formData.partnershipType === type.id
                        ? "border-[#8BE31F] bg-[#8BE31F]/10"
                        : "border-gray-200 dark:border-gray-700 hover:border-[#8BE31F]/50"
                    }`}
                  >
                    {formData.partnershipType === type.id && (
                      <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-[#8BE31F]" />
                    )}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${type.color} text-white mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white mb-3">{type.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{type.description}</p>
                    <div className="space-y-2">
                      {type.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-[#8BE31F] flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            {errors.partnershipType && <p className="text-red-500 text-sm mt-2">{errors.partnershipType}</p>}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Personal Information</h2>
              <p className="text-gray-600 dark:text-gray-400">Help us get to know you better</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="Enter your full address"
                  />
                </div>
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                  placeholder="Enter your city"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Country *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LinkedIn Profile
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    value={formData.linkedinProfile}
                    onChange={(e) => handleInputChange("linkedinProfile", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  WhatsApp Contact *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={formData.whatsappContact}
                    onChange={(e) => handleInputChange("whatsappContact", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="+1234567890"
                  />
                </div>
                {errors.whatsappContact && (
                  <p className="text-red-500 text-sm mt-1">{errors.whatsappContact}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Education Background</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {formData.partnershipType === "developer"
                  ? "Required for developer partners"
                  : "Optional for referral partners"}
              </p>
            </div>
            <div className="space-y-6">
              {formData.education.map((edu, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-black dark:text-white flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2 text-[#8BE31F]" />
                      Education Entry {index + 1}
                    </h3>
                    {index > 0 && (
                      <button
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Degree/Certification Name{" "}
                        {formData.partnershipType === "developer" && index === 0 ? "*" : ""}
                      </label>
                      <input
                        type="text"
                        value={edu.degreeName}
                        onChange={(e) => updateEducation(index, "degreeName", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                        placeholder="e.g., Bachelor of Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Institution Name
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, "institution", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                        placeholder="e.g., MIT"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Start Year
                      </label>
                      <input
                        type="number"
                        value={edu.startYear}
                        onChange={(e) => updateEducation(index, "startYear", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                        placeholder="2018"
                        min="1950"
                        max="2030"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        End Year
                      </label>
                      <input
                        type="number"
                        value={edu.endYear}
                        onChange={(e) => updateEducation(index, "endYear", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                        placeholder="2022"
                        min="1950"
                        max="2030"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description (Optional)
                      </label>
                      <textarea
                        value={edu.description}
                        onChange={(e) => updateEducation(index, "description", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                        placeholder="Brief description of your studies, achievements, etc."
                        rows="3"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={addEducation}
                className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-[#8BE31F] hover:text-[#8BE31F] transition-all duration-300 flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Another Education Entry
              </button>
              {errors.education && <p className="text-red-500 text-sm mt-2">{errors.education}</p>}
            </div>
          </div>
        );
      case 5:
        if (formData.partnershipType === "referral") {
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                  Referral Partner Details
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Tell us about your referral approach</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    How did you hear about us? *
                  </label>
                  <select
                    value={formData.hearAboutUs}
                    onChange={(e) => handleInputChange("hearAboutUs", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                  >
                    <option value="">Select an option</option>
                    {hearAboutUsOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.hearAboutUs && <p className="text-red-500 text-sm mt-1">{errors.hearAboutUs}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Target Audience (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {targetAudienceOptions.map((option) => (
                      <label
                        key={option}
                        className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-[#8BE31F]/50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.targetAudience.includes(option)}
                          onChange={() => handleArrayToggle("targetAudience", option)}
                          className="w-4 h-4 text-[#8BE31F] border-gray-300 rounded focus:ring-[#8BE31F]"
                        />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Marketing Channels (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {marketingChannelsOptions.map((option) => (
                      <label
                        key={option}
                        className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-[#8BE31F]/50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.marketingChannels.includes(option)}
                          onChange={() => handleArrayToggle("marketingChannels", option)}
                          className="w-4 h-4 text-[#8BE31F] border-gray-300 rounded focus:ring-[#8BE31F]"
                        />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Payout Method *
                  </label>
                  <select
                    value={formData.payoutMethod}
                    onChange={(e) => handleInputChange("payoutMethod", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                  >
                    <option value="">Select payout method</option>
                    {payoutMethods.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                  {errors.payoutMethod && <p className="text-red-500 text-sm mt-1">{errors.payoutMethod}</p>}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                  Developer Partner Details
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Tell us about your technical skills</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Skills & Tech Stack (Select all that apply) *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {skillsOptions.map((skill) => (
                      <label
                        key={skill}
                        className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-[#8BE31F]/50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.skills.includes(skill)}
                          onChange={() => handleArrayToggle("skills", skill)}
                          className="w-4 h-4 text-[#8BE31F] border-gray-300 rounded focus:ring-[#8BE31F]"
                        />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">{skill}</span>
                      </label>
                    ))}
                  </div>
                  {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Experience Level *
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  {errors.experienceLevel && (
                    <p className="text-red-500 text-sm mt-1">{errors.experienceLevel}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      GitHub Profile Link
                    </label>
                    <div className="relative">
                      <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="url"
                        value={formData.githubLink}
                        onChange={(e) => handleInputChange("githubLink", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                        placeholder="https://github.com/username"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Portfolio Link
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="url"
                        value={formData.portfolioLink}
                        onChange={(e) => handleInputChange("portfolioLink", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Availability
                  </label>
                  <input
                    type="text"
                    value={formData.availability}
                    onChange={(e) => handleInputChange("availability", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="e.g., 20 hours/week, Full-time, Part-time"
                  />
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.ndaAccepted}
                      onChange={(e) => handleInputChange("ndaAccepted", e.target.checked)}
                      className="w-4 h-4 text-[#8BE31F] border-gray-300 rounded focus:ring-[#8BE31F]"
                    />
                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                      I agree to sign NDA & Contract agreements for client projects *
                    </span>
                  </label>
                  {errors.ndaAccepted && <p className="text-red-500 text-sm mt-1">{errors.ndaAccepted}</p>}
                </div>
              </div>
            </div>
          );
        }
      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Terms & Agreements</h2>
              <p className="text-gray-600 dark:text-gray-400">Please review and accept our terms</p>
            </div>
            <div className="space-y-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white/50 dark:bg-gray-800/50">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-[#8BE31F]" />
                  Partnership Agreement Summary
                </h3>
                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-[#8BE31F] flex-shrink-0 mt-0.5" />
                    <span>
                      Commission rates as specified: {formData.partnershipType === "referral" ? "15-25%" : "30-40%"} based
                      on performance tiers
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-[#8BE31F] flex-shrink-0 mt-0.5" />
                    <span>Monthly payouts on the 15th of each month for completed projects</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-[#8BE31F] flex-shrink-0 mt-0.5" />
                    <span>Real-time tracking and transparent reporting of all earnings</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-[#8BE31F] flex-shrink-0 mt-0.5" />
                    <span>Professional support and resources provided</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={(e) => handleInputChange("termsAccepted", e.target.checked)}
                      className="w-4 h-4 text-[#8BE31F] border-gray-300 rounded focus:ring-[#8BE31F] mt-0.5"
                    />
                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                      I agree to the{" "}
                      <button className="text-[#8BE31F] hover:underline font-medium">
                        Partner Program Terms & Conditions
                      </button>{" "}
                      *
                    </span>
                  </label>
                  {errors.termsAccepted && (
                    <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>
                  )}
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.privacyAccepted}
                      onChange={(e) => handleInputChange("privacyAccepted", e.target.checked)}
                      className="w-4 h-4 text-[#8BE31F] border-gray-300 rounded focus:ring-[#8BE31F] mt-0.5"
                    />
                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                      I agree to the{" "}
                      <button className="text-[#8BE31F] hover:underline font-medium">Privacy Policy</button> *
                    </span>
                  </label>
                  {errors.privacyAccepted && (
                    <p className="text-red-500 text-sm mt-1">{errors.privacyAccepted}</p>
                  )}
                </div>
              </div>
              <div className="bg-[#8BE31F]/10 border border-[#8BE31F]/20 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Star className="w-6 h-6 text-[#8BE31F] mr-2" />
                  <h4 className="text-lg font-semibold text-black dark:text-white">You're Almost Ready!</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Once you submit this application, our team will review it within 24-48 hours. You'll receive an email
                  with your partner dashboard access and next steps.
                </p>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Building className="w-4 h-4 mr-2 text-[#8BE31F]" />
                  Partnership Type: <span className="font-medium ml-1 capitalize">{formData.partnershipType}</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full text-center">
              <CheckCircle className="w-12 h-12 text-[#8BE31F] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Your Application is in Process
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Thank you for submitting your application! Our team will review it within 24-48 hours. You'll be redirected to the login page shortly.
              </p>
              <button
                onClick={() => {
                  setShowModal(false);
                  router.push("/login");
                }}
                className="px-6 py-3 bg-[#8BE31F] text-black font-semibold rounded-lg transition-all duration-300"
              >
                Go to Login
              </button>
            </div>
          </div>
        )}
        <div
          className={`mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Step {currentStep} of {totalSteps}
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#8BE31F] to-green-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
        <div
          className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="p-8 lg:p-12">{renderStepContent()}</div>
          <div className="bg-gray-50 dark:bg-gray-800 px-8 lg:px-12 py-6 flex justify-between items-center border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                currentStep === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index + 1 <= currentStep ? "bg-[#8BE31F]" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
            {currentStep === totalSteps ? (
              <button
                onClick={handleSubmit}
                disabled={loading || !isEmailVerified}
                className={`group relative px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  !isEmailVerified
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#8BE31F] text-black shadow-lg shadow-[#8BE31F]/25 hover:shadow-[#8BE31F]/40"
                } overflow-hidden`}
              >
                <span className="relative z-10 flex items-center group-hover:scale-105 transition-transform duration-300">
                  <Handshake className="w-5 h-5 mr-2" />
                  {loading ? "Submitting..." : "Submit Application"}
                </span>
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={loading || (currentStep === 1 && !isEmailVerified)}
                className={`group relative px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  currentStep === 1 && !isEmailVerified
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#8BE31F] text-black shadow-lg shadow-[#8BE31F]/25 hover:shadow-[#8BE31F]/40"
                } overflow-hidden`}
              >
                <span className="relative z-10 flex items-center group-hover:scale-105 transition-transform duration-300">
                  Next Step
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            )}
          </div>
        </div>
        {message && <p className="text-center text-sm mt-4 text-blue-500">{message}</p>}
        {errors.submit && <p className="text-center text-sm mt-4 text-red-500">{errors.submit}</p>}
      </div>
    </div>
  );
}