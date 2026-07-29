import { useForm } from "react-hook-form";

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

export default function VehicleForm({
  defaultValues,
  onSubmit,
  loading,
  submitText,
}: Props) {
  const {
    register,
    handleSubmit,
  } = useForm<VehicleFormData>({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5 md:grid-cols-2"
    >
      <input
        {...register("make")}
        placeholder="Make"
        className="rounded-xl border p-3"
      />

      <input
        {...register("model")}
        placeholder="Model"
        className="rounded-xl border p-3"
      />

      <input
        type="number"
        {...register("year", { valueAsNumber: true })}
        placeholder="Year"
        className="rounded-xl border p-3"
      />

      <select
  {...register("category")}
  className="rounded-xl border p-3"
  defaultValue=""
>
  <option value="" disabled>
    Select Category
  </option>

  <option value="SUV">SUV</option>
  <option value="Sedan">Sedan</option>
  <option value="Hatchback">Hatchback</option>
  <option value="Truck">Truck</option>
  <option value="Coupe">Coupe</option>
  <option value="Convertible">Convertible</option>
</select>

      <input
        type="number"
        {...register("price", { valueAsNumber: true })}
        placeholder="Price"
        className="rounded-xl border p-3"
      />

      <input
        type="number"
        {...register("mileage", { valueAsNumber: true })}
        placeholder="Mileage"
        className="rounded-xl border p-3"
      />

      <input
        {...register("fuelType")}
        placeholder="Fuel Type"
        className="rounded-xl border p-3"
      />

      <input
        {...register("transmission")}
        placeholder="Transmission"
        className="rounded-xl border p-3"
      />

      <input
        {...register("color")}
        placeholder="Color"
        className="rounded-xl border p-3"
      />

      <input
        {...register("vin")}
        placeholder="VIN"
        className="rounded-xl border p-3"
      />

      <input
        type="number"
        {...register("quantity", {
          valueAsNumber: true,
        })}
        placeholder="Quantity"
        className="rounded-xl border p-3"
      />

      <button
        disabled={loading}
        className="rounded-xl bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
      >
        {loading ? "Please wait..." : submitText}
      </button>
    </form>
  );
}