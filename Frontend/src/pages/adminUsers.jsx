import React, { useEffect, useState } from 'react';
import { fetchAdminUsers } from '../services/invoiceapi.jsx';
import { MoveLeft } from 'lucide-react';

export default function AdminUsers() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchAdminUsers();
        if (mounted) setUsers(Array.isArray(data) ? data : []);
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
        <h2>All Users</h2>
      </header>
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="summary-card" style={{ width: '100%' , margin: '10px ' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' , marginTop: '1rem'  }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' , }}>Username</th>
              <th style={{ textAlign: 'center' }}>Email</th>
              <th style={{ textAlign: 'center' }}>Created</th>
              <th style={{ textAlign: 'center' }}>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td style={{ padding: '8px', borderTop: '1px solid #eee' }}>{u.username}</td>
                <td style={{ padding: '8px', borderTop: '1px solid #eee' }}>{u.email}</td>
                <td style={{ padding: '8px', borderTop: '1px solid #eee' }}>{u.createdAt ? new Date(u.createdAt).toLocaleString() : '-'}</td>
                <td style={{ padding: '8px', borderTop: '1px solid #eee' }}>{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

