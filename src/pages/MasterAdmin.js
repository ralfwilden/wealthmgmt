import React, { useState } from "react";
import HomeButton from "../components/HomeButton";

function MasterAdmin() {
  const [admins, setAdmins] = useState([
    { id: 1, name: "Admin User", email: "admin@example.com" },
  ]);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "" });

  const handleAddAdmin = () => {
    setAdmins([...admins, { id: admins.length + 1, ...newAdmin }]);
    setNewAdmin({ name: "", email: "" });
  };

  return (
    <div>
      <HomeButton />
      <h1>Master Admin Dashboard</h1>

      <h2>Manage Admins</h2>
      <ul>
        {admins.map((admin) => (
          <li key={admin.id}>
            {admin.name} ({admin.email})
          </li>
        ))}
      </ul>

      <h3>Add New Admin</h3>
      <input
        type="text"
        placeholder="Name"
        value={newAdmin.name}
        onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newAdmin.email}
        onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
      />
      <button onClick={handleAddAdmin}>Add Admin</button>
    </div>
  );
}

export default MasterAdmin;