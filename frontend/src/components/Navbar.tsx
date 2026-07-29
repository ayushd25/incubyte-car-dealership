import { CarFront, LogOut, Menu, X, Sparkles, User, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav 
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? "bg-[#0A0F1E]/95 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/30" 
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo Section */}
        <div className="group flex items-center gap-4">
          <div className="relative">
            {/* Animated ring */}
            <div className="absolute -inset-1 animate-pulse rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 opacity-30 blur-lg group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="relative rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 p-2.5 shadow-2xl shadow-blue-500/30 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
              <CarFront size={22} color="white" className="transition-transform duration-500 group-hover:scale-110" />
            </div>
            {/* Sparkle */}
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 animate-ping" />
          </div>

          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent tracking-tight">
              Incubyte Motors
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500">
              Premium Auto Inventory
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 md:flex">
          {/* User Section */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-all duration-300 hover:border-blue-500/50 hover:bg-white/10"
            >
              <div className="relative">
                <div className="absolute -inset-0.5 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-50"></div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                  {user?.name}
                </h3>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  {user?.role}
                </p>
              </div>
              <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-white/10 bg-[#0A0F1E]/95 backdrop-blur-xl p-2 shadow-2xl shadow-black/50 animate-in slide-in-from-top-2">
                <button
                  onClick={handleLogout}
                  className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition-all duration-300 hover:bg-red-500/10 hover:text-red-300"
                >
                  <LogOut size={16} className="transition-transform duration-300 group-hover:rotate-12" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative md:hidden text-white transition-all duration-300 hover:text-blue-400"
        >
          <span className="absolute -inset-2 animate-pulse rounded-full bg-blue-500/20 opacity-0 hover:opacity-100"></span>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-white/5 bg-[#0A0F1E]/98 backdrop-blur-2xl md:hidden animate-in slide-in-from-top-2">
          <div className="space-y-4 px-6 py-8">
            <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-bold text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-white">{user?.name}</h3>
                <p className="text-sm capitalize text-slate-400">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-3.5 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white border border-red-500/20"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}