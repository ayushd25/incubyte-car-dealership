// frontend/src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddVehicle from "./pages/AddVehicle";
import EditVehicle from "./pages/EditVehicle";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fff",
              color: "#0F172A",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "12px 20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            },
          }}
        />
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
        </Routes>
      </div>
    </AuthProvider>
  );
}