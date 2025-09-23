/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
      "./app/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
      "./src/**/*.{js,jsx,ts,tsx}" // Include if you have a src/ folder
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };