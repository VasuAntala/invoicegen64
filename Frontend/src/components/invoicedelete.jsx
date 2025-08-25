import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Invoice.css'; // Reuse same styling
import { useNavigate } from 'react-router-dom';

export default function Invoicedelete() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch invoices from backend
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://invoicegen64-5.onrender.com/gen/invoice');
      setInvoices(res.data.data || []);
    } catch (error) {
      console.error(error);
      setMessage("Error loading invoices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete invoice by ID
  const deleteInvoice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;

    try {
      await axios.delete(`http://localhost:3002/gen/invoice/${id}`);
      setMessage("Invoice deleted successfully!");
      // Re-fetch updated list
      fetchInvoices();
    } catch (error) {
      console.error(error);
      setMessage("Error deleting invoice. Try again.");
    }
  };

  // Load list on page load
  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="invoice-container">
      <h2>Delete Invoice</h2>

      {/* Messages */}
      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '10px',
          backgroundColor: message.includes('Error') ? '#ffebee' : '#e8f5e8',
          color: message.includes('Error') ? '#c62828' : '#2e7d32',
          borderRadius: '4px',
          border: `1px solid ${message.includes('Error') ? '#c62828' : '#2e7d32'}`
        }}>
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading invoices...</p>
      ) : invoices.length === 0 ? (
        <p>No invoices found.</p>
      ) : (
        <table className="table-section">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Date</th>
              <th>Client</th>
              <th>Total (INR)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv._id}>
                <td>{inv.invoiceNumber}</td>
                <td>{new Date(inv.invoiceDate).toLocaleDateString()}</td>
                <td>{inv.billedTo?.businessName || "N/A"}</td>
                <td>₹{inv.grandTotal?.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => deleteInvoice(inv._id)}
                    style={{
                      backgroundColor: "#c62828",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "4px"
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br />
      <button className="save-btn" onClick={() => navigate('/invoice')}>
        Back to Create Invoice
      </button>
      <br />
        <button className="save-btn" onClick={() => navigate('/')}>
         Back To Home
      </button>
    </div>
  );
}

