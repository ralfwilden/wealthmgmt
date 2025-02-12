import React, { useState } from "react";
import HomeButton from "../components/HomeButton";

function Client() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+123456789",
  });

  // Existing approved investment from the previous quarter
  const previousInvestment = {
    id: 0,
    amount: 5000,
    roi: 7, // Fixed ROI of 7%
    startDate: "2024-10-01",
    maturityPeriod: 45,
    status: "approved",
  };

  const [investments, setInvestments] = useState([
    {
      id: 1,
      amount: 5000,
      roi: 8,
      startDate: "2025-01-01",
      maturityPeriod: 45,
      status: "active",
      rollOverRequested: false,
    },
  ]);

  const [newInvestment, setNewInvestment] = useState("");

  // Get the maturity date of the latest investment (to set start date of new request)
  const latestInvestment = investments[investments.length - 1];
  const nextStartDate = latestInvestment
    ? new Date(
        new Date(latestInvestment.startDate).setDate(
          new Date(latestInvestment.startDate).getDate() + latestInvestment.maturityPeriod
        )
      )
        .toISOString()
        .split("T")[0]
    : "";

  const calculateMaturityAmount = (amount, roi) => {
    return amount + (amount * roi) / 100;
  };

  const handleRequestInvestment = () => {
    setInvestments([
      ...investments,
      {
        id: investments.length + 1,
        amount: parseInt(newInvestment),
        roi: "", // No ROI assigned yet, Admin will set upon approval
        startDate: nextStartDate,
        maturityPeriod: 45,
        status: "pending approval",
        rollOverRequested: false,
      },
    ]);
    setNewInvestment("");
  };

  return (
    <div>
      <HomeButton />
      <h1>Client Dashboard</h1>

      <h2>Your Profile</h2>
      <input
        type="text"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />
      <input
        type="email"
        value={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />
      <input
        type="text"
        value={profile.phone}
        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
      />
      <button>Update Profile</button>

      <h2>Your Investments</h2>
      <table border="1" style={{ width: "100%", textAlign: "center", marginBottom: "30px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>ROI (%)</th>
            <th>Start Date</th>
            <th>Maturity Date</th>
            <th>Maturity Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Approved Investment from Previous Quarter */}
          <tr>
            <td>{previousInvestment.id}</td>
            <td>{previousInvestment.amount}</td>
            <td>{previousInvestment.roi}%</td>
            <td>{previousInvestment.startDate}</td>
            <td>{calculateMaturityAmount(previousInvestment.startDate, previousInvestment.maturityPeriod)}</td>
            <td>{calculateMaturityAmount(previousInvestment.amount, previousInvestment.roi).toFixed(2)}</td>
            <td>{previousInvestment.status}</td>
          </tr>

          {investments.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.amount}</td>
              <td>{inv.roi ? `${inv.roi}%` : "?"}</td>
              <td>{inv.startDate}</td>
              <td>{new Date(new Date(inv.startDate).setDate(new Date(inv.startDate).getDate() + inv.maturityPeriod)).toISOString().split("T")[0]}</td>
              <td>{calculateMaturityAmount(inv.amount, inv.roi || 0).toFixed(2)}</td>
              <td>{inv.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Request New Investment</h2>
      <p><strong>Next Start Date:</strong> {nextStartDate}</p>
      <input
        type="number"
        placeholder="Enter Amount"
        value={newInvestment}
        onChange={(e) => setNewInvestment(e.target.value)}
      />
      <p><strong>Assumed ROI:</strong>  The Company will suggest the most appropriate rate for the term upon approval for your consideration</p>
      <button onClick={handleRequestInvestment}>Request Investment</button>
    </div>
  );
}

export default Client;