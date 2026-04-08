"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration issue
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent render before mount
  if (!mounted) return null;

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-xl mx-4 mt-4">
      <h2 className="text-xl font-semibold dark:text-white">
        Dashboard
      </h2>

      <button
        onClick={() => {
          console.log("clicked");
          setTheme(theme === "dark" ? "light" : "dark")
        }}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
      >
        Toggle Mode
      </button>
    </div>
  );
}