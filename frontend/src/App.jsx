import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewApplication from "./pages/NewApplication";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="text-2xl font-bold text-primary">
              Job Assistant
            </NavLink>
            <div className="flex items-center space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/new"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`
                }
              >
                New Application
              </NavLink>
            </div>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new" element={<NewApplication />} />
        </Routes>
      </main>
    </div>
  );
}
