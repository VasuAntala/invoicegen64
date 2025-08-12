import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./invoiceupdate.css";

const InvoiceUpdate = () => {
  const { id: invoiceId } = useParams(); // ✅ extract invoice ID from URL
  const [invoiceData, setInvoiceData] = useState(null);
  const [form, setForm] = useState({
    invoiceNumber: "",
    date: "",
    billedBy: "",
    billedTo: "",
    items: "",
    totalAmount: "",
  });

  const API_BASE_URL = "http://localhost:3002/gen/invoice"; // ✅ no :id here

  useEffect(() => {
    if (!invoiceId) return;
    axios
      .get(`${API_BASE_URL}/${invoiceId}`)
      .then((res) => {
        const data = res.data.data || res.data;
        setInvoiceData(data);
        setForm({
          invoiceNumber: data.invoiceNumber || "",
          date: data.date ? data.date.slice(0, 10) : "",
          billedBy: data.billedBy || "",
          billedTo: data.billedTo || "",
          items: JSON.stringify(data.items, null, 2) || "",
          totalAmount: data.totalAmount || "",
        });
      })
      .catch((err) => console.error("Error fetching invoice:", err));
  }, [invoiceId]);

  if (!invoiceData) return <div>Loading...</div>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let items = [];
    try {
      items = JSON.parse(form.items);
    } catch {
      items = invoiceData.items;
    }
    const updatedInvoice = {
      ...form,
      items,
      totalAmount: Number(form.totalAmount),
     date: form.date ? new Date(form.date).toISOString() : new Date().toISOString(),

    };
    try {
      const res = await axios.put(`${API_BASE_URL}/${invoiceId}`, updatedInvoice, {
        headers: { "Content-Type": "application/json" },
      });
      setInvoiceData(res.data.data || res.data);
      alert("Invoice updated successfully!");
    } catch (err) {
      console.error("Error updating invoice:", err);
      alert("Failed to update invoice");
    }
  };

  const handleDownloadPDF = () => {
    window.open(`${API_BASE_URL}/${invoiceId}/download-pdf`, "_blank");
  };

  return (
    <div className="invoice-update-container">
      <h2>Update Invoice</h2>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>HSN/SAC</th>
            <th>GST %</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.itemName}</td>
              <td>{item.hsnSac}</td>
              <td>{item.gstPercentage}%</td>
              <td>{item.quantity}</td>
              <td>{item.rate}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-amount">
        <h3>Total Amount: ₹{invoiceData.totalAmount}</h3>
      </div>
      <button className="btn btn-primary" onClick={handleDownloadPDF}>
        Download PDF
      </button>
      <form className="invoice-update-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Invoice Number</label>
          <input type="text" name="invoiceNumber" required value={form.invoiceNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" required value={form.date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Billed By</label>
          <input type="text" name="billedBy" required value={form.billedBy} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Billed To</label>
          <input type="text" name="billedTo" required value={form.billedTo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Items (JSON)</label>
          <textarea name="items" rows="4" required value={form.items} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Total Amount</label>
          <input type="number" name="totalAmount" required value={form.totalAmount} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update Invoice</button>
      </form>
    </div>
  );
};

export default InvoiceUpdate;
