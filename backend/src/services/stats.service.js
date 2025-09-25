import Invoice from '../database/models/invoicemodel.js';
import { User } from '../database/models/usersmodel.js';

export async function getAdminStats() {
  const [userCount, invoiceCount, activeUsers] = await Promise.all([
    User.countDocuments({}),
    Invoice.countDocuments({}),
    User.countDocuments({ lastLoginAt: { $ne: null } })
  ]);

  return {
    users: userCount,
    invoices: invoiceCount,
    activeUsers
  };
}

export async function listUsers() {
  // exclude password field
  return await User.find({}, { password: 0 }).sort({ createdAt: -1 }).lean();
}

export async function listInvoices() {
  return await Invoice.find({}).sort({ createdAt: -1 }).lean();
}

