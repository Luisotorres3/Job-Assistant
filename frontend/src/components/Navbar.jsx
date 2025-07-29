import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white/90 backdrop-blur shadow-md sticky top-0 z-30">
      <nav className="container mx-auto px-6 py-5 flex flex-col items-center">
        <NavLink to="/" className="flex flex-col items-center gap-2 mb-2 select-none">
          <span className="inline-block bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-3xl">🧑‍💼</span>
          <span className="text-4xl font-extrabold tracking-tight text-primary drop-shadow-lg text-center leading-tight">Job Assistant</span>
        </NavLink>
        <div className="flex items-center gap-4 mt-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-6 py-3 rounded-xl text-lg font-bold transition-all duration-200 border-2 ${
                isActive
                  ? "bg-primary border-primary text-white shadow-lg"
                  : "border-transparent text-primary hover:bg-primary/10 hover:border-primary"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/new"
            className={({ isActive }) =>
              `px-6 py-3 rounded-xl text-lg font-bold transition-all duration-200 border-2 ${
                isActive
                  ? "bg-primary border-primary text-white shadow-lg"
                  : "border-transparent text-primary hover:bg-primary/10 hover:border-primary"
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
