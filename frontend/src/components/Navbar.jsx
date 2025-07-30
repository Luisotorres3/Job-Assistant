import { NavLink } from "react-router-dom";
import { Sun, Moon, Briefcase } from "lucide-react";

export default function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-3 select-none group">
            <div className="relative">
              <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Briefcase size={24} />
              </span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              Job Assistant
            </span>
          </NavLink>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/new"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                }`
              }
            >
              New Application
            </NavLink>

            {/* Dark mode toggle */}
            <div className="ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? (
                  <Sun size={20} className="text-yellow-500" />
                ) : (
                  <Moon size={20} className="text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
