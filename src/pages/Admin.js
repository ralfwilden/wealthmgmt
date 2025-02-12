import React, { useState } from "react";
import HomeButton from "../components/HomeButton";

function Admin() {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "John J Doe",
      investments: [
        {
          id: 1,
          amount: 5000,
          startDate: "2025-01-01",
          maturityPeriod: 45,
          status: "active",
          rollOverRequested: true,
          roi: 8, // Existing ROI for active investments
        },
        {
          id: 2,
          amount: 3000,
          startDate: "2025-01-10",
          maturityPeriod: 45,
          status: "pending approval",
          rollOverRequested: false,
          roi: "", // No ROI assigned yet for new investments
        },
      ],
    },
  ]);

  const handleRequestAction = (clientId, investmentId, action, newRoi) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              investments: client.investments
                .map((inv) =>
                  inv.id === investmentId
                    ? {
                        ...inv,
                        status: action === "approve" ? "active" : undefined,
                        roi: action === "approve" ? newRoi : inv.roi,
                        rollOverRequested: false,
                      }
                    : inv
                )
                .filter((inv) => inv.status !== undefined), // Remove if rejected
            }
          : client
      )
    );
  };

  return (
    <div>
      <HomeButton />
      <h1>Admin Dashboard</h1>

      <h2>Pending Requests</h2>
      {clients.map((client) => (
        <div key={client.id}>
          <h3>{client.name}</h3>
          <table border="1" style={{ width: "100%", textAlign: "center", marginBottom: "30px" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Current ROI</th>
                <th>Type</th>
                <th>New ROI (Proposed)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {client.investments
                .filter((inv) => inv.status === "pending approval" || inv.rollOverRequested)
                .map((inv) => (
                  <tr key={inv.id}>
                    <td>{inv.id}</td>
                    <td>{inv.amount}</td>
                    <td>{inv.status === "pending approval" ? "-" : `${inv.roi}%`}</td>
                    <td>{inv.status === "pending approval" ? "New Investment" : "Roll-Over"}</td>
                    <td>
                      <input type="number" defaultValue={inv.roi || ""} id={`roi-${inv.id}`} />
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleRequestAction(
                            client.id,
                            inv.id,
                            "approve",
                            parseFloat(document.getElementById(`roi-${inv.id}`).value)
                          )
                        }
                      >
                        Approve
                      </button>
                      <button onClick={() => handleRequestAction(client.id, inv.id, "reject")}>
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Admin;