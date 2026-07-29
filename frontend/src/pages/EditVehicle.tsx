import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import VehicleForm, {
  type VehicleFormData,
} from "../components/VehicleForm";

import {
  getVehicle,
  updateVehicle,
} from "../services/vehicle.service";

export default function EditVehicle() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [vehicle, setVehicle] =
    useState<VehicleFormData | null>(null);

  useEffect(() => {
    async function loadVehicle() {
      try {
        const res = await getVehicle(id!);

        setVehicle(res.data);
      } catch {
        toast.error("Unable to load vehicle");
      }
    }

    loadVehicle();
  }, [id]);

  async function handleSubmit(data: VehicleFormData) {
    try {
      setLoading(true);

      await updateVehicle(id!, data);

      toast.success("Vehicle Updated");

      navigate("/");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  }

  if (!vehicle) {
    return (
      <>
        <Navbar />
        <div className="p-8">Loading...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-5xl p-8">
        <div className="rounded-3xl bg-white p-8 shadow">
          <h1 className="mb-8 text-3xl font-bold">
            Edit Vehicle
          </h1>

          <VehicleForm
            defaultValues={vehicle}
            loading={loading}
            submitText="Update Vehicle"
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}