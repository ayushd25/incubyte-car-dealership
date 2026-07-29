import { CarFront, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-3">
            <CarFront size={22} color="white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              Incubyte Motors
            </h1>

            <p className="text-sm text-slate-400">
              Vehicle Inventory
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <h3 className="font-semibold text-white">
              {user?.name}
            </h3>

            <p className="text-sm capitalize text-slate-400">
              {user?.role}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}