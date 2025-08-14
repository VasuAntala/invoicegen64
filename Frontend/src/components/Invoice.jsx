import React, { useState } from "react";
import axios from "axios"; // Add this import
import './Invoice.css';
import { useNavigate } from 'react-router-dom';


const defaultItem = {
  name: "",
  hsn: "",
  gstRate: 18,
  quantity: 1,
  rate: 1,
};



export default function Invoice() {
  const [invoice, setInvoice] = useState({
    number: "",
    date: new Date().toISOString(),
    billedBy: {
      name: "",
      phone: "",
      gstin: "",
      address: "",
      city: "",
      zip: "",
      state: "",
    },
    billedTo: {
      name: "",
      phone: "",
      gstin: "",
      address: "",
      city: "",
      zip: "",
      state: "",
    },
    items: [{ ...defaultItem }],
    cgst: 0,
    sgst: 0,
    total: 0,
  });
  const navigate = useNavigate();
  
  // Add loading and error states
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // Handle changes
  function handleSenderChange(e) {
    setInvoice(prev => ({
      ...prev,
      billedBy: {
        ...prev.billedBy,
        [e.target.name]: e.target.value
      }
    }));
  }

  function handleRecipientChange(e) {
    setInvoice(prev => ({
      ...prev,
      billedTo: {
        ...prev.billedTo,
        [e.target.name]: e.target.value
      }
    }));
  }

  function handleItemChange(idx, e) {
    const updated = [...invoice.items];
    updated[idx][e.target.name] = e.target.value;
    setInvoice({ ...invoice, items: updated });
  }

  function addItem() {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { ...defaultItem }]
    }));
  }

  // Add function to save invoice to backend
  const saveInvoice = async () => {
    setLoading(true);
    setMessage("");

    try {
      // Prepare the data to send
      const invoiceData = {
        invoiceNumber: invoice.number,
        invoiceDate: invoice.date,

        billedBy: {
          businessName: invoice.billedBy.name,
          phone: invoice.billedBy.phone,
          gstin: invoice.billedBy.gstin,
          address: invoice.billedBy.address,
          city: invoice.billedBy.city,
          postalCode: invoice.billedBy.zip,
          state: invoice.billedBy.state
        },

        billedTo: {
          businessName: invoice.billedTo.name,
          phone: invoice.billedTo.phone,
          gstin: invoice.billedTo.gstin,
          address: invoice.billedTo.address,
          city: invoice.billedTo.city,
          postalCode: invoice.billedTo.zip,
          state: invoice.billedTo.state
        },



        // You can include items if you want to store them
        items: itemsWithTotals,
        subtotal,
        totalCgst,
        totalSgst,
        grandTotal
      };


      console.log('Sending invoice data:', invoiceData);

      const response = await axios.post('http://localhost:3002/gen/invoice', invoiceData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Invoice saved successfully:', response.data);
      setMessage("Invoice saved successfully!");
navigate('/invoicepreview', { state: { invoiceData: response.data.data } });
      console.log("Invoice ID:", response.data.data._id); // Log the ID for debugging
      // Optionally reset form or redirect
      // You can uncomment the line below to reset the form after successful save
      // setInvoice({ number: "", date: new Date().toISOString().substring(0, 10), billedBy: { country: "India", name: "", phone: "", gstin: "", address: "", city: "", zip: "", state: "" }, billedTo: { country: "India", name: "", phone: "", gstin: "", address: "", city: "", zip: "", state: "" }, items: [{ ...defaultItem }], cgst: 0, sgst: 0, total: 0 });

    } catch (error) {
      console.error('Error saving invoice:', error);

      if (error.response) {
        // Server responded with error status
        setMessage(`Server error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        // Request made but no response
        setMessage("No response from server. Please check if the backend is running on port 3002.");
      } else {
        // Something else happened
        setMessage(`Request setup error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals
  const itemsWithTotals = invoice.items.map(item => {
    const amount = Number(item.quantity) * Number(item.rate);
    const cgst = amount * (item.gstRate / 200);
    const sgst = amount * (item.gstRate / 200);
    return {
      ...item,
      amount, cgst, sgst,
      total: amount + cgst + sgst
    };
  });

  const subtotal = itemsWithTotals.reduce((sum, itm) => sum + itm.amount, 0);
  const totalCgst = itemsWithTotals.reduce((sum, itm) => sum + itm.cgst, 0);
  const totalSgst = itemsWithTotals.reduce((sum, itm) => sum + itm.sgst, 0);
  const grandTotal = subtotal + totalCgst + totalSgst;

  return (
    <div className="invoice-container">
      <h2>Invoice</h2>

      {/* Display message */}
      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '10px',
          backgroundColor: message.includes('Error') || message.includes('Server error') ? '#ffebee' : '#e8f5e8',
          color: message.includes('Error') || message.includes('Server error') ? '#c62828' : '#2e7d32',
          borderRadius: '4px',
          border: `1px solid ${message.includes('Error') || message.includes('Server error') ? '#c62828' : '#2e7d32'}`
        }}>
          {message}
        </div>
      )}

      <div className="input-row">
        <div>
          <strong>Invoice No</strong><br />
          <input
            type="text"
            name="number"
            value={invoice.number}
            onChange={e => setInvoice({ ...invoice, number: e.target.value })}
            placeholder="Enter invoice number"
          />
        </div>
        <br />
        <div>
          <strong>Invoice Date</strong><br />
          <input type="date" value={invoice.date}
            onChange={e => setInvoice({ ...invoice, date: e.target.value })} />
        </div>
      </div>

      <br />

      <div className="section-row">
        {/* Billed By */}
        <div className="section-box">
          <h4>Billed By</h4>
          <div className="input-field">
            <input name="name" placeholder="Your Business Name" value={invoice.billedBy.name} onChange={handleSenderChange} />
          </div>
          <div className="input-field">
            <input name="phone" placeholder="Phone" value={invoice.billedBy.phone} onChange={handleSenderChange} />
          </div>
          <div className="input-field">
            <input name="gstin" placeholder="GSTIN (optional)" value={invoice.billedBy.gstin} onChange={handleSenderChange} />
          </div>
          <div className="input-field">
            <input name="address" placeholder="Address" value={invoice.billedBy.address} onChange={handleSenderChange} />
          </div>
          <div className="input-field">
            <input name="city" placeholder="City" value={invoice.billedBy.city} onChange={handleSenderChange} />
          </div>
          <div className="input-field">
            <input name="zip" placeholder="Postal Code/ZIP" value={invoice.billedBy.zip} onChange={handleSenderChange} />
          </div>
          <div className="input-field">
            <input name="state" placeholder="State" value={invoice.billedBy.state} onChange={handleSenderChange} />
          </div>
        </div>

        {/* Billed To */}
        <div className="section-box">
          <h4>Billed To</h4>
          <div className="input-field">
            <input name="name" placeholder="Client's Business Name" value={invoice.billedTo.name} onChange={handleRecipientChange} />
          </div>
          <div className="input-field">
            <input name="phone" placeholder="Phone" value={invoice.billedTo.phone} onChange={handleRecipientChange} />
          </div>
          <div className="input-field">
            <input name="gstin" placeholder="GSTIN (optional)" value={invoice.billedTo.gstin} onChange={handleRecipientChange} />
          </div>
          <div className="input-field">
            <input name="address" placeholder="Address" value={invoice.billedTo.address} onChange={handleRecipientChange} />
          </div>
          <div className="input-field">
            <input name="city" placeholder="City" value={invoice.billedTo.city} onChange={handleRecipientChange} />
          </div>
          <div className="input-field">
            <input name="zip" placeholder="Postal Code/ZIP" value={invoice.billedTo.zip} onChange={handleRecipientChange} />
          </div>
          <div className="input-field">
            <input name="state" placeholder="State" value={invoice.billedTo.state} onChange={handleRecipientChange} />
          </div>
        </div>
      </div>

      {/* Items Table */}
      <table className="table-section">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>HSN/SAC</th>
            <th>GST Rate %</th>
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
              <td>
                <input name="name" value={item.name}
                  onChange={e => handleItemChange(idx, e)} placeholder="Item" />
              </td>
              <td>
                <input name="hsn" value={item.hsn}
                  onChange={e => handleItemChange(idx, e)} placeholder="HSN/SAC" />
              </td>
              <td>
                <input name="gstRate" type="number" value={item.gstRate}
                  onChange={e => handleItemChange(idx, e)} style={{ width: '60px' }} />
              </td>
              <td>
                <input name="quantity" type="number" min="1" value={item.quantity}
                  onChange={e => handleItemChange(idx, e)} style={{ width: '50px' }} />
              </td>
              <td>
                <input name="rate" type="number" value={item.rate}
                  onChange={e => handleItemChange(idx, e)} style={{ width: '70px' }} />
              </td>
              <td>{item.amount.toFixed(2)}</td>
              <td>{item.cgst.toFixed(2)}</td>
              <td>{item.sgst.toFixed(2)}</td>
              <td>{item.total.toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="9">
              <button className="save-btn" onClick={addItem} style={{ marginTop: '8px', padding: '8px', color: 'white', backgroundColor: '#cf34a8', }}>+ Add New Line</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Summary */}
      <div className="summary-row">
        <div>
          <div>Amount: ₹{subtotal.toFixed(2)}</div>
          <div>SGST: ₹{totalSgst.toFixed(2)}</div>
          <div>CGST: ₹{totalCgst.toFixed(2)}</div>
          <h3>Total (INR): ₹{grandTotal.toFixed(2)}</h3>
        </div>
      </div>


      {/* Updated Save button */}
      <button
        className="save-btn"
        onClick={saveInvoice}
        disabled={loading}
        style={{
          opacity: loading ? 0.6 : 1,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Saving...' : 'Save & Continue'}
      </button>
      <br />
      <button
        className="save-btn"
        onClick={() => window.print()}
        style={{
          opacity: loading ? 0.6 : 1,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        Print
      </button>
    </div>
  );
}
