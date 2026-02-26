import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await register(username, password);

    alert("Registration successful!");

    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Register
        </h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">
          Register
        </button>

        <p className="mt-3 text-center text-gray-600">
          Already have account?{" "}
          <Link className="text-blue-600" to="/">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;