import React, { useEffect, useState } from 'react';
import { fetchAdminInvoices } from '../services/invoiceapi.jsx';

export default function AdminInvoices() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchAdminInvoices();
        if (mounted) setInvoices(Array.isArray(data) ? data : []);
      } catch (e) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false };
  }, []);

  return (
    <div className="admin-dashboard-container">
      <header className="dashboard-header">
        <h2>All Invoices</h2>
      </header>
      {loading && <p>Loading invoices...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="summary-card" style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px' }}>Invoice #</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Date</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Billed By</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Billed To</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Grand Total</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>UPI ID</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv._id}>
                <td style={{ padding: '8px', borderTop: '1px solid #eee' }}>{inv.invoiceNumber}</td>
                <td style={{ padding: '8px', borderTop: '1px solid #eee' }}>{inv.invoiceDate ? new Date(inv.invoiceDate).toLocaleDateString() : '-'}</td>
                <td style={{ padding: '8px', borderTop: '1px solid #eee' }}>{inv?.billedBy?.businessName}</td>
                <td style={{ padding: '8px', borderTop: '1px solid #eee' }}>{inv?.billedTo?.businessName}</td>
                <td style={{ padding: '8px', borderTop: '1px solid #eee' }}>{typeof inv?.grandTotal === 'number' ? inv.grandTotal.toFixed(2) : inv.grandTotal}</td>
                <td style={{ padding: '8px', borderTop: '1px solid #eee' }}>{inv?.payment?.upiId || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

