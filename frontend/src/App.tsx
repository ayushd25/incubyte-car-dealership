import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddVehicle from "./pages/AddVehicle";
import EditVehicle from "./pages/EditVehicle";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add"
        element={
          <AdminRoute>
            <AddVehicle />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/edit/:id"
        element={
          <AdminRoute>
            <EditVehicle />
          </AdminRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes></div>
  );
}