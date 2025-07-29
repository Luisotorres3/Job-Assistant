import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewApplication from "./pages/NewApplication";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 text-gray-800">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new" element={<NewApplication />} />
        </Routes>
      </main>
    </div>
  );
}
