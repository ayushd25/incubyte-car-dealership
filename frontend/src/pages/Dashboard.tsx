import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import VehicleCard from "../components/VehicleCard";

import { useAuth } from "../context/AuthContext";

import { getVehicles, purchaseVehicle } from "../services/vehicle.service";

import type { Vehicle } from "../types/vehicle";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Car, 
  TrendingUp, 
  Sparkles, 
  Award, 
  Clock, 
  ArrowRight,
  Zap
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadVehicles() {
    try {
      setLoading(true);
      const response = await getVehicles();
      setVehicles(response.data);
    } catch (error) {
      toast.error("Unable to load vehicles");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVehicles();
  }, []);

  async function handlePurchase(id: string) {
    try {
      await purchaseVehicle(id);
      toast.success("Vehicle purchased successfully");
      loadVehicles();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Purchase failed");
    }
  }

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const text = search.toLowerCase();
      return (
        vehicle.make.toLowerCase().includes(text) ||
        vehicle.model.toLowerCase().includes(text)
      );
    });
  }, [vehicles, search]);

  // Stats
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter(v => v.status === 'available').length;
  const totalValue = vehicles.reduce((sum, v) => sum + v.price * v.quantity, 0);

  const stats = [
    { 
      icon: Car, 
      label: "Total Vehicles", 
      value: totalVehicles,
      color: "from-blue-500 to-cyan-400",
      glow: "shadow-blue-500/25"
    },
    { 
      icon: TrendingUp, 
      label: "Available", 
      value: availableVehicles,
      color: "from-emerald-500 to-teal-400",
      glow: "shadow-emerald-500/25"
    },
    { 
      icon: Zap, 
      label: "Total Value", 
      value: `₹${totalValue.toLocaleString('en-IN')}`, // Changed to ₹ and Indian locale
      color: "from-purple-500 to-pink-400",
      glow: "shadow-purple-500/25"
    },
    { 
      icon: Award, 
      label: "Featured", 
      value: "Premium",
      color: "from-amber-500 to-orange-400",
      glow: "shadow-amber-500/25"
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1E] overflow-x-hidden">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pt-24 pb-10">
        {/* Hero Section with Parallax */}
        <div className="relative mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F1529] via-[#1A1F3D] to-[#0F1529] border border-white/5 p-10 shadow-2xl shadow-blue-500/10">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/2 h-full w-full animate-spin-slow">
              <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
            </div>
            <div className="absolute -bottom-1/2 -left-1/2 h-full w-full animate-spin-slow animation-delay-1000">
              <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"></div>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-400">
              <Sparkles size={16} className="animate-pulse" />
              <span className="uppercase tracking-widest">Welcome to Premium Auto</span>
            </div>
            
            <h1 className="mt-3 text-5xl font-bold md:text-6xl">
              <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Welcome back,
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {user?.name}
              </span>
            </h1>
            
            <p className="mt-4 max-w-xl text-lg text-slate-400">
              Discover and manage your premium vehicle collection with style.
            </p>

            {/* Quick Actions */}
            {user?.role === "admin" && (
              <Link
                to="/admin/add"
                className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 px-6 py-3.5 font-bold text-white shadow-xl shadow-blue-500/30 transition-all duration-500 hover:shadow-blue-500/50 hover:scale-[1.02]"
              >
                <Plus size={18} className="transition-transform duration-500 group-hover:rotate-90" />
                Add New Vehicle
                <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 rounded-2xl opacity-0 blur-xl transition-all duration-700 group-hover:opacity-100 group-hover:blur-2xl"></div>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F1529] to-[#1A1F3D] border border-white/5 p-6 transition-all duration-500 hover:border-blue-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                    <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`rounded-xl bg-gradient-to-br ${stat.color} p-3 shadow-xl ${stat.glow}`}>
                    <stat.icon size={20} className="text-white" />
                  </div>
                </div>
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className={`h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r ${stat.color}`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <SearchBar search={search} setSearch={setSearch} />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Premium Collection
              </span>
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {filteredVehicles.length} exquisite vehicles available
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-400">
              <Clock size={14} />
              Updated just now
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative h-20 w-20 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500"></div>
              <div className="mt-6 text-center">
                <p className="text-sm font-medium text-slate-400 animate-pulse">Loading premium vehicles...</p>
              </div>
            </div>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-16 rounded-3xl bg-gradient-to-br from-[#0F1529] to-[#1A1F3D] border border-white/5 p-16 text-center shadow-2xl shadow-black/30"
          >
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-xl shadow-blue-500/30">
              <Car size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">No Vehicles Found</h3>
            <p className="mt-2 text-slate-400">Try adjusting your search or filters.</p>
          </motion.div>
        ) : (
          <motion.div 
            className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            <AnimatePresence>
              {filteredVehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <VehicleCard
                    vehicle={vehicle}
                    isAdmin={user?.role === "admin"}
                    onPurchase={handlePurchase}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
}