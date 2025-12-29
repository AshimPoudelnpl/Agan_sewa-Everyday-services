import { useLogout } from "../hooks/useLogout";
import { FiLogOut } from "react-icons/fi"; // Add react-icons for a nice logout icon

const Navbar = () => {
  const handleLogout = useLogout();

  return (
    <nav className="bg-linear-to-r from-gray-600 via-blue-700 to-white-800 text-black shadow-lg">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-extrabold tracking-wide hover:text-yellow-300 transition-colors duration-300">
          Agan Sewa Admin
        </h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <FiLogOut className="text-lg" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
