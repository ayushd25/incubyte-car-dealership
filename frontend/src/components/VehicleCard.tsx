import {
  Calendar,
  Fuel,
  Gauge,
  Palette,
  ShoppingCart,
  Settings,
  Trash2,
  Pencil,
  Boxes,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";

import type { Vehicle } from "../types/vehicle";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  deleteVehicle,
  restockVehicle,
} from "../services/vehicle.service";

interface Props {
  vehicle: Vehicle;
  isAdmin: boolean;
  onPurchase: (id: string) => void;
}

export default function VehicleCard({
  vehicle,
  isAdmin,
  onPurchase,
}: Props) {
  const navigate = useNavigate();

  const images = [
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900",
    "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900",
  ];

  const image = images[vehicle.make.length % images.length];

  const badgeColor = {
    available: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 shadow-emerald-500/20",
    reserved: "bg-amber-500/20 text-amber-300 border-amber-500/30 shadow-amber-500/20",
    sold: "bg-rose-500/20 text-rose-300 border-rose-500/30 shadow-rose-500/20",
  };

  return (
    <div className="group relative">
      {/* Card Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 rounded-3xl opacity-0 blur-xl transition-all duration-700 group-hover:opacity-100 group-hover:blur-2xl"></div>
      
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F1529] to-[#1A1F3D] border border-white/5 transition-all duration-700 hover:-translate-y-4 hover:scale-[1.02] shadow-2xl shadow-black/30">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-blue-400/30 animate-float"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`,
              }}
            />
          ))}
        </div>

        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={vehicle.make}
            className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-125 group-hover:rotate-1"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/60 to-transparent"></div>
          
          {/* Status Badge with Animation */}
          <span
            className={`absolute top-4 right-4 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-xl shadow-lg transition-all duration-500 group-hover:scale-110 ${badgeColor[vehicle.status]}`}
          >
            <span className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${vehicle.status === 'available' ? 'bg-emerald-400' : vehicle.status === 'reserved' ? 'bg-amber-400' : 'bg-rose-400'}`}></span>
              {vehicle.status}
            </span>
          </span>

          {/* Price Badge - Animated with ₹ symbol */}
          <div className="absolute bottom-4 left-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 transform transition-all duration-500 group-hover:translate-x-2 group-hover:scale-105">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              ₹{vehicle.price.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Category Tag */}
          <div className="absolute bottom-4 right-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transform transition-all duration-500 group-hover:scale-110">
            {vehicle.category}
          </div>
        </div>

        {/* Content Section */}
        <div className="relative space-y-5 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text">
                {vehicle.make}
              </h2>
              <p className="text-sm text-slate-400 transition-all duration-300 group-hover:text-slate-300 group-hover:translate-x-1">
                {vehicle.model}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm text-slate-400">
              <Boxes size={14} className="text-blue-400" />
              <span className="font-semibold text-white">{vehicle.quantity}</span>
            </div>
          </div>

          {/* Specs Grid with Icons */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Calendar, label: vehicle.year },
              { icon: Gauge, label: `${vehicle.mileage.toLocaleString('en-IN')} km` },
              { icon: Fuel, label: vehicle.fuelType },
              { icon: Settings, label: vehicle.transmission },
              { icon: Palette, label: vehicle.color },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2.5 transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-lg group-hover:border-blue-500/20"
              >
                <item.icon size={15} className="text-blue-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <span className="text-sm font-medium text-slate-300">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button
            disabled={vehicle.quantity === 0}
            onClick={() => onPurchase(vehicle._id)}
            className={`group/btn relative w-full overflow-hidden rounded-xl py-4 font-bold transition-all duration-500 ${
              vehicle.quantity === 0
                ? "cursor-not-allowed bg-slate-800/50 text-slate-500"
                : "bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02]"
            }`}
          >
            <span className="relative flex items-center justify-center gap-2">
              {vehicle.quantity === 0 ? (
                "Out of Stock"
              ) : (
                <>
                  <ShoppingCart size={18} className="transition-transform duration-500 group-hover/btn:scale-110 group-hover/btn:rotate-12" />
                  <span className="group-hover/btn:tracking-wider transition-all duration-500">Purchase Now</span>
                  <ArrowRight size={16} className="transition-all duration-500 group-hover/btn:translate-x-2" />
                </>
              )}
            </span>
            {vehicle.quantity > 0 && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            )}
          </button>

          {/* Admin Actions */}
          {isAdmin && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button
                onClick={() => navigate(`/admin/edit/${vehicle._id}`)}
                className="group/btn relative overflow-hidden rounded-xl bg-amber-500/10 py-3 font-medium text-amber-400 transition-all duration-300 hover:bg-amber-500 hover:text-white border border-amber-500/20 hover:border-amber-500/50"
              >
                <span className="relative flex items-center justify-center gap-1.5 text-sm">
                  <Pencil size={14} className="transition-transform duration-300 group-hover/btn:rotate-45" />
                  Edit
                </span>
              </button>

              <button
                onClick={() => {
                  const qty = prompt("Restock quantity");
                  if (!qty) return;
                  restockVehicle(vehicle._id, Number(qty)).then(() => {
                    toast.success("Vehicle Restocked");
                    window.location.reload();
                  });
                }}
                className="group/btn relative overflow-hidden rounded-xl bg-emerald-500/10 py-3 font-medium text-emerald-400 transition-all duration-300 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 hover:border-emerald-500/50"
              >
                <span className="relative flex items-center justify-center gap-1.5 text-sm">
                  <Boxes size={14} className="transition-transform duration-300 group-hover/btn:scale-110" />
                  Restock
                </span>
              </button>

              <button
                onClick={async () => {
                  if (!confirm("Delete this vehicle?")) return;
                  await deleteVehicle(vehicle._id);
                  toast.success("Vehicle Deleted");
                  window.location.reload();
                }}
                className="group/btn relative overflow-hidden rounded-xl bg-rose-500/10 py-3 font-medium text-rose-400 transition-all duration-300 hover:bg-rose-500 hover:text-white border border-rose-500/20 hover:border-rose-500/50"
              >
                <span className="relative flex items-center justify-center gap-1.5 text-sm">
                  <Trash2 size={14} className="transition-transform duration-300 group-hover/btn:rotate-12" />
                  Delete
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}