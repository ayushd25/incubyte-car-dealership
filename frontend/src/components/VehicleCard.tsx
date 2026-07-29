import type { Vehicle } from "../types/vehicle";

interface Props {
  vehicle: Vehicle;
  onPurchase: (id: string) => void;
  isAdmin: boolean;
}

export default function VehicleCard({
  vehicle,
  onPurchase,
  isAdmin,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <div className="flex justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            {vehicle.make} {vehicle.model}
          </h2>

          <p className="text-gray-500">
            {vehicle.category}
          </p>
        </div>

        <span className="font-bold text-blue-600">
          £{vehicle.price.toLocaleString()}
        </span>

      </div>

      <div className="mt-5 space-y-2 text-gray-600">

        <p>Year : {vehicle.year}</p>

        <p>Mileage : {vehicle.mileage.toLocaleString()} km</p>

        <p>Fuel : {vehicle.fuelType}</p>

        <p>Transmission : {vehicle.transmission}</p>

        <p>Colour : {vehicle.color}</p>

        <p>
          Quantity :
          <span className="font-semibold">
            {" "}
            {vehicle.quantity}
          </span>
        </p>

      </div>

      <button
        disabled={vehicle.quantity === 0}
        onClick={() => onPurchase(vehicle._id)}
        className={`mt-6 w-full rounded-lg py-3 text-white font-semibold ${
          vehicle.quantity === 0
            ? "bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {vehicle.quantity === 0
          ? "Out of Stock"
          : "Purchase"}
      </button>

      {isAdmin && (
        <div className="mt-4 flex gap-2">

          <button className="flex-1 rounded-lg bg-yellow-500 py-2 text-white">
            Edit
          </button>

          <button className="flex-1 rounded-lg bg-red-600 py-2 text-white">
            Delete
          </button>

          <button className="flex-1 rounded-lg bg-green-600 py-2 text-white">
            Restock
          </button>

        </div>
      )}

    </div>
  );
}