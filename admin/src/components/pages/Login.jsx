import Input from "../shared/Input";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { handleLogin, isLoading, error } = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    const result = await handleLogin(formData);
    console.log("message", result.data?.message);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center bg-white p-10 rounded-xl shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6">LOGIN</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
          <Input
            type="email"
            placeholder="Enter the email"
            id="email"
            label="Email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <Input
            type="password"
            placeholder="Enter the password"
            id="password"
            label="Password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white p-2 rounded-lg mt-3 disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {error && (
            <p className="text-red-500">
              {error.data?.message || "Login failed"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
