import { Search, Filter } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({
  search,
  setSearch,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-4 md:flex-row">

        <div className="relative flex-1">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by make or model..."
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:bg-white"
          />

        </div>

        <button
          className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Filter size={18} />

          Filters
        </button>

      </div>

    </div>
  );
}