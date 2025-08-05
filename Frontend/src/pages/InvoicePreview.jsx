import React from "react";

export default function InvoicePreview({ invoice }) {
  if (!invoice) return <div>No invoice data to preview</div>;

  const { number, date, dueDate, billedBy, billedTo, items } = invoice;

  // Calculate totals
  const amount = items.reduce((sum, i) => sum + Number(i.quantity) * Number(i.rate), 0);
  const cgst = amount * 0.09;
  const sgst = amount * 0.09;
  const total = amount + cgst + sgst;

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: 900,
      margin: "auto",
      boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
      borderRadius: 10,
      overflow: "hidden",
    }}>
      <div style={{ backgroundColor: "#1894d9", color: "#fff", padding: 32, display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2>Invoice</h2>
          <strong>{billedBy.name}</strong><br />
          {billedBy.address}<br />
          Phone: {billedBy.phone}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: "bold" }}>Billed To</div>
          <strong>{billedTo.name}</strong><br />
          {billedTo.address}<br />
          Phone: {billedTo.phone}
        </div>
      </div>
      <div style={{ backgroundColor: "#1894d9", color: "#fff", padding: "16px 32px", display: "flex", justifyContent: "space-around" }}>
        <div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Invoice No #</div>
          {number}
        </div>
        <div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Invoice Date</div>
          {date}
        </div>
        <div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Due Date</div>
          {dueDate}
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fafdff" }}>
        <thead>
          <tr style={{ backgroundColor: "#e9f6fc", color: "#238ed6" }}>
            <th style={{ padding: 12 }}>Item</th>
            <th>GST Rate</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>CGST</th>
            <th>SGST</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((itm, idx) => {
            const amt = Number(itm.quantity) * Number(itm.rate);
            const cg = amt * 0.09;
            const sg = amt * 0.09;
            return (
              <tr key={idx} style={{ borderBottom: "1px solid #ddd", textAlign: "center" }}>
                <td>{itm.name}</td>
                <td>{itm.gstRate}%</td>
                <td>{itm.quantity}</td>
                <td>₹{itm.rate.toLocaleString()}</td>
                <td>₹{amt.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td>₹{cg.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td>₹{sg.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td>₹{(amt + cg + sg).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ padding: 32, textAlign: "right" }}>
        <div>
          Amount <span>₹{amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        <div>
          CGST <span>₹{cgst.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        <div>
          SGST <span>₹{sgst.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        <div style={{ backgroundColor: "#1894d9", color: "#fff", padding: 8, borderRadius: 8, fontWeight: "bold", fontSize: 20, marginTop: 10 }}>
          Total (INR) <span>₹{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      <div style={{ textAlign: "center", paddingBottom: 40 }}>
        <button onClick={() => window.print()} style={{ padding: '10px 30px', backgroundColor: '#1894d9', color: '#fff', fontSize: 16, borderRadius: 5, cursor: "pointer" }}>
          Print Invoice
        </button>
      </div>
    </div>
  );
}
