import { Link } from "react-router-dom";
import { CarFront, Home, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center px-5 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 h-full w-full animate-spin-slow">
          <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-3xl"></div>
        </div>
        <div className="absolute -bottom-1/2 -left-1/2 h-full w-full animate-spin-slow animation-delay-1000">
          <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-3xl"></div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 shadow-2xl shadow-blue-500/30"
        >
          <CarFront size={48} color="white" />
        </motion.div>
        
        <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="mt-2 text-2xl font-semibold text-white">Page Not Found</h2>
        <p className="mt-2 text-slate-400">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 px-8 py-4 font-bold text-white shadow-xl shadow-blue-500/30 transition-all duration-500 hover:shadow-blue-500/50 hover:scale-[1.02]"
        >
          <Home size={18} className="transition-transform duration-500 group-hover:-translate-x-1" />
          <span className="tracking-wider transition-all duration-500 group-hover:tracking-widest">
            Back to Dashboard
          </span>
          <Sparkles size={16} className="animate-pulse" />
        </Link>
      </motion.div>
    </div>
  );
}