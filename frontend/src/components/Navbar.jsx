import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white/90 backdrop-blur shadow-md sticky top-0 z-30">
      <nav className="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center">
        <NavLink to="/" className="flex items-center gap-3 select-none">
          <span className="inline-block bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-2xl">
            🧑‍💼
          </span>
          <span className="text-2xl font-bold tracking-tight text-primary">
            Job Assistant
          </span>
        </NavLink>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-base font-semibold transition-colors duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-primary hover:bg-primary/10"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/new"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-base font-semibold transition-colors duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-primary hover:bg-primary/10"
              }`
            }
          >
            New Application
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
