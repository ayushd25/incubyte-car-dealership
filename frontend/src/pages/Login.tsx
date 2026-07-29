import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { CarFront, Mail, Lock } from "lucide-react";

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
      toast.error(err?.response?.data?.message ?? "Unable to login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg mb-4">
            <CarFront size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Incubyte Motors</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to your account</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  {...register("email")}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-rose-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  {...register("password")}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  placeholder="********"
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-rose-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              disabled={loading}
              className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            New here?{" "}
            <Link
              className="font-semibold text-blue-600 hover:underline"
              to="/register"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}