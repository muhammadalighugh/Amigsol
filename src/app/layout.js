// src/app/layout.js
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Amigsol",
  description: "Authentication & Marketing App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Global Background */}
          <div className="fixed inset-0 bg-gradient-to-br from-white via-gray-100 to-white dark:from-black dark:via-gray-900 dark:to-black overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-72 h-72 bg-[#8BE31F]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8BE31F]/3 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Content Layer */}
          <div className="relative z-10 min-h-screen">
            {children}
          </div>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}