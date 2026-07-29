import { useForm } from "react-hook-form";
import { Sparkles } from "lucide-react";

export interface VehicleFormData {
  make: string;
  model: string;
  year: number;
  category: string;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  color: string;
  vin: string;
  quantity: number;
}

interface Props {
  defaultValues?: Partial<VehicleFormData>;
  onSubmit: (data: VehicleFormData) => void;
  loading: boolean;
  submitText: string;
}

const categories = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Truck",
  "Coupe",
  "Convertible",
];

const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"];
const transmissionTypes = ["Automatic", "Manual", "CVT", "DCT"];

export default function VehicleForm({
  defaultValues,
  onSubmit,
  loading,
  submitText,
}: Props) {
  const { register, handleSubmit } = useForm<VehicleFormData>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
      {/* Make */}
      <div className="space-y-2 group">
        <label className="text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-blue-400 flex items-center gap-2">
          <span className="text-blue-400">●</span>
          Make
        </label>
        <input
          {...register("make")}
          placeholder="e.g. Toyota"
          className="w-full rounded-xl bg-[#0A0F1E] border border-white/10 px-4 py-3.5 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
        />
      </div>

      {/* Model */}
      <div className="space-y-2 group">
        <label className="text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-blue-400 flex items-center gap-2">
          <span className="text-blue-400">●</span>
          Model
        </label>
        <input
          {...register("model")}
          placeholder="e.g. Camry"
          className="w-full rounded-xl bg-[#0A0F1E] border border-white/10 px-4 py-3.5 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
        />
      </div>

      {/* Year */}
      <div className="space-y-2 group">
        <label className="text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-blue-400 flex items-center gap-2">
          <span className="text-blue-400">●</span>
          Year
        </label>
        <input
          type="number"
          {...register("year", { valueAsNumber: true })}
          placeholder="2024"
          className="w-full rounded-xl bg-[#0A0F1E] border border-white/10 px-4 py-3.5 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
        />
      </div>

      {/* Category */}
      <div className="space-y-2 group">
        <label className="text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-blue-400 flex items-center gap-2">
          <span className="text-blue-400">●</span>
          Category
        </label>
        <select
          {...register("category")}
          className="w-full rounded-xl bg-[#0A0F1E] border border-white/10 px-4 py-3.5 text-white transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
          defaultValue=""
        >
          <option value="" disabled className="text-slate-500">
            Select Category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="text-white">
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="space-y-2 group">
        <label className="text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-blue-400 flex items-center gap-2">
          <span className="text-blue-400">●</span>
          Price (₹)
        </label>
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="25000"
          className="w-full rounded-xl bg-[#0A0F1E] border border-white/10 px-4 py-3.5 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
        />
      </div>

      {/* Mileage */}
      <div className="space-y-2 group">
        <label className="text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-blue-400 flex items-center gap-2">
          <span className="text-blue-400">●</span>
          Mileage (km)
        </label>
        <input
          type="number"
          {...register("mileage", { valueAsNumber: true })}
          placeholder="15000"
          className="w-full rounded-xl bg-[#0A0F1E] border border-white/10 px-4 py-3.5 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
        />
      </div>

      {/* Fuel Type */}
      <div className="space-y-2 group">
        <label className="text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-blue-400 flex items-center gap-2">
          <span className="text-blue-400">●</span>
          Fuel Type
        </label>
        <select
          {...register("fuelType")}
          className="w-full rounded-xl bg-[#0A0F1E] border border-white/10 px-4 py-3.5 text-white transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
          defaultValue=""
        >
          <option value="" disabled className="text-slate-500">
            Select Fuel Type
          </option>
          {fuelTypes.map((fuel) => (
            <option key={fuel} value={fuel} className="text-white">
              {fuel}
            </option>
          ))}
        </select>
      </div>

      {/* Transmission */}
      <div className="space-y-2 group">
        <label className="text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-blue-400 flex items-center gap-2">
          <span className="text-blue-400">●</span>
          Transmission
        </label>
        <select
          {...register("transmission")}
          className="w-full rounded-xl bg-[#0A0F1E] border border-white/10 px-4 py-3.5 text-white transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
          defaultValue=""
        >
          <option value="" disabled className="text-slate-500">
            Select Transmission
          </option>
          {transmissionTypes.map((trans) => (
            <option key={trans} value={trans} className="text-white">
              {trans}
            </option>
          ))}
        </select>
      </div>

      {/* Color */}
      <div className="space-y-2 group">
        <label className="text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-blue-400 flex items-center gap-2">
          <span className="text-blue-400">●</span>
          Color
        </label>
        <input
          {...register("color")}
          placeholder="Red"
          className="w-full rounded-xl bg-[#0A0F1E] border border-white/10 px-4 py-3.5 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
        />
      </div>

      {/* VIN */}
      <div className="space-y-2 group">
        <label className="text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-blue-400 flex items-center gap-2">
          <span className="text-blue-400">●</span>
          VIN
        </label>
        <input
          {...register("vin")}
          placeholder="1HGCM82633A123456"
          className="w-full rounded-xl bg-[#0A0F1E] border border-white/10 px-4 py-3.5 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
        />
      </div>

      {/* Quantity */}
      <div className="space-y-2 group">
        <label className="text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-blue-400 flex items-center gap-2">
          <span className="text-blue-400">●</span>
          Quantity
        </label>
        <input
          type="number"
          {...register("quantity", { valueAsNumber: true })}
          placeholder="5"
          className="w-full rounded-xl bg-[#0A0F1E] border border-white/10 px-4 py-3.5 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
        />
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2">
        <button
          disabled={loading}
          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 px-6 py-4.5 font-bold text-white shadow-xl shadow-blue-500/30 transition-all duration-500 hover:shadow-blue-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
        >
          <span className="relative flex items-center justify-center gap-3">
            {loading ? (
              <>
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="tracking-wider">Processing...</span>
              </>
            ) : (
              <>
                <Sparkles size={20} className="animate-pulse" />
                <span className="tracking-wider transition-all duration-500 group-hover:tracking-widest">
                  {submitText}
                </span>
              </>
            )}
          </span>
          {!loading && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          )}
        </button>
      </div>
    </form>
  );
}