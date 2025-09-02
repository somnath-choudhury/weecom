import { Route, Routes } from "react-router";
import LandingPage from "./components/layout/LandingPage";
import Dashboard from "./components/layout/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
