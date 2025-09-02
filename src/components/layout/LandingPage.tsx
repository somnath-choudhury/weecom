import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#fdbe12] via-[#bb4b17] to-[#ff3503]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('/weecom-logo.jpg')",
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-t from-yellow-300/60 via-orange-400/40 to-transparent"></div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-gray-100 px-4">
        <h1 className="text-5xl font-extrabold md:text-6xl tracking-tight drop-shadow-lg">
          Welcome to Weecom Products Dashboard
        </h1>
        <p className="text-lg md:text-xl text-gray-100 max-w-2xl drop-shadow-md">
          Manage your inventory efficiently and effortlessly
        </p>

        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-lg font-semibold shadow-xl 
                     bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                     hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600
                     text-white transition-all cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </motion.button>
      </div>
    </div>
  );
}
