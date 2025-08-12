import react from 'react';
import './admin.css';

function AdminPage() {
  return (
    <div class="admin-page">

    <div class="main-page">
      <h2>Admin Page</h2>
      <p>Welcome to the admin dashboard. Here you can manage users, view reports, and perform administrative tasks.</p>
      <p>For any issues, please contact support.</p>  
     
      <ul>
        <li><a href="/manage-users">Manage Users</a></li>
        <li><a href="/view-reports">View Reports</a></li>
        <li><a href="/settings">Settings</a></li>
      </ul>

<br />

      <button class="admin-logout" onClick={() => window.location.href = '/mainpage'}>Logout</button>
      <button class="admin-mainpage" onClick={() => window.location.href = '/mainpage'}>Go to Main Page</button>
    </div>  

    <div class="manage-user">
      <h3>Manage Users</h3>
      <p>Here you can add, edit, or delete users.</p>
      <button class="admin-adduser" onClick={() => window.location.href = '/add-user'}>Add User</button>
      <button class="admin-edituser" onClick={() => window.location.href = '/edit-user'}>Edit User</button>
      <button class="admin-deleteuser" onClick={() => window.location.href = '/delete-user'}>Delete User</button>
    </div>

    <div class="view-reports">
      <h3>View Reports</h3>
      <p>Access various reports related to user activity, system performance, and more.</p>
      <button className="admin-viewreport" onClick={() => window.location.href = '/reports'}>View Reports</button>
    </div>

    <div class="settings">
      <h3>Settings</h3>
      <p>Configure application settings, manage notifications, and customize your admin dashboard.</p>
      <button className="admin-setting" onClick={() => window.location.href = '/settings'}>Settings</button>
    </div>  
      </div>
  
  );
}

export default AdminPage;