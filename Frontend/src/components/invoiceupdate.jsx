import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './invoiceupdate.css';

const defaultItem = {
  name: "",
  hsn: "",
  gstRate: 18,
  quantity: 1,
  rate: 1,
};

export default function InvoiceUpdate() {
  const { id } = useParams(); // Invoice ID from route
  console.log("Invoice ID:", id);
  const navigate = useNavigate();
  
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch existing invoice
  useEffect(() => {
  if (!id) return;

  axios.get(`http://localhost:3002/gen/invoice/${id}`)
    .then(response => {
      setInvoice(response.data.data); // Adjust according to your API response structure
    })
    .catch(error => {
      console.error("Error fetching invoice:", error);
    });
}, [id]);
  // Handle changes
  const handleSenderChange = (e) => {
    setInvoice((prev) => ({
      ...prev,
      billedBy: {
        ...prev.billedBy,
        [e.target.name]: e.target.value
      }
    }));
  };

  const handleRecipientChange = (e) => {
    setInvoice((prev) => ({
      ...prev,
      billedTo: {
        ...prev.billedTo,
        [e.target.name]: e.target.value
      }
    }));
  };

  const handleItemChange = (idx, e) => {
    const updated = [...invoice.items];
    updated[idx][e.target.name] = e.target.value;
    setInvoice({ ...invoice, items: updated });
  };

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, { ...defaultItem }]
    }));
  };

  // Totals calculation
  if (!invoice) return <div>Loading invoice...</div>;

  const itemsWithTotals = invoice.items.map((item) => {
    const amount = Number(item.quantity) * Number(item.rate);
    const cgst = amount * (item.gstRate / 200);
    const sgst = amount * (item.gstRate / 200);
    return {
      ...item,
      amount,
      cgst,
      sgst,
      total: amount + cgst + sgst,
    };
  });

  const subtotal = itemsWithTotals.reduce((sum, itm) => sum + itm.amount, 0);
  const totalCgst = itemsWithTotals.reduce((sum, itm) => sum + itm.cgst, 0);
  const totalSgst = itemsWithTotals.reduce((sum, itm) => sum + itm.sgst, 0);
  const grandTotal = subtotal + totalCgst + totalSgst;

  // Save updated invoice
  const updateInvoice = async () => {
    setLoading(true);
    setMessage("");

    try {
      const invoiceData = {
        ...invoice,
        items: itemsWithTotals,
        subtotal,
        totalCgst,
        totalSgst,
        grandTotal
      };

      const res = await axios.put(`http://localhost:3002/gen/invoice/${id}`, invoiceData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("Invoice updated successfully!");
    navigate("/invoicepreview", { state: { invoiceData: res.data.data } });

    } catch (error) {
      console.error("Error updating invoice:", error);
      setMessage("Error updating invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="invoice-container">
      <h2>Update Invoice</h2>

      {message && <div className="message-box">{message}</div>}

      {/* Invoice Number and Date */}
      <div className="input-row">
        <div>
          <strong>Invoice No</strong><br />
          <input
            type="text"
            name="number"
            value={invoice.number}
            onChange={(e) => setInvoice({ ...invoice, number: e.target.value })}
          />
        </div>
        <br />
        <div className="invoice-date">
          <strong>Invoice Date</strong><br />
          <input
            type="date"
            value={invoice.date}
            onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
          />
        </div>
      </div>
<br />
      {/* Billed By */}
      <div className="section-row">
        <br />
        <div className="section-box">
          <h4>Billed By</h4>
          <div className="input">
          <input name="name" value={invoice.billedBy.name} placeholder="Business Name" onChange={handleSenderChange} />
          <input name="phone" value={invoice.billedBy.phone} placeholder="Phone" onChange={handleSenderChange} />
          <input name="gstin" value={invoice.billedBy.gstin} placeholder="GSTIN" onChange={handleSenderChange} />
          <input name="address" value={invoice.billedBy.address} placeholder="Address" onChange={handleSenderChange} />
          <input name="city" value={invoice.billedBy.city} placeholder="City" onChange={handleSenderChange} />
          <input name="zip" value={invoice.billedBy.zip} placeholder="Postal Code" onChange={handleSenderChange} />
          <input name="state" value={invoice.billedBy.state} placeholder="State" onChange={handleSenderChange} />
        </div>
        </div>

        {/* Billed To */}
        <div className="section-box">
          <h4>Billed To</h4>
          <div className="input">
          <input name="name" value={invoice.billedTo.name} placeholder="Business Name" onChange={handleRecipientChange} />
          <input name="phone" value={invoice.billedTo.phone} placeholder="Phone" onChange={handleRecipientChange} />
          <input name="gstin" value={invoice.billedTo.gstin} placeholder="GSTIN" onChange={handleRecipientChange} />
          <input name="address" value={invoice.billedTo.address} placeholder="Address" onChange={handleRecipientChange} />
          <input name="city" value={invoice.billedTo.city} placeholder="City" onChange={handleRecipientChange} />
          <input name="zip" value={invoice.billedTo.zip} placeholder="Postal Code" onChange={handleRecipientChange} />
          <input name="state" value={invoice.billedTo.state} placeholder="State" onChange={handleRecipientChange} />
        </div>
        </div>
      </div>

      {/* Items Table */}
      <table className="table-section">
        <thead>
          <tr>
            <th>Item</th>
            <th>HSN</th>
            <th>GST%</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>CGST</th>
            <th>SGST</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {itemsWithTotals.map((item, idx) => (
            <tr key={idx}>
              <td><input name="name" value={item.name} onChange={(e) => handleItemChange(idx, e)} /></td>
              <td><input name="hsn" value={item.hsn} onChange={(e) => handleItemChange(idx, e)} /></td>
              <td><input name="gstRate" type="number" value={item.gstRate} onChange={(e) => handleItemChange(idx, e)} /></td>
              <td><input name="quantity" type="number" value={item.quantity} onChange={(e) => handleItemChange(idx, e)} /></td>
              <td><input name="rate" type="number" value={item.rate} onChange={(e) => handleItemChange(idx, e)} /></td>
              <td>{item.amount.toFixed(2)}</td>
              <td>{item.cgst.toFixed(2)}</td>
              <td>{item.sgst.toFixed(2)}</td>
              <td>{item.total.toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="9">
              <button onClick={addItem}>+ Add Item</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Totals */}
      <div className="summary-row">
        <div>Amount: ₹{subtotal.toFixed(2)}</div>
        <div>SGST: ₹{totalSgst.toFixed(2)}</div>
        <div>CGST: ₹{totalCgst.toFixed(2)}</div>
        <h3>Total: ₹{grandTotal.toFixed(2)}</h3>
      </div>

      {/* Save Updated Invoice */}
      <button className="save-btn" onClick={updateInvoice} disabled={loading}>
        {loading ? "Updating..." : "Update Invoice"}
      </button>
    </div>
  );
}
