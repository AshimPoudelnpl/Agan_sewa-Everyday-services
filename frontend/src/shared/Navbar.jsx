import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DetailsModal from "../shared/DetailsModal";

const Navbar = () => {
  const { isAuth, role } = useSelector((state) => state.user);
  const [login, setlogin] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Agan Sewa
          </Link>

          <div className="flex space-x-4">
            <Link to="/services" className="text-gray-700 hover:text-blue-600">
              Services
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>

            {isAuth && role === "manager" && (
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                 Dashboard
              </Link>
            )}
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {isAuth ? `${role} Dashboard` : "Login"}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
