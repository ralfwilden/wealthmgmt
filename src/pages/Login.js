import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === "master-admin") navigate("/master-admin");
    else if (role === "admin") navigate("/admin");
    else if (role === "client") navigate("/client");
    else alert("Please select a role.");
  };

  return (
    <div>
      <h1>Login</h1>
      <select onChange={(e) => setRole(e.target.value)} value={role}>
        <option value="">Select Role</option>
        <option value="master-admin">Master Admin</option>
        <option value="admin">Admin</option>
        <option value="client">Client</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;