import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import VehicleCard from "../components/VehicleCard";

import { useAuth } from "../context/AuthContext";

import {
  getVehicles,
  purchaseVehicle,
} from "../services/vehicle.service";

import type { Vehicle } from "../types/vehicle";
import { Link } from "react-router-dom";


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
      toast.error(
        error?.response?.data?.message ||
          "Purchase failed"
      );
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

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Hero */}

        <div className="mb-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 p-10 text-white shadow-xl">

          <p className="text-sm uppercase tracking-widest text-blue-300">
            Dashboard
          </p>

          <h1 className="mt-2 text-5xl font-bold">
            Welcome,
            <span className="text-blue-400">
              {" "}
              {user?.name}
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-slate-300">
            Browse, manage and purchase vehicles
            from the dealership inventory.
          </p>

        </div>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />
        <div className="mb-6 flex items-center justify-between">
  <h1 className="text-4xl font-bold">
    Available Vehicles
  </h1>

  {user?.role === "admin" && (
    <Link
      to="/admin/add"
      className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
    >
      + Add Vehicle
    </Link>
  )}
</div>

        <div className="mt-10 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Available Vehicles
          </h2>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {filteredVehicles.length} Vehicles
          </span>

        </div>

        {loading ? (

          <div className="flex h-96 items-center justify-center">

            <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />

          </div>

        ) : filteredVehicles.length === 0 ? (

          <div className="mt-20 rounded-3xl bg-white p-16 text-center shadow">

            <h2 className="text-3xl font-bold">
              🚗
            </h2>

            <h3 className="mt-4 text-2xl font-semibold">
              No Vehicles Found
            </h3>

            <p className="mt-3 text-slate-500">
              Try changing your search.
            </p>

          </div>

        ) : (

          <div className="mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle._id}
                vehicle={vehicle}
                isAdmin={user?.role === "admin"}
                onPurchase={handlePurchase}
              />
            ))}

          </div>

        )}

      </main>

    </div>
  );
}