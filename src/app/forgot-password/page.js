"use client";
import { useState, useEffect } from "react";
import { 
  Mail, 
  ArrowRight,
  ArrowLeft,
  Shield,
  Building,
  CheckCircle,
  RotateCcw
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    email: ''
  });

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle successful password reset request
      console.log('Password reset email sent to:', formData.email);
      setIsEmailSent(true);
      
    } catch (error) {
      console.error('Reset password error:', error);
      setErrors({ general: 'Failed to send reset email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    // Handle navigation back to login
    console.log('Navigate back to login');
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    
    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Reset email resent to:', formData.email);
    } catch (error) {
      console.error('Resend error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-[#8BE31F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className={`max-w-md w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#8BE31F] to-green-400 rounded-2xl mb-4">
            <Building className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
            {isEmailSent ? 'Check Your Email' : 'Forgot Password?'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isEmailSent 
              ? 'We&apos;ve sent password reset instructions to your email'
              : 'No worries, we&apos;ll send you reset instructions'
            }
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          
          {!isEmailSent ? (
            /* Reset Password Form */
            <div className="space-y-6">
              
              {/* General Error */}
              {errors.general && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-600 dark:text-red-400 text-sm">{errors.general}</p>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8BE31F] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white transition-colors ${
                      errors.email 
                        ? 'border-red-300 dark:border-red-600' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Enter your email address"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-blue-800 dark:text-blue-200 text-sm font-medium mb-1">
                      Password Reset Instructions
                    </p>
                    <p className="text-blue-700 dark:text-blue-300 text-xs">
                      Enter your email address and we&apos;ll send you a link to reset your password. 
                      The link will expire in 24 hours for security.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleResetPassword}
                disabled={isLoading}
                className="group relative w-full px-6 py-3 bg-[#8BE31F] text-black font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-[#8BE31F]/25 hover:shadow-[#8BE31F]/40 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending Reset Email...
                  </div>
                ) : (
                  <>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    <span className="absolute inset-0 bg-[#7ACC1B] scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></span>
                    <span className="relative z-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Mail className="w-5 h-5 mr-2" />
                      Send Reset Email
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Email Sent Confirmation */
            <div className="space-y-6 text-center">
              
              {/* Success Icon */}
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>

              {/* Success Message */}
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                  Reset Email Sent!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  We&apos;ve sent password reset instructions to:
                </p>
                <p className="text-[#8BE31F] font-medium mt-1">
                  {formData.email}
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-left">
                <h4 className="font-medium text-black dark:text-white mb-2 text-sm">Next Steps:</h4>
                <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  <li>• Check your email inbox (and spam folder)</li>
                  <li>• Click the reset link in the email</li>
                  <li>• Create your new password</li>
                  <li>• Link expires in 24 hours</li>
                </ul>
              </div>

              {/* Resend Button */}
              <button
                onClick={handleResendEmail}
                disabled={isLoading}
                className="group relative w-full px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-black dark:text-white font-semibold rounded-lg transition-all duration-300 hover:border-[#8BE31F] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Resending...
                  </div>
                ) : (
                  <>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#8BE31F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    <span className="relative z-10 flex items-center justify-center group-hover:text-[#8BE31F] transition-colors duration-300">
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Resend Email
                    </span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <button 
              onClick={handleBackToLogin}
              className="inline-flex items-center text-gray-600 dark:text-gray-400 text-sm hover:text-[#8BE31F] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Login
            </button>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Shield className="w-3 h-3 mr-1 text-[#8BE31F]" />
              Secure Process
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-3 h-3 mr-1 text-[#8BE31F]" />
              24hr Link Expiry
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}