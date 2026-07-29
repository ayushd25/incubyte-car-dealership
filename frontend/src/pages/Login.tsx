import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { loginSchema } from "../validators/login.schema";
import type { LoginFormData } from "../validators/login.schema";
import { loginUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginFormData) {
    try {
      setLoading(true);

      const res = await loginUser(values);

      login(res.data.token, res.data.user);

      toast.success(res.message);

      navigate("/");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ??
          "Unable to login"
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
          Sign in to continue
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
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
            className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6">
          New here?{" "}
          <Link
            className="text-blue-600 font-semibold"
            to="/register"
          >
            Create account
          </Link>
        </p>

      </div>

    </div>
  );
}