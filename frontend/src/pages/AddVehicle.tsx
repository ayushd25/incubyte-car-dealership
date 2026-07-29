import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import VehicleForm, {
  type VehicleFormData,
} from "../components/VehicleForm";

import { createVehicle } from "../services/vehicle.service";

export default function AddVehicle() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: VehicleFormData) {
    try {
      setLoading(true);

      await createVehicle(data);

      toast.success("Vehicle Added");

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

      <div className="mx-auto max-w-5xl p-8">
        <div className="rounded-3xl bg-white p-8 shadow">
          <h1 className="mb-8 text-3xl font-bold">
            Add Vehicle
          </h1>

          <VehicleForm
            loading={loading}
            submitText="Create Vehicle"
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}