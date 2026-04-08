"use client";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
      <h2 className="text-xl font-semibold dark:text-white">
        Dashboard
      </h2>

      <button
        onClick={() =>
          setTheme(theme === "dark" ? "light" : "dark")
        }
        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
      >
        Toggle Mode
      </button>
    </div>
  );
}