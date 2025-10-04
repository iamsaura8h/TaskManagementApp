// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TaskEdit from "./pages/TaskEdit";
import TaskDetails from "./pages/TaskDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="/tasks/:id/edit" element={<TaskEdit />} />
      </Routes>
    </Router>
  );
}
