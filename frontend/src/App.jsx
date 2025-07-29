import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewApplication from "./pages/NewApplication";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white p-6 shadow rounded">
          <h1 className="text-xl font-bold text-gray-800">Welcome</h1>
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new" element={<NewApplication />} />
        </Routes>
      </main>
    </div>
  );
}
