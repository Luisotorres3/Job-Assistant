import { Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewApplication from "./pages/NewApplication";

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-20 bg-blue-700 text-white shadow">
        <nav className="container mx-auto flex justify-between items-center px-4 py-4">
          <Link to="/" className="font-bold text-2xl tracking-wide">
            Job Assistant
          </Link>
          <div className="space-x-6 text-lg">
            <Link
              to="/"
              className={`hover:underline transition ${
                location.pathname === "/" ? "underline font-semibold" : ""
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/new"
              className={`hover:underline transition ${
                location.pathname === "/new" ? "underline font-semibold" : ""
              }`}
            >
              New Application
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-3xl">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new" element={<NewApplication />} />
          </Routes>
        </div>
      </main>
      <footer className="text-center text-xs text-gray-400 py-4">
        &copy; {new Date().getFullYear()} Job Assistant
      </footer>
    </div>
  );
}
