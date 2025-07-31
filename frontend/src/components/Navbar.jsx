import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Sun, Moon, Briefcase, Menu, X } from "lucide-react";

/**
 * Application navigation bar with a dark/light mode toggle and responsive design.
 */
export default function Navbar({ darkMode, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLinkItem = ({ to, children }) => (
    <NavLink
      to={to}
      onClick={() => setIsMenuOpen(false)}
      className={({ isActive }) =>
        `block md:inline-block px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <header className="bg-header text-header-foreground border-b border-border transition-colors duration-300 sticky top-0 z-50 backdrop-blur-sm bg-header/80">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 select-none group"
          >
            <div className="relative">
              <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg w-10 h-10 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <Briefcase size={20} />
              </span>
            </div>
            <span className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
              Job Assistant
            </span>
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            <NavLinkItem to="/">Dashboard</NavLinkItem>
            <NavLinkItem to="/insights">Insights</NavLinkItem>
            <NavLinkItem to="/new">New Application</NavLinkItem>
            {/* Dark mode toggle */}
            <div className="ml-2 pl-2 border-l border-border">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:focus:ring-offset-background"
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {/* Dark mode toggle for mobile */}
             <button
                onClick={toggleDarkMode}
                className="p-2 mr-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} />
                )}
              </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <NavLinkItem to="/">Dashboard</NavLinkItem>
            <NavLinkItem to="/insights">Insights</NavLinkItem>
            <NavLinkItem to="/new">New Application</NavLinkItem>
          </div>
        )}
      </nav>
    </header>
  );
}
