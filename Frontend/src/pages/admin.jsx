import React, { useEffect, useState } from 'react';
import './admin.css';
import { fetchAdminStats } from '../services/invoiceapi.jsx';

function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ users: 0, activeUsers: 0, invoices: 0 });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchAdminStats();
        if (mounted) {
          setStats(data || { users: 0, activeUsers: 0, invoices: 0 });
        }
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
        <h2>Admin Dashboard</h2>
        <p>Welcome to the admin dashboard. Manage users, invoices, and settings efficiently.</p>
      </header>

      <div className="dashboard-summary-cards">
        <div className="summary-card">
          <h3>Users</h3>
          <p>Total Users: {stats.users}</p>
          <p>Active Users: {stats.activeUsers}</p>
          <button onClick={() => window.location.href = '/admin/users'}>Manage Users</button>
        </div>

        <div className="summary-card">
          <h3>Invoices</h3>
          <p>Total Invoices: {stats.invoices}</p>
          <p>Paid: -</p>
          <p>Unpaid: -</p>
          <button onClick={() => window.location.href = '/admin/invoices'}>View Invoices</button>
        </div>

        <div className="summary-card">
          <h3>Settings</h3>
          <p>Customize your admin dashboard and preferences</p>
          <button onClick={() => window.location.href = '/settings'}>Go to Settings</button>
        </div>
      </div>

      <section className="dashboard-actions">
        {loading && <p>Loading stats...</p>}
        {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
        <h3>Quick Actions</h3>
        <button onClick={() => window.location.href = '/add-user'}>Add User</button>
        <button onClick={() => window.location.href = '/edit-user'}>Edit User</button>
        <button onClick={() => window.location.href = '/delete-user'}>Delete User</button>
        <button onClick={() => window.location.href = '/reports'}>View Reports</button>
        <button className="admin-logout" onClick={() => window.location.href = '/login'}>Logout</button>
      </section>
    </div>
  );
}

export default AdminPage;
