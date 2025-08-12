import React from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './invoicepreview.css'; 

function InvoicePreview() {
  const { state } = useLocation();
  const invoiceData = state?.invoiceData;

  if (!invoiceData) {
    return <div>No invoice data found. Please create an invoice first.</div>;
  }

   const handleDownloadPDF = async () => {
  const element = document.querySelector('.invoice-preview');
  const canvas = await html2canvas(element);
  const pdf = new jsPDF('p', 'mm', 'a4');
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
  pdf.save('invoice.pdf');
};

  return (
    <div className="invoice-preview">
      <h2>Invoice Preview</h2>

      {/* Invoice Details */}
      <div className="invoice-details">
        <p>Invoice #: {invoiceData.invoiceNumber}</p>
        <p>Date: {invoiceData.invoiceDate}</p>
      </div>

      {/* Sender */}
      <div className="sender-info">
        <h3>From</h3>
        <p>{invoiceData.billedBy.businessName}</p>
        <p>{invoiceData.billedBy.address}, {invoiceData.billedBy.city}, {invoiceData.billedBy.state}, {invoiceData.billedBy.postalCode}</p>
        <p>Phone: {invoiceData.billedBy.phone}</p>
        <p>GSTIN: {invoiceData.billedBy.gstin}</p>
      </div>

      {/* Recipient */}
      <div className="recipient-info">
        <h3>To</h3>
        <p>{invoiceData.billedTo.businessName}</p>
        <p>{invoiceData.billedTo.address}, {invoiceData.billedTo.city}, {invoiceData.billedTo.state}, {invoiceData.billedTo.postalCode}</p>
        <p>Phone: {invoiceData.billedTo.phone}</p>
        <p>GSTIN: {invoiceData.billedTo.gstin}</p>
      </div>


      {/* Items Table */}
      <table className="item-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>HSN/SAC</th>
            <th>GST %</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>CGST</th>
            <th>SGST</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.hsn}</td>
              <td>{item.gstRate}</td>
              <td>{item.quantity}</td>
              <td>{item.rate}</td>
              <td>{item.amount}</td>
              <td>{item.cgst}</td>
              <td>{item.sgst}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="summary-row">
        <div>
          <p>Amount: ₹{invoiceData.subtotal.toFixed(2)}</p>
          <p>SGST: ₹{invoiceData.totalSgst.toFixed(2)}</p>
          <p>CGST: ₹{invoiceData.totalCgst.toFixed(2)}</p>
          <h3>Total (INR): ₹{invoiceData.grandTotal.toFixed(2)}</h3>
        </div>
      </div>

      {/* Print/Download as PDF */}
      <button onClick={() => window.print()} style={{ marginTop: '16px' }}>
        Print Invoice
      </button>
      {/* Add PDF download here if you wish */}
      <button onClick={handleDownloadPDF} style={{ marginLeft: '1rem' }}>
  Download as PDF
</button>
<button onClick={() => window.location.href = '/invoiceupdate/:id'} style={{ marginLeft: '1rem' }}>
  Update Invoice
</button>

    </div>
  );
}

export default InvoicePreview;
