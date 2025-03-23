import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      setError("");
      navigate("/admin");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen bg-blue-50">
      <div className="flex flex-col gap-5 items-center justify-center border-1 rounded shadow shadow-xl p-20 bg-white-50">
        <h2 className="text-lg underline pb-10">Admin Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            className="border-1 px-2 py-1 rounded shadow shadow-lg focus:scale-105"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            className="border-1 px-2 py-1 rounded shadow shadow-lg focus:scale-105"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="border-1 px-4 py-2 shadow shadow-lg cursor-pointer rounded bg-blue-400 hover:scale-110 hover:bg-blue-300"
          >
            Login
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
