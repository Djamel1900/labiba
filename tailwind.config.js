// client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // 'app-bg' اسمه المفتاح لأي مسار تختاره
        "app-bg": "url('/bg.jpg')",
      },
    },
  },
  plugins: [],
};

