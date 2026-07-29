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

const image =
  images[
    vehicle.make.length %
      images.length
  ];

  const badgeColor = {
    available:
      "bg-green-100 text-green-700",

    reserved:
      "bg-yellow-100 text-yellow-700",

    sold:
      "bg-red-100 text-red-700",
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* Image Placeholder */}

      <div className="h-56 overflow-hidden">
  <img
    src={image}
    alt={vehicle.make}
    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
  />
</div>

      <div className="space-y-5 p-6">

        <div className="flex justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              {vehicle.make}
            </h2>

            <p className="text-slate-500">
              {vehicle.model}
            </p>

          </div>

          <div className="text-right">

            <h3 className="text-xl font-bold text-blue-600">
              £{vehicle.price.toLocaleString()}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                badgeColor[vehicle.status]
              }`}
            >
              {vehicle.status}
            </span>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">

          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {vehicle.year}
          </div>

          <div className="flex items-center gap-2">
            <Gauge size={16} />
            {vehicle.mileage.toLocaleString()} km
          </div>

          <div className="flex items-center gap-2">
            <Fuel size={16} />
            {vehicle.fuelType}
          </div>

          <div className="flex items-center gap-2">
            <Settings size={16} />
            {vehicle.transmission}
          </div>

          <div className="flex items-center gap-2">
            <Palette size={16} />
            {vehicle.color}
          </div>

          <div className="flex items-center gap-2">
            <Boxes size={16} />
            Qty : {vehicle.quantity}
          </div>

        </div>

        <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium">
          {vehicle.category}
        </div>

        <button
          disabled={
            vehicle.quantity === 0
          }
          onClick={() =>
            onPurchase(vehicle._id)
          }
          className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3 font-semibold transition ${
            vehicle.quantity === 0
              ? "cursor-not-allowed bg-slate-300 text-slate-500"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <ShoppingCart size={18} />

          {vehicle.quantity === 0
            ? "Out of Stock"
            : "Purchase"}
        </button>

       {isAdmin && (
  <div className="mt-4 grid grid-cols-3 gap-2">
    <button
      onClick={() =>
        navigate(`/admin/edit/${vehicle._id}`)
      }
      className="rounded-xl bg-amber-500 py-2 text-white hover:bg-amber-600"
    >
      Edit
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
      className="rounded-xl bg-green-600 py-2 text-white hover:bg-green-700"
    >
      Restock
    </button>

    <button
      onClick={async () => {
        if (!confirm("Delete this vehicle?")) return;

        await deleteVehicle(vehicle._id);

        toast.success("Vehicle Deleted");

        window.location.reload();
      }}
      className="rounded-xl bg-red-600 py-2 text-white hover:bg-red-700"
    >
      Delete
    </button>
  </div>
)}

      </div>

    </div>
  );
}