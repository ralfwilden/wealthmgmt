import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MasterAdmin from "./pages/MasterAdmin";
import Admin from "./pages/Admin";
import Client from "./pages/Client";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/master-admin" element={<MasterAdmin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/client" element={<Client />} />
      </Routes>
    </Router>
  );
}

export default App;
