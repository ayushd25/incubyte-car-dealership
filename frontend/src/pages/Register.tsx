import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { registerSchema } from "../validators/register.schema";
import type { RegisterFormData } from "../validators/register.schema";

import { registerUser } from "../services/auth.service";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: RegisterFormData) {
    try {
      setLoading(true);

      const res = await registerUser(values);

      toast.success(res.message);

      navigate("/login");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ??
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-5">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center">
          🚗 Incubyte Motors
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Create your account
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>
            <label>Name</label>

            <input
              {...register("name")}
              className="mt-2 w-full rounded-lg border p-3"
              placeholder="John Doe"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label>Email</label>

            <input
              {...register("email")}
              className="mt-2 w-full rounded-lg border p-3"
              placeholder="john@example.com"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label>Password</label>

            <input
              type="password"
              {...register("password")}
              className="mt-2 w-full rounded-lg border p-3"
              placeholder="********"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-green-600 py-3 text-white font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            className="text-blue-600 font-semibold"
            to="/login"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}