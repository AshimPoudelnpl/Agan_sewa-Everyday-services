import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../redux/features/authState";
import { useSignoutMutation } from "../../redux/features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signout] = useSignoutMutation();

  const handleLogout = async () => {
    try {
      await signout().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log("Logout error:", err);
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Agan Sewa</h2>
        <p className="text-sm text-gray-400">Service Management</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/managers" className="block py-2 px-4 rounded hover:bg-gray-700">
              Managers
            </Link>
          </li>
          <li>
            <details className="group">
              <summary className="block py-2 px-4 rounded hover:bg-gray-700 cursor-pointer">
                Branch Management
              </summary>
              <ul className="ml-4 mt-2 space-y-1">
                <li><Link to="/provinces" className="block py-1 px-4 text-sm rounded hover:bg-gray-700">Provinces</Link></li>
                <li><Link to="/districts" className="block py-1 px-4 text-sm rounded hover:bg-gray-700">Districts</Link></li>
                <li><Link to="/branches" className="block py-1 px-4 text-sm rounded hover:bg-gray-700">Branches</Link></li>
              </ul>
            </details>
          </li>
          <li>
            <Link to="/services" className="block py-2 px-4 rounded hover:bg-gray-700">
              Services
            </Link>
          </li>
          <li>
            <Link to="/staff" className="block py-2 px-4 rounded hover:bg-gray-700">
              Staff
            </Link>
          </li>
          <li>
            <Link to="/inquiries" className="block py-2 px-4 rounded hover:bg-gray-700">
              Inquiries
            </Link>
          </li>
          <li>
            <Link to="/reviews" className="block py-2 px-4 rounded hover:bg-gray-700">
              Reviews
            </Link>
          </li>
          <li>
            <Link to="/gallery" className="block py-2 px-4 rounded hover:bg-gray-700">
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/trusted-customers" className="block py-2 px-4 rounded hover:bg-gray-700">
              Trusted Customers
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;