import React from "react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-7xl font-extrabold text-red-500">404</h1>

      <p className="mt-4 text-2xl font-semibold text-gray-800">
        Page Not Found
      </p>

      <p className="mt-2 text-center text-gray-600 max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <a
        href="/"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
