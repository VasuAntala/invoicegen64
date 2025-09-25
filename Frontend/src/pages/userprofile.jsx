import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './userprofile.css';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    // Fetch invoices created by logged in user
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3002/gen/invoice', {
        params: { username },
      });
      setInvoices(res.data.data || []);
    } catch (error) {
      console.error(error);
      setMessage('Could not load invoices.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

    // Delete invoice
    const deleteInvoice = async (id) => {
        if (!window.confirm('Are you sure you want to delete this invoice?')) return;
        try {
            await axios.delete(`https://invoicegen64-5.onrender.com/gen/invoice/${id}`);
            setMessage('Invoice deleted successfully!');
            fetchInvoices();
        } catch (err) {
            console.error(err);
            setMessage('Failed to delete invoice');
        }
    };

      const viewInvoice = (invoice) => {
    navigate(`/invoicepreview/${invoice._id}`);
  };

    // Navigate to invoice update page
    const updateInvoice = (invoice) => {
        navigate(`/invoiceupdate/${invoice._id}`);  // useParams in your InvoiceUpdate will catch this
    };


    
    return (
        <div className="user-profile">
            <h1>User Profile</h1>
            <p>Welcome to your profile page!</p>
            {username === 'admin' && (
          <button 
            className="btn-admin-dashboard" 
            onClick={() => navigate('/admin')}
          >
            Go to Admin Dashboard
          </button>
        )}
            {message && <div className="user-message">{message}</div>}

            <h2>Your Invoices</h2>
            {loading ? (
                <p>Loading...</p>
            ) : invoices.length === 0 ? (
                <p>No invoices created yet.</p>
            ) : (
                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Date</th>
                            <th>Client</th>
                            <th>Total (INR)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((inv) => (
                            <tr key={inv._id}>
                                <td>{inv.invoiceNumber || inv.number}</td>
                                <td>{new Date(inv.invoiceDate || inv.date).toLocaleDateString()}</td>
                                <td>{inv.billedTo?.businessName || inv.billedTo?.name || 'N/A'}</td>
                                <td>₹{inv.grandTotal?.toFixed(2)}</td>
                                <td>
                                    {/* <button
                                        onClick={() => viewInvoice(inv)._id}
                                        className="btn-view"
                                    >
                                        View
                                    </button> */}
                                    <button
                                        onClick={() => updateInvoice(inv)}
                                        className="btn-update"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => deleteInvoice(inv._id)}
                                        className="btn-delete"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserProfile;
