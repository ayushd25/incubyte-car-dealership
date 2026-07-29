import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Car, Plus, Zap } from "lucide-react";

import Navbar from "../components/Navbar";
import VehicleForm, { type VehicleFormData } from "../components/VehicleForm";
import { createVehicle } from "../services/vehicle.service";

export default function AddVehicle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: VehicleFormData) {
    try {
      setLoading(true);
      await createVehicle(data);
      toast.success("Vehicle Added Successfully! 🚗");
      navigate("/");
    } catch {
      toast.error("Unable to create vehicle");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0A0F1E]">
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-10">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
            className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-all duration-300 hover:text-white hover:translate-x-[-4px]"
          >
            <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Dashboard
          </motion.button>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F1529] to-[#1A1F3D] border border-white/5 shadow-2xl shadow-blue-500/10"
          >
            {/* Animated Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 -right-1/2 h-full w-full animate-spin-slow">
                <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl"></div>
              </div>
              <div className="absolute -bottom-1/2 -left-1/2 h-full w-full animate-spin-slow animation-delay-1000">
                <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative p-8 md:p-12">
              {/* Header */}
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute -inset-1 animate-pulse rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-lg"></div>
                    <div className="relative rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 p-3 shadow-xl shadow-blue-500/30">
                      <Plus size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                      Add New Vehicle
                    </h1>
                    <p className="mt-1 text-sm text-slate-400 flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Fill in the details to add a new masterpiece to your collection
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-white/5 border border-white/5 px-4 py-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Car size={16} className="text-blue-400" />
                      <span className="text-xs text-slate-400">New Listing</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-white">Premium Vehicle</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/5 px-4 py-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Zap size={16} className="text-yellow-400" />
                      <span className="text-xs text-slate-400">Quick Add</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-white">Instant Listing</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/5 px-4 py-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-purple-400" />
                      <span className="text-xs text-slate-400">Status</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-emerald-400">Available</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <VehicleForm
                loading={loading}
                submitText="Create Vehicle"
                onSubmit={handleSubmit}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}