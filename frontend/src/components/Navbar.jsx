import { NavLink } from "react-router-dom";
import { Sun, Moon } from "lucide-react"; // Assuming you have lucide-react for icons

export default function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-30 transition-colors duration-300">
      <nav className="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center">
        <NavLink to="/" className="flex items-center gap-3 select-none">
          <span className="inline-block bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-2xl">
            🧑‍💼
          </span>
          <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Job Assistant
          </span>
        </NavLink>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/new"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            New Application
          </NavLink>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
