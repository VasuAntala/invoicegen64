import React, { useState } from "react";
import './Invoice.css';

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
    date: new Date().toISOString().substring(0, 10),
    billedBy: {
      country: "India",
      name: "",
      phone: "",
      gstin: "",
      address: "",
      city: "",
      zip: "",
      state: "",
    },
    billedTo: {
      country: "India",
      name: "",
      phone: "",
      gstin: "",
      address: "",
      city: "",
      zip: "",
      state: "",
    },
    items: [ { ...defaultItem } ],
    cgst: 0,
    sgst: 0,
    total: 0,
  });

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
    const updated = [ ...invoice.items ];
    updated[idx][e.target.name] = e.target.value;
    setInvoice({ ...invoice, items: updated });
  }
  function addItem() {
    setInvoice(prev => ({
      ...prev,
      items: [ ...prev.items, { ...defaultItem } ]
    }));
  }

  // Calculate totals
  const itemsWithTotals = invoice.items.map(item => {
    const amount = Number(item.quantity) * Number(item.rate);
    const cgst = amount * (item.gstRate/200);
    const sgst = amount * (item.gstRate/200);
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
      <div className="input-row">
        <div>
          <strong>Invoice No</strong><br/>
          <input type="text"  />
        </div>
        <br />
        <div>
          <strong>Invoice Date</strong><br/>
          <input type="date" value={invoice.date} 
            onChange={e=>setInvoice({...invoice, date:e.target.value})}/>
        </div>
      </div>
      
<br />

     <div className="section-row">
  {/* Billed By */}
  <div className="section-box">
    <h4>Billed By</h4>
    <div className="input-field">
      <input name="name" placeholder="Your Business Name" value={invoice.billedBy.name} onChange={handleSenderChange}/>
    </div>
    <div className="input-field">
      <input name="phone" placeholder="Phone" value={invoice.billedBy.phone} onChange={handleSenderChange}/>
    </div>
    <div className="input-field">
      <input name="gstin" placeholder="GSTIN (optional)" value={invoice.billedBy.gstin} onChange={handleSenderChange}/>
    </div>
    <div className="input-field">
      <input name="address" placeholder="Address" value={invoice.billedBy.address} onChange={handleSenderChange}/>
    </div>
    <div className="input-field">
      <input name="city" placeholder="City" value={invoice.billedBy.city} onChange={handleSenderChange}/>
    </div>
    <div className="input-field">
      <input name="zip" placeholder="Postal Code/ZIP" value={invoice.billedBy.zip} onChange={handleSenderChange}/>
    </div>
    <div className="input-field">
      <input name="state" placeholder="State" value={invoice.billedBy.state} onChange={handleSenderChange}/>
    </div>
  </div>
  {/* Billed To */}
  <div className="section-box">
    <h4>Billed To</h4>
    <div className="input-field">
      <input name="name" placeholder="Client's Business Name" value={invoice.billedTo.name} onChange={handleRecipientChange}/>
    </div>
    <div className="input-field">
      <input name="phone" placeholder="Phone" value={invoice.billedTo.phone} onChange={handleRecipientChange}/>
    </div>
    <div className="input-field">
      <input name="gstin" placeholder="GSTIN (optional)" value={invoice.billedTo.gstin} onChange={handleRecipientChange}/>
    </div>
    <div className="input-field">
      <input name="address" placeholder="Address" value={invoice.billedTo.address} onChange={handleRecipientChange}/>
    </div>
    <div className="input-field">
      <input name="city" placeholder="City" value={invoice.billedTo.city} onChange={handleRecipientChange}/>
    </div>
    <div className="input-field">
      <input name="zip" placeholder="Postal Code/ZIP" value={invoice.billedTo.zip} onChange={handleRecipientChange}/>
    </div>
    <div className="input-field">
      <input name="state" placeholder="State" value={invoice.billedTo.state} onChange={handleRecipientChange}/>
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
                      onChange={e=>handleItemChange(idx, e)} placeholder="Item"/>
              </td>
              <td>
                <input name="hsn" value={item.hsn}
                      onChange={e=>handleItemChange(idx, e)} placeholder="HSN/SAC"/>
              </td>
              <td>
                <input name="gstRate" type="number" value={item.gstRate}
                      onChange={e=>handleItemChange(idx, e)} style={{width:'60px'}}/>
              </td>
              <td>
                <input name="quantity" type="number" min="1" value={item.quantity}
                      onChange={e=>handleItemChange(idx, e)} style={{width:'50px'}}/>
              </td>
              <td>
                <input name="rate" type="number" value={item.rate}
                      onChange={e=>handleItemChange(idx, e)} style={{width:'70px'}}/>
              </td>
              <td>{item.amount.toFixed(2)}</td>
              <td>{item.cgst.toFixed(2)}</td>
              <td>{item.sgst.toFixed(2)}</td>
              <td>{item.total.toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="9">
              <button className="save-btn" onClick={addItem} style={{ marginTop:'8px', padding:'8px' , color:'white' , backgroundColor:'#cf34a8' ,}}>+ Add New Line</button>
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
      <button className="save-btn">Save & Continue</button>
    </div>
  );
}
