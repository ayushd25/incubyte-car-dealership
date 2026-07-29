import { Search, Filter, X, Sparkles, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({ search, setSearch }: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
      
      <div className="relative rounded-2xl bg-gradient-to-br from-[#0F1529] to-[#1A1F3D] border border-white/5 p-6 shadow-2xl shadow-black/30 transition-all duration-500 hover:border-blue-500/30">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${isFocused ? 'text-blue-400 rotate-12 scale-110' : 'text-slate-400'}`} size={20} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search for your dream car..."
              className="w-full rounded-xl bg-gradient-to-br from-[#0A0F1E] to-[#141B33] border border-white/10 py-4 pl-12 pr-12 text-white placeholder:text-slate-500 outline-none transition-all duration-500 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 hover:border-blue-500/50"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-all duration-300 hover:text-white hover:scale-110 hover:rotate-90"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 px-8 py-4 font-bold text-white shadow-xl shadow-blue-500/30 transition-all duration-500 hover:shadow-blue-500/50 hover:scale-[1.02]"
          >
            <span className="relative flex items-center gap-2">
              <SlidersHorizontal size={18} className={`transition-transform duration-500 ${showFilters ? 'rotate-180' : 'group-hover:rotate-90'}`} />
              <span className="tracking-wider transition-all duration-500 group-hover:tracking-widest">
                Filters
              </span>
            </span>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          </button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-6 grid gap-4 border-t border-white/5 pt-6 animate-in slide-in-from-top-2 duration-300 md:grid-cols-4">
            {[
              { label: "Category", options: ["All Categories", "SUV", "Sedan", "Hatchback", "Truck"] },
              { label: "Fuel Type", options: ["All Fuel Types", "Petrol", "Diesel", "Electric", "Hybrid"] },
              { label: "Status", options: ["All Status", "Available", "Reserved", "Sold"] },
            ].map((filter) => (
              <select
                key={filter.label}
                className="rounded-xl bg-[#0A0F1E] border border-white/10 px-4 py-3 text-sm text-white transition-all duration-300 hover:border-blue-500/50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                {filter.options.map((option) => (
                  <option key={option} value={option} className="text-white">
                    {option}
                  </option>
                ))}
              </select>
            ))}
            <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/50">
              <span className="relative flex items-center justify-center gap-2">
                <Sparkles size={16} className="animate-pulse" />
                Apply Filters
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}