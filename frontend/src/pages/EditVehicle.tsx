import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Car, Edit, Save, Clock } from "lucide-react";

import Navbar from "../components/Navbar";
import VehicleForm, { type VehicleFormData } from "../components/VehicleForm";
import { getVehicle, updateVehicle } from "../services/vehicle.service";

export default function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState<VehicleFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadVehicle() {
      try {
        setIsLoading(true);
        const res = await getVehicle(id!);
        setVehicle(res.data);
      } catch {
        toast.error("Unable to load vehicle");
      } finally {
        setIsLoading(false);
      }
    }
    loadVehicle();
  }, [id]);

  async function handleSubmit(data: VehicleFormData) {
    try {
      setLoading(true);
      await updateVehicle(id!, data);
      toast.success("Vehicle Updated Successfully! ✨");
      navigate("/");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative h-20 w-20 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500"></div>
            <div className="mt-6 text-center">
              <p className="text-sm font-medium text-slate-400 animate-pulse">Loading vehicle details...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!vehicle) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/20">
              <Car size={32} className="text-rose-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Vehicle Not Found</h3>
            <p className="mt-1 text-sm text-slate-400">The vehicle you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-2.5 font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>
          </motion.div>
        </div>
      </>
    );
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
                <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl"></div>
              </div>
              <div className="absolute -bottom-1/2 -left-1/2 h-full w-full animate-spin-slow animation-delay-1000">
                <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative p-8 md:p-12">
              {/* Header */}
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute -inset-1 animate-pulse rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 opacity-30 blur-lg"></div>
                    <div className="relative rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-400 p-3 shadow-xl shadow-amber-500/30">
                      <Edit size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-amber-200 to-orange-200 bg-clip-text text-transparent">
                      Edit Vehicle
                    </h1>
                    <p className="mt-1 text-sm text-slate-400 flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                      Update the details of your premium vehicle
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-white/5 border border-white/5 px-4 py-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Car size={16} className="text-blue-400" />
                      <span className="text-xs text-slate-400">Vehicle</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {vehicle.make} {vehicle.model}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/5 px-4 py-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-amber-400" />
                      <span className="text-xs text-slate-400">Year</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-white">{vehicle.year}</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/5 px-4 py-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-purple-400" />
                      <span className="text-xs text-slate-400">Status</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-emerald-400">Editing Mode</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <VehicleForm
                defaultValues={vehicle}
                loading={loading}
                submitText="Update Vehicle"
                onSubmit={handleSubmit}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}